/*
 * WORKNELY V7.18.1.2
 * Skill Gap Intelligence
 * International Career Development
 * Privacy-First Local Processing
 * People Technology
 */

(function () {

  "use strict";

  const VERSION = "7.18.1.2";

  const LANGUAGES = [
    "en", "ro", "it", "de", "fr", "es"
  ];

  const DICTIONARY = {

    title: [
      "Skill Gap Intelligence",
      "Analiza competențelor",
      "Analisi delle competenze",
      "Kompetenzanalyse",
      "Analyse des compétences",
      "Análisis de competencias"
    ],

    matched: [
      "Matching skills",
      "Competențe compatibile",
      "Competenze corrispondenti",
      "Passende Kompetenzen",
      "Compétences correspondantes",
      "Competencias coincidentes"
    ],

    missing: [
      "Skills to verify or develop",
      "Competențe de verificat sau dezvoltat",
      "Competenze da verificare o sviluppare",
      "Zu prüfende oder entwickelnde Kompetenzen",
      "Compétences à vérifier ou développer",
      "Competencias por verificar o desarrollar"
    ],

    coverage: [
      "Skill coverage",
      "Acoperirea competențelor",
      "Copertura delle competenze",
      "Kompetenzabdeckung",
      "Couverture des compétences",
      "Cobertura de competencias"
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
      "Additional opportunity",
      "Oportunitate suplimentară",
      "Opportunità aggiuntiva",
      "Zusätzliche Möglichkeit",
      "Opportunité supplémentaire",
      "Oportunidad adicional"
    ],

    technical: [
      "Technical skills",
      "Competențe tehnice",
      "Competenze tecniche",
      "Technische Kompetenzen",
      "Compétences techniques",
      "Competencias técnicas"
    ],

    digital: [
      "Digital skills",
      "Competențe digitale",
      "Competenze digitali",
      "Digitale Kompetenzen",
      "Compétences numériques",
      "Competencias digitales"
    ],

    interpersonal: [
      "Interpersonal skills",
      "Competențe interpersonale",
      "Competenze interpersonali",
      "Soziale Kompetenzen",
      "Compétences relationnelles",
      "Competencias interpersonales"
    ],

    management: [
      "Management skills",
      "Competențe manageriale",
      "Competenze manageriali",
      "Managementkompetenzen",
      "Compétences managériales",
      "Competencias de gestión"
    ],

    healthcare: [
      "Healthcare skills",
      "Competențe medicale",
      "Competenze sanitarie",
      "Medizinische Kompetenzen",
      "Compétences médicales",
      "Competencias sanitarias"
    ],

    construction: [
      "Construction skills",
      "Competențe în construcții",
      "Competenze edili",
      "Baukompetenzen",
      "Compétences du bâtiment",
      "Competencias de construcción"
    ],

    commercial: [
      "Commercial skills",
      "Competențe comerciale",
      "Competenze commerciali",
      "Kaufmännische Kompetenzen",
      "Compétences commerciales",
      "Competencias comerciales"
    ],

    languages: [
      "Language skills",
      "Competențe lingvistice",
      "Competenze linguistiche",
      "Sprachkenntnisse",
      "Compétences linguistiques",
      "Competencias lingüísticas"
    ],

    verify: [
      "Verify whether you already have this skill. Add it to your resume only if accurate.",
      "Verifică dacă deții deja această competență. Adaug-o în CV numai dacă este reală.",
      "Verifica se possiedi questa competenza. Inseriscila solo se reale.",
      "Prüfe diese Kompetenz und ergänze sie nur, wenn sie tatsächlich vorhanden ist.",
      "Vérifiez cette compétence et ajoutez-la uniquement si elle est réelle.",
      "Verifica esta competencia y añádela solo si realmente la posees."
    ],

    develop: [
      "Develop this skill through relevant training and practical projects.",
      "Dezvoltă această competență prin cursuri relevante și proiecte practice.",
      "Sviluppa questa competenza con formazione e progetti pratici.",
      "Entwickle diese Kompetenz durch Weiterbildung und praktische Projekte.",
      "Développez cette compétence par la formation et des projets pratiques.",
      "Desarrolla esta competencia mediante formación y proyectos prácticos."
    ],

    emptyResume: [
      "Add resume content first.",
      "Adaugă mai întâi conținutul CV-ului.",
      "Inserisci prima il curriculum.",
      "Füge zuerst Lebenslaufinhalte hinzu.",
      "Ajoutez d'abord votre CV.",
      "Añade primero tu currículum."
    ],

    emptyJob: [
      "Add a job description first.",
      "Adaugă mai întâi descrierea postului.",
      "Inserisci prima la descrizione del lavoro.",
      "Füge zuerst eine Stellenbeschreibung hinzu.",
      "Ajoutez d'abord une offre d'emploi.",
      "Añade primero una descripción del puesto."
    ],

    noSkills: [
      "No supported skills were detected in this job description.",
      "Nu au fost identificate competențe din catalogul disponibil.",
      "Nessuna competenza del catalogo rilevata.",
      "Keine unterstützten Kompetenzen erkannt.",
      "Aucune compétence du catalogue détectée.",
      "No se detectaron competencias del catálogo."
    ],

    disclaimer: [
      "Estimated skill coverage based on recognized terms. Missing evidence does not prove missing ability.",
      "Acoperire estimată pe baza termenilor identificați. Lipsa unei mențiuni nu dovedește lipsa competenței.",
      "Copertura stimata. L'assenza di una menzione non dimostra l'assenza della competenza.",
      "Geschätzte Abdeckung. Fehlende Erwähnung bedeutet nicht fehlende Fähigkeit.",
      "Couverture estimée. Une absence de mention ne prouve pas une absence de compétence.",
      "Cobertura estimada. La ausencia de una mención no demuestra falta de competencia."
    ]

  };

  /* INTERNATIONAL SKILL CATALOG */

  const SKILL_GUIDANCE = {
  "googleads": [
    "Practice creating and optimizing advertising campaigns.",
    "Exersează crearea și optimizarea campaniilor publicitare.",
    "Esercitati a creare e ottimizzare campagne pubblicitarie.",
    "Übe die Erstellung und Optimierung von Werbekampagnen.",
    "Entraînez-vous à créer et optimiser des campagnes publicitaires.",
    "Practica la creación y optimización de campañas publicitarias."
  ],
  "crm": [
    "Practice managing customer records and sales pipelines in a CRM.",
    "Exersează gestionarea clienților și a oportunităților comerciale într-un CRM.",
    "Esercitati a gestire clienti e opportunità in un CRM.",
    "Übe die Verwaltung von Kunden und Verkaufschancen in einem CRM.",
    "Entraînez-vous à gérer les clients et opportunités dans un CRM.",
    "Practica la gestión de clientes y oportunidades en un CRM."
  ],
  "dataanalysis": [
    "Practice interpreting datasets and creating reports.",
    "Exersează interpretarea datelor și realizarea rapoartelor.",
    "Esercitati a interpretare dati e creare report.",
    "Übe die Datenauswertung und Berichterstellung.",
    "Entraînez-vous à interpréter les données et créer des rapports.",
    "Practica la interpretación de datos y la elaboración de informes."
  ],
  "campaignmanagement": [
    "Build a sample campaign plan with objectives and performance indicators.",
    "Construiește un plan de campanie cu obiective și indicatori de performanță.",
    "Crea un piano di campagna con obiettivi e indicatori.",
    "Erstelle einen Kampagnenplan mit Zielen und Kennzahlen.",
    "Créez un plan de campagne avec objectifs et indicateurs.",
    "Crea un plan de campaña con objetivos e indicadores."
  ],
  "communication": [
    "Practice clear professional communication and document real examples.",
    "Exersează comunicarea profesională clară și documentează exemple reale.",
    "Esercitati nella comunicazione professionale e documenta esempi reali.",
    "Übe klare berufliche Kommunikation und dokumentiere Beispiele.",
    "Pratiquez la communication professionnelle et documentez des exemples.",
    "Practica la comunicación profesional y documenta ejemplos reales."
  ],
  "analyticalskills": [
    "Practice interpreting performance indicators and solving practical problems.",
    "Exersează interpretarea indicatorilor de performanță și rezolvarea problemelor practice.",
    "Esercitati a interpretare indicatori e risolvere problemi pratici.",
    "Übe die Interpretation von Kennzahlen und praktische Problemlösung.",
    "Entraînez-vous à interpréter les indicateurs et résoudre des problèmes.",
    "Practica la interpretación de indicadores y la resolución de problemas."
  ],
  "contentmarketing": [
    "Create a content calendar and measure audience engagement.",
    "Creează un calendar editorial și măsoară interacțiunea publicului.",
    "Crea un calendario editoriale e misura il coinvolgimento.",
    "Erstelle einen Redaktionsplan und miss die Interaktionen.",
    "Créez un calendrier éditorial et mesurez les interactions.",
    "Crea un calendario editorial y mide la interacción."
  ],
  "keywordresearch": [
    "Practice grouping search terms by intent.",
    "Exersează gruparea termenilor de căutare după intenție.",
    "Raggruppa le parole chiave per intento.",
    "Gruppiere Suchbegriffe nach Suchintention.",
    "Regroupez les mots-clés par intention.",
    "Agrupa palabras clave según la intención."
  ],
  "performancereporting": [
    "Create a sample report with measurable indicators.",
    "Creează un raport demonstrativ cu indicatori măsurabili.",
    "Crea un report con indicatori misurabili.",
    "Erstelle einen Bericht mit messbaren Kennzahlen.",
    "Créez un rapport avec des indicateurs mesurables.",
    "Crea un informe con indicadores medibles."
  ],
  "campaignoptimization": [
    "Practice comparing campaign results and testing improvements.",
    "Exersează compararea rezultatelor campaniilor și testarea îmbunătățirilor.",
    "Confronta i risultati delle campagne e testa miglioramenti.",
    "Vergleiche Kampagnenergebnisse und teste Verbesserungen.",
    "Comparez les résultats et testez des améliorations.",
    "Compara resultados de campañas y prueba mejoras."
  ]
};

  const CATALOG = [

    ["googleads","digital","Google Ads",["google ads","google adwords"]],
    ["contentmarketing","commercial","Content Marketing",["content marketing","marketing de continut","marketing dei contenuti","content marketing","marketing de contenu","marketing de contenidos"]],
    ["dataanalysis","technical","Data Analysis",["data analysis","analiza datelor","analisi dei dati","datenanalyse","analyse de donnees","analisis de datos"]],
    ["campaignmanagement","commercial","Campaign Management",["campaign management","gestionarea campaniilor","gestione campagne","kampagnenmanagement","gestion des campagnes","gestion de campanas"]],
    ["analyticalskills","interpersonal","Analytical Skills",["analytical skills","analytical abilities","competente analitice","capacita analitiche","analytische fahigkeiten","competences analytiques","habilidades analiticas"]],
    ["keywordresearch","digital","Keyword Research",["keyword research","cercetarea cuvintelor cheie","ricerca parole chiave","keyword recherche","recherche de mots cles","investigacion de palabras clave"]],
    ["performancereporting","digital","Performance Reporting",["performance reporting","raportarea performantei","reportistica delle prestazioni","leistungsberichte","rapports de performance","informes de rendimiento"]],
    ["campaignoptimization","commercial","Campaign Optimization",["campaign optimization","optimizarea campaniilor","ottimizzazione campagne","kampagnenoptimierung","optimisation des campagnes","optimizacion de campanas"]],


    ["javascript", "technical", "JavaScript",
      ["javascript", "js"]],

    ["typescript", "technical", "TypeScript",
      ["typescript"]],

    ["python", "technical", "Python",
      ["python"]],

    ["html", "technical", "HTML",
      ["html", "html5"]],

    ["css", "technical", "CSS",
      ["css", "css3"]],

    ["react", "technical", "React",
      ["react", "reactjs", "react.js"]],

    ["nodejs", "technical", "Node.js",
      ["nodejs", "node.js"]],

    ["sql", "technical", "SQL",
      ["sql", "structured query language"]],

    ["git", "technical", "Git",
      ["git", "version control"]],

    ["github", "technical", "GitHub",
      ["github"]],

    ["java", "technical", "Java",
      ["java"]],

    ["cpp", "technical", "C++",
      ["c++", "cplusplus"]],

    ["csharp", "technical", "C#",
      ["c#", "csharp"]],

    ["php", "technical", "PHP",
      ["php"]],

    ["docker", "technical", "Docker",
      ["docker"]],

    ["kubernetes", "technical", "Kubernetes",
      ["kubernetes", "k8s"]],

    ["aws", "technical", "AWS",
      ["aws", "amazon web services"]],

    ["azure", "technical", "Microsoft Azure",
      ["azure", "microsoft azure"]],

    ["api", "technical", "API Integration",
      ["rest api", "api integration",
       "integrare api", "integrazione api"]],

    ["supabase", "technical", "Supabase",
      ["supabase"]],

    ["firebase", "technical", "Firebase",
      ["firebase"]],

    ["excel", "digital", "Microsoft Excel",
      ["excel", "microsoft excel"]],

    ["word", "digital", "Microsoft Word",
      ["microsoft word", "ms word"]],

    ["powerpoint", "digital", "PowerPoint",
      ["powerpoint"]],

    ["googleworkspace", "digital", "Google Workspace",
      ["google workspace", "google sheets",
       "google docs"]],

    ["canva", "digital", "Canva",
      ["canva"]],

    ["figma", "digital", "Figma",
      ["figma"]],

    ["photoshop", "digital", "Adobe Photoshop",
      ["photoshop"]],

    ["seo", "digital", "SEO",
      ["seo", "search engine optimization"]],

    ["analytics", "digital", "Google Analytics",
      ["google analytics", "ga4"]],

    ["ecommerce", "commercial", "E-commerce",
      ["e-commerce", "ecommerce",
       "comert electronic",
       "commercio elettronico"]],

    ["digitalmarketing", "commercial", "Digital Marketing",
      ["digital marketing", "marketing digital",
       "marketing digitale", "online marketing",
       "marketing numerique"]],

    ["socialmedia", "commercial", "Social Media",
      ["social media", "social networks",
       "retele sociale", "reseaux sociaux",
       "redes sociales"]],

    ["emailmarketing", "commercial", "Email Marketing",
      ["email marketing", "e-mail marketing"]],

    ["crm", "commercial", "CRM",
      ["crm", "customer relationship management"]],

    ["sales", "commercial", "Sales",
      ["sales", "vanzari", "vendite",
       "vertrieb", "vente", "ventas"]],

    ["customerservice", "commercial", "Customer Service",
      ["customer service", "customer support",
       "servicii clienti", "assistenza clienti",
       "kundenservice", "service client",
       "atencion al cliente"]],

    ["communication", "interpersonal", "Communication",
      ["communication", "comunicare",
       "comunicazione", "kommunikation",
       "comunicacion"]],

    ["teamwork", "interpersonal", "Teamwork",
      ["teamwork", "team work",
       "lucru in echipa", "lavoro di squadra",
       "teamarbeit", "travail en equipe",
       "trabajo en equipo"]],

    ["problemsolving", "interpersonal", "Problem Solving",
      ["problem solving", "problem-solving",
       "rezolvarea problemelor",
       "risoluzione dei problemi",
       "problemlosung", "resolution de problemes",
       "resolucion de problemas"]],

    ["adaptability", "interpersonal", "Adaptability",
      ["adaptability", "adaptabilitate",
       "adattabilita", "anpassungsfahigkeit",
       "adaptabilite", "adaptabilidad"]],

    ["attention", "interpersonal", "Attention to Detail",
      ["attention to detail", "atentie la detalii",
       "attenzione ai dettagli",
       "attention aux details",
       "atencion al detalle"]],

    ["leadership", "management", "Leadership",
      ["leadership", "team leadership",
       "fuhrungskompetenz", "liderazgo"]],

    ["projectmanagement", "management", "Project Management",
      ["project management",
       "managementul proiectelor",
       "gestione progetti",
       "projektmanagement",
       "gestion de projet",
       "gestion de proyectos"]],

    ["timemanagement", "management", "Time Management",
      ["time management",
       "gestionarea timpului",
       "gestione del tempo",
       "zeitmanagement",
       "gestion du temps",
       "gestion del tiempo"]],

    ["agile", "management", "Agile",
      ["agile", "agile methodology"]],

    ["scrum", "management", "Scrum",
      ["scrum"]],

    ["budgeting", "management", "Budget Management",
      ["budgeting", "budget management",
       "gestionarea bugetului",
       "gestione del budget",
       "budgetverwaltung",
       "gestion budgetaire"]],

    ["patientcare", "healthcare", "Patient Care",
      ["patient care", "nursing care",
       "ingrijirea pacientilor",
       "assistenza ai pazienti",
       "patientenpflege",
       "soins aux patients",
       "atencion al paciente"]],

    ["firstaid", "healthcare", "First Aid",
      ["first aid", "prim ajutor",
       "primo soccorso", "erste hilfe",
       "premiers secours", "primeros auxilios"]],

    ["infectioncontrol", "healthcare", "Infection Control",
      ["infection control",
       "controlul infectiilor",
       "controllo delle infezioni",
       "infektionskontrolle",
       "controle des infections",
       "control de infecciones"]],

    ["vitals", "healthcare", "Vital Signs",
      ["vital signs", "semne vitale",
       "parametri vitali", "vitalzeichen",
       "signes vitaux", "signos vitales"]],

    ["medicaldocumentation", "healthcare", "Medical Documentation",
      ["medical documentation",
       "documentatie medicala",
       "documentazione sanitaria",
       "medizinische dokumentation",
       "documentation medicale",
       "documentacion medica"]],

    ["medication", "healthcare", "Medication Administration",
      ["medication administration",
       "administrarea medicamentelor",
       "somministrazione farmaci",
       "medikamentengabe",
       "administration des medicaments",
       "administracion de medicamentos"]],

    ["masonry", "construction", "Masonry",
      ["masonry", "zidarie", "muratura",
       "mauerwerk", "maconnerie", "albanileria"]],

    ["formwork", "construction", "Formwork",
      ["formwork", "cofraje", "casseratura",
       "casseforme", "schalung",
       "coffrage", "encofrado"]],

    ["concrete", "construction", "Concrete Work",
      ["concrete", "beton", "calcestruzzo",
       "hormigon"]],

    ["scaffolding", "construction", "Scaffolding",
      ["scaffolding", "schele",
       "ponteggi", "gerustbau",
       "echafaudage", "andamios"]],

    ["welding", "construction", "Welding",
      ["welding", "sudura", "saldatura",
       "schweissen", "soudage", "soldadura"]],

    ["blueprints", "construction", "Blueprint Reading",
      ["blueprint reading",
       "citirea planurilor",
       "lettura disegni tecnici",
       "bauplane lesen",
       "lecture de plans",
       "lectura de planos"]],

    ["safety", "construction", "Workplace Safety",
      ["workplace safety",
       "occupational safety",
       "securitate in munca",
       "sicurezza sul lavoro",
       "arbeitssicherheit",
       "securite au travail",
       "seguridad laboral"]],

    ["english", "languages", "English",
      ["english", "engleza", "inglese",
       "englisch", "anglais", "ingles"]],

    ["italian", "languages", "Italian",
      ["italian", "italiana", "italiano",
       "italienisch", "italien"]],

    ["german", "languages", "German",
      ["german", "germana", "tedesco",
       "deutsch", "allemand", "aleman"]],

    ["french", "languages", "French",
      ["french", "franceza", "francese",
       "franzosisch", "francais", "frances"]],

    ["spanish", "languages", "Spanish",
      ["spanish", "spaniola", "spagnolo",
       "spanisch", "espagnol", "espanol"]],

    ["romanian", "languages", "Romanian",
      ["romanian", "romana", "rumeno",
       "rumanisch", "roumain", "rumano"]]

  ].map(([id, category, name, aliases]) =>

    Object.freeze({

      id,

      category,

      name,

      aliases: Object.freeze(aliases)

    })

  );

  Object.freeze(CATALOG);

  const REQUIRED_TERMS = [

    "required", "mandatory", "essential",
    "must have", "must possess",

    "obligatoriu", "obligatorie",
    "necesar", "cerinte obligatorii",

    "obbligatorio", "obbligatoria",
    "indispensabile", "requisito necessario",

    "erforderlich", "zwingend",
    "voraussetzung",

    "obligatoire", "indispensable",
    "exige",

    "obligatorio", "imprescindible",
    "requisito indispensable"

  ];

  const PREFERRED_TERMS = [

    "preferred", "desirable",
    "nice to have", "optional",

    "preferabil", "constituie avantaj",
    "optional",

    "preferenziale", "gradito",
    "facoltativo",

    "wunschenswert", "von vorteil",
    "optional",

    "souhaite", "apprecie",
    "facultatif",

    "deseable", "preferible",
    "opcional"

  ];

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

  function normalizeLanguage(value) {

    const language = String(value || "en")
      .toLowerCase()
      .split("-")[0];

    return LANGUAGES.includes(language)
      ? language
      : "en";

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

  function normalize(value) {

    return safeText(value)

      .normalize("NFD")

      .replace(/[\u0300-\u036f]/g, "")

      .toLowerCase()

      .replace(/ß/g, "ss")

      .replace(/c\+\+/g, "cplusplus")

      .replace(/c#/g, "csharp")

      .replace(/node\.js/g, "nodejs")

      .replace(/react\.js/g, "reactjs")

      .replace(/[^\p{L}\p{N}\s]/gu, " ")

      .replace(/\s+/g, " ")

      .trim();

  }

  function containsPhrase(text, phrase) {

    const normalizedPhrase =
      normalize(phrase);

    if (!normalizedPhrase) return false;

    return (

      " " + text + " "

    ).includes(

      " " + normalizedPhrase + " "

    );

  }

  function skillExists(text, skill) {

    return skill.aliases.some(

      alias => containsPhrase(text, alias)

    );

  }

  function detectSkills(text) {

    const normalized = normalize(text);

    if (!normalized) return [];

    return CATALOG.filter(

      skill => skillExists(normalized, skill)

    );

  }

  function contentToText(content) {

    if (!content ||
        typeof content !== "object") {

      return "";

    }

    const keys = [

      "professionalTitle",
      "title",
      "education",
      "summary",
      "experience",
      "skills"

    ];

    return keys.map(

      key => safeText(content[key])

    ).filter(Boolean).join("\n");

  }

  function readBuilder() {

    const fields = [

      "bTitle",
      "bEducation",
      "bSummary",
      "bExperience",
      "bSkills"

    ];

    return fields.map(

      id => safeText(
        document.getElementById(id)?.value
      )

    ).filter(Boolean).join("\n");

  }

  function splitJobDescription(text) {

    return safeText(text)

      .split(/\n+|[;!?]+|\.\s+/)

      .map(line => line.trim())

      .filter(Boolean)

      .slice(0, 1000);

  }

  function getPriority(skill, jobLines) {

    let required = false;

    let preferred = false;

    let mentions = 0;

    jobLines.forEach(line => {

      const text = normalize(line);

      if (!skillExists(text, skill)) {

        return;

      }

      mentions++;

      if (

        REQUIRED_TERMS.some(

          term => containsPhrase(text, term)

        )

      ) {

        required = true;

      }

      if (

        PREFERRED_TERMS.some(

          term => containsPhrase(text, term)

        )

      ) {

        preferred = true;

      }

    });

    if (required && !preferred) {

      return {

        id: "high",

        weight: 3,

        mentions

      };

    }

    if (preferred && !required) {

      return {

        id: "low",

        weight: 1,

        mentions

      };

    }

    return {

      id: "medium",

      weight: 2,

      mentions

    };

  }

  function createSkillResult(
    skill,
    priority,
    matched,
    language
  ) {

    return {

      id: skill.id,

      name: skill.name,

      category: skill.category,

      categoryLabel: t(
        skill.category, language
      ),

      matched,

      priority: priority.id,

      priorityLabel: t(
        priority.id, language
      ),

      weight: priority.weight,

      mentions: priority.mentions,

      recommendation: matched

        ? null

        : t("verify", language) +
          " " +
          (SKILL_GUIDANCE[skill.id]?.[LANGUAGES.indexOf(normalizeLanguage(language))] || t("develop", language))

    };

  }

  function analyze(options = {}) {

    const language = normalizeLanguage(

      options.language || getLanguage()

    );

    const resumeText =

      safeText(options.resumeText) ||

      (

        options.content

          ? contentToText(options.content)

          : readBuilder()

      );

    const jobDescription = safeText(

      options.jobDescription

    );

    if (!resumeText) {

      return {

        ok: false,

        version: VERSION,

        reason: "emptyResume",

        message: t("emptyResume", language)

      };

    }

    if (!jobDescription) {

      return {

        ok: false,

        version: VERSION,

        reason: "emptyJob",

        message: t("emptyJob", language)

      };

    }

    const resumeSkills = detectSkills(
      resumeText
    );

    const jobSkills = detectSkills(
      jobDescription
    );

    const resumeSkillIds = new Set(

      resumeSkills.map(skill => skill.id)

    );

    const jobSkillIds = new Set(

      jobSkills.map(skill => skill.id)

    );

    const jobLines = splitJobDescription(
      jobDescription
    );

    const matchedSkills = [];

    const missingSkills = [];

    const additionalSkills = resumeSkills

      .filter(skill =>

        !jobSkillIds.has(skill.id)

      )

      .map(skill => ({

        id: skill.id,

        name: skill.name,

        category: skill.category,

        categoryLabel: t(
          skill.category, language
        )

      }));

    let totalWeight = 0;

    let matchedWeight = 0;

    jobSkills.forEach(skill => {

      const priority = getPriority(

        skill,

        jobLines

      );

      const matched = resumeSkillIds.has(
        skill.id
      );

      const result = createSkillResult(

        skill,

        priority,

        matched,

        language

      );

      totalWeight += priority.weight;

      if (matched) {

        matchedWeight += priority.weight;

        matchedSkills.push(result);

      } else {

        missingSkills.push(result);

      }

    });

    missingSkills.sort(

      (a, b) =>

        b.weight - a.weight ||

        b.mentions - a.mentions ||

        a.name.localeCompare(b.name)

    );

    matchedSkills.sort(

      (a, b) =>

        b.weight - a.weight ||

        a.name.localeCompare(b.name)

    );

    const coverage = totalWeight

      ? Math.round(

          matchedWeight /
          totalWeight * 100

        )

      : null;

    const categoryResults = {};

    [...matchedSkills, ...missingSkills]

      .forEach(skill => {

        if (!categoryResults[skill.category]) {

          categoryResults[skill.category] = {

            id: skill.category,

            label: skill.categoryLabel,

            matched: 0,

            missing: 0,

            total: 0

          };

        }

        const category =
          categoryResults[skill.category];

        category.total++;

        if (skill.matched) {

          category.matched++;

        } else {

          category.missing++;

        }

      });

    const categories = Object.values(

      categoryResults

    ).map(category => ({

      ...category,

      coverage: Math.round(

        category.matched /
        category.total * 100

      )

    }));

    const result = {

      ok: true,

      version: VERSION,

      language,

      available: jobSkills.length > 0,

      coverage,

      estimatedSkillCoverage: coverage,

      catalogSize: CATALOG.length,

      detectedResumeSkills:
        resumeSkills.length,

      detectedJobSkills:
        jobSkills.length,

      matchedCount:
        matchedSkills.length,

      missingCount:
        missingSkills.length,

      additionalCount:
        additionalSkills.length,

      matchedSkills,

      missingSkills,

      additionalSkills,

      categories,

      highPriorityGaps:

        missingSkills.filter(

          skill => skill.priority === "high"

        ),

      mediumPriorityGaps:

        missingSkills.filter(

          skill => skill.priority === "medium"

        ),

      lowPriorityGaps:

        missingSkills.filter(

          skill => skill.priority === "low"

        ),

      developmentPlan:

        missingSkills.slice(0, 10)

          .map((skill, index) => ({

            order: index + 1,

            skillId: skill.id,

            skillName: skill.name,

            priority: skill.priority,

            priorityLabel: skill.priorityLabel,

            action: skill.recommendation

          })),

      message: jobSkills.length

        ? ""

        : t("noSkills", language),

      disclaimer: t(
        "disclaimer", language
      ),

      generatedAt:
        new Date().toISOString()

    };

    if (options.emit !== false) {

      document.dispatchEvent(

        new CustomEvent(

          "worknely:skillgapanalysiscomplete",

          {

            detail: {

              version: VERSION,

              available: result.available,

              coverage,

              matchedCount:
                result.matchedCount,

              missingCount:
                result.missingCount

            }

          }

        )

      );

    }

    return result;

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

  function analyzeBuilder(
    jobDescription = ""
  ) {

    return analyze({

      resumeText: readBuilder(),

      jobDescription,

      language: getLanguage()

    });

  }

  function getCatalog(category = "all") {

    return CATALOG

      .filter(skill =>

        category === "all" ||

        skill.category === category

      )

      .map(skill => ({

        id: skill.id,

        name: skill.name,

        category: skill.category,

        aliases: [...skill.aliases]

      }));

  }

  function getCategories(
    language = getLanguage()
  ) {

    return [...new Set(

      CATALOG.map(skill => skill.category)

    )].map(id => ({

      id,

      label: t(id, language),

      count: CATALOG.filter(

        skill => skill.category === id

      ).length

    }));

  }

  function selfTest() {

    const result = analyze({

      resumeText:

        "JavaScript, HTML, CSS, SQL, teamwork",

      jobDescription:

        "JavaScript required.\n" +

        "HTML required.\n" +

        "Python mandatory.\n" +

        "Docker preferred.",

      language: "en",

      emit: false

    });

    const international = analyze({

      resumeText:

        "Assistenza ai pazienti, primo soccorso",

      jobDescription:

        "Patient care required.\n" +

        "First aid required.",

      language: "it",

      emit: false

    });

    const noMatch = analyze({

      resumeText: "JavaScript",

      jobDescription: "Python required.",

      emit: false

    });

    const unknown = analyze({

      resumeText: "JavaScript",

      jobDescription: "Interesting opportunity",

      emit: false

    });

    const checks = {

      successfulAnalysis:

        result.ok === true,

      correctMatchedCount:

        result.matchedCount === 2,

      correctMissingCount:

        result.missingCount === 2,

      highPriorityDetection:

        result.highPriorityGaps.some(

          skill => skill.id === "python"

        ),

      preferredSkillDetection:

        result.lowPriorityGaps.some(

          skill => skill.id === "docker"

        ),

      correctWeightedCoverage:

        result.coverage === 60,

      crossLanguageMatching:

        international.coverage === 100,

      zeroCoverage:

        noMatch.coverage === 0,

      unknownSkillsProtection:

        unknown.available === false &&

        unknown.coverage === null,

      emptyResumeProtection:

        analyze({

          content: {},

          resumeText: "",

          jobDescription: "Python",

          emit: false

        }).ok === false,

      multilingualSupport:

        LANGUAGES.every(

          language =>

            t("missing", language) !== "missing"

        ),

      catalogIntegrity:

        new Set(

          CATALOG.map(skill => skill.id)

        ).size === CATALOG.length

    };

    return {

      version: VERSION,

      passed: Object.values(checks)
        .every(Boolean),

      checks

    };

  }

  window.WorknelySkillGap = Object.freeze({

    version: VERSION,

    getLanguage,

    t,

    normalize,

    detectSkills,

    getCatalog,

    getCategories,

    analyze,

    analyzeComparison,

    analyzeBuilder,

    selfTest,

    getState: () => ({

      version: VERSION,

      ready: true,

      catalogSize: CATALOG.length,

      supportedLanguages: LANGUAGES.length,

      processing: "local",

      externalAI: false,

      weightedPriorities: true,

      crossLanguageMatching: true

    })

  });

  document.dispatchEvent(

    new CustomEvent(

      "worknely:skillgapready",

      {

        detail: {

          version: VERSION,

          ready: true,

          catalogSize: CATALOG.length

        }

      }

    )

  );

  console.info(

    "Worknely V" + VERSION +

    " Skill Gap Intelligence initialized."

  );

})();

/*
 * END WORKNELY V7.18.1.2
 *
 * International Skill Recognition
 * Weighted Skill Coverage
 * Career Development Recommendations
 * Privacy-First Architecture
 * People Technology
 */
