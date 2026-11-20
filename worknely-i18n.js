
/* Worknely — interface translations, v2.0. No external dependencies. */
(() => {
  'use strict';
  const byId = id => document.getElementById(id);
  const languages = {
    en: {
      hero:['Build your career.','Shape your future.'], eyebrow:'✦ YOUR CAREER, CONNECTED', description:'Create professional resumes, compare your skills with job requirements, and take your next career step with confidence.', build:'Build my resume', compare:'Analyze compatibility',
      studio:['Resume Writing Studio','Transform your experience into professional resume content. Use guided writing tools to highlight your real skills, achievements, and career potential.','Target role','Writing style','Verified experience','Verified skills','Create structured draft','Copy draft to Resume Builder','Guided writing templates, not generative AI. Review every statement and include only genuine qualifications.'],
      builder:['Create your ATS-friendly resume','Enter verified information. AI is not connected in this version.','Full name','Professional title','Contact (optional)','Education','Professional summary','Experience','Skills','Generate resume','Export resume PDF'],
      comparison:['Resume & job comparison','Compare your resume with job requirements and identify relevant skills and potential gaps.','Load example','Upload your resume (PDF or DOCX)','Your resume','Job description','Analyze compatibility','Clear all','Remove personal contact details before testing.','Include full requirements for better results.','Text-based PDF and DOCX files are supported. Scanned PDFs and legacy DOC files are not supported. Files are processed locally in your browser using parsing libraries loaded from a CDN.'],
      placeholders:['e.g. Customer Support Specialist','Describe your real duties and achievements.','e.g. Excel, customer service, CRM','Your name','Customer Support Specialist','Email · City · LinkedIn','Degrees and qualifications','Your professional background','Role, employer, dates and real achievements','Your actual skills','Paste your professional summary, experience, education and skills here...','Paste the job responsibilities, required skills and qualifications here...'], words:'words', messages:['Please enter both your resume and the job description.','No skills from our current dictionary were recognized in the job description. Try a more detailed job listing.','Example loaded. Tap Analyze compatibility.','Please enter a name to generate your resume.','Resume created. Review all information before exporting.']
    },
    ro: {
      hero:['Construiește-ți cariera.','Modelează-ți viitorul.'], eyebrow:'✦ CARIERA TA, NOI OPORTUNITĂȚI', description:'Creează CV-uri profesionale, compară-ți competențele cu cerințele angajatorilor și fă următorul pas în carieră cu încredere.', build:'Creează CV-ul meu', compare:'Analizează compatibilitatea',
      studio:['Atelier de redactare CV','Transformă-ți experiența în conținut profesional pentru CV. Folosește instrumentele de redactare ghidată pentru a evidenția competențele, realizările și potențialul tău profesional.','Rol vizat','Stil de redactare','Experiență verificată','Competențe reale','Creează un model structurat','Copiază în editorul CV','Șabloane de redactare ghidată, nu inteligență artificială generativă. Verifică fiecare afirmație și include doar calificări reale.'],
      builder:['Creează un CV cu structură ATS','Introdu informații reale. AI nu este conectat în această versiune.','Nume complet','Titlu profesional','Date de contact (opțional)','Educație','Rezumat profesional','Experiență profesională','Competențe','Generează CV-ul','Exportă CV PDF'],
      comparison:['Compară CV-ul cu jobul','Compară CV-ul cu cerințele postului și identifică abilitățile relevante și eventualele lacune.','Încarcă exemplu','Încarcă CV-ul (PDF sau DOCX)','CV-ul tău','Descrierea postului','Analizează compatibilitatea','Șterge tot','Elimină datele personale de contact înainte de testare.','Include toate cerințele relevante pentru rezultate mai bune.','Sunt acceptate PDF-uri cu text selectabil și fișiere DOCX. PDF-urile scanate și fișierele DOC vechi nu sunt acceptate. Fișierele sunt procesate local în browser, cu biblioteci încărcate prin CDN.'],
      placeholders:['ex. Specialist relații cu clienții','Descrie responsabilitățile și realizările tale reale.','ex. Excel, relații cu clienții, CRM','Numele tău','Specialist relații cu clienții','E-mail · Oraș · LinkedIn','Studii și calificări','Prezintă experiența ta profesională','Funcție, angajator, perioadă și realizări reale','Competențele tale reale','Introdu aici rezumatul profesional, experiența, studiile și competențele...','Introdu aici responsabilitățile, competențele și calificările cerute...'], words:'cuvinte', messages:['Introdu atât CV-ul, cât și descrierea postului.','Nu am identificat competențe din dicționarul actual în descrierea postului. Încearcă un anunț mai detaliat.','Exemplul a fost încărcat. Apasă Analizează compatibilitatea.','Introdu numele pentru a genera CV-ul.','CV-ul a fost creat. Verifică informațiile înainte de export.']
    },
    it: {
      hero:['Costruisci la tua carriera.','Dai forma al tuo futuro.'], eyebrow:'✦ LA TUA CARRIERA, CONNESSA', description:'Crea curriculum professionali, confronta le tue competenze con le offerte di lavoro e affronta il prossimo passo con fiducia.', build:'Crea il mio CV', compare:'Analizza la compatibilità',
      studio:['Laboratorio di scrittura CV','Trasforma la tua esperienza in contenuti professionali per il CV. Usa strumenti di scrittura guidata per valorizzare competenze e risultati reali.','Ruolo desiderato','Stile di scrittura','Esperienza verificata','Competenze reali','Crea una bozza strutturata','Copia nel generatore CV','Modelli di scrittura guidata, non IA generativa. Verifica ogni affermazione e inserisci solo qualifiche reali.'],
      builder:['Crea un CV adatto agli ATS','Inserisci informazioni verificate. L’IA non è collegata in questa versione.','Nome completo','Titolo professionale','Contatti (facoltativi)','Formazione','Profilo professionale','Esperienza professionale','Competenze','Genera CV','Esporta CV PDF'],
      comparison:['Confronto CV e lavoro','Confronta il CV con i requisiti del lavoro e individua competenze pertinenti e possibili lacune.','Carica esempio','Carica CV (PDF o DOCX)','Il tuo CV','Descrizione del lavoro','Analizza compatibilità','Cancella tutto','Rimuovi i dati di contatto personali prima del test.','Inserisci tutti i requisiti pertinenti.','Sono supportati PDF con testo selezionabile e DOCX. PDF scansionati e vecchi file DOC non sono supportati. I file vengono elaborati localmente nel browser con librerie caricate da CDN.'],
      placeholders:['es. Addetto assistenza clienti','Descrivi mansioni e risultati reali.','es. Excel, assistenza clienti, CRM','Il tuo nome','Addetto assistenza clienti','Email · Città · LinkedIn','Titoli di studio e qualifiche','Descrivi il tuo percorso professionale','Ruolo, azienda, date e risultati reali','Le tue competenze reali','Incolla qui profilo, esperienza, formazione e competenze...','Incolla qui responsabilità, competenze e qualifiche richieste...'], words:'parole', messages:['Inserisci sia il CV sia la descrizione del lavoro.','Nessuna competenza riconosciuta nella descrizione. Prova un annuncio più dettagliato.','Esempio caricato. Premi Analizza compatibilità.','Inserisci il nome per generare il CV.','CV creato. Verifica tutte le informazioni prima di esportarlo.']
    },
    de: {
      hero:['Gestalte deine Karriere.','Forme deine Zukunft.'], eyebrow:'✦ DEINE KARRIERE, VERNETZT', description:'Erstelle professionelle Lebensläufe, vergleiche deine Fähigkeiten mit Stellenanforderungen und plane deinen nächsten Karriereschritt.', build:'Lebenslauf erstellen', compare:'Übereinstimmung prüfen',
      studio:['Lebenslauf-Schreibstudio','Formuliere deine Erfahrungen professionell. Nutze angeleitete Schreibwerkzeuge, um echte Fähigkeiten und Erfolge hervorzuheben.','Zielposition','Schreibstil','Bestätigte Erfahrung','Nachgewiesene Fähigkeiten','Strukturierten Entwurf erstellen','In den Lebenslauf-Editor kopieren','Angeleitete Vorlagen, keine generative KI. Prüfe jede Aussage und verwende nur echte Qualifikationen.'],
      builder:['ATS-freundlichen Lebenslauf erstellen','Gib korrekte Angaben ein. KI ist hier noch nicht integriert.','Vollständiger Name','Berufsbezeichnung','Kontaktdaten (optional)','Ausbildung','Berufliches Profil','Berufserfahrung','Fähigkeiten','Lebenslauf erstellen','PDF exportieren'],
      comparison:['Lebenslauf und Stelle','Vergleiche deinen Lebenslauf mit Stellenanforderungen und erkenne relevante Fähigkeiten und mögliche Lücken.','Beispiel laden','Lebenslauf hochladen (PDF oder DOCX)','Dein Lebenslauf','Stellenbeschreibung','Übereinstimmung prüfen','Alles löschen','Entferne persönliche Kontaktdaten vor dem Test.','Füge alle relevanten Anforderungen hinzu.','PDF-Dateien mit auswählbarem Text und DOCX werden unterstützt. Gescannte PDFs und alte DOC-Dateien werden nicht unterstützt. Dateien werden lokal im Browser mit Bibliotheken von einem CDN verarbeitet.'],
      placeholders:['z. B. Kundenservice-Mitarbeiter','Beschreibe tatsächliche Aufgaben und Erfolge.','z. B. Excel, Kundenservice, CRM','Dein Name','Kundenservice-Mitarbeiter','E-Mail · Stadt · LinkedIn','Abschlüsse und Qualifikationen','Dein beruflicher Hintergrund','Position, Arbeitgeber, Zeitraum und echte Erfolge','Deine tatsächlichen Fähigkeiten','Füge hier Profil, Erfahrung, Ausbildung und Fähigkeiten ein...','Füge hier Aufgaben, erforderliche Fähigkeiten und Qualifikationen ein...'], words:'Wörter', messages:['Bitte Lebenslauf und Stellenbeschreibung eingeben.','Keine bekannten Fähigkeiten in der Stellenbeschreibung erkannt. Versuche eine detailliertere Anzeige.','Beispiel geladen. Klicke auf Übereinstimmung prüfen.','Bitte Namen eingeben, um den Lebenslauf zu erstellen.','Lebenslauf erstellt. Prüfe alle Angaben vor dem Export.']
    },
    fr: {
      hero:['Construisez votre carrière.','Façonnez votre avenir.'], eyebrow:'✦ VOTRE CARRIÈRE, CONNECTÉE', description:'Créez des CV professionnels, comparez vos compétences aux offres d’emploi et préparez votre prochaine étape avec confiance.', build:'Créer mon CV', compare:'Analyser la compatibilité',
      studio:['Atelier de rédaction de CV','Transformez votre expérience en contenu professionnel. Utilisez les outils de rédaction guidée pour valoriser vos compétences et réalisations réelles.','Poste visé','Style de rédaction','Expérience vérifiée','Compétences réelles','Créer un brouillon structuré','Copier dans l’éditeur de CV','Modèles de rédaction guidée, sans IA générative. Vérifiez chaque affirmation et indiquez uniquement des qualifications réelles.'],
      builder:['Créer un CV adapté aux ATS','Saisissez des informations exactes. L’IA n’est pas encore connectée.','Nom complet','Intitulé professionnel','Coordonnées (facultatif)','Formation','Résumé professionnel','Expérience professionnelle','Compétences','Créer le CV','Exporter en PDF'],
      comparison:['Comparaison CV et emploi','Comparez votre CV aux exigences du poste et identifiez les compétences pertinentes et les lacunes possibles.','Charger un exemple','Importer un CV (PDF ou DOCX)','Votre CV','Description du poste','Analyser la correspondance','Tout effacer','Retirez vos coordonnées personnelles avant le test.','Ajoutez toutes les exigences pertinentes.','Les PDF avec texte sélectionnable et les DOCX sont acceptés. Les PDF numérisés et anciens fichiers DOC ne sont pas pris en charge. Les fichiers sont traités localement dans le navigateur avec des bibliothèques chargées depuis un CDN.'],
      placeholders:['ex. Conseiller clientèle','Décrivez vos missions et réalisations réelles.','ex. Excel, service client, CRM','Votre nom','Conseiller clientèle','E-mail · Ville · LinkedIn','Diplômes et qualifications','Votre parcours professionnel','Poste, employeur, dates et réalisations réelles','Vos compétences réelles','Collez ici votre profil, expérience, formation et compétences...','Collez ici les missions, compétences et qualifications demandées...'], words:'mots', messages:['Saisissez le CV et la description du poste.','Aucune compétence reconnue dans la description. Essayez une offre plus détaillée.','Exemple chargé. Cliquez sur Analyser la correspondance.','Saisissez votre nom pour créer le CV.','CV créé. Vérifiez les informations avant l’exportation.']
    },
    es: {
      hero:['Construye tu carrera.','Da forma a tu futuro.'], eyebrow:'✦ TU CARRERA, CONECTADA', description:'Crea currículums profesionales, compara tus habilidades con los requisitos laborales y avanza en tu carrera con confianza.', build:'Crear mi currículum', compare:'Analizar compatibilidad',
      studio:['Estudio de redacción de CV','Convierte tu experiencia en contenido profesional. Usa herramientas de redacción guiada para destacar habilidades y logros reales.','Puesto objetivo','Estilo de redacción','Experiencia verificada','Habilidades reales','Crear borrador estructurado','Copiar al editor de CV','Plantillas de redacción guiada, no IA generativa. Revisa cada afirmación e incluye solo cualificaciones reales.'],
      builder:['Crear un CV compatible con ATS','Introduce datos reales. La IA aún no está conectada.','Nombre completo','Título profesional','Contacto (opcional)','Formación','Resumen profesional','Experiencia profesional','Habilidades','Generar CV','Exportar PDF'],
      comparison:['Comparación de CV y empleo','Compara tu currículum con los requisitos del puesto e identifica habilidades relevantes y posibles carencias.','Cargar ejemplo','Subir CV (PDF o DOCX)','Tu currículum','Descripción del puesto','Analizar compatibilidad','Borrar todo','Elimina los datos de contacto personales antes de probar.','Incluye todos los requisitos relevantes.','Se admiten PDF con texto seleccionable y DOCX. No se admiten PDF escaneados ni archivos DOC antiguos. Los archivos se procesan localmente en el navegador mediante bibliotecas cargadas desde una CDN.'],
      placeholders:['ej. Especialista en atención al cliente','Describe tus funciones y logros reales.','ej. Excel, atención al cliente, CRM','Tu nombre','Especialista en atención al cliente','Correo · Ciudad · LinkedIn','Estudios y cualificaciones','Tu trayectoria profesional','Puesto, empresa, fechas y logros reales','Tus habilidades reales','Pega aquí perfil, experiencia, formación y habilidades...','Pega aquí funciones, habilidades y cualificaciones requeridas...'], words:'palabras', messages:['Introduce el CV y la descripción del puesto.','No se reconocieron habilidades del diccionario en la descripción. Prueba con una oferta más detallada.','Ejemplo cargado. Pulsa Analizar compatibilidad.','Introduce un nombre para generar el CV.','CV creado. Revisa la información antes de exportarlo.']
    }
  };
  const set = (selector, value) => {
    const element = document.querySelector(selector);
    if (element && value != null) element.textContent = value;
  };
  const placeholder = (id, value) => { const el = byId(id); if (el) el.placeholder = value; };
  const fieldLabel = (id, value) => {
    const el = byId(id);
    const label = el?.closest('label') || document.querySelector(`label[for="${id}"]`);
    if (!label) return;
    const node = [...label.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
    if (node) node.textContent = value + ' ';
    else {
      const span = label.querySelector('span:first-child, strong:first-child');
      if (span) span.textContent = value;
    }
  };
  const findSection = (id, selector) => {
    const el = byId(id);
    return el?.closest('section') || document.querySelector(selector);
  };
  function translate() {
    const lang = byId('language')?.value || 'en';
    const t = languages[lang] || languages.en;
    const hero = byId('worknelyHeroTitle');
    if (hero) {
      const em = document.createElement('em'); em.textContent = t.hero[1];
      hero.replaceChildren(document.createTextNode(t.hero[0] + ' '), em);
    }
    set('.hero .eyebrow', t.eyebrow);
    set('.hero > p', t.description);
    set('.hero-actions a[href="#builder"]', t.build);
    set('.hero-actions a[href="#comparison"]', t.compare);
    const studio = findSection('studioRole', '#studio');
    if (studio) {
      const head = studio.querySelector('.section-head');
      if (head) { setWithin(head, 'h2', t.studio[0]); setWithin(head, 'p', t.studio[1]); }
      ['studioRole','studioStyle','studioExperience','studioSkills'].forEach((id,i)=>fieldLabel(id,t.studio[i+2]));
      setWithin(studio, '#generateDraft', t.studio[6]);
      setWithin(studio, '#copyDraft', t.studio[7]);
      setWithin(studio, '.disclaimer', t.studio[8]);
    }
    const builder = findSection('bName', '#builder');
    if (builder) {
      const head = builder.querySelector('.section-head');
      if (head) { setWithin(head, 'h2', t.builder[0]); setWithin(head, 'p', t.builder[1]); }
      ['bName','bTitle','bContact','bEducation','bSummary','bExperience','bSkills'].forEach((id,i)=>fieldLabel(id,t.builder[i+2]));
    }
    set('#buildResume', t.builder[9]); set('#exportResume', t.builder[10]);
    const comparison = findSection('resume', '#comparison');
    if (comparison) {
      const head = comparison.querySelector('.section-head');
      if (head) { setWithin(head, 'h2', t.comparison[0]); setWithin(head, 'p', t.comparison[1]); }
    }
    set('#sample', t.comparison[2]);
    const uploadLabel = document.querySelector('label[for="resumeFile"]');
    if (uploadLabel && !uploadLabel.querySelector('input')) uploadLabel.textContent = t.comparison[3];
    set('label[for="resume"] strong', t.comparison[4]);
    set('label[for="job"] strong', t.comparison[5]);
    set('#analyze', t.comparison[6] + ' →');
    set('#clear', t.comparison[7]);
    set('#resume + .field-foot span:first-child', t.comparison[8]);
    set('#job + .field-foot span:first-child', t.comparison[9]);
    const status = byId('fileStatus');
    if (status && (!status.dataset.dynamic) && (!status.dataset.worknelyBusy)) {
      const previous = Object.values(languages).some(v=>status.textContent.trim()===v.comparison[10]);
      if (!status.dataset.worknelyOriginal) status.dataset.worknelyOriginal = status.textContent.trim();
      if (previous || status.textContent.trim()===status.dataset.worknelyOriginal) status.textContent=t.comparison[10];
    }
    const placeholders = ['studioRole','studioExperience','studioSkills','bName','bTitle','bContact','bEducation','bSummary','bExperience','bSkills','resume','job'];
    placeholders.forEach((id,i)=>placeholder(id,t.placeholders[i]));
    const counts = [['resumeWords','resume'],['jobWords','job']];
    counts.forEach(([countId,inputId])=>{
      const output=byId(countId), input=byId(inputId);
      if (!output || !input) return;
      const value=input.value.trim();
      output.textContent=(value ? value.split(/\s+/).length : 0)+' '+t.words;
    });
    document.documentElement.lang = lang;
  }
  function setWithin(parent, selector, value) {
    const node = parent?.querySelector(selector);
    if (node) node.textContent=value;
  }
  function init() {
    const selector=byId('language'); if (!selector) return;
    // Defer until other deferred scripts have installed their own initial translations.
    translate();
    selector.addEventListener('change', () => queueMicrotask(translate));
    ['resume','job'].forEach(id=>byId(id)?.addEventListener('input',()=>queueMicrotask(translate)));
    // Preserve the existing application's functionality and avoid rewriting dynamic results.
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
