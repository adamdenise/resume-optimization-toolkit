'use strict';
const resumeInput = document.getElementById('resume');
const jobInput = document.getElementById('job');
const results = document.getElementById('results');
const skills = [
  ['JavaScript', /\bjavascript\b/i], ['HTML', /\bhtml\b/i], ['CSS', /\bcss\b/i],
  ['Python', /\bpython\b/i], ['SQL', /\bsql\b/i], ['Excel', /\bexcel\b/i],
  ['Data Analysis', /\bdata analy(?:sis|tics)\b/i], ['Communication', /\bcommunicat(?:ion|ions|e|ing)\b/i],
  ['Customer Service', /\bcustomer service\b/i], ['Project Management', /\bproject management\b/i],
  ['Leadership', /\bleadership\b/i], ['SEO', /\bseo\b/i], ['Marketing', /\bmarketing\b/i],
  ['GitHub', /\bgithub\b/i], ['Problem Solving', /\bproblem.solving\b/i],
  ['Teamwork', /\bteamwork\b/i], ['Sales', /\bsales\b/i], ['Recruitment', /\brecruit(?:ment|ing)\b/i],
  ['Microsoft Office', /\bmicrosoft office\b/i], ['Power BI', /\bpower\s*bi\b/i]
];
const sections = [
  ['Summary', /\b(summary|professional profile|objective)\b/i],
  ['Experience', /\b(experience|employment|work history)\b/i],
  ['Education', /\b(education|university|degree|college)\b/i],
  ['Skills', /\b(skills|competencies|expertise)\b/i]
];
const words = text => (text.trim().match(/\S+/g) || []).length;
const detect = (text, dictionary) => dictionary.filter(([, pattern]) => pattern.test(text)).map(([name]) => name);
function node(tag, text, className) { const el=document.createElement(tag); if(text!==undefined)el.textContent=text;if(className)el.className=className;return el; }
function metric(title, value, className) {const wrap=node('div',undefined,'metric');wrap.append(node('h3',title),node('p',value,className));results.append(wrap);}
function analyze() {
 const resume=resumeInput.value.trim(), job=jobInput.value.trim();
 results.replaceChildren();results.hidden=false;
 results.append(node('h2','Your analysis'));
 if(!resume){metric('Resume required','Paste your resume to get started.','warn');results.scrollIntoView({behavior:'smooth',block:'start'});return;}
 const resumeSkills=detect(resume,skills), resumeSections=detect(resume,sections);
 metric('Resume length',`${words(resume)} words`);
 metric('Detected sections',resumeSections.join(' · ')||'None from the basic section dictionary');
 metric('Detected skills',resumeSkills.join(' · ')||'None from the supported skills dictionary');
 const suggestions=[];
 const missingSections=sections.map(([name])=>name).filter(name=>!resumeSections.includes(name));
 if(missingSections.length)suggestions.push('Consider adding or clearly labeling: '+missingSections.join(', ')+'.');
 if(words(resume)<150)suggestions.push('Your resume is short. Add specific, truthful achievements and relevant details where appropriate.');
 if(!/\b(\d+%|\d+\s*(?:customers|projects|clients|hours|years|cases))\b/i.test(resume))suggestions.push('Where possible, quantify real achievements with accurate numbers.');
 if(job){
  const jobSkills=detect(job,skills),matched=jobSkills.filter(x=>resumeSkills.includes(x)),missing=jobSkills.filter(x=>!resumeSkills.includes(x));
  const score=jobSkills.length?Math.round(100*matched.length/jobSkills.length):null;
  metric('Job comparison',score===null?'No supported skill keywords found in the job description. No score calculated.':`${score}% keyword overlap (${matched.length} of ${jobSkills.length} recognized job skills)`);
  metric('Matching job skills',matched.join(' · ')||'No matches from the supported dictionary');
  metric('Skills to review',missing.join(' · ')||'No unmatched recognized job skills');
  if(missing.length)suggestions.push('Review these job requirements. Include them only if you genuinely have the experience: '+missing.join(', ')+'.');
  if(!jobSkills.length)suggestions.push('Try a job description with explicit technical or professional skills for a more useful comparison.');
 } else suggestions.push('Paste a target job description to compare recognized skills.');
 metric('Recommendations',suggestions.join(' '));
 results.append(node('p','This is a transparent keyword-based demo, not a validated ATS or hiring prediction. Unrecognized synonyms and context can affect results.','note'));
 results.scrollIntoView({behavior:'smooth',block:'start'});
}
document.getElementById('analyze').addEventListener('click',analyze);
