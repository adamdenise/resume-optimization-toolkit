
/* Worknely V3.1 — Multilingual interface and report */
(() => {
  'use strict';

  const $ = id => document.getElementById(id);

  const languages = {
    en: {
      hero: ['Build your career.', 'Shape your future.',
        'YOUR CAREER, CONNECTED',
        'Create professional resumes, compare your skills with job requirements, and take your next career step with confidence.',
        'Build my resume', 'Analyze compatibility'],
      studio: ['Resume Writing Studio', 'Transform your experience into professional resume content. Highlight your real skills and achievements.',
        'Target role', 'Writing style', 'Verified experience', 'Verified skills',
        'Create structured draft', 'Copy draft to Resume Builder',
        'Guided writing templates, not generative AI. Review every statement and include only genuine qualifications.',
        'Concise', 'Results-focused'],
      builder: ['Create your ATS-friendly resume', 'Build a professional resume using verified information.',
        'Full name', 'Professional title', 'Contact (optional)', 'Education',
        'Professional summary', 'Experience', 'Skills', 'Generate resume', 'Export resume PDF'],
      compare: ['Resume & job comparison', 'Compare your resume with job requirements and identify relevant skills and potential gaps.',
        'Load example', 'Upload your resume (PDF or DOCX)', 'Your resume',
        'Job description', 'Analyze compatibility', 'Clear all'],
      report: ['YOUR CAREER INSIGHTS', 'Compatibility report',
        'Understand your resume keyword coverage and identify opportunities for improvement.',
        'Download TXT', 'Save PDF', 'keyword match',
        'Estimated coverage of recognized skills in the job description.',
        'Not an ATS score or hiring prediction.',
        'Matched skills', 'Skills to review', 'Resume length',
        'Estimated ATS readiness', 'CV structure review',
        'Skills not found in CV', 'Personalized recommendations',
        'Job skill coverage', 'Section headings',
        'Achievement evidence (rough signal)',
        'heading detected', 'heading not clearly identified',
        'No recognized matching skills.', 'No missing recognized skills.'],
      rec: [
        'If you genuinely have these skills, add concrete evidence of where you used them: ',
        'All recognized job skills appear in your resume. Verify that your examples demonstrate your actual experience.',
        'Support relevant skills with specific achievements, responsibilities, and measurable results when available.',
        'Your resume text is short. Consider adding relevant work examples, education, and outcomes.',
        'Read the complete job description manually. Keyword matching cannot assess seniority, qualifications, proficiency, or overall fit.'
      ],
      sections: ['Professional summary', 'Experience', 'Education', 'Skills'],
      words: 'words'
    },

    ro: {
      hero: ['Construiește-ți cariera.', 'Modelează-ți viitorul.',
        'CARIERA TA, NOI OPORTUNITĂȚI',
        'Creează CV-uri profesionale, compară-ți competențele cu cerințele angajatorilor și fă următorul pas în carieră cu încredere.',
        'Creează CV-ul meu', 'Analizează compatibilitatea'],
      studio: ['Atelier de redactare CV', 'Transformă-ți experiența în conținut profesional. Evidențiază competențele și realizările tale reale.',
        'Rol vizat', 'Stil de redactare', 'Experiență verificată', 'Competențe reale',
        'Creează un model structurat', 'Copiază în editorul CV',
        'Șabloane de redactare ghidată, nu inteligență artificială generativă. Include doar calificări reale.',
        'Concis', 'Axat pe rezultate'],
      builder: ['Creează un CV cu structură ATS', 'Construiește un CV profesional folosind informații verificate.',
        'Nume complet', 'Titlu profesional', 'Contact (opțional)', 'Educație',
        'Rezumat profesional', 'Experiență profesională', 'Competențe',
        'Generează CV-ul', 'Exportă CV PDF'],
      compare: ['Compară CV-ul cu jobul', 'Compară CV-ul cu cerințele postului și identifică abilitățile relevante și eventualele lacune.',
        'Încarcă exemplu', 'Încarcă CV-ul (PDF sau DOCX)', 'CV-ul tău',
        'Descrierea postului', 'Analizează compatibilitatea', 'Șterge tot'],
      report: ['REZULTATELE ANALIZEI TALE', 'Raport de compatibilitate',
        'Descoperă competențele identificate și oportunitățile de îmbunătățire.',
        'Descarcă TXT', 'Salvează PDF', 'potrivire competențe',
        'Acoperirea estimată a competențelor recunoscute din descrierea postului.',
        'Nu reprezintă un scor ATS oficial sau o predicție de angajare.',
        'Competențe identificate', 'Competențe de verificat', 'Lungimea CV-ului',
        'Pregătire ATS estimată', 'Evaluarea structurii CV-ului',
        'Competențe negăsite în CV', 'Recomandări personalizate',
        'Acoperirea competențelor', 'Titlurile secțiunilor',
        'Dovezi ale realizărilor (estimare)',
        'titlu identificat', 'titlu neidentificat clar',
        'Nu au fost identificate competențe comune.', 'Nu lipsesc competențe recunoscute.'],
      rec: [
        'Dacă deții aceste competențe, adaugă exemple concrete despre utilizarea lor: ',
        'Toate competențele recunoscute apar în CV. Verifică dacă exemplele reflectă experiența reală.',
        'Susține competențele relevante prin realizări, responsabilități și rezultate măsurabile.',
        'CV-ul este scurt. Adaugă experiență, studii și rezultate relevante.',
        'Citește integral descrierea postului. Potrivirea cuvintelor-cheie nu poate evalua calificările sau compatibilitatea generală.'
      ],
      sections: ['Rezumat profesional', 'Experiență', 'Educație', 'Competențe'],
      words: 'cuvinte'
    },

    it: {
      hero: ['Costruisci la tua carriera.', 'Dai forma al tuo futuro.',
        'LA TUA CARRIERA, CONNESSA',
        'Crea CV professionali, confronta le tue competenze con le offerte di lavoro e affronta il prossimo passo con fiducia.',
        'Crea il mio CV', 'Analizza compatibilità'],
      studio: ['Laboratorio di scrittura CV', 'Trasforma la tua esperienza in contenuti professionali.',
        'Ruolo desiderato', 'Stile di scrittura', 'Esperienza verificata', 'Competenze reali',
        'Crea una bozza strutturata', 'Copia nel generatore CV',
        'Modelli guidati, non IA generativa. Inserisci solo qualifiche reali.',
        'Conciso', 'Orientato ai risultati'],
      builder: ['Crea un CV adatto agli ATS', 'Crea un CV professionale con informazioni verificate.',
        'Nome completo', 'Titolo professionale', 'Contatti (facoltativi)',
        'Formazione', 'Profilo professionale', 'Esperienza', 'Competenze',
        'Genera CV', 'Esporta CV PDF'],
      compare: ['Confronto CV e lavoro', 'Confronta il CV con i requisiti del lavoro.',
        'Carica esempio', 'Carica CV (PDF o DOCX)', 'Il tuo CV',
        'Descrizione del lavoro', 'Analizza compatibilità', 'Cancella tutto'],
      report: ['RISULTATI DELLA TUA CARRIERA', 'Rapporto di compatibilità',
        'Scopri le competenze riconosciute e le opportunità di miglioramento.',
        'Scarica TXT', 'Salva PDF', 'corrispondenza competenze',
        'Copertura stimata delle competenze richieste.',
        'Non è un punteggio ATS ufficiale né una previsione di assunzione.',
        'Competenze corrispondenti', 'Competenze da verificare', 'Lunghezza del CV',
        'Preparazione ATS stimata', 'Analisi della struttura del CV',
        'Competenze assenti nel CV', 'Raccomandazioni personalizzate',
        'Copertura delle competenze', 'Titoli delle sezioni',
        'Prove dei risultati (stima)', 'titolo rilevato',
        'titolo non chiaramente identificato',
        'Nessuna competenza corrispondente.', 'Nessuna competenza mancante.'],
      rec: [
        'Se possiedi queste competenze, aggiungi esempi concreti: ',
        'Tutte le competenze riconosciute sono presenti nel CV. Verifica gli esempi.',
        'Sostieni le competenze con risultati e responsabilità concrete.',
        'Il CV è breve. Aggiungi esperienze, formazione e risultati pertinenti.',
        'Leggi tutta l’offerta. Le parole chiave non valutano le qualifiche o l’idoneità complessiva.'
      ],
      sections: ['Profilo professionale', 'Esperienza', 'Formazione', 'Competenze'],
      words: 'parole'
    },

    de: {
      hero: ['Gestalte deine Karriere.', 'Forme deine Zukunft.',
        'DEINE KARRIERE, VERNETZT',
        'Erstelle professionelle Lebensläufe und vergleiche deine Fähigkeiten mit Stellenanforderungen.',
        'Lebenslauf erstellen', 'Übereinstimmung prüfen'],
      studio: ['Lebenslauf-Schreibstudio', 'Formuliere deine beruflichen Erfahrungen professionell.',
        'Zielposition', 'Schreibstil', 'Bestätigte Erfahrung', 'Nachgewiesene Fähigkeiten',
        'Entwurf erstellen', 'In den Lebenslauf-Editor kopieren',
        'Angeleitete Vorlagen, keine generative KI. Verwende nur echte Qualifikationen.',
        'Prägnant', 'Ergebnisorientiert'],
      builder: ['ATS-freundlichen Lebenslauf erstellen', 'Erstelle einen professionellen Lebenslauf mit korrekten Angaben.',
        'Vollständiger Name', 'Berufsbezeichnung', 'Kontaktdaten (optional)',
        'Ausbildung', 'Berufliches Profil', 'Berufserfahrung', 'Fähigkeiten',
        'Lebenslauf erstellen', 'PDF exportieren'],
      compare: ['Lebenslauf und Stelle', 'Vergleiche deinen Lebenslauf mit den Stellenanforderungen.',
        'Beispiel laden', 'Lebenslauf hochladen (PDF oder DOCX)',
        'Dein Lebenslauf', 'Stellenbeschreibung', 'Übereinstimmung prüfen', 'Alles löschen'],
      report: ['DEINE KARRIEREERGEBNISSE', 'Kompatibilitätsbericht',
        'Entdecke passende Fähigkeiten und Verbesserungsmöglichkeiten.',
        'TXT herunterladen', 'PDF speichern', 'Schlüsselwortübereinstimmung',
        'Geschätzte Abdeckung erkannter Stellenanforderungen.',
        'Kein offizieller ATS-Wert und keine Einstellungsprognose.',
        'Übereinstimmende Fähigkeiten', 'Zu prüfende Fähigkeiten',
        'Lebenslauflänge', 'Geschätzte ATS-Eignung',
        'Prüfung der Lebenslaufstruktur', 'Fehlende Fähigkeiten',
        'Persönliche Empfehlungen', 'Abdeckung der Fähigkeiten',
        'Abschnittsüberschriften', 'Nachweise für Erfolge (Schätzung)',
        'Überschrift erkannt', 'Überschrift nicht eindeutig erkannt',
        'Keine passenden Fähigkeiten erkannt.', 'Keine fehlenden Fähigkeiten.'],
      rec: [
        'Wenn du diese Fähigkeiten besitzt, ergänze konkrete Beispiele: ',
        'Alle erkannten Fähigkeiten stehen im Lebenslauf. Prüfe deine Beispiele.',
        'Belege Fähigkeiten mit Leistungen und messbaren Ergebnissen.',
        'Der Lebenslauf ist kurz. Ergänze relevante Erfahrungen und Ausbildung.',
        'Lies die gesamte Stellenbeschreibung. Schlüsselwörter bewerten nicht die gesamte Eignung.'
      ],
      sections: ['Berufliches Profil', 'Berufserfahrung', 'Ausbildung', 'Fähigkeiten'],
      words: 'Wörter'
    },

    fr: {
      hero: ['Construisez votre carrière.', 'Façonnez votre avenir.',
        'VOTRE CARRIÈRE, CONNECTÉE',
        'Créez des CV professionnels et comparez vos compétences aux offres d’emploi.',
        'Créer mon CV', 'Analyser la compatibilité'],
      studio: ['Atelier de rédaction de CV', 'Transformez votre expérience en contenu professionnel.',
        'Poste visé', 'Style de rédaction', 'Expérience vérifiée', 'Compétences réelles',
        'Créer un brouillon structuré', 'Copier dans l’éditeur de CV',
        'Modèles guidés, sans IA générative. Indiquez uniquement des qualifications réelles.',
        'Concis', 'Axé sur les résultats'],
      builder: ['Créer un CV adapté aux ATS', 'Créez un CV professionnel avec des informations vérifiées.',
        'Nom complet', 'Intitulé professionnel', 'Coordonnées (facultatif)',
        'Formation', 'Résumé professionnel', 'Expérience', 'Compétences',
        'Créer le CV', 'Exporter en PDF'],
      compare: ['Comparaison CV et emploi', 'Comparez votre CV aux exigences du poste.',
        'Charger un exemple', 'Importer un CV (PDF ou DOCX)',
        'Votre CV', 'Description du poste', 'Analyser la correspondance', 'Tout effacer'],
      report: ['VOS RÉSULTATS PROFESSIONNELS', 'Rapport de compatibilité',
        'Découvrez les compétences reconnues et les possibilités d’amélioration.',
        'Télécharger TXT', 'Enregistrer PDF', 'correspondance des mots-clés',
        'Couverture estimée des compétences reconnues.',
        'Ce n’est pas un score ATS officiel ni une prédiction de recrutement.',
        'Compétences correspondantes', 'Compétences à vérifier',
        'Longueur du CV', 'Préparation ATS estimée',
        'Analyse de la structure du CV', 'Compétences absentes du CV',
        'Recommandations personnalisées', 'Couverture des compétences',
        'Titres des sections', 'Preuves de réalisations (estimation)',
        'titre détecté', 'titre non clairement identifié',
        'Aucune compétence correspondante.', 'Aucune compétence manquante.'],
      rec: [
        'Si vous possédez ces compétences, ajoutez des exemples concrets : ',
        'Toutes les compétences reconnues figurent dans le CV. Vérifiez vos exemples.',
        'Appuyez vos compétences par des réalisations et des résultats mesurables.',
        'Le CV est court. Ajoutez des expériences et formations pertinentes.',
        'Lisez toute l’offre. Les mots-clés ne permettent pas d’évaluer toutes les qualifications.'
      ],
      sections: ['Résumé professionnel', 'Expérience', 'Formation', 'Compétences'],
      words: 'mots'
    },

    es: {
      hero: ['Construye tu carrera.', 'Da forma a tu futuro.',
        'TU CARRERA, CONECTADA',
        'Crea currículums profesionales y compara tus habilidades con los requisitos laborales.',
        'Crear mi currículum', 'Analizar compatibilidad'],
      studio: ['Estudio de redacción de CV', 'Convierte tu experiencia en contenido profesional.',
        'Puesto objetivo', 'Estilo de redacción', 'Experiencia verificada',
        'Habilidades reales', 'Crear borrador estructurado',
        'Copiar al editor de CV',
        'Plantillas guiadas, no IA generativa. Incluye solo cualificaciones reales.',
        'Conciso', 'Orientado a resultados'],
      builder: ['Crear un CV compatible con ATS', 'Crea un currículum profesional con datos reales.',
        'Nombre completo', 'Título profesional', 'Contacto (opcional)',
        'Formación', 'Resumen profesional', 'Experiencia', 'Habilidades',
        'Generar CV', 'Exportar PDF'],
      compare: ['Comparación de CV y empleo', 'Compara tu currículum con los requisitos del puesto.',
        'Cargar ejemplo', 'Subir CV (PDF o DOCX)', 'Tu currículum',
        'Descripción del puesto', 'Analizar compatibilidad', 'Borrar todo'],
      report: ['TUS RESULTADOS PROFESIONALES', 'Informe de compatibilidad',
        'Descubre las habilidades reconocidas y las oportunidades de mejora.',
        'Descargar TXT', 'Guardar PDF', 'coincidencia de habilidades',
        'Cobertura estimada de habilidades reconocidas.',
        'No es una puntuación ATS oficial ni predice la contratación.',
        'Habilidades coincidentes', 'Habilidades por revisar',
        'Extensión del CV', 'Preparación ATS estimada',
        'Revisión de estructura del CV', 'Habilidades ausentes del CV',
        'Recomendaciones personalizadas', 'Cobertura de habilidades',
        'Encabezados de sección', 'Evidencia de logros (estimación)',
        'encabezado detectado', 'encabezado no identificado claramente',
        'No se encontraron habilidades coincidentes.', 'No faltan habilidades.'],
      rec: [
        'Si tienes estas habilidades, añade ejemplos concretos de su uso: ',
        'Todas las habilidades reconocidas aparecen en el CV. Verifica los ejemplos.',
        'Respalda tus habilidades con logros y resultados medibles.',
        'El CV es breve. Añade experiencia, formación y resultados relevantes.',
        'Lee toda la oferta. Las palabras clave no evalúan todas las cualificaciones.'
      ],
      sections: ['Resumen profesional', 'Experiencia', 'Formación', 'Habilidades'],
      words: 'palabras'
    }
  };

  const codes = Object.keys(languages);

  function lang() {
    const code = $('language')?.value || 'en';
    return languages[code] ? code : 'en';
  }

  function set(selector, value, root = document) {
    const el = root.querySelector(selector);
    if (el && value !== undefined && el.textContent !== value) {
      el.textContent = value;
    }
  }

  function fieldLabel(id, value) {
    const input = $(id);
    const label = input?.closest('label');
    if (!label) return;

    const span = label.querySelector('span');
    if (span) {
      if (span.textContent !== value) span.textContent = value;
      return;
    }

    const node = [...label.childNodes].find(
      n => n.nodeType === 3 && n.textContent.trim()
    );
    if (node && node.textContent.trim() !== value) {
      node.textContent = value + ' ';
    }
  }

  function translateStatic(t) {
    const hero = $('worknelyHeroTitle');
    if (hero) {
      const em = hero.querySelector('em');
      const first = [...hero.childNodes].find(n => n.nodeType === 3);
      if (first && first.textContent.trim() !== t.hero[0]) {
        first.textContent = t.hero[0] + ' ';
      }
      if (em && em.textContent !== t.hero[1]) em.textContent = t.hero[1];
    }

    set('.hero .eyebrow', '✦ ' + t.hero[2]);
    set('.hero > p', t.hero[3]);
    set('.hero-actions a[href="#builder"]', t.hero[4]);
    set('.hero-actions a[href="#comparison"]', t.hero[5]);

    set('#studioHeading', t.studio[0]);
    set('#studioIntro', t.studio[1]);

    ['studioRole', 'studioTone', 'studioExperience', 'studioSkills']
      .forEach((id, i) => fieldLabel(id, t.studio[i + 2]));

    set('#studioDraft', t.studio[6]);
    set('#studioToBuilder', t.studio[7]);
    set('#studioNotice', t.studio[8]);

    const options = $('studioTone')?.options;
    if (options && options.length >= 2) {
      options[0].textContent = t.studio[9];
      options[1].textContent = t.studio[10];
    }

    set('#builderTitle', t.builder[0]);
    set('#builderIntro', t.builder[1]);

    ['bName', 'bTitle', 'bContact', 'bEducation',
      'bSummary', 'bExperience', 'bSkills']
      .forEach((id, i) => fieldLabel(id, t.builder[i + 2]));

    set('#buildResume', t.builder[9]);
    set('#exportResume', t.builder[10]);

    set('#workspaceTitle', t.compare[0]);
    set('#comparison .section-head p', t.compare[1]);
    set('#sample', t.compare[2]);

    set('#uploadLabel', t.compare[3]);
    set('label[for="resume"] strong', t.compare[4]);
    set('label[for="job"] strong', t.compare[5]);
    set('#analyze', t.compare[6] + ' →');
    set('#clear', t.compare[7]);

    document.documentElement.lang = lang();
  }

  function translateReport(t) {
    const root = $('results');
    if (!root) return;

    const r = t.report;

    const selectors = [
      '.results-head .overline',
      '.results-head h2',
      '.results-head p',
      '#download',
      '#printPdf',
      '#ring span',
      '.score-card > p',
      '.score-card > small',
      '.stats .stat:nth-child(1) span',
      '.stats .stat:nth-child(2) span',
      '.stats .stat:nth-child(3) span',
      '#atsHeading',
      '#structureCard h3'
    ];

    selectors.forEach((selector, i) => set(selector, r[i], root));

    set('.report-grid article:nth-child(1) h3', '✓ ' + r[8], root);
    set('.report-grid article:nth-child(2) h3', '⌕ ' + r[13], root);
    set('.rec h3', '✦ ' + r[14], root);

    const factors = root.querySelectorAll('#atsFactors .structure-item');

    factors.forEach((node, i) => {
      const value = node.textContent.match(/:\s*(\d+\/100)/);
      if (value && i < 3) {
        setText(node, r[15 + i] + ': ' + value[1]);
      }
    });

    const findings = root.querySelectorAll(
      '#structureFindings .structure-item'
    );

    findings.forEach((node, i) => {
      if (i >= 4) return;
      const found = node.classList.contains('found');
      const prefix = found ? '✓ ' : '○ ';
      setText(node, prefix + t.sections[i] + ' — ' +
        (found ? r[18] : r[19]));
    });

    for (const [id, index] of [['matched', 20], ['missing', 21]]) {
      const empty = root.querySelector('#' + id + ' .empty');
      if (empty) setText(empty, r[index]);
    }

    const count = $('wordCount');
    if (count) {
      const number = count.textContent.match(/\d+/);
      if (number) setText(count, number[0] + ' ' + t.words);
    }

    const recommendations = $('recommendations');
    if (recommendations) {
      const items = [...recommendations.querySelectorAll('li')];

      items.forEach(node => {
        const value = node.textContent;
        const english = languages.en.rec;
        let index = -1;

        for (const code of codes) {
          const source = languages[code].rec;
          const exact = source.findIndex((s, i) =>
            i > 0 && value === s
          );
          if (exact >= 0) {
            index = exact;
            break;
          }
        }

        if (index >= 0) {
          setText(node, t.rec[index]);
          return;
        }

        for (const code of codes) {
          const prefix = languages[code].rec[0];
          if (value.startsWith(prefix)) {
            setText(node, t.rec[0] + value.slice(prefix.length));
            return;
          }
        }

        if (value.startsWith(english[0])) {
          setText(node, t.rec[0] + value.slice(english[0].length));
        }
      });
    }
  }

  function setText(node, value) {
    if (node && node.textContent !== value) {
      node.textContent = value;
    }
  }

  function translateCounts(t) {
    for (const [outputId, inputId] of [
      ['resumeWords', 'resume'],
      ['jobWords', 'job']
    ]) {
      const output = $(outputId);
      const input = $(inputId);
      if (!output || !input) continue;

      const value = input.value.trim();
      const count = value ? value.split(/\s+/).length : 0;
      setText(output, count + ' ' + t.words);
    }
  }

  let scheduled = false;

  function render() {
    scheduled = false;
    const t = languages[lang()];
    translateStatic(t);
    translateReport(t);
    translateCounts(t);
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(render);
  }

  function init() {
    const selector = $('language');
    if (!selector) return;

    selector.addEventListener('change', schedule);

    ['resume', 'job'].forEach(id => {
      $(id)?.addEventListener('input', schedule);
    });

    ['analyze', 'sample', 'clear', 'buildResume'].forEach(id => {
      $(id)?.addEventListener('click', () => {
        setTimeout(schedule, 0);
      });
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {once: true});
  } else {
    init();
  }
})();
