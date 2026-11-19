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
 $('message').textContent='';$('exportMessage').textContent='';$('score').textContent=score+'%';$('ring').style.setProperty('--score',score);$('matchedCount').textContent=matched.length;$('missingCount').textContent=missing.length;$('wordCount').textContent=words+' words';renderChips('matched',matched);renderChips('missing',missing,true);const findings=reviewStructure(resume);const ats=updateATS(resume,score,findings);
 const rec=[];if(missing.length)rec.push('If you genuinely have these skills, add concrete evidence of where you used them: '+missing.join(', ')+'.');else rec.push('All recognized job skills appear in your resume. Verify that your examples demonstrate your actual experience.');
 rec.push('Support relevant skills with specific achievements, responsibilities, and measurable results when available.');if(words<150)rec.push('Your resume text is short. Consider adding relevant work examples, education, and outcomes.');rec.push('Read the complete job description manually. Keyword matching cannot assess seniority, qualifications, proficiency, or overall fit.');
 const list=$('recommendations');list.replaceChildren();rec.forEach(r=>{const li=document.createElement('li');li.textContent=r;list.append(li);});
 lastResult={score,words,matched,missing,findings,rec,ats};report=['RESUMEPILOT - V4.3 COMPATIBILITY REPORT','',`Estimated keyword match: ${score}% (not ATS score)`,`Resume length: ${words} words`,`Estimated ATS readiness: ${ats}% (heuristic, not official)`,'',`Matched skills: ${matched.join(', ')||'None'}`,`Skills not found in CV: ${missing.join(', ')||'None'}`,'','CV STRUCTURE REVIEW',...findings.map(f=>`${f.label}: ${f.found?'Heading detected':'Heading not clearly identified'}`),'','RECOMMENDATIONS',...rec.map((r,i)=>`${i+1}. ${r}`),'','Rule-based browser analysis. Not an AI, ATS, or hiring prediction.'].join('\n');
 $('results').classList.remove('hidden');$('results').scrollIntoView({behavior:'smooth',block:'start'});
}
// Minimal dependency-free PDF generator. All data stays on the device.
function pdfAscii(s){return s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^\x20-\x7E]/g,'-');}
function pdfEscape(s){return pdfAscii(s).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');}
function wrapLine(text,max=91){const words=pdfAscii(text).split(/\s+/),out=[];let line='';for(const word of words){if((line+' '+word).trim().length>max&&line){out.push(line);line=word;}else line=(line+' '+word).trim();}out.push(line);return out;}
function buildPdf(data){
 const lines=[['ResumePilot | Compatibility Report',18],['V4.3 Premium  -  Private browser analysis',10],['',11],[`Estimated keyword match: ${data.score}%`,14],[`Estimated ATS readiness: ${data.ats}% (heuristic, not official)`,10],['Not a verified ATS score or hiring prediction.',10],[`Resume length: ${data.words} words`,11],['',11],['MATCHED SKILLS',13],...(data.matched.length?data.matched:['None']).flatMap(s=>wrapLine('- '+s).map(t=>[t,11])),['',11],['SKILLS TO REVIEW',13],...(data.missing.length?data.missing:['None']).flatMap(s=>wrapLine('- '+s).map(t=>[t,11])),['',11],['CV STRUCTURE REVIEW',13],...data.findings.flatMap(f=>wrapLine('- '+f.label+': '+(f.found?'Heading detected':'Heading not clearly identified')).map(t=>[t,11])),['',11],['RECOMMENDATIONS',13],...data.rec.flatMap((s,i)=>wrapLine((i+1)+'. '+s).map(t=>[t,11])),['',11],['Rule-based keyword comparison; verify all claims manually.',10]];
 const pages=[];let page=[],y=790;for(const [line,size] of lines){const step=size>=14?25:17;if(y-step<58){pages.push(page);page=[];y=790;}page.push({line,size,y});y-=step;}if(page.length)pages.push(page);
 const objects=[null];const add=s=>{objects.push(s);return objects.length-1;};const catalog=add(''),pagesId=add(''),font=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');const pageIds=[];
 for(const p of pages){const stream=p.map(({line,size,y})=>`BT /F1 ${size} Tf 48 ${y} Td (${pdfEscape(line)}) Tj ET`).join('\n');const content=add(`<< /Length ${new TextEncoder().encode(stream).length} >>\nstream\n${stream}\nendstream`);pageIds.push(add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${font} 0 R >> >> /Contents ${content} 0 R >>`));}
 objects[catalog]=`<< /Type /Catalog /Pages ${pagesId} 0 R >>`;objects[pagesId]=`<< /Type /Pages /Kids [${pageIds.map(id=>id+' 0 R').join(' ')}] /Count ${pageIds.length} >>`;
 let pdf='%PDF-1.4\n';const offsets=[0];const encoder=new TextEncoder();for(let i=1;i<objects.length;i++){offsets.push(encoder.encode(pdf).length);pdf+=`${i} 0 obj\n${objects[i]}\nendobj\n`;}
 const xref=encoder.encode(pdf).length;pdf+=`xref\n0 ${objects.length}\n0000000000 65535 f \n`;for(let i=1;i<objects.length;i++)pdf+=`${String(offsets[i]).padStart(10,'0')} 00000 n \n`;pdf+=`trailer\n<< /Size ${objects.length} /Root ${catalog} 0 R >>\nstartxref\n${xref}\n%%EOF`;
 return new Blob([encoder.encode(pdf)],{type:'application/pdf'});
}

async function saveBlob(blob, name) {
  const file = new File([blob], name, {
    type: blob.type || 'application/pdf'
  });

  if (
    navigator.canShare &&
    navigator.share &&
    navigator.canShare({ files: [file] })
  ) {
    try {
      await navigator.share({ files: [file] });
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
      console.warn('Share failed:', error);
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

$('analyze').addEventListener('click',analyze);
$('resume').addEventListener('input',updateCounts);$('job').addEventListener('input',updateCounts);
$('clear').addEventListener('click',()=>{$('resume').value='';$('job').value='';$('message').textContent='';$('exportMessage').textContent='';$('results').classList.add('hidden');report='';lastResult=null;updateCounts();$('resume').focus();});
$('sample').addEventListener('click',()=>{$('resume').value=`Professional Summary\nCustomer service professional with two years of experience responding to customer inquiries and coordinating administrative tasks.\n\nExperience\nCustomer Service Assistant: Supported customers, collaborated with colleagues, communicated clearly, and maintained Excel spreadsheets for reporting. Helped with data analysis and tracked service requests.\n\nEducation\nBachelor's Degree in Business Administration.\n\nSkills\nMicrosoft Excel, Communication, Customer Service, Data Analysis, Teamwork, Project Management.`;$('job').value=`Customer Operations Analyst\nWe are seeking a candidate with strong customer service, communication, teamwork, Excel, data analysis, problem solving, and SQL skills. Responsibilities include supporting customers, preparing reports, investigating issues and collaborating across departments.`;$('results').classList.add('hidden');$('message').textContent='Example loaded. Tap Analyze compatibility.';updateCounts();});
$('printPdf').addEventListener('click',()=>{if(!lastResult)return;try{const blob=buildPdf(lastResult);saveBlob(blob,'resumepilot-v4.2-report.pdf');$('exportMessage').textContent='PDF generated. On iPhone, check Safari Downloads or use Share > Save to Files. If this browser blocks downloads, open the site directly in Safari.';}catch(e){$('exportMessage').textContent='PDF generation failed. Please open the site in Safari and retry.';console.error(e);}});
$('download').addEventListener('click',()=>{if(!report)return;saveBlob(new Blob([report],{type:'text/plain;charset=utf-8'}),'resumepilot-v4.2-report.txt');});
updateCounts();


// V4.3 — Readiness heuristic, explicitly not an official ATS score.
function updateATS(resume,keywordScore,findings){
 const structure=Math.round(findings.filter(f=>f.found).length/findings.length*100);
 const evidence=/(?:\b\d+(?:[.,]\d+)?%|\b\d+\s+(?:clients|projects|customers|reports|cases|years)\b|increased|reduced|improved|delivered|managed)/i.test(resume)?100:30;
 const ats=Math.round(keywordScore*.55+structure*.30+evidence*.15);
 $('atsScore').textContent=ats+'/100';const box=$('atsFactors');box.replaceChildren();
 for(const [label,value] of [['Job skill coverage',keywordScore],['Section headings',structure],['Achievement evidence (rough signal)',evidence]]){const div=document.createElement('div');div.className='structure-item';div.textContent=label+': '+value+'/100';box.append(div);}
 return ats;
}
// Text-only PDF parser via PDF.js; DOCX via Mammoth. Both run in-browser.
function loadExternal(url){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=url;s.onload=resolve;s.onerror=()=>reject(new Error('Library unavailable'));document.head.append(s);});}
$('resumeFile').addEventListener('change',async event=>{const file=event.target.files?.[0];if(!file)return;const status=$('fileStatus');status.textContent='Reading '+file.name+'...';try{let value='';const lower=file.name.toLowerCase();
 if(lower.endsWith('.pdf')){if(!window.pdfjsLib)await loadExternal('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js');pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';const doc=await pdfjsLib.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;for(let i=1;i<=doc.numPages;i++){const page=await doc.getPage(i);const content=await page.getTextContent();value+=content.items.map(x=>x.str).join(' ')+'\n';}}
 else if(lower.endsWith('.docx')){if(!window.mammoth)await loadExternal('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.8.0/mammoth.browser.min.js');value=(await mammoth.extractRawText({arrayBuffer:await file.arrayBuffer()})).value;}
 else throw new Error('Legacy DOC is not supported. Please convert it to DOCX.');
 if(!value.trim())throw new Error('No selectable text found. Scanned PDFs require OCR.');$('resume').value=value;updateCounts();status.textContent='Imported '+file.name+' locally. Review the extracted text before analyzing.';
 }catch(error){status.textContent='Import failed: '+error.message+' No data was uploaded to ResumePilot.';}event.target.value='';});
function makeResume(){const get=id=>$(id).value.trim();const name=get('bName'),title=get('bTitle');if(!name){$('builderMessage').textContent='Please enter a name to generate your resume.';return '';}const blocks=[name.toUpperCase(),title,get('bContact'),'','PROFESSIONAL SUMMARY',get('bSummary'),'','EXPERIENCE',get('bExperience'),'','EDUCATION',get('bEducation'),'','SKILLS',get('bSkills')];const output=blocks.join('\n').replace(/\n{3,}/g,'\n\n');$('builderPreview').textContent=output;$('resume').value=output;updateCounts();$('builderMessage').textContent='Resume created. Review all information before exporting.';return output;}
$('buildResume').addEventListener('click',makeResume);
$('exportResume').addEventListener('click',()=>{const content=makeResume();if(!content)return;try{const lines=content.split('\n').map(s=>[s,11]);const data={score:0,ats:0,words:countWords(content),matched:[],missing:[],findings:[],rec:[]};const blob=buildPlainPdf(lines,'ResumePilot | Professional Resume');saveBlob(blob,'resumepilot-resume-v4.3.pdf');$('builderMessage').textContent='PDF generated. Check Safari Downloads or Save to Files.';}catch(e){$('builderMessage').textContent='PDF export failed: '+e.message;}});
function buildPlainPdf(lines,title){const all=[[title,18],['',11],...lines.flatMap(([s,z])=>wrapLine(s,82).map(t=>[t,z]))];const pages=[];let page=[],y=790;for(const [line,size] of all){const step=size>=14?25:17;if(y-step<58){pages.push(page);page=[];y=790;}page.push({line,size,y});y-=step;}if(page.length)pages.push(page);const objects=[null];const add=s=>{objects.push(s);return objects.length-1;};const catalog=add(''),pagesId=add(''),font=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'),pageIds=[];for(const p of pages){const stream=p.map(({line,size,y})=>`BT /F1 ${size} Tf 48 ${y} Td (${pdfEscape(line)}) Tj ET`).join('\n');const content=add(`<< /Length ${new TextEncoder().encode(stream).length} >>\nstream\n${stream}\nendstream`);pageIds.push(add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${font} 0 R >> >> /Contents ${content} 0 R >>`));}objects[catalog]=`<< /Type /Catalog /Pages ${pagesId} 0 R >>`;objects[pagesId]=`<< /Type /Pages /Kids [${pageIds.map(id=>id+' 0 R').join(' ')}] /Count ${pageIds.length} >>`;let pdf='%PDF-1.4\n';const offsets=[0],encoder=new TextEncoder();for(let i=1;i<objects.length;i++){offsets.push(encoder.encode(pdf).length);pdf+=`${i} 0 obj\n${objects[i]}\nendobj\n`;}const xref=encoder.encode(pdf).length;pdf+=`xref\n0 ${objects.length}\n0000000000 65535 f \n`;for(let i=1;i<objects.length;i++)pdf+=`${String(offsets[i]).padStart(10,'0')} 00000 n \n`;pdf+=`trailer\n<< /Size ${objects.length} /Root ${catalog} 0 R >>\nstartxref\n${xref}\n%%EOF`;return new Blob([encoder.encode(pdf)],{type:'application/pdf'});}

const translations={
 en:['Make your resume work smarter.','Compare your resume with a job description.','Resume & job comparison','Load example','Analyze compatibility','Clear all','Create your ATS-friendly resume','Enter verified information. AI is not connected in this version.','Generate resume','Export resume PDF','Upload your resume (PDF or DOCX)','Estimated ATS readiness'],
 ro:['Creează un CV mai eficient.','Compară CV-ul cu descrierea unui post.','Compară CV-ul cu jobul','Încarcă exemplu','Analizează compatibilitatea','Șterge tot','Creează un CV cu structură ATS','Introdu informații reale. AI nu este conectat în această versiune.','Generează CV-ul','Exportă CV PDF','Încarcă CV-ul (PDF sau DOCX)','Pregătire ATS estimată'],
 it:['Crea un CV più efficace.','Confronta il CV con un annuncio di lavoro.','Confronto CV e lavoro','Carica esempio','Analizza compatibilità','Cancella tutto','Crea un CV adatto agli ATS','Inserisci dati verificati. L’AI non è collegata in questa versione.','Genera CV','Esporta CV PDF','Carica CV (PDF o DOCX)','Preparazione ATS stimata'],
 de:['Erstelle einen überzeugenden Lebenslauf.','Vergleiche deinen Lebenslauf mit einer Stellenanzeige.','Lebenslauf und Stelle','Beispiel laden','Übereinstimmung prüfen','Alles löschen','ATS-freundlichen Lebenslauf erstellen','Gib korrekte Angaben ein. KI ist hier noch nicht integriert.','Lebenslauf erstellen','PDF exportieren','Lebenslauf hochladen (PDF oder DOCX)','Geschätzte ATS-Eignung'],
 fr:['Créez un CV plus efficace.','Comparez votre CV avec une offre d’emploi.','Comparaison CV et emploi','Charger un exemple','Analyser la correspondance','Tout effacer','Créer un CV adapté aux ATS','Saisissez des informations exactes. L’IA n’est pas encore connectée.','Créer le CV','Exporter en PDF','Importer un CV (PDF ou DOCX)','Préparation ATS estimée'],
 es:['Crea un currículum más eficaz.','Compara tu currículum con una oferta de empleo.','Comparación de CV y empleo','Cargar ejemplo','Analizar compatibilidad','Borrar todo','Crear un CV compatible con ATS','Introduce datos reales. La IA aún no está conectada.','Generar CV','Exportar PDF','Subir CV (PDF o DOCX)','Preparación ATS estimada']};
const translationKeys=['heroTitle','heroDescription','workspaceTitle','sample','analyze','clear','builderTitle','builderIntro','buildResume','exportResume','uploadLabel','atsHeading'];
function setLanguage(code){const arr=translations[code]||translations.en;translationKeys.forEach((key,i)=>{const el=document.querySelector('[data-i18n="'+key+'"]');if(!el)return;if(key==='heroTitle')el.textContent=arr[i];else if(key==='analyze')el.textContent=arr[i]+' →';else el.textContent=arr[i];});document.documentElement.lang=code;}
$('language').addEventListener('change',e=>setLanguage(e.target.value));setLanguage('en');
