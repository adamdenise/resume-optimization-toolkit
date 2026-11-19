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
let report='',lastResult=null;
const sectionPatterns={
 'Professional summary':/^(?:professional\s+summary|summary|profile|about me|objective)\s*:?\s*$/im,
 'Experience':/^(?:work\s+experience|professional\s+experience|experience|employment|work history)\s*:?\s*$/im,
 'Education':/^(?:education|academic background|qualifications)\s*:?\s*$/im,
 'Skills':/^(?:skills|key skills|technical skills|core competencies|competencies)\s*:?\s*$/im
};
function reviewStructure(resume){const area=$('structureFindings');area.replaceChildren();const findings=[];Object.entries(sectionPatterns).forEach(([label,pattern])=>{const found=pattern.test(resume);findings.push({label,found});const item=document.createElement('div');item.className='structure-item '+(found?'found':'review');item.textContent=(found?'✓ ':'○ ')+label+(found?' — heading detected':' — heading not clearly identified');area.append(item);});return findings;}
function analyze(){const resume=$('resume').value.trim(),job=$('job').value.trim();if(!resume||!job){$('message').textContent='Please enter both your resume and the job description.';$('results').classList.add('hidden');return;}
 const jobSkills=findSkills(job),resumeSkills=findSkills(resume);if(!jobSkills.length){$('message').textContent='No skills from our current dictionary were recognized in the job description. Try a more detailed job listing.';$('results').classList.add('hidden');return;}
 const matched=jobSkills.filter(x=>resumeSkills.includes(x)),missing=jobSkills.filter(x=>!resumeSkills.includes(x));const score=Math.round(matched.length/jobSkills.length*100),words=countWords(resume);
 $('message').textContent='';$('exportMessage').textContent='';$('score').textContent=score+'%';$('ring').style.setProperty('--score',score);$('matchedCount').textContent=matched.length;$('missingCount').textContent=missing.length;$('wordCount').textContent=words+' words';renderChips('matched',matched);renderChips('missing',missing,true);const findings=reviewStructure(resume);
 const rec=[];if(missing.length)rec.push('If you genuinely have these skills, add concrete evidence of where you used them: '+missing.join(', ')+'.');else rec.push('All recognized job skills appear in your resume. Verify that your examples demonstrate your actual experience.');
 rec.push('Support relevant skills with specific achievements, responsibilities, and measurable results when available.');if(words<150)rec.push('Your resume text is short. Consider adding relevant work examples, education, and outcomes.');rec.push('Read the complete job description manually. Keyword matching cannot assess seniority, qualifications, proficiency, or overall fit.');
 const list=$('recommendations');list.replaceChildren();rec.forEach(r=>{const li=document.createElement('li');li.textContent=r;list.append(li);});
 lastResult={score,words,matched,missing,findings,rec};report=['RESUMEPILOT - V4.2 COMPATIBILITY REPORT','',`Estimated keyword match: ${score}% (not ATS score)`,`Resume length: ${words} words`,'',`Matched skills: ${matched.join(', ')||'None'}`,`Skills not found in CV: ${missing.join(', ')||'None'}`,'','CV STRUCTURE REVIEW',...findings.map(f=>`${f.label}: ${f.found?'Heading detected':'Heading not clearly identified'}`),'','RECOMMENDATIONS',...rec.map((r,i)=>`${i+1}. ${r}`),'','Rule-based browser analysis. Not an AI, ATS, or hiring prediction.'].join('\n');
 $('results').classList.remove('hidden');$('results').scrollIntoView({behavior:'smooth',block:'start'});
}
// Minimal dependency-free PDF generator. All data stays on the device.
function pdfAscii(s){return s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^\x20-\x7E]/g,'-');}
function pdfEscape(s){return pdfAscii(s).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');}
function wrapLine(text,max=91){const words=pdfAscii(text).split(/\s+/),out=[];let line='';for(const word of words){if((line+' '+word).trim().length>max&&line){out.push(line);line=word;}else line=(line+' '+word).trim();}out.push(line);return out;}
function buildPdf(data){
 const lines=[['ResumePilot | Compatibility Report',18],['V4.2 Premium  -  Private browser analysis',10],['',11],[`Estimated keyword match: ${data.score}%`,14],['This is not an ATS score or hiring prediction.',10],[`Resume length: ${data.words} words`,11],['',11],['MATCHED SKILLS',13],...(data.matched.length?data.matched:['None']).flatMap(s=>wrapLine('- '+s).map(t=>[t,11])),['',11],['SKILLS TO REVIEW',13],...(data.missing.length?data.missing:['None']).flatMap(s=>wrapLine('- '+s).map(t=>[t,11])),['',11],['CV STRUCTURE REVIEW',13],...data.findings.flatMap(f=>wrapLine('- '+f.label+': '+(f.found?'Heading detected':'Heading not clearly identified')).map(t=>[t,11])),['',11],['RECOMMENDATIONS',13],...data.rec.flatMap((s,i)=>wrapLine((i+1)+'. '+s).map(t=>[t,11])),['',11],['Rule-based keyword comparison; verify all claims manually.',10]];
 const pages=[];let page=[],y=790;for(const [line,size] of lines){const step=size>=14?25:17;if(y-step<58){pages.push(page);page=[];y=790;}page.push({line,size,y});y-=step;}if(page.length)pages.push(page);
 const objects=[null];const add=s=>{objects.push(s);return objects.length-1;};const catalog=add(''),pagesId=add(''),font=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');const pageIds=[];
 for(const p of pages){const stream=p.map(({line,size,y})=>`BT /F1 ${size} Tf 48 ${y} Td (${pdfEscape(line)}) Tj ET`).join('\n');const content=add(`<< /Length ${new TextEncoder().encode(stream).length} >>\nstream\n${stream}\nendstream`);pageIds.push(add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${font} 0 R >> >> /Contents ${content} 0 R >>`));}
 objects[catalog]=`<< /Type /Catalog /Pages ${pagesId} 0 R >>`;objects[pagesId]=`<< /Type /Pages /Kids [${pageIds.map(id=>id+' 0 R').join(' ')}] /Count ${pageIds.length} >>`;
 let pdf='%PDF-1.4\n';const offsets=[0];const encoder=new TextEncoder();for(let i=1;i<objects.length;i++){offsets.push(encoder.encode(pdf).length);pdf+=`${i} 0 obj\n${objects[i]}\nendobj\n`;}
 const xref=encoder.encode(pdf).length;pdf+=`xref\n0 ${objects.length}\n0000000000 65535 f \n`;for(let i=1;i<objects.length;i++)pdf+=`${String(offsets[i]).padStart(10,'0')} 00000 n \n`;pdf+=`trailer\n<< /Size ${objects.length} /Root ${catalog} 0 R >>\nstartxref\n${xref}\n%%EOF`;
 return new Blob([encoder.encode(pdf)],{type:'application/pdf'});
}
function saveBlob(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);}
$('analyze').addEventListener('click',analyze);
$('resume').addEventListener('input',updateCounts);$('job').addEventListener('input',updateCounts);
$('clear').addEventListener('click',()=>{$('resume').value='';$('job').value='';$('message').textContent='';$('exportMessage').textContent='';$('results').classList.add('hidden');report='';lastResult=null;updateCounts();$('resume').focus();});
$('sample').addEventListener('click',()=>{$('resume').value=`Professional Summary\nCustomer service professional with two years of experience responding to customer inquiries and coordinating administrative tasks.\n\nExperience\nCustomer Service Assistant: Supported customers, collaborated with colleagues, communicated clearly, and maintained Excel spreadsheets for reporting. Helped with data analysis and tracked service requests.\n\nEducation\nBachelor's Degree in Business Administration.\n\nSkills\nMicrosoft Excel, Communication, Customer Service, Data Analysis, Teamwork, Project Management.`;$('job').value=`Customer Operations Analyst\nWe are seeking a candidate with strong customer service, communication, teamwork, Excel, data analysis, problem solving, and SQL skills. Responsibilities include supporting customers, preparing reports, investigating issues and collaborating across departments.`;$('results').classList.add('hidden');$('message').textContent='Example loaded. Tap Analyze compatibility.';updateCounts();});
$('printPdf').addEventListener('click',()=>{if(!lastResult)return;try{const blob=buildPdf(lastResult);saveBlob(blob,'resumepilot-v4.2-report.pdf');$('exportMessage').textContent='PDF generated. On iPhone, check Safari Downloads or use Share > Save to Files. If this browser blocks downloads, open the site directly in Safari.';}catch(e){$('exportMessage').textContent='PDF generation failed. Please open the site in Safari and retry.';console.error(e);}});
$('download').addEventListener('click',()=>{if(!report)return;saveBlob(new Blob([report],{type:'text/plain;charset=utf-8'}),'resumepilot-v4.2-report.txt');});
updateCounts();
