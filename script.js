'use strict';
const $ = id => document.getElementById(id);
const dictionary = {
  'Excel':['excel','microsoft excel','spreadsheets'], 'Communication':['communication','communicating','verbal communication','written communication'],
  'Customer Service':['customer service','customer support','client support','customer inquiries'],
  'Data Analysis':['data analysis','data analytics','analyzing data','analyse data'],
  'Teamwork':['teamwork','team collaboration','collaborative work','working in a team'],
  'Problem Solving':['problem solving','problem-solving','troubleshooting','resolve problems','solving problems'],
  'SQL':['sql','structured query language'], 'Python':['python'], 'JavaScript':['javascript','js'],
  'HTML':['html'], 'CSS':['css'], 'Project Management':['project management','managing projects'],
  'Leadership':['leadership','team lead','leading teams'], 'SEO':['seo','search engine optimization'],
  'Marketing':['marketing','digital marketing'], 'Sales':['sales','selling'],
  'Microsoft Word':['microsoft word','ms word'], 'Power BI':['power bi','powerbi'],
  'Tableau':['tableau'], 'Git':['git','github'], 'CRM':['crm','salesforce','hubspot'],
  'Administrative Support':['administrative support','administrative tasks','office administration'],
  'Time Management':['time management','prioritization','prioritisation'],
  'Attention to Detail':['attention to detail','detail oriented','detail-oriented'],
  'Adaptability':['adaptability','adaptable','flexibility'], 'Research':['research','market research'],
  'Writing':['writing','copywriting','content writing'], 'Design':['graphic design','visual design','figma','canva'],
  'Healthcare':['healthcare','patient care','nursing'], 'Languages':['multilingual','foreign languages','bilingual']
};
function normalize(s){return s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[‐‑–—]/g,'-');}
function hasPhrase(text,phrase){const escaped=normalize(phrase).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return new RegExp('(^|[^a-z0-9])'+escaped+'(?=$|[^a-z0-9])','i').test(text);}
function findSkills(text){const clean=normalize(text);return Object.entries(dictionary).filter(([,terms])=>terms.some(t=>hasPhrase(clean,t))).map(([name])=>name);}
function countWords(s){return s.trim()?s.trim().split(/\s+/).length:0;}
function updateCounts(){$('resumeWords').textContent=countWords($('resume').value)+' words';$('jobWords').textContent=countWords($('job').value)+' words';}
function renderChips(id,values,missing=false){const node=$(id);node.replaceChildren();if(!values.length){const p=document.createElement('p');p.className='empty';p.textContent=missing?'No missing recognized skills.':'No recognized matching skills.';node.append(p);return;}values.forEach(v=>{const chip=document.createElement('span');chip.className='chip'+(missing?' miss':'');chip.textContent=v;node.append(chip);});}
let report='';
const sectionPatterns = { 'Professional summary': /(?:professional\s+summary|profile|about me|objective)/i, 'Experience': /(?:experience|employment|work history)/i, 'Education': /(?:education|degree|university|college|diploma)/i, 'Skills': /(?:skills|competencies|technical skills)/i };
function reviewStructure(resume){const area=$('structureFindings');area.replaceChildren();Object.entries(sectionPatterns).forEach(([label,pattern])=>{const found=pattern.test(resume);const item=document.createElement('div');item.className='structure-item '+(found?'found':'review');item.textContent=(found?'✓ ':'○ ')+label+(found?' — mentioned':' — not clearly identified');area.append(item);});}

function analyze(){const resume=$('resume').value.trim(),job=$('job').value.trim();if(!resume||!job){$('message').textContent='Please enter both your resume and the job description.';$('results').classList.add('hidden');return;}
 const jobSkills=findSkills(job),resumeSkills=findSkills(resume);if(!jobSkills.length){$('message').textContent='No skills from our current dictionary were recognized in the job description. Try a more detailed job listing.';$('results').classList.add('hidden');return;}
 const matched=jobSkills.filter(x=>resumeSkills.includes(x)),missing=jobSkills.filter(x=>!resumeSkills.includes(x));const score=Math.round(matched.length/jobSkills.length*100);const words=countWords(resume);
 $('message').textContent='';$('score').textContent=score+'%';$('ring').style.setProperty('--score',score);$('matchedCount').textContent=matched.length;$('missingCount').textContent=missing.length;$('wordCount').textContent=words+' words';renderChips('matched',matched);renderChips('missing',missing,true);reviewStructure(resume);
 const rec=[];if(missing.length)rec.push('If you genuinely have these skills, add concrete evidence of where you used them: '+missing.join(', ')+'.');else rec.push('All recognized job skills appear in your resume. Verify that your examples demonstrate your actual experience.');
 rec.push('Support relevant skills with specific achievements, responsibilities, and measurable results when available.');if(words<150)rec.push('Your resume text is short. Consider adding relevant work examples, education, and outcomes.');rec.push('Read the complete job description manually. Keyword matching cannot assess seniority, qualifications, proficiency, or overall fit.');
 const list=$('recommendations');list.replaceChildren();rec.forEach(r=>{const li=document.createElement('li');li.textContent=r;list.append(li);});
 report=['RESUMEPILOT — V4.1 COMPATIBILITY REPORT','',`Estimated keyword match: ${score}% (not ATS score)`,`Resume length: ${words} words`,'',`Matched skills: ${matched.join(', ')||'None'}`,`Skills not found in CV: ${missing.join(', ')||'None'}`,'','RECOMMENDATIONS',...rec.map((r,i)=>`${i+1}. ${r}`),'','Rule-based browser analysis. Not an AI, ATS, or hiring prediction.'].join('\n');
 $('results').classList.remove('hidden');$('results').scrollIntoView({behavior:'smooth',block:'start'});
}
$('analyze').addEventListener('click',analyze);
$('resume').addEventListener('input',updateCounts);$('job').addEventListener('input',updateCounts);
$('clear').addEventListener('click',()=>{$('resume').value='';$('job').value='';$('message').textContent='';$('results').classList.add('hidden');report='';updateCounts();$('resume').focus();});
$('sample').addEventListener('click',()=>{$('resume').value=`Professional Summary\nCustomer service professional with two years of experience responding to customer inquiries and coordinating administrative tasks.\n\nExperience\nCustomer Service Assistant: Supported customers, collaborated with colleagues, communicated clearly, and maintained Excel spreadsheets for reporting. Helped with data analysis and tracked service requests.\n\nEducation\nBachelor's Degree in Business Administration.\n\nSkills\nMicrosoft Excel, Communication, Customer Service, Data Analysis, Teamwork, Project Management.`;$('job').value=`Customer Operations Analyst\nWe are seeking a candidate with strong customer service, communication, teamwork, Excel, data analysis, problem solving, and SQL skills. Responsibilities include supporting customers, preparing reports, investigating issues and collaborating across departments.`;$('results').classList.add('hidden');$('message').textContent='Example loaded. Tap Analyze compatibility.';updateCounts();});
$('printPdf').addEventListener('click',()=>{if(!report)return;window.print();});
$('download').addEventListener('click',()=>{if(!report)return;const blob=new Blob([report],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='resumepilot-v4-report.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);});
updateCounts();
