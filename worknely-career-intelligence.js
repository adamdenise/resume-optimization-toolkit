/*
 * WORKNELY V7.18.1.1
 * Advanced ATS Intelligence Engine
 * International Career Intelligence
 * Local Processing Architecture
 * People Technology
 */

(function () {

  "use strict";

  const VERSION = "7.18.1.1";

  const LANGUAGES = Object.freeze([
    "en", "ro", "it", "de", "fr", "es"
  ]);

  const FIELD_KEYS = Object.freeze([
    "fullName",
    "professionalTitle",
    "contact",
    "education",
    "summary",
    "experience",
    "skills"
  ]);

  const WEIGHTS = Object.freeze({
    structure: 25,
    relevance: 35,
    skills: 20,
    achievements: 10,
    readability: 10
  });

  const STOP_WORDS = new Set(`
    the and for with from that this your
    you are our will have has was were
    can must should would about into
    their them they all any more other
    de la si sau din pentru care este
    sunt prin intre unei unui acest
    aceasta cele unui avea fost
    che della delle degli con per una
    uno sono essere nella nelle alla
    alle dal del dei come anche
    der die das und mit fur von den
    dem des ein eine einer ist sind
    oder auf bei als auch durch
    les des une dans pour avec sur
    est sont par aux qui que vous
    votre nous cette ces ses
    los las del una para con por
    que como sus este esta desde
    sobre entre ser son tiene
  `.trim().split(/\s+/));

  const DICTIONARY = {

    structure: [
      "Resume structure",
      "Structura CV-ului",
      "Struttura del curriculum",
      "Lebenslaufstruktur",
      "Structure du CV",
      "Estructura del currículum"
    ],

    relevance: [
      "Job relevance",
      "Relevanță pentru post",
      "Pertinenza professionale",
      "Stellenrelevanz",
      "Pertinence professionnelle",
      "Relevancia profesional"
    ],

    skills: [
      "Skills alignment",
      "Compatibilitatea competențelor",
      "Compatibilità delle competenze",
      "Kompetenzübereinstimmung",
      "Correspondance des compétences",
      "Compatibilidad de competencias"
    ],

    achievements: [
      "Measurable achievements",
      "Realizări măsurabile",
      "Risultati misurabili",
      "Messbare Erfolge",
      "Résultats mesurables",
      "Logros medibles"
    ],

    readability: [
      "Content readability",
      "Lizibilitatea conținutului",
      "Leggibilità del contenuto",
      "Lesbarkeit",
      "Lisibilité du contenu",
      "Legibilidad del contenido"
    ],

    excellent: [
      "Excellent readiness",
      "Pregătire excelentă",
      "Preparazione eccellente",
      "Ausgezeichnete Vorbereitung",
      "Excellente préparation",
      "Preparación excelente"
    ],

    strong: [
      "Strong readiness",
      "Pregătire bună",
      "Buona preparazione",
      "Gute Vorbereitung",
      "Bonne préparation",
      "Buena preparación"
    ],

    moderate: [
      "Moderate readiness",
      "Pregătire moderată",
      "Preparazione moderata",
      "Mittlere Vorbereitung",
      "Préparation modérée",
      "Preparación moderada"
    ],

    weak: [
      "Needs improvement",
      "Necesită îmbunătățiri",
      "Da migliorare",
      "Verbesserungsbedarf",
      "À améliorer",
      "Necesita mejoras"
    ],

    missingName: [
      "Add your full name.",
      "Adaugă numele complet.",
      "Aggiungi il nome completo.",
      "Vollständigen Namen hinzufügen.",
      "Ajoutez votre nom complet.",
      "Añade tu nombre completo."
    ],

    missingTitle: [
      "Add a clear professional title.",
      "Adaugă un titlu profesional clar.",
      "Aggiungi un titolo professionale chiaro.",
      "Berufsbezeichnung hinzufügen.",
      "Ajoutez un titre professionnel clair.",
      "Añade un título profesional claro."
    ],

    missingContact: [
      "Include valid contact information.",
      "Include informații de contact valide.",
      "Inserisci recapiti validi.",
      "Gültige Kontaktdaten hinzufügen.",
      "Ajoutez des coordonnées valides.",
      "Incluye datos de contacto válidos."
    ],

    missingSummary: [
      "Write a targeted professional summary.",
      "Scrie un rezumat profesional relevant.",
      "Scrivi un profilo professionale mirato.",
      "Berufliches Profil hinzufügen.",
      "Rédigez un profil professionnel ciblé.",
      "Redacta un perfil profesional específico."
    ],

    missingExperience: [
      "Describe your relevant experience.",
      "Descrie experiența profesională relevantă.",
      "Descrivi la tua esperienza pertinente.",
      "Relevante Berufserfahrung beschreiben.",
      "Décrivez votre expérience pertinente.",
      "Describe tu experiencia relevante."
    ],

    missingEducation: [
      "Include relevant education or training.",
      "Include studiile sau cursurile relevante.",
      "Inserisci formazione pertinente.",
      "Relevante Ausbildung hinzufügen.",
      "Ajoutez votre formation pertinente.",
      "Incluye formación relevante."
    ],

    missingSkills: [
      "Add relevant professional skills.",
      "Adaugă competențe profesionale relevante.",
      "Aggiungi competenze professionali pertinenti.",
      "Relevante Kompetenzen hinzufügen.",
      "Ajoutez des compétences pertinentes.",
      "Añade competencias profesionales relevantes."
    ],

    improveKeywords: [
      "Include missing job keywords only when they reflect your actual experience.",
      "Include cuvintele-cheie lipsă doar dacă reflectă experiența ta reală.",
      "Inserisci le parole chiave mancanti solo se corrispondono alla tua esperienza.",
      "Fehlende Schlüsselwörter nur bei tatsächlicher Erfahrung ergänzen.",
      "Ajoutez les mots-clés manquants uniquement s'ils correspondent à votre expérience.",
      "Incluye palabras clave faltantes solo si reflejan tu experiencia real."
    ],

    improveAchievements: [
      "Add measurable achievements supported by real results.",
      "Adaugă realizări cuantificabile bazate pe rezultate reale.",
      "Aggiungi risultati misurabili e verificabili.",
      "Messbare und belegbare Erfolge hinzufügen.",
      "Ajoutez des résultats mesurables et vérifiables.",
      "Añade logros medibles y verificables."
    ],

    improveLength: [
      "Provide more relevant professional details.",
      "Adaugă mai multe detalii profesionale relevante.",
      "Aggiungi maggiori dettagli professionali.",
      "Weitere relevante Berufsdetails hinzufügen.",
      "Ajoutez davantage de détails professionnels.",
      "Añade más detalles profesionales relevantes."
    ],

    improveReadability: [
      "Use shorter paragraphs and clear bullet points.",
      "Folosește paragrafe scurte și puncte clare.",
      "Usa paragrafi brevi ed elenchi chiari.",
      "Kurze Absätze und klare Aufzählungen verwenden.",
      "Utilisez des paragraphes courts et des listes claires.",
      "Utiliza párrafos cortos y listas claras."
    ],

    noJob: [
      "Add a job description to calculate job compatibility.",
      "Adaugă descrierea postului pentru calcularea compatibilității.",
      "Aggiungi una descrizione del lavoro.",
      "Stellenbeschreibung hinzufügen.",
      "Ajoutez une description du poste.",
      "Añade una descripción del puesto."
    ],

    empty: [
      "Add resume content before starting the analysis.",
      "Adaugă conținutul CV-ului înainte de analiză.",
      "Aggiungi il contenuto del curriculum.",
      "Lebenslaufinhalte hinzufügen.",
      "Ajoutez le contenu du CV.",
      "Añade el contenido del currículum."
    ],

    disclaimer: [
      "Estimated readiness based on local analysis. Not an employer ATS result.",
      "Estimare bazată pe analiză locală. Nu reprezintă rezultatul ATS al unui angajator.",
      "Stima basata su analisi locale. Non è un risultato ATS del datore di lavoro.",
      "Lokale Schätzung. Kein ATS-Ergebnis eines Arbeitgebers.",
      "Estimation locale. Ne constitue pas un résultat ATS employeur.",
      "Estimación local. No representa un resultado ATS del empleador."
    ]

  };

  function normalizeLanguage(value) {

    const language = String(value || "en")
      .toLowerCase()
      .split("-")[0];

    return LANGUAGES.includes(language)
      ? language
      : "en";

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

  function normalizeText(value) {

    return safeText(value)

      .normalize("NFD")

      .replace(/[\u0300-\u036f]/g, "")

      .toLowerCase()

      .replace(/c\+\+/g, "cplusplus")

      .replace(/c#/g, "csharp")

      .replace(/\.net\b/g, "dotnet")

      .replace(/node\.js/g, "nodejs")

      .replace(/react\.js/g, "react")

      .replace(/[^\p{L}\p{N}\s]/gu, " ")

      .replace(/\s+/g, " ")

      .trim();

  }

  function tokenize(value) {

    const text = normalizeText(value);

    return text
      ? text.split(/\s+/).filter(Boolean)
      : [];

  }

  function clamp(value, min = 0, max = 100) {

    const number = Number(value);

    return Number.isFinite(number)
      ? Math.min(max, Math.max(min, number))
      : min;

  }

  function round(value) {

    return Math.round(clamp(value));

  }

  function unique(values) {

    return [...new Set(values)];

  }

  function normalizeContent(input) {

    const source =
      input &&
      typeof input === "object"
        ? input
        : {};

    const aliases = {

      fullName: ["fullName", "name", "bName"],

      professionalTitle: [
        "professionalTitle", "title", "bTitle"
      ],

      contact: ["contact", "bContact"],

      education: ["education", "bEducation"],

      summary: ["summary", "bSummary"],

      experience: ["experience", "bExperience"],

      skills: ["skills", "bSkills"]

    };

    const result = {};

    FIELD_KEYS.forEach(key => {

      result[key] = "";

      for (const alias of aliases[key]) {

        const value = safeText(source[alias]);

        if (value) {

          result[key] = value;

          break;

        }

      }

    });

    return result;

  }

  function contentToText(content) {

    const normalized =
      normalizeContent(content);

    return FIELD_KEYS

      .map(key => normalized[key])

      .filter(Boolean)

      .join("\n\n");

  }

  function readBuilder() {

    const ids = {

      fullName: "bName",

      professionalTitle: "bTitle",

      contact: "bContact",

      education: "bEducation",

      summary: "bSummary",

      experience: "bExperience",

      skills: "bSkills"

    };

    const content = {};

    Object.entries(ids).forEach(
      ([key, id]) => {

        content[key] = safeText(
          document.getElementById(id)?.value
        );

      }
    );

    return normalizeContent(content);

  }


  /* ADVANCED PROFESSIONAL KEYWORD INTELLIGENCE */

  const PROFESSIONAL_TERMS = [
    ["google analytics", "ga4", "google analytics 4"],
    ["google ads", "google adwords"],
    ["content marketing", "marketing de continut", "marketing dei contenuti", "marketing de contenidos"],
    ["digital marketing", "marketing digital", "marketing digitale", "digitales marketing"],
    ["email marketing", "e mail marketing"],
    ["social media management", "gestion des reseaux sociaux", "gestione social media"],
    ["search engine optimization", "seo"],
    ["keyword research", "cercetarea cuvintelor cheie"],
    ["campaign management", "gestion des campagnes", "gestione campagne"],
    ["campaign optimization", "optimizarea campaniilor"],
    ["data analysis", "analiza datelor", "analisi dei dati", "datenanalyse", "analyse de donnees", "analisis de datos"],
    ["communication skills", "competente de comunicare", "capacita comunicative", "kommunikationsfahigkeit", "competences en communication", "habilidades de comunicacion"],
    ["analytical skills", "competente analitice", "capacita analitiche", "analytische fahigkeiten"],
    ["customer relationship management", "crm"],
    ["project management", "management de proiect", "gestione progetti", "projektmanagement", "gestion de projet", "gestion de proyectos"],
    ["team leadership", "team management"],
    ["problem solving", "rezolvarea problemelor", "risoluzione dei problemi", "problemlosung", "resolution de problemes", "resolucion de problemas"],
    ["time management", "gestionarea timpului"],
    ["customer service", "servizio clienti", "kundenservice", "service client", "atencion al cliente"],
    ["software development", "sviluppo software", "softwareentwicklung"],
    ["software developer"],
    ["web development", "sviluppo web"],
    ["javascript", "js"],
    ["typescript"],
    ["python"],
    ["java"],
    ["html"],
    ["css"],
    ["sql"],
    ["cplusplus"],
    ["csharp"],
    ["dotnet"],
    ["nodejs"],
    ["react"],
    ["angular"],
    ["vue"],
    ["git"],
    ["github"],
    ["docker"],
    ["kubernetes"],
    ["rest api"],
    ["machine learning", "apprentissage automatique"],
    ["artificial intelligence", "inteligenta artificiala", "intelligenza artificiale", "intelligence artificielle"],
    ["cybersecurity", "cyber security"],
    ["cloud computing"],
    ["microsoft excel", "excel"],
    ["microsoft word"],
    ["financial reporting"],
    ["financial analysis", "analiza financiara"],
    ["accounting", "contabilitate", "contabilita", "buchhaltung", "comptabilite", "contabilidad"],
    ["bookkeeping"],
    ["budget management"],
    ["payroll"],
    ["risk management"],
    ["patient care", "ingrijirea pacientilor", "assistenza ai pazienti", "patientenpflege", "soins aux patients", "atencion al paciente"],
    ["nursing", "assistenza infermieristica", "krankenpflege", "soins infirmiers", "enfermeria"],
    ["infection control", "controlul infectiilor"],
    ["first aid", "prim ajutor", "primo soccorso", "erste hilfe", "premiers secours", "primeros auxilios"],
    ["medication administration", "administrarea medicamentelor"],
    ["vital signs", "semne vitale", "parametri vitali"],
    ["construction safety", "sicurezza sul lavoro"],
    ["masonry", "zidarie", "muratura", "mauerwerk", "maconnerie", "albanileria"],
    ["bricklaying"],
    ["concrete work", "lavori in calcestruzzo"],
    ["formwork", "cofraje", "casseratura", "schalung"],
    ["welding", "sudura", "saldatura", "schweissen", "soudage", "soldadura"],
    ["plumbing", "instalatii sanitare"],
    ["electrical installation", "impianti elettrici"],
    ["technical drawings", "disegno tecnico"],
    ["inventory management"],
    ["supply chain management"],
    ["warehouse management"],
    ["forklift operation"],
    ["quality control", "controlul calitatii", "controllo qualita", "qualitatskontrolle", "controle qualite", "control de calidad"],
    ["food safety", "siguranta alimentara", "sicurezza alimentare"],
    ["haccp"],
    ["food preparation"],
    ["hospitality management"],
    ["recruitment", "recrutare", "selezione del personale"],
    ["human resources", "resurse umane", "risorse umane", "ressources humaines", "recursos humanos"],
    ["talent acquisition"],
    ["employee relations"],
    ["classroom management"],
    ["lesson planning"],
    ["curriculum development"],
    ["sales management"],
    ["lead generation"],
    ["negotiation", "negociere", "negoziazione"],
    ["business development"],
    ["strategic planning"],
    ["performance reporting"],
    ["teamwork", "lucru in echipa", "lavoro di squadra", "travail en equipe", "trabajo en equipo"]
  ];

  const EXTRA_STOP_WORDS = new Set((
    "a an i me my we us it its he she his her is am be been being " +
    "in on at to of as by or if so not but up out over under " +
    "who what when where which how looking seeking hiring required " +
    "preferred essential desirable strong excellent good ability " +
    "experience experienced skills skill knowledge candidate candidates " +
    "role position job work working years year responsibilities requirements " +
    "company team join opportunity successful relevant including such " +
    "minimum maximum demonstrated proven ideally also using use " +
    "un o al ai ale pe cu se sa mai mult foarte cautam cauta " +
    "cerinte responsabilitati necesar necesara obligatoriu experienta " +
    "candidat candidati post functie cunostinte competente abilitati " +
    "il lo gli le di da a e o un si nel sul sulla tra fra " +
    "richiesto richiesta requisiti esperienza candidato capacita " +
    "cerchiamo lavoro posizione conoscenza ottima buona " +
    "zu im am an es er sie wir ihr ich nicht fur zum zur " +
    "gesucht erfahrung kenntnisse erforderlich voraussetzungen " +
    "bewerber stelle aufgaben gute sehr " +
    "le du un et en au ce il elle ils elles on ne pas " +
    "recherche rechercheons recherchons requis requise experience " +
    "candidat poste missions competences connaissances bonne " +
    "el y en a un se al lo su nos no es muy " +
    "buscamos buscamos experiencia requerido requerida requisitos " +
    "candidato puesto habilidades conocimientos excelente"
  ).trim().split(/\s+/));

  function professionalIndex(text) {
    const normalized = " " + normalizeText(text) + " ";
    const counts = new Map();
    const covered = new Set();

    PROFESSIONAL_TERMS.forEach(group => {
      let frequency = 0;

      group.forEach(alias => {
        const phrase = normalizeText(alias);
        const needle = " " + phrase + " ";
        let start = 0;
        let found = 0;

        while ((start = normalized.indexOf(needle, start)) !== -1) {
          found++;
          start += needle.length - 1;
        }

        if (found) {
          frequency += found;
          phrase.split(" ").forEach(word => covered.add(word));
        }
      });

      if (frequency) {
        counts.set(group[0], frequency);
      }
    });

    return { counts, covered, normalized };
  }

  function extractKeywords(text, limit = 40) {
    const index = professionalIndex(text);
    const frequencies = new Map();

    tokenize(text).forEach(word => {
      if (
        word.length < 2 ||
        STOP_WORDS.has(word) ||
        EXTRA_STOP_WORDS.has(word) ||
        index.covered.has(word) ||
        /^\d+$/.test(word)
      ) return;

      frequencies.set(word, (frequencies.get(word) || 0) + 1);
    });

    const recognized = [...index.counts.entries()]
      .map(([keyword, frequency]) => ({
        keyword,
        frequency,
        recognized: true
      }));

    const fallback = [...frequencies.entries()]
      .map(([keyword, frequency]) => ({
        keyword,
        frequency,
        recognized: false
      }));

    return [...recognized, ...fallback]
      .sort((a, b) =>
        Number(b.recognized) - Number(a.recognized) ||
        b.frequency - a.frequency ||
        a.keyword.localeCompare(b.keyword)
      )
      .slice(0, clamp(limit, 1, 100));
  }

  function analyzeKeywords(resume, job) {
    const resumeIndex = professionalIndex(resume);
    const resumeTokens = new Set(tokenize(resume));
    const keywords = extractKeywords(job, 40);

    const matched = [];
    const missing = [];

    let totalWeight = 0;
    let matchedWeight = 0;

    keywords.forEach(item => {
      const weight =
        Math.min(item.frequency, 3) *
        (item.recognized ? 3 : 1);

      const present = item.recognized
        ? resumeIndex.counts.has(item.keyword)
        : resumeTokens.has(item.keyword);

      totalWeight += weight;

      if (present) {
        matched.push(item.keyword);
        matchedWeight += weight;
      } else {
        missing.push(item.keyword);
      }
    });

    return {
      available: keywords.length > 0,
      score: totalWeight
        ? round(matchedWeight / totalWeight * 100)
        : null,
      total: keywords.length,
      matched,
      missing,
      matchedCount: matched.length,
      missingCount: missing.length
    };
  }

  function analyzeStructure(content) {

    const data = normalizeContent(content);

    const rules = [

      ["fullName", 10, "missingName"],

      ["professionalTitle", 10, "missingTitle"],

      ["contact", 15, "missingContact"],

      ["summary", 15, "missingSummary"],

      ["experience", 25, "missingExperience"],

      ["education", 10, "missingEducation"],

      ["skills", 15, "missingSkills"]

    ];

    let score = 0;

    const findings = [];

    const completed = [];

    rules.forEach(([key, weight, message]) => {

      if (data[key].length > 0) {

        score += weight;

        completed.push(key);

      } else {

        findings.push(message);

      }

    });

    const contactValid =

      /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i
        .test(data.contact) ||

      /(?:\+?\d[\d\s().-]{6,}\d)/
        .test(data.contact);

    if (data.contact && !contactValid) {

      score -= 8;

      findings.push("missingContact");

    }

    return {

      score: round(score),

      completed,

      missing: FIELD_KEYS.filter(
        key => !data[key]
      ),

      findings,

      contactValid,

      completionRate: round(

        completed.length /
        FIELD_KEYS.length * 100

      )

    };

  }


  function analyzeSkills(content, job) {
    const data = normalizeContent(content);

    const skills = unique(
      data.skills
        .split(/[,;\n|•]+/)
        .map(value => value.trim())
        .filter(Boolean)
    ).slice(0, 100);

    const jobIndex = professionalIndex(job);

    const matched = skills.filter(skill => {
      const phrase = normalizeText(skill);
      if (!phrase) return false;

      const group = PROFESSIONAL_TERMS.find(
        aliases => aliases.some(
          alias => normalizeText(alias) === phrase
        )
      );

      return group
        ? jobIndex.counts.has(group[0])
        : jobIndex.normalized.includes(" " + phrase + " ");
    });

    const unmatched = skills.filter(
      skill => !matched.includes(skill)
    );

    const hasJob = safeText(job).length > 0;

    return {
      available: hasJob && skills.length > 0,
      score: hasJob && skills.length
        ? round(matched.length / skills.length * 100)
        : null,
      listedSkills: skills,
      matchedSkills: matched,
      unmatchedSkills: unmatched,
      skillCount: skills.length
    };
  }

  function analyzeAchievements(content) {

    const data = normalizeContent(content);

    const text = [

      data.summary,

      data.experience

    ].filter(Boolean).join("\n");

    const lines = text

      .split(/\n+|[.!?]\s+/)

      .map(value => value.trim())

      .filter(Boolean);

    const pattern =

      /(?:\d+(?:[.,]\d+)?\s*%|\d+\s*(?:hours?|days?|weeks?|months?|clients?|customers?|projects?|patients?|users?|ore|giorni|clienti|progetti|pacienti|proiecte|clienți|zile|stunden|kunden|projekte|heures|jours|clientes|proyectos)\b|[$€£]\s*\d+|\d+\s*(?:EUR|USD|CHF)\b)/i;

    const measurable = lines.filter(
      line => pattern.test(line)
    );

    return {

      score: round(
        measurable.length * 25
      ),

      count: measurable.length,

      examples: measurable.slice(0, 10),

      findings: measurable.length < 2

        ? ["improveAchievements"]

        : []

    };

  }

  function analyzeReadability(text) {

    const value = safeText(text);

    const words = tokenize(value);

    const paragraphs = value

      .split(/\n+/)

      .map(item => item.trim())

      .filter(Boolean);

    const longParagraphs = paragraphs.filter(

      item => tokenize(item).length > 80

    );

    const wordCount = words.length;

    let score = 100;

    const findings = [];

    if (wordCount < 100) {

      score -= 30;

      findings.push("improveLength");

    } else if (wordCount < 200) {

      score -= 10;

    }

    if (wordCount > 1200) {

      score -= 15;

    }

    if (longParagraphs.length) {

      score -= Math.min(
        30,
        longParagraphs.length * 10
      );

      findings.push("improveReadability");

    }

    if (!wordCount) score = 0;

    return {

      score: round(score),

      wordCount,

      paragraphCount: paragraphs.length,

      longParagraphCount: longParagraphs.length,

      findings

    };

  }

  function getReadinessLevel(score) {

    if (score >= 85) return "excellent";

    if (score >= 70) return "strong";

    if (score >= 50) return "moderate";

    return "weak";

  }

  function calculateWeightedScore(factors) {

    let totalWeight = 0;

    let weightedScore = 0;

    Object.entries(WEIGHTS).forEach(
      ([key, weight]) => {

        const value = factors[key];

        if (

          value === null ||

          value === undefined ||

          !Number.isFinite(value)

        ) return;

        totalWeight += weight;

        weightedScore +=

          clamp(value) * weight;

      }
    );

    return totalWeight

      ? round(weightedScore / totalWeight)

      : 0;

  }

  function analyze(options = {}) {

    const language = normalizeLanguage(

      options.language || getLanguage()

    );

    const content = normalizeContent(

      options.content || readBuilder()

    );

    const resumeText =

      safeText(options.resumeText) ||

      contentToText(content);

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

    const hasStructuredContent =

      FIELD_KEYS.some(key => content[key]);

    const structure =

      analyzeStructure(content);

    const relevance = analyzeKeywords(

      resumeText,

      jobDescription

    );

    const skills = analyzeSkills(

      content,

      jobDescription

    );

    const achievements = analyzeAchievements(

      hasStructuredContent

        ? content

        : { experience: resumeText }

    );

    const readability =

      analyzeReadability(resumeText);

    const factors = {

      structure: hasStructuredContent

        ? structure.score

        : null,

      relevance: relevance.score,

      skills: skills.score,

      achievements: achievements.score,

      readability: readability.score

    };

    const score =

      calculateWeightedScore(factors);

    const level =

      getReadinessLevel(score);

    const recommendationKeys = unique([

      ...(hasStructuredContent

        ? structure.findings

        : []),

      ...achievements.findings,

      ...readability.findings,

      ...(relevance.available &&

        relevance.missing.length

          ? ["improveKeywords"]

          : []),

      ...(!relevance.available

        ? ["noJob"]

        : [])

    ]);

    const result = {

      ok: true,

      version: VERSION,

      language,

      analysisType: relevance.available

        ? "job-alignment"

        : "resume-readiness",

      estimatedScore: score,

      estimatedATSReadiness: score,

      level,

      levelLabel: t(level, language),

      factors: Object.entries(factors)

        .map(([key, value]) => ({

          id: key,

          label: t(key, language),

          score: value,

          available: value !== null,

          weight: WEIGHTS[key]

        })),

      structure: hasStructuredContent

        ? structure

        : null,

      relevance,

      skills,

      achievements,

      readability,

      matchedKeywords: relevance.matched,

      missingKeywords: relevance.missing,

      recommendationKeys,

      recommendations: recommendationKeys.map(

        key => t(key, language)

      ),

      disclaimer: t("disclaimer", language),

      generatedAt: new Date().toISOString()

    };

    document.dispatchEvent(

      new CustomEvent(

        "worknely:careeranalysiscomplete",

        {

          detail: {

            version: VERSION,

            analysisType: result.analysisType,

            estimatedScore: score,

            level

          }

        }

      )

    );

    return result;

  }

  function analyzeBuilder(jobDescription = "") {

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

  function selfTest() {

    const content = {

      fullName: "Alex Morgan",

      professionalTitle: "Software Developer",

      contact: "alex@example.com",

      education: "Computer Science",

      summary: "Experienced software developer.",

      experience:

        "Developed 12 projects. Improved performance by 25%.",

      skills: "JavaScript, HTML, CSS, SQL"

    };

    const job =

      "Software Developer JavaScript HTML CSS SQL Python";

    const result = analyze({

      content,

      jobDescription: job,

      language: "en"

    });

    const checks = {

      analysisSuccessful:

        result.ok === true,

      structureValid:

        result.structure?.score === 100,

      keywordMatching:

        result.matchedKeywords
          ?.includes("javascript"),

      missingKeywordDetection:

        result.missingKeywords
          ?.includes("python"),

      measurableAchievements:

        result.achievements?.count >= 2,

      validScore:

        result.estimatedScore >= 0 &&

        result.estimatedScore <= 100,

      multilingualSupport:

        LANGUAGES.every(

          language =>

            t("structure", language) !==
            "structure"

        ),

      emptyContentProtection:

        analyze({

          content: {},

          resumeText: "",

          jobDescription: ""

        }).ok === false

    };

    return {

      version: VERSION,

      passed: Object.values(checks)
        .every(Boolean),

      checks

    };

  }

  window.WorknelyCareerIntelligence =

    Object.freeze({

      version: VERSION,

      languages: LANGUAGES,

      weights: WEIGHTS,

      getLanguage,

      t,

      normalizeContent,

      normalizeText,

      tokenize,

      extractKeywords,

      analyzeKeywords,

      analyzeStructure,

      analyzeSkills,

      analyzeAchievements,

      analyzeReadability,

      calculateWeightedScore,

      getReadinessLevel,

      readBuilder,

      analyze,

      analyzeBuilder,

      analyzeComparison,

      selfTest,

      getState: () => ({

        version: VERSION,

        ready: true,

        processing: "local",

        externalAI: false,

        supportedLanguages: LANGUAGES.length,

        estimatedScoring: true

      })

    });

  document.dispatchEvent(

    new CustomEvent(

      "worknely:careerintelligenceready",

      {

        detail: {

          version: VERSION,

          ready: true

        }

      }

    )

  );

  console.info(

    "Worknely V" + VERSION +

    " Advanced Career Intelligence initialized."

  );

})();

/*
 * END WORKNELY V7.18.1.1
 *
 * Advanced ATS Intelligence
 * Weighted Career Analysis
 * International Localization
 * Privacy-First Local Processing
 * People Technology
 */
