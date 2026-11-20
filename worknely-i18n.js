
/* Worknely — multilingual interface extension */
(() => {
  'use strict';

  const $ = id => document.getElementById(id);

  const text = {
    en: {
      hero: 'Build your career. <em>Shape your future.</em>',
      eyebrow: '✦ YOUR CAREER, CONNECTED',
      description: 'Create professional resumes, compare your skills with job requirements, and take your next career step with confidence.',
      build: 'Build my resume',
      compare: 'Analyze compatibility',
      name: 'Full name',
      title: 'Professional title',
      contact: 'Contact (optional)',
      education: 'Education',
      summary: 'Professional summary',
      experience: 'Experience',
      skills: 'Skills',
      rolePlaceholder: 'e.g. Customer Support Specialist',
      experiencePlaceholder: 'Describe your real duties and achievements.',
      skillsPlaceholder: 'e.g. Excel, customer service, CRM',
      namePlaceholder: 'Your name',
      summaryPlaceholder: 'Your professional background',
      educationPlaceholder: 'Degrees and qualifications',
      jobDescription: 'Job description',
      yourResume: 'Your resume',
      comparisonDescription: 'Compare your resume with job requirements and identify relevant skills and potential gaps.',
      resumeHint: 'Remove personal contact details before testing.',
      jobHint: 'Include full requirements for better results.',
      fileHint: 'Text-based PDF and DOCX files are supported. Scanned PDFs and legacy DOC files are not supported. Files are processed locally in your browser.',
      words: 'words'
    },
    ro: {
      hero: 'Construiește-ți cariera. <em>Modelează-ți viitorul.</em>',
      eyebrow: '✦ CARIERA TA, NOI OPORTUNITĂȚI',
      description: 'Creează CV-uri profesionale, compară-ți competențele cu cerințele angajatorilor și fă următorul pas în carieră cu încredere.',
      build: 'Creează CV-ul meu',
      compare: 'Analizează compatibilitatea',
      name: 'Nume complet',
      title: 'Titlu profesional',
      contact: 'Date de contact (opțional)',
      education: 'Educație',
      summary: 'Rezumat profesional',
      experience: 'Experiență profesională',
      skills: 'Competențe',
      rolePlaceholder: 'ex. Specialist relații cu clienții',
      experiencePlaceholder: 'Descrie responsabilitățile și realizările tale reale.',
      skillsPlaceholder: 'ex. Excel, relații cu clienții, CRM',
      namePlaceholder: 'Numele tău',
      summaryPlaceholder: 'Prezintă experiența ta profesională',
      educationPlaceholder: 'Studii și calificări',
      jobDescription: 'Descrierea postului',
      yourResume: 'CV-ul tău',
      comparisonDescription: 'Compară CV-ul cu cerințele postului și identifică abilitățile relevante și competențele care merită analizate.',
      resumeHint: 'Elimină datele personale de contact înainte de testare.',
      jobHint: 'Include toate cerințele relevante pentru rezultate mai bune.',
      fileHint: 'Sunt acceptate fișiere PDF cu text selectabil și DOCX. PDF-urile scanate și fișierele DOC vechi nu sunt acceptate. Fișierele sunt procesate local în browser.',
      words: 'cuvinte'
    },
    it: {
      hero: 'Costruisci la tua carriera. <em>Dai forma al tuo futuro.</em>',
      eyebrow: '✦ LA TUA CARRIERA, CONNESSA',
      description: 'Crea curriculum professionali, confronta le tue competenze con le offerte di lavoro e affronta il prossimo passo con fiducia.',
      build: 'Crea il mio CV',
      compare: 'Analizza la compatibilità',
      name: 'Nome completo',
      title: 'Titolo professionale',
      contact: 'Contatti (facoltativi)',
      education: 'Formazione',
      summary: 'Profilo professionale',
      experience: 'Esperienza professionale',
      skills: 'Competenze',
      rolePlaceholder: 'es. Addetto assistenza clienti',
      experiencePlaceholder: 'Descrivi mansioni e risultati reali.',
      skillsPlaceholder: 'es. Excel, assistenza clienti, CRM',
      namePlaceholder: 'Il tuo nome',
      summaryPlaceholder: 'Descrivi il tuo percorso professionale',
      educationPlaceholder: 'Titoli di studio e qualifiche',
      jobDescription: 'Descrizione del lavoro',
      yourResume: 'Il tuo CV',
      comparisonDescription: 'Confronta il CV con i requisiti del lavoro e individua competenze pertinenti e possibili lacune.',
      resumeHint: 'Rimuovi i dati di contatto personali prima del test.',
      jobHint: 'Inserisci tutti i requisiti pertinenti.',
      fileHint: 'Sono supportati PDF con testo selezionabile e DOCX. PDF scansionati e vecchi file DOC non sono supportati. I file vengono elaborati nel browser.',
      words: 'parole'
    },
    de: {
      hero: 'Gestalte deine Karriere. <em>Forme deine Zukunft.</em>',
      eyebrow: '✦ DEINE KARRIERE, VERNETZT',
      description: 'Erstelle professionelle Lebensläufe, vergleiche deine Fähigkeiten mit Stellenanforderungen und plane deinen nächsten Karriereschritt.',
      build: 'Lebenslauf erstellen',
      compare: 'Übereinstimmung prüfen',
      name: 'Vollständiger Name',
      title: 'Berufsbezeichnung',
      contact: 'Kontaktdaten (optional)',
      education: 'Ausbildung',
      summary: 'Berufliches Profil',
      experience: 'Berufserfahrung',
      skills: 'Fähigkeiten',
      rolePlaceholder: 'z. B. Kundenservice-Mitarbeiter',
      experiencePlaceholder: 'Beschreibe tatsächliche Aufgaben und Erfolge.',
      skillsPlaceholder: 'z. B. Excel, Kundenservice, CRM',
      namePlaceholder: 'Dein Name',
      summaryPlaceholder: 'Dein beruflicher Hintergrund',
      educationPlaceholder: 'Abschlüsse und Qualifikationen',
      jobDescription: 'Stellenbeschreibung',
      yourResume: 'Dein Lebenslauf',
      comparisonDescription: 'Vergleiche deinen Lebenslauf mit Stellenanforderungen und erkenne relevante Fähigkeiten und mögliche Lücken.',
      resumeHint: 'Entferne persönliche Kontaktdaten vor dem Test.',
      jobHint: 'Füge alle relevanten Anforderungen hinzu.',
      fileHint: 'PDF-Dateien mit auswählbarem Text und DOCX werden unterstützt. Gescannte PDFs und alte DOC-Dateien werden nicht unterstützt. Dateien werden lokal verarbeitet.',
      words: 'Wörter'
    },
    fr: {
      hero: 'Construisez votre carrière. <em>Façonnez votre avenir.</em>',
      eyebrow: '✦ VOTRE CARRIÈRE, CONNECTÉE',
      description: 'Créez des CV professionnels, comparez vos compétences aux offres d’emploi et préparez votre prochaine étape avec confiance.',
      build: 'Créer mon CV',
      compare: 'Analyser la compatibilité',
      name: 'Nom complet',
      title: 'Intitulé professionnel',
      contact: 'Coordonnées (facultatif)',
      education: 'Formation',
      summary: 'Résumé professionnel',
      experience: 'Expérience professionnelle',
      skills: 'Compétences',
      rolePlaceholder: 'ex. Conseiller clientèle',
      experiencePlaceholder: 'Décrivez vos missions et réalisations réelles.',
      skillsPlaceholder: 'ex. Excel, service client, CRM',
      namePlaceholder: 'Votre nom',
      summaryPlaceholder: 'Votre parcours professionnel',
      educationPlaceholder: 'Diplômes et qualifications',
      jobDescription: 'Description du poste',
      yourResume: 'Votre CV',
      comparisonDescription: 'Comparez votre CV aux exigences du poste et identifiez les compétences pertinentes et les lacunes possibles.',
      resumeHint: 'Retirez vos coordonnées personnelles avant le test.',
      jobHint: 'Ajoutez toutes les exigences pertinentes.',
      fileHint: 'Les PDF avec texte sélectionnable et les DOCX sont acceptés. Les PDF numérisés et anciens fichiers DOC ne sont pas pris en charge. Les fichiers sont traités localement.',
      words: 'mots'
    },
    es: {
      hero: 'Construye tu carrera. <em>Da forma a tu futuro.</em>',
      eyebrow: '✦ TU CARRERA, CONECTADA',
      description: 'Crea currículums profesionales, compara tus habilidades con los requisitos laborales y avanza en tu carrera con confianza.',
      build: 'Crear mi currículum',
      compare: 'Analizar compatibilidad',
      name: 'Nombre completo',
      title: 'Título profesional',
      contact: 'Contacto (opcional)',
      education: 'Formación',
      summary: 'Resumen profesional',
      experience: 'Experiencia profesional',
      skills: 'Habilidades',
      rolePlaceholder: 'ej. Especialista en atención al cliente',
      experiencePlaceholder: 'Describe tus funciones y logros reales.',
      skillsPlaceholder: 'ej. Excel, atención al cliente, CRM',
      namePlaceholder: 'Tu nombre',
      summaryPlaceholder: 'Tu trayectoria profesional',
      educationPlaceholder: 'Estudios y cualificaciones',
      jobDescription: 'Descripción del puesto',
      yourResume: 'Tu currículum',
      comparisonDescription: 'Compara tu currículum con los requisitos del puesto e identifica habilidades relevantes y posibles carencias.',
      resumeHint: 'Elimina los datos de contacto personales antes de probar.',
      jobHint: 'Incluye todos los requisitos relevantes.',
      fileHint: 'Se admiten PDF con texto seleccionable y DOCX. No se admiten PDF escaneados ni archivos DOC antiguos. Los archivos se procesan localmente.',
      words: 'palabras'
    }
  };

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function setPlaceholder(id, value) {
    const element = $(id);
    if (element) element.placeholder = value;
  }

  function labelFor(id, value) {
    const field = $(id);
    const label = field?.closest('label');
    if (!label) return;
    const node = [...label.childNodes].find(
      n => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
    );
    if (node) node.textContent = value + '\n';
  }

  function applyLanguage() {
    const language = $('language')?.value || 'en';
    const t = text[language] || text.en;

    const hero = $('worknelyHeroTitle');
    if (hero) {
      hero.replaceChildren(
        document.createTextNode(t.hero.split('<em>')[0]),
        (() => {
          const em = document.createElement('em');
          em.textContent = t.hero.split('<em>')[1].split('</em>')[0];
          return em;
        })()
      );
    }

    setText('.hero .eyebrow', t.eyebrow);
    setText('.hero > p', t.description);
    setText('.hero-actions a[href="#builder"]', t.build);
    setText('.hero-actions a[href="#comparison"]', t.compare);

    [
      ['bName', t.name],
      ['bTitle', t.title],
      ['bContact', t.contact],
      ['bEducation', t.education],
      ['bSummary', t.summary],
      ['bExperience', t.experience],
      ['bSkills', t.skills]
    ].forEach(([id, value]) => labelFor(id, value));

    setPlaceholder('studioRole', t.rolePlaceholder);
    setPlaceholder('studioExperience', t.experiencePlaceholder);
    setPlaceholder('studioSkills', t.skillsPlaceholder);
    setPlaceholder('bName', t.namePlaceholder);
    setPlaceholder('bEducation', t.educationPlaceholder);
    setPlaceholder('bSummary', t.summaryPlaceholder);

    setText('#comparison .section-head p', t.comparisonDescription);
    setText('label[for="resume"] strong', t.yourResume);
    setText('label[for="job"] strong', t.jobDescription);
    setText('#resume + .field-foot span:first-child', t.resumeHint);
    setText('#job + .field-foot span:first-child', t.jobHint);

    const status = $('fileStatus');
    if (status && !status.dataset.dynamic) {
      status.textContent = t.fileHint;
    }

    document.documentElement.lang = language;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const language = $('language');
    if (!language) return;

    applyLanguage();

    language.addEventListener('change', () => {
      applyLanguage();
    });
  });
})();
