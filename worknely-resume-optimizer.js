/*
 * WORKNELY V7.17.3
 * Smart Resume Optimization
 * International Career Intelligence
 * Privacy-First Architecture
 * People Technology
 */

(function () {
  "use strict";

  const VERSION = "7.17.3";

  const LANGUAGES = Object.freeze([
    "en", "ro", "it", "de", "fr", "es"
  ]);

  const FIELDS = Object.freeze({
    fullName: "bName",
    professionalTitle: "bTitle",
    contact: "bContact",
    education: "bEducation",
    summary: "bSummary",
    experience: "bExperience",
    skills: "bSkills"
  });

  const DICTIONARY = {

    title: [
      "Smart Resume Optimization",
      "Optimizare inteligentă a CV-ului",
      "Ottimizzazione intelligente del CV",
      "Intelligente Lebenslaufoptimierung",
      "Optimisation intelligente du CV",
      "Optimización inteligente del CV"
    ],

    high: [
      "High priority",
      "Prioritate ridicată",
      "Priorità alta",
      "Hohe Priorität",
      "Priorité élevée",
      "Prioridad alta"
    ],

    medium: [
      "Medium priority",
      "Prioritate medie",
      "Priorità media",
      "Mittlere Priorität",
      "Priorité moyenne",
      "Prioridad media"
    ],

    low: [
      "Additional improvement",
      "Îmbunătățire suplimentară",
      "Miglioramento aggiuntivo",
      "Zusätzliche Verbesserung",
      "Amélioration supplémentaire",
      "Mejora adicional"
    ],

    structure: [
      "Resume structure",
      "Structura CV-ului",
      "Struttura del CV",
      "Lebenslaufstruktur",
      "Structure du CV",
      "Estructura del CV"
    ],

    keywords: [
      "Keyword optimization",
      "Optimizarea cuvintelor-cheie",
      "Ottimizzazione delle parole chiave",
      "Schlüsselwortoptimierung",
      "Optimisation des mots-clés",
      "Optimización de palabras clave"
    ],

    achievements: [
      "Professional achievements",
      "Realizări profesionale",
      "Risultati professionali",
      "Berufliche Erfolge",
      "Réalisations professionnelles",
      "Logros profesionales"
    ],

    readability: [
      "Readability",
      "Lizibilitate",
      "Leggibilità",
      "Lesbarkeit",
      "Lisibilité",
      "Legibilidad"
    ],

    skills: [
      "Professional skills",
      "Competențe profesionale",
      "Competenze professionali",
      "Berufliche Kompetenzen",
      "Compétences professionnelles",
      "Competencias profesionales"
    ],

    summary: [
      "Professional summary",
      "Rezumat profesional",
      "Profilo professionale",
      "Berufliches Profil",
      "Profil professionnel",
      "Perfil profesional"
    ],

    experience: [
      "Professional experience",
      "Experiență profesională",
      "Esperienza professionale",
      "Berufserfahrung",
      "Expérience professionnelle",
      "Experiencia profesional"
    ],

    contact: [
      "Contact information",
      "Informații de contact",
      "Informazioni di contatto",
      "Kontaktinformationen",
      "Coordonnées",
      "Información de contacto"
    ],

    empty: [
      "Add resume content first.",
      "Adaugă mai întâi conținutul CV-ului.",
      "Inserisci prima il contenuto del CV.",
      "Füge zuerst Lebenslaufinhalte hinzu.",
      "Ajoutez d'abord le contenu du CV.",
      "Añade primero el contenido del CV."
    ],

    engineUnavailable: [
      "Career Intelligence engine is unavailable.",
      "Motorul Career Intelligence nu este disponibil.",
      "Motore Career Intelligence non disponibile.",
      "Career Intelligence ist nicht verfügbar.",
      "Moteur Career Intelligence indisponible.",
      "Motor Career Intelligence no disponible."
    ],

    improveSummary: [
      "Write a concise summary highlighting your verified experience, relevant skills and target role.",
      "Scrie un rezumat concis care evidențiază experiența reală, competențele relevante și rolul vizat.",
      "Scrivi un profilo conciso con esperienza reale, competenze pertinenti e ruolo desiderato.",
      "Verfasse ein kurzes Profil mit tatsächlicher Erfahrung, relevanten Kompetenzen und Zielposition.",
      "Rédigez un profil concis présentant votre expérience réelle, vos compétences et le poste visé.",
      "Redacta un perfil breve con experiencia real, competencias relevantes y puesto objetivo."
    ],

    shortenSummary: [
      "Make your summary more concise and remove unnecessary repetition.",
      "Scurtează rezumatul și elimină repetițiile inutile.",
      "Riduci il profilo ed elimina le ripetizioni.",
      "Kürze das Profil und entferne Wiederholungen.",
      "Raccourcissez le profil et supprimez les répétitions.",
      "Acorta el perfil y elimina las repeticiones."
    ],

    improveExperience: [
      "Describe responsibilities, actions and verified outcomes using clear bullet points.",
      "Descrie responsabilitățile, acțiunile și rezultatele reale prin puncte clare.",
      "Descrivi responsabilità, azioni e risultati reali con elenchi chiari.",
      "Beschreibe Aufgaben, Maßnahmen und belegbare Ergebnisse in Stichpunkten.",
      "Décrivez les responsabilités, actions et résultats vérifiables sous forme de liste.",
      "Describe responsabilidades, acciones y resultados verificables mediante viñetas."
    ],

    improveAchievements: [
      "Where accurate, quantify results using percentages, volumes, time savings or completed projects.",
      "Unde este corect, cuantifică rezultatele prin procente, volume, timp economisit sau proiecte finalizate.",
      "Quando possibile, quantifica risultati reali con percentuali, volumi, tempo risparmiato o progetti.",
      "Quantifiziere belegbare Ergebnisse mit Prozenten, Mengen, Zeitersparnis oder Projekten.",
      "Quantifiez les résultats réels avec des pourcentages, volumes, gains de temps ou projets.",
      "Cuantifica resultados reales mediante porcentajes, volúmenes, ahorro de tiempo o proyectos."
    ],

    improveKeywords: [
      "Review these job keywords and include only those supported by your actual experience.",
      "Verifică aceste cuvinte-cheie și include-le doar pe cele susținute de experiența ta reală.",
      "Verifica queste parole chiave e inserisci solo quelle supportate dalla tua esperienza.",
      "Prüfe diese Schlüsselwörter und ergänze nur belegbare Kompetenzen.",
      "Vérifiez ces mots-clés et ajoutez uniquement ceux correspondant à votre expérience.",
      "Revisa estas palabras clave e incluye solo las respaldadas por tu experiencia."
    ],

    improveSkills: [
      "Verify the identified skill gaps before adding any new skills to your resume.",
      "Verifică diferențele identificate înainte de a adăuga competențe noi în CV.",
      "Verifica le competenze mancanti prima di aggiungerle al CV.",
      "Prüfe die erkannten Kompetenzlücken vor einer Ergänzung.",
      "Vérifiez les compétences manquantes avant de les ajouter au CV.",
      "Verifica las competencias faltantes antes de añadirlas al CV."
    ],

    improveReadability: [
      "Break long paragraphs into concise, readable sections.",
      "Împarte paragrafele lungi în secțiuni concise și ușor de citit.",
      "Dividi i paragrafi lunghi in sezioni concise.",
      "Teile lange Absätze in kurze, lesbare Abschnitte.",
      "Divisez les longs paragraphes en sections lisibles.",
      "Divide los párrafos largos en secciones breves."
    ],

    removeDuplicates: [
      "Remove duplicate skills and unnecessary repetition.",
      "Elimină competențele duplicate și repetițiile inutile.",
      "Elimina competenze duplicate e ripetizioni.",
      "Entferne doppelte Kompetenzen und Wiederholungen.",
      "Supprimez les compétences en double et les répétitions.",
      "Elimina competencias duplicadas y repeticiones."
    ],

    addJob: [
      "Add a job description for targeted optimization.",
      "Adaugă descrierea postului pentru optimizare personalizată.",
      "Aggiungi una descrizione del lavoro.",
      "Füge eine Stellenbeschreibung hinzu.",
      "Ajoutez une description du poste.",
      "Añade una descripción del puesto."
    ],

    noIssues: [
      "No major issues detected by the current rules.",
      "Nu au fost detectate probleme majore de regulile actuale.",
      "Nessun problema importante rilevato.",
      "Keine größeren Probleme erkannt.",
      "Aucun problème majeur détecté.",
      "No se detectaron problemas importantes."
    ],

    review: [
      "Review every suggestion before applying changes.",
      "Verifică fiecare recomandare înainte de aplicare.",
      "Verifica ogni suggerimento prima di applicarlo.",
      "Prüfe jeden Vorschlag vor der Anwendung.",
      "Vérifiez chaque suggestion avant application.",
      "Revisa cada sugerencia antes de aplicarla."
    ],

    disclaimer: [
      "Rule-based suggestions. No qualifications or achievements are invented. Results do not guarantee ATS acceptance.",
      "Recomandări algoritmice. Nu sunt inventate calificări sau realizări. Rezultatele nu garantează acceptarea ATS.",
      "Suggerimenti basati su regole. Nessuna qualifica inventata. Nessuna garanzia ATS.",
      "Regelbasierte Vorschläge. Keine erfundenen Qualifikationen. Keine ATS-Garantie.",
      "Suggestions fondées sur des règles. Aucune qualification inventée. Aucune garantie ATS.",
      "Sugerencias basadas en reglas. Sin cualificaciones inventadas ni garantía ATS."
    ]

  };

  function normalizeLanguage(value) {
    const language = String(value || "en")
      .toLowerCase()
      .split("-")[0];

    return LANGUAGES.includes(language)
      ? language : "en";
  }

  function getLanguage() {
    let language =
      window.WorknelyLocalization
        ?.getLanguage?.();

    if (!language) {
      try {
        language = localStorage.getItem(
          "worknely.language"
        );
      } catch {}
    }

    return normalizeLanguage(
      language ||
      document.documentElement.lang ||
      "en"
    );
  }

  function t(key, language = getLanguage()) {
    const index = LANGUAGES.indexOf(
      normalizeLanguage(language)
    );

    return DICTIONARY[key]?.[index] ||
      DICTIONARY[key]?.[0] ||
      key;
  }

  function safeText(value) {
    return typeof value === "string"
      ? value.trim().slice(0, 150000)
      : "";
  }

  function normalizeContent(input) {
    const source =
      input && typeof input === "object"
        ? input : {};

    const result = {};

    Object.keys(FIELDS).forEach(key => {
      result[key] = safeText(source[key]);
    });

    return result;
  }

  function readBuilder() {
    const result = {};

    Object.entries(FIELDS).forEach(
      ([key, id]) => {
        result[key] = safeText(
          document.getElementById(id)?.value
        );
      }
    );

    return result;
  }

  function contentToText(content) {
    return Object.values(
      normalizeContent(content)
    ).filter(Boolean).join("\n\n");
  }

  function countWords(value) {
    return safeText(value)
      .split(/\s+/)
      .filter(Boolean)
      .length;
  }

  function normalizeSkill(value) {
    return safeText(value)
      .normalize("NFC")
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  function cleanSkills(value) {
    const skills = safeText(value)
      .split(/[,;\n|•]+/)
      .map(item => item.trim())
      .filter(Boolean);

    const seen = new Set();

    const unique = skills.filter(skill => {
      const key = normalizeSkill(skill);

      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    });

    return {
      originalCount: skills.length,
      uniqueCount: unique.length,
      removedCount: skills.length - unique.length,
      skills: unique,
      text: unique.join(", ")
    };
  }

  function cleanFormatting(value) {
    return safeText(value)
      .replace(/\r\n?/g, "\n")
      .split("\n")
      .map(line =>
        line.trim().replace(/[ \t]+/g, " ")
      )
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function optimizeFormatting(input) {
    const content = normalizeContent(input);

    const optimized = {};

    Object.keys(FIELDS).forEach(key => {
      optimized[key] = cleanFormatting(
        content[key]
      );
    });

    const skillResult = cleanSkills(
      optimized.skills
    );

    optimized.skills = skillResult.text;

    const changedFields = Object.keys(FIELDS)
      .filter(key =>
        content[key] !== optimized[key]
      );

    return {
      content: optimized,
      changedFields,
      duplicatesRemoved:
        skillResult.removedCount,
      changed: changedFields.length > 0
    };
  }

  function createSuggestion(
    id,
    category,
    priority,
    message,
    language,
    details = {}
  ) {
    return {
      id,
      category,
      categoryLabel: t(category, language),
      priority,
      priorityLabel: t(priority, language),
      message,
      details
    };
  }

  function analyze(options = {}) {

    const language = normalizeLanguage(
      options.language || getLanguage()
    );

    const explicitText = safeText(
      options.resumeText
    );

    const content = normalizeContent(
      options.content ||
      (explicitText ? {} : readBuilder())
    );

    const resumeText =
      explicitText || contentToText(content);

    const jobDescription = safeText(
      options.jobDescription
    );

    if (!resumeText) {
      return {
        ok: false,
        version: VERSION,
        reason: "empty",
        message: t("empty", language)
      };
    }

    const careerEngine =
      window.WorknelyCareerIntelligence;

    const skillEngine =
      window.WorknelySkillGap;

    if (
      typeof careerEngine?.analyze !== "function"
    ) {
      return {
        ok: false,
        version: VERSION,
        reason: "engineUnavailable",
        message: t(
          "engineUnavailable", language
        )
      };
    }

    const career = careerEngine.analyze({
      content,
      resumeText,
      jobDescription,
      language
    });

    if (!career?.ok) {
      return {
        ok: false,
        version: VERSION,
        reason: career?.reason || "analysisFailed",
        message: career?.message ||
          t("engineUnavailable", language)
      };
    }

    const skillGap =
      jobDescription &&
      typeof skillEngine?.analyze === "function"

        ? skillEngine.analyze({
            content,
            resumeText,
            jobDescription,
            language,
            emit: false
          })

        : null;

    const suggestions = [];

    function add(
      id,
      category,
      priority,
      message,
      details = {}
    ) {
      if (
        suggestions.some(item => item.id === id)
      ) return;

      suggestions.push(
        createSuggestion(
          id,
          category,
          priority,
          message,
          language,
          details
        )
      );
    }

    const structured = Object.values(content)
      .some(Boolean);

    /* STRUCTURE OPTIMIZATION */

    if (structured && career.structure) {

      const missing = career.structure.missing;

      const fieldMessages = {
        fullName: "missingName",
        professionalTitle: "missingTitle",
        contact: "missingContact",
        education: "missingEducation",
        summary: "missingSummary",
        experience: "missingExperience",
        skills: "missingSkills"
      };

      missing.forEach(field => {

        const priority = [
          "fullName",
          "contact",
          "professionalTitle",
          "experience"
        ].includes(field)
          ? "high" : "medium";

        add(
          "missing-" + field,
          "structure",
          priority,
          careerEngine.t(
            fieldMessages[field],
            language
          ),
          { field }
        );
      });

      if (
        content.contact &&
        !career.structure.contactValid
      ) {
        add(
          "invalid-contact",
          "contact",
          "high",
          careerEngine.t(
            "missingContact",
            language
          ),
          { field: "contact" }
        );
      }
    }

    /* SUMMARY OPTIMIZATION */

    if (structured) {
      const summaryWords =
        countWords(content.summary);

      if (summaryWords < 20) {
        add(
          "improve-summary",
          "summary",
          "medium",
          t("improveSummary", language),
          { field: "summary", summaryWords }
        );
      }

      if (summaryWords > 100) {
        add(
          "shorten-summary",
          "summary",
          "medium",
          t("shortenSummary", language),
          { field: "summary", summaryWords }
        );
      }
    }

    /* EXPERIENCE OPTIMIZATION */

    if (
      structured &&
      countWords(content.experience) < 40
    ) {
      add(
        "improve-experience",
        "experience",
        "medium",
        t("improveExperience", language),
        { field: "experience" }
      );
    }

    /* VERIFIED ACHIEVEMENTS */

    if (
      (career.achievements?.count || 0) < 2
    ) {
      add(
        "improve-achievements",
        "achievements",
        "medium",
        t("improveAchievements", language),
        {
          detected:
            career.achievements?.count || 0
        }
      );
    }

    /* KEYWORD OPTIMIZATION */

    const missingKeywords = Array.isArray(
      career.missingKeywords
    )
      ? career.missingKeywords.slice(0, 15)
      : [];

    if (
      jobDescription &&
      missingKeywords.length
    ) {
      add(
        "review-keywords",
        "keywords",
        "medium",
        t("improveKeywords", language),
        { keywords: missingKeywords }
      );
    }

    /* SKILL GAP INTEGRATION */

    if (
      skillGap?.ok &&
      skillGap.available &&
      skillGap.missingSkills?.length
    ) {

      const highPriority =
        skillGap.highPriorityGaps || [];

      add(
        "review-skill-gaps",
        "skills",
        highPriority.length
          ? "high" : "medium",
        t("improveSkills", language),
        {
          skills: skillGap.missingSkills
            .slice(0, 15)
            .map(skill => ({
              id: skill.id,
              name: skill.name,
              priority: skill.priority
            })),
          highPriorityCount:
            highPriority.length
        }
      );
    }

    /* READABILITY OPTIMIZATION */

    if (
      career.readability
        ?.longParagraphCount > 0
    ) {
      add(
        "improve-readability",
        "readability",
        "medium",
        t("improveReadability", language),
        {
          longParagraphs:
            career.readability.longParagraphCount
        }
      );
    }

    /* SAFE FORMATTING PREVIEW */

    const formatting = structured
      ? optimizeFormatting(content)
      : null;

    if (formatting?.duplicatesRemoved > 0) {
      add(
        "remove-duplicate-skills",
        "skills",
        "low",
        t("removeDuplicates", language),
        {
          duplicates:
            formatting.duplicatesRemoved
        }
      );
    }

    if (!jobDescription) {
      add(
        "add-job-description",
        "keywords",
        "low",
        t("addJob", language)
      );
    }

    /* PRIORITY RANKING */

    const priorities = {
      high: 3,
      medium: 2,
      low: 1
    };

    suggestions.sort(
      (a, b) =>
        priorities[b.priority] -
        priorities[a.priority]
    );

    const result = {
      ok: true,
      version: VERSION,
      language,

      analysisType: jobDescription
        ? "targeted-optimization"
        : "general-optimization",

      estimatedATSReadiness:
        career.estimatedATSReadiness,

      estimatedSkillCoverage:
        skillGap?.coverage ?? null,

      suggestions,

      suggestionCount:
        suggestions.length,

      highPriorityCount:
        suggestions.filter(
          item => item.priority === "high"
        ).length,

      mediumPriorityCount:
        suggestions.filter(
          item => item.priority === "medium"
        ).length,

      lowPriorityCount:
        suggestions.filter(
          item => item.priority === "low"
        ).length,

      missingKeywords,

      formattingPreview: formatting,

      skillGapAvailable:
        Boolean(skillGap?.available),

      message: suggestions.length
        ? t("review", language)
        : t("noIssues", language),

      disclaimer:
        t("disclaimer", language),

      generatedAt:
        new Date().toISOString()
    };

    if (options.emit !== false) {
      document.dispatchEvent(
        new CustomEvent(
          "worknely:optimizationcomplete",
          {
            detail: {
              version: VERSION,
              suggestionCount:
                result.suggestionCount,
              highPriorityCount:
                result.highPriorityCount,
              estimatedATSReadiness:
                result.estimatedATSReadiness
            }
          }
        )
      );
    }

    return result;
  }

  /* EXPLICIT USER-APPROVED FORMATTING */

  function applyFormattingToBuilder(
    options = {}
  ) {
    if (options.confirmed !== true) {
      return {
        ok: false,
        reason: "confirmationRequired"
      };
    }

    const missingFields = Object.values(FIELDS)
      .filter(id =>
        !document.getElementById(id)
      );

    if (missingFields.length) {
      return {
        ok: false,
        reason: "builderUnavailable"
      };
    }

    const current = readBuilder();

    const result = optimizeFormatting(current);

    result.changedFields.forEach(key => {

      const element = document.getElementById(
        FIELDS[key]
      );

      element.value = result.content[key];

      element.dispatchEvent(
        new Event("input", {
          bubbles: true
        })
      );

      element.dispatchEvent(
        new Event("change", {
          bubbles: true
        })
      );
    });

    if (result.changed) {

      document.dispatchEvent(
        new CustomEvent(
          "worknely:resumechange",
          {
            detail: {
              source: "resume-optimizer",
              version: VERSION
            }
          }
        )
      );

      window.WorknelyLivePreview
        ?.refresh?.();
    }

    return {
      ok: true,
      version: VERSION,
      changed: result.changed,
      changedFields: result.changedFields,
      duplicatesRemoved:
        result.duplicatesRemoved
    };
  }

  /* BUILDER AND COMPARISON INTEGRATION */

  function analyzeBuilder(
    jobDescription = ""
  ) {
    return analyze({
      content: readBuilder(),
      jobDescription,
      language: getLanguage()
    });
  }

  function analyzeComparison() {
    return analyze({
      content: {},
      resumeText:
        document.getElementById("resume")
          ?.value || "",
      jobDescription:
        document.getElementById("job")
          ?.value || "",
      language: getLanguage()
    });
  }

  /* DEPENDENCY STATUS */

  function getState() {
    return {
      version: VERSION,
      ready: Boolean(
        window.WorknelyCareerIntelligence
          ?.analyze
      ),
      careerEngineVersion:
        window.WorknelyCareerIntelligence
          ?.version || null,
      skillEngineVersion:
        window.WorknelySkillGap
          ?.version || null,
      supportedLanguages: LANGUAGES.length,
      processing: "local",
      externalAI: false,
      automaticFabrication: false,
      confirmationRequired: true
    };
  }

  /* INTERNAL SELF-TEST */

  function selfTest() {

    const formatting = optimizeFormatting({
      fullName: "Alex Morgan",
      summary: "Experienced   developer.",
      skills: "JavaScript, HTML, javascript, CSS"
    });

    const checks = {

      duplicateRemoval:
        formatting.duplicatesRemoved === 1,

      formattingCleanup:
        formatting.content.summary ===
        "Experienced developer.",

      namePreservation:
        formatting.content.fullName ===
        "Alex Morgan",

      skillPreservation:
        formatting.content.skills ===
        "JavaScript, HTML, CSS",

      emptyProtection:
        analyze({
          content: {},
          resumeText: "",
          emit: false
        }).ok === false,

      confirmationProtection:
        applyFormattingToBuilder().reason ===
        "confirmationRequired",

      multilingualSupport:
        LANGUAGES.every(language =>
          t("title", language) !== "title"
        )
    };

    const dependenciesReady =
      getState().ready &&
      typeof window.WorknelySkillGap
        ?.analyze === "function";

    if (dependenciesReady) {

      const result = analyze({
        content: {
          fullName: "Alex Morgan",
          professionalTitle: "Developer",
          contact: "alex@example.com",
          education: "Computer Science",
          summary: "Software developer.",
          experience: "Developed 12 projects.",
          skills: "JavaScript, HTML"
        },
        jobDescription:
          "JavaScript required.\n" +
          "Python mandatory.",
        language: "en",
        emit: false
      });

      checks.integratedAnalysis =
        result.ok === true;

      checks.skillGapIntegration =
        result.skillGapAvailable === true;

      checks.priorityDetection =
        result.suggestions?.some(
          item =>
            item.id === "review-skill-gaps" &&
            item.priority === "high"
        ) === true;
    }

    return {
      version: VERSION,
      passed:
        Object.values(checks).every(Boolean),
      dependenciesReady,
      integrationTested: dependenciesReady,
      checks
    };
  }

  /* PUBLIC OPTIMIZATION API */

  window.WorknelyResumeOptimizer =
    Object.freeze({

      version: VERSION,

      languages: LANGUAGES,

      getLanguage,

      t,

      readBuilder,

      cleanSkills,

      cleanFormatting,

      optimizeFormatting,

      analyze,

      analyzeBuilder,

      analyzeComparison,

      applyFormattingToBuilder,

      selfTest,

      getState

    });

  document.dispatchEvent(
    new CustomEvent(
      "worknely:resumeoptimizerready",
      {
        detail: getState()
      }
    )
  );

  console.info(
    "Worknely V" + VERSION +
    " Smart Resume Optimization initialized."
  );

})();

/*
 * END WORKNELY V7.17.3
 *
 * Smart Resume Optimization
 * Verified Professional Information
 * Career Intelligence Integration
 * International Localization
 * Privacy-First Architecture
 * People Technology
 */
