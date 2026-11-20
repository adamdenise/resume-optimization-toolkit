
/* Worknely — Dynamic report translations v1.0 */
(() => {
  'use strict';

  const $ = id => document.getElementById(id);

  const translations = {
    en: {
      words:'words', match:'keyword match',
      matched:'Matched skills', missing:'Skills to review',
      length:'Resume length', structure:'CV structure review',
      recommendations:'Recommendations',
      coverage:'Job skill coverage',
      headings:'Section headings',
      evidence:'Achievement evidence (rough signal)',
      sections:['Professional summary','Experience','Education','Skills'],
      detected:'heading detected',
      notDetected:'heading not clearly identified',
      noneMatched:'No recognized matching skills.',
      noneMissing:'No missing recognized skills.',
      proof:'Support relevant skills with specific achievements, responsibilities, and measurable results when available.',
      short:'Your resume text is short. Consider adding relevant work examples, education, and outcomes.',
      manual:'Read the complete job description manually. Keyword matching cannot assess seniority, qualifications, proficiency, or overall fit.',
      all:'All recognized job skills appear in your resume. Verify that your examples demonstrate your actual experience.',
      missingRec:'If you genuinely have these skills, add concrete evidence of where you used them: ',
      missingEnd:'.',
      messages:[
        'Please enter both your resume and the job description.',
        'No skills from our current dictionary were recognized in the job description. Try a more detailed job listing.',
        'Example loaded. Tap Analyze compatibility.',
        'Please enter a name to generate your resume.',
        'Resume created. Review all information before exporting.'
      ]
    },

    ro: {
      words:'cuvinte', match:'potrivire cuvinte-cheie',
      matched:'Competențe identificate', missing:'Competențe de verificat',
      length:'Lungimea CV-ului', structure:'Analiza structurii CV-ului',
      recommendations:'Recomandări',
      coverage:'Acoperirea competențelor cerute',
      headings:'Titluri de secțiuni',
      evidence:'Dovezi ale realizărilor (estimare)',
      sections:['Rezumat profesional','Experiență','Educație','Competențe'],
      detected:'titlu identificat',
      notDetected:'titlu neidentificat clar',
      noneMatched:'Nu există competențe comune recunoscute.',
      noneMissing:'Nu lipsesc competențe recunoscute.',
      proof:'Susține competențele relevante prin realizări, responsabilități și rezultate măsurabile, când este posibil.',
      short:'CV-ul este scurt. Adaugă exemple relevante de experiență, studii și rezultate.',
      manual:'Citește integral anunțul. Potrivirea cuvintelor-cheie nu poate evalua experiența, calificările sau compatibilitatea generală.',
      all:'Toate competențele recunoscute din anunț apar în CV. Verifică dacă exemplele reflectă experiența reală.',
      missingRec:'Dacă deții aceste competențe, adaugă exemple concrete despre utilizarea lor: ',
      missingEnd:'.',
      messages:[
        'Introdu atât CV-ul, cât și descrierea postului.',
        'Nu am identificat competențe din dicționarul actual în descrierea postului. Încearcă un anunț mai detaliat.',
        'Exemplul a fost încărcat. Apasă Analizează compatibilitatea.',
        'Introdu numele pentru a genera CV-ul.',
        'CV-ul a fost creat. Verifică informațiile înainte de export.'
      ]
    },

    it: {
      words:'parole', match:'corrispondenza parole chiave',
      matched:'Competenze corrispondenti', missing:'Competenze da verificare',
      length:'Lunghezza del CV', structure:'Analisi della struttura del CV',
      recommendations:'Raccomandazioni',
      coverage:'Copertura delle competenze richieste',
      headings:'Titoli delle sezioni',
      evidence:'Prove dei risultati (stima)',
      sections:['Profilo professionale','Esperienza','Formazione','Competenze'],
      detected:'titolo rilevato',
      notDetected:'titolo non identificato chiaramente',
      noneMatched:'Nessuna competenza corrispondente riconosciuta.',
      noneMissing:'Nessuna competenza riconosciuta mancante.',
      proof:'Sostieni le competenze con risultati, responsabilità ed esempi misurabili, quando disponibili.',
      short:'Il CV è breve. Aggiungi esempi pertinenti di lavoro, formazione e risultati.',
      manual:'Leggi tutta l’offerta. Le parole chiave non valutano anzianità, qualifiche o idoneità complessiva.',
      all:'Tutte le competenze riconosciute sono nel CV. Verifica che gli esempi dimostrino esperienza reale.',
      missingRec:'Se possiedi queste competenze, aggiungi esempi concreti del loro utilizzo: ',
      missingEnd:'.',
      messages:[
        'Inserisci sia il CV sia la descrizione del lavoro.',
        'Nessuna competenza riconosciuta nella descrizione. Prova un annuncio più dettagliato.',
        'Esempio caricato. Premi Analizza compatibilità.',
        'Inserisci il nome per generare il CV.',
        'CV creato. Verifica tutte le informazioni prima di esportarlo.'
      ]
    },

    de: {
      words:'Wörter', match:'Schlüsselwortübereinstimmung',
      matched:'Übereinstimmende Fähigkeiten', missing:'Zu prüfende Fähigkeiten',
      length:'Lebenslauflänge', structure:'Prüfung der Lebenslaufstruktur',
      recommendations:'Empfehlungen',
      coverage:'Abdeckung der Stellenanforderungen',
      headings:'Abschnittsüberschriften',
      evidence:'Nachweise für Erfolge (Schätzung)',
      sections:['Berufliches Profil','Berufserfahrung','Ausbildung','Fähigkeiten'],
      detected:'Überschrift erkannt',
      notDetected:'Überschrift nicht eindeutig erkannt',
      noneMatched:'Keine passenden Fähigkeiten erkannt.',
      noneMissing:'Keine fehlenden erkannten Fähigkeiten.',
      proof:'Belege relevante Fähigkeiten nach Möglichkeit durch konkrete Leistungen und messbare Ergebnisse.',
      short:'Der Lebenslauf ist kurz. Ergänze relevante Berufserfahrung, Ausbildung und Ergebnisse.',
      manual:'Lies die gesamte Stellenbeschreibung. Schlüsselwörter bewerten weder Erfahrung noch Qualifikationen oder Eignung vollständig.',
      all:'Alle erkannten Stellenanforderungen erscheinen im Lebenslauf. Prüfe, ob Beispiele echte Erfahrung belegen.',
      missingRec:'Wenn du diese Fähigkeiten besitzt, ergänze konkrete Beispiele für ihren Einsatz: ',
      missingEnd:'.',
      messages:[
        'Bitte Lebenslauf und Stellenbeschreibung eingeben.',
        'Keine bekannten Fähigkeiten in der Stellenbeschreibung erkannt. Versuche eine detailliertere Anzeige.',
        'Beispiel geladen. Übereinstimmung prüfen auswählen.',
        'Bitte Namen eingeben, um den Lebenslauf zu erstellen.',
        'Lebenslauf erstellt. Angaben vor dem Export prüfen.'
      ]
    },

    fr: {
      words:'mots', match:'correspondance des mots-clés',
      matched:'Compétences correspondantes', missing:'Compétences à vérifier',
      length:'Longueur du CV', structure:'Analyse de la structure du CV',
      recommendations:'Recommandations',
      coverage:'Couverture des compétences demandées',
      headings:'Titres des sections',
      evidence:'Preuves de réalisations (estimation)',
      sections:['Résumé professionnel','Expérience','Formation','Compétences'],
      detected:'titre détecté',
      notDetected:'titre non clairement identifié',
      noneMatched:'Aucune compétence correspondante reconnue.',
      noneMissing:'Aucune compétence reconnue manquante.',
      proof:'Appuyez les compétences par des réalisations, responsabilités et résultats mesurables si possible.',
      short:'Le CV est court. Ajoutez des exemples pertinents, votre formation et vos résultats.',
      manual:'Lisez toute l’offre. Les mots-clés ne permettent pas d’évaluer l’ancienneté, les qualifications ou l’adéquation globale.',
      all:'Toutes les compétences reconnues figurent dans le CV. Vérifiez que vos exemples reflètent votre expérience réelle.',
      missingRec:'Si vous possédez ces compétences, ajoutez des exemples concrets de leur utilisation : ',
      missingEnd:'.',
      messages:[
        'Saisissez le CV et la description du poste.',
        'Aucune compétence reconnue dans la description. Essayez une offre plus détaillée.',
        'Exemple chargé. Cliquez sur Analyser la correspondance.',
        'Saisissez votre nom pour créer le CV.',
        'CV créé. Vérifiez les informations avant export.'
      ]
    },

    es: {
      words:'palabras', match:'coincidencia de palabras clave',
      matched:'Habilidades coincidentes', missing:'Habilidades por revisar',
      length:'Extensión del CV', structure:'Revisión de la estructura del CV',
      recommendations:'Recomendaciones',
      coverage:'Cobertura de habilidades requeridas',
      headings:'Encabezados de sección',
      evidence:'Pruebas de logros (estimación)',
      sections:['Resumen profesional','Experiencia','Formación','Habilidades'],
      detected:'encabezado detectado',
      notDetected:'encabezado no identificado claramente',
      noneMatched:'No se reconocieron habilidades coincidentes.',
      noneMissing:'No faltan habilidades reconocidas.',
      proof:'Respalda las habilidades con logros, responsabilidades y resultados medibles cuando sea posible.',
      short:'El CV es breve. Añade experiencia, formación y resultados relevantes.',
      manual:'Lee toda la oferta. Las palabras clave no evalúan experiencia, cualificaciones ni adecuación general.',
      all:'Todas las habilidades reconocidas aparecen en el CV. Verifica que los ejemplos reflejen experiencia real.',
      missingRec:'Si tienes estas habilidades, añade ejemplos concretos de su uso: ',
      missingEnd:'.',
      messages:[
        'Introduce el CV y la descripción del puesto.',
        'No se reconocieron habilidades del diccionario en la descripción. Prueba con una oferta más detallada.',
        'Ejemplo cargado. Pulsa Analizar compatibilidad.',
        'Introduce un nombre para generar el CV.',
        'CV creado. Revisa la información antes de exportarlo.'
      ]
    }
  };

  const original = translations.en;
  const cache = new WeakMap();

  function currentLanguage() {
    const code = $('language')?.value || 'en';
    return translations[code] ? code : 'en';
  }

  function translate(source, t) {
    if (!source) return source;

    const keys = [
      'match','matched','missing','length','structure',
      'recommendations','coverage','headings','evidence',
      'noneMatched','noneMissing','proof','short','manual','all'
    ];

    for (const key of keys) {
      if (source === original[key]) return t[key];
    }

    for (let i = 0; i < original.messages.length; i++) {
      if (source === original.messages[i]) return t.messages[i];
    }

    for (let i = 0; i < original.sections.length; i++) {
      const section = original.sections[i];
      if (
        source.startsWith('✓ ' + section + ' — ') ||
        source.startsWith('○ ' + section + ' — ')
      ) {
        return source
          .replace(section, t.sections[i])
          .replace(
            'heading not clearly identified',
            t.notDetected
          )
          .replace('heading detected', t.detected);
      }
    }

    for (const key of ['coverage','headings','evidence']) {
      if (source.startsWith(original[key] + ': ')) {
        return t[key] + source.slice(original[key].length);
      }
    }

    if (source.startsWith(original.missingRec)) {
      const skills = source
        .slice(original.missingRec.length)
        .replace(/\.$/, '');
      return t.missingRec + skills + t.missingEnd;
    }

    if (/^\d+ words$/.test(source)) {
      return source.replace('words', t.words);
    }

    return source;
  }

  function translateNode(node, t) {
    if (!node) return;

    const current = node.textContent;
    let record = cache.get(node);

    if (!record || current !== record.rendered) {
      record = {source:current, rendered:current};
    }

    const output = translate(record.source, t);

    if (current !== output) node.textContent = output;

    record.rendered = output;
    cache.set(node, record);
  }

  let running = false;
  let scheduled = false;

  function refresh() {
    if (running) return;
    running = true;

    try {
      const t = translations[currentLanguage()];

      for (const id of ['resumeWords','jobWords','wordCount']) {
        const output = $(id);
        if (!output) continue;

        const input = id === 'jobWords' ? $('job') : $('resume');
        const value = input?.value.trim() || '';
        const count = value ? value.split(/\s+/).length : 0;
        const translated = count + ' ' + t.words;

        if (output.textContent !== translated) {
          output.textContent = translated;
        }
      }

      for (const id of [
        'structureFindings',
        'atsFactors',
        'recommendations',
        'matched',
        'missing'
      ]) {
        const root = $(id);
        if (!root) continue;

        for (const child of root.children) {
          translateNode(child, t);
        }
      }

      for (const id of [
        'message',
        'builderMessage'
      ]) {
        translateNode($(id), t);
      }

      const results = $('results');

      if (results) {
        const labels = [
          'match','matched','missing',
          'length','structure','recommendations'
        ];

        results.querySelectorAll(
          'h2,h3,h4,.metric-label,.stat-label,.eyebrow'
        ).forEach(node => {
          const value = node.textContent.trim();

          for (const key of labels) {
            const variants = Object.values(translations)
              .map(lang => lang[key]);

            if (variants.includes(value)) {
              if (value !== t[key]) node.textContent = t[key];
              break;
            }
          }
        });
      }
    } finally {
      running = false;
    }
  }

  function scheduleRefresh() {
    if (scheduled) return;
    scheduled = true;

    requestAnimationFrame(() => {
      scheduled = false;
      refresh();
    });
  }

  function init() {
    $('language')?.addEventListener(
      'change', scheduleRefresh
    );

    for (const id of [
      'analyze','sample','clear','buildResume'
    ]) {
      $(id)?.addEventListener(
        'click', scheduleRefresh
      );
    }

    for (const id of ['resume','job']) {
      $(id)?.addEventListener(
        'input', scheduleRefresh
      );
    }

    const results = $('results');

    if (results) {
      const observer = new MutationObserver(scheduleRefresh);

      observer.observe(results, {
        childList:true,
        subtree:true,
        characterData:true
      });
    }

    refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded', init, {once:true}
    );
  } else {
    init();
  }
})();
