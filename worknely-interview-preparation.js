/*
 * WORKNELY V7.17.5
 * Interview Preparation Studio
 * International Career Intelligence
 * Privacy-First Local Processing
 * People Technology
 */

(function () {
  "use strict";

  const VERSION = "7.17.5";

  const LANGUAGES = Object.freeze([
    "en", "ro", "it", "de", "fr", "es"
  ]);

  const DICTIONARY = {

    title: [
      "Interview Preparation Studio",
      "Pregătire pentru interviu",
      "Preparazione al colloquio",
      "Vorstellungsgespräch vorbereiten",
      "Préparation à l'entretien",
      "Preparación de entrevistas"
    ],

    general: [
      "General questions",
      "Întrebări generale",
      "Domande generali",
      "Allgemeine Fragen",
      "Questions générales",
      "Preguntas generales"
    ],

    behavioral: [
      "Behavioral questions",
      "Întrebări comportamentale",
      "Domande comportamentali",
      "Verhaltensfragen",
      "Questions comportementales",
      "Preguntas conductuales"
    ],

    technical: [
      "Professional skills",
      "Competențe profesionale",
      "Competenze professionali",
      "Berufliche Kompetenzen",
      "Compétences professionnelles",
      "Competencias profesionales"
    ],

    motivation: [
      "Motivation",
      "Motivație",
      "Motivazione",
      "Motivation",
      "Motivation",
      "Motivación"
    ],

    gap: [
      "Skill development",
      "Dezvoltarea competențelor",
      "Sviluppo delle competenze",
      "Kompetenzentwicklung",
      "Développement des compétences",
      "Desarrollo de competencias"
    ],

    basic: [
      "Basic",
      "Începător",
      "Base",
      "Grundlegend",
      "Débutant",
      "Básico"
    ],

    intermediate: [
      "Intermediate",
      "Intermediar",
      "Intermedio",
      "Fortgeschritten",
      "Intermédiaire",
      "Intermedio"
    ],

    advanced: [
      "Advanced",
      "Avansat",
      "Avanzato",
      "Anspruchsvoll",
      "Avancé",
      "Avanzado"
    ],

    situation: [
      "Situation",
      "Situație",
      "Situazione",
      "Situation",
      "Situation",
      "Situación"
    ],

    task: [
      "Task",
      "Sarcină",
      "Compito",
      "Aufgabe",
      "Tâche",
      "Tarea"
    ],

    action: [
      "Action",
      "Acțiune",
      "Azione",
      "Handlung",
      "Action",
      "Acción"
    ],

    result: [
      "Result",
      "Rezultat",
      "Risultato",
      "Ergebnis",
      "Résultat",
      "Resultado"
    ],

    situationHint: [
      "Describe the real context.",
      "Descrie contextul real.",
      "Descrivi il contesto reale.",
      "Beschreibe den tatsächlichen Kontext.",
      "Décrivez le contexte réel.",
      "Describe el contexto real."
    ],

    taskHint: [
      "Explain your responsibility.",
      "Explică responsabilitatea ta.",
      "Spiega la tua responsabilità.",
      "Erkläre deine Verantwortung.",
      "Expliquez votre responsabilité.",
      "Explica tu responsabilidad."
    ],

    actionHint: [
      "Explain the actions you personally took.",
      "Explică acțiunile pe care le-ai realizat personal.",
      "Spiega le azioni che hai svolto personalmente.",
      "Beschreibe deine eigenen Maßnahmen.",
      "Expliquez vos propres actions.",
      "Explica las acciones que realizaste personalmente."
    ],

    resultHint: [
      "Describe the actual outcome and lessons learned.",
      "Descrie rezultatul real și lecțiile învățate.",
      "Descrivi il risultato reale e le lezioni apprese.",
      "Beschreibe das tatsächliche Ergebnis und deine Erkenntnisse.",
      "Décrivez le résultat réel et les enseignements.",
      "Describe el resultado real y lo aprendido."
    ],

    introduction: [
      "Tell me about yourself and your professional background.",
      "Vorbește-mi despre tine și experiența ta profesională.",
      "Parlami di te e della tua esperienza professionale.",
      "Erzähle etwas über dich und deinen beruflichen Hintergrund.",
      "Parlez-moi de vous et de votre parcours professionnel.",
      "Háblame de ti y de tu trayectoria profesional."
    ],

    targetMotivation: [
      "Why are you interested in the {role} position?",
      "De ce te interesează postul de {role}?",
      "Perché ti interessa il ruolo di {role}?",
      "Warum interessierst du dich für die Position {role}?",
      "Pourquoi le poste de {role} vous intéresse-t-il ?",
      "¿Por qué te interesa el puesto de {role}?"
    ],

    strengths: [
      "What professional strengths would you bring to this position?",
      "Ce puncte forte profesionale ai aduce în acest rol?",
      "Quali punti di forza apporteresti a questo ruolo?",
      "Welche beruflichen Stärken bringst du mit?",
      "Quels atouts professionnels apporteriez-vous à ce poste ?",
      "¿Qué fortalezas profesionales aportarías al puesto?"
    ],

    weakness: [
      "Which professional skill are you currently improving?",
      "Ce competență profesională îți dezvolți în prezent?",
      "Quale competenza professionale stai migliorando?",
      "Welche berufliche Kompetenz verbesserst du derzeit?",
      "Quelle compétence professionnelle développez-vous actuellement ?",
      "¿Qué competencia profesional estás mejorando actualmente?"
    ],

    challenge: [
      "Describe a professional challenge and how you handled it.",
      "Descrie o provocare profesională și cum ai gestionat-o.",
      "Descrivi una sfida professionale e come l'hai affrontata.",
      "Beschreibe eine berufliche Herausforderung und deine Lösung.",
      "Décrivez un défi professionnel et comment vous l'avez surmonté.",
      "Describe un desafío profesional y cómo lo afrontaste."
    ],

    teamwork: [
      "Tell me about a time you worked effectively with a team.",
      "Descrie o situație în care ai lucrat eficient în echipă.",
      "Racconta un'esperienza di collaborazione efficace.",
      "Beschreibe eine erfolgreiche Zusammenarbeit im Team.",
      "Décrivez une collaboration efficace en équipe.",
      "Describe una experiencia de trabajo eficaz en equipo."
    ],

    pressure: [
      "How do you manage competing priorities and deadlines?",
      "Cum gestionezi prioritățile multiple și termenele-limită?",
      "Come gestisci priorità concorrenti e scadenze?",
      "Wie gehst du mit konkurrierenden Prioritäten und Fristen um?",
      "Comment gérez-vous les priorités et les délais ?",
      "¿Cómo gestionas prioridades simultáneas y plazos?"
    ],

    mistake: [
      "Describe a mistake you made and what you learned from it.",
      "Descrie o greșeală și ce ai învățat din ea.",
      "Descrivi un errore e cosa hai imparato.",
      "Beschreibe einen Fehler und was du daraus gelernt hast.",
      "Décrivez une erreur et ce que vous en avez appris.",
      "Describe un error y lo que aprendiste."
    ],

    achievement: [
      "Which professional achievement are you most proud of?",
      "De ce realizare profesională ești cel mai mândru?",
      "Di quale risultato professionale sei più orgoglioso?",
      "Auf welchen beruflichen Erfolg bist du besonders stolz?",
      "De quelle réalisation professionnelle êtes-vous le plus fier ?",
      "¿De qué logro profesional te sientes más orgulloso?"
    ],

    learning: [
      "How do you approach learning an unfamiliar professional skill?",
      "Cum abordezi învățarea unei competențe profesionale noi?",
      "Come affronti l'apprendimento di una nuova competenza?",
      "Wie erlernst du eine neue berufliche Kompetenz?",
      "Comment abordez-vous l'apprentissage d'une nouvelle compétence ?",
      "¿Cómo abordas el aprendizaje de una nueva competencia?"
    ],

    skillQuestion: [
      "Describe your practical experience with {skill}.",
      "Descrie experiența ta practică în {skill}.",
      "Descrivi la tua esperienza pratica con {skill}.",
      "Beschreibe deine praktische Erfahrung mit {skill}.",
      "Décrivez votre expérience pratique en {skill}.",
      "Describe tu experiencia práctica con {skill}."
    ],

    advancedSkill: [
      "Describe a complex problem involving {skill} and explain how you would approach it.",
      "Descrie o problemă complexă legată de {skill} și explică abordarea ta.",
      "Descrivi un problema complesso relativo a {skill} e il tuo approccio.",
      "Beschreibe ein komplexes Problem mit {skill} und deinen Lösungsansatz.",
      "Décrivez un problème complexe lié à {skill} et votre approche.",
      "Describe un problema complejo relacionado con {skill} y tu enfoque."
    ],

    gapQuestion: [
      "What is your current experience with {skill}, and how would you develop it further?",
      "Ce experiență ai în {skill} și cum ai dezvolta această competență?",
      "Qual è la tua esperienza con {skill} e come la svilupperesti?",
      "Welche Erfahrung hast du mit {skill} und wie würdest du sie ausbauen?",
      "Quelle est votre expérience en {skill} et comment la développeriez-vous ?",
      "¿Qué experiencia tienes con {skill} y cómo la desarrollarías?"
    ],

    employerQuestion1: [
      "What would success look like during the first 90 days?",
      "Cum ar arăta succesul în primele 90 de zile?",
      "Come sarebbe definito il successo nei primi 90 giorni?",
      "Wie wird Erfolg in den ersten 90 Tagen definiert?",
      "Comment définissez-vous la réussite durant les 90 premiers jours ?",
      "¿Cómo se definiría el éxito durante los primeros 90 días?"
    ],

    employerQuestion2: [
      "What are the main challenges of this position?",
      "Care sunt principalele provocări ale acestui post?",
      "Quali sono le principali sfide di questo ruolo?",
      "Was sind die größten Herausforderungen dieser Position?",
      "Quels sont les principaux défis de ce poste ?",
      "¿Cuáles son los principales desafíos de este puesto?"
    ],

    employerQuestion3: [
      "What training and development opportunities are available?",
      "Ce oportunități de formare și dezvoltare sunt disponibile?",
      "Quali opportunità di formazione sono disponibili?",
      "Welche Weiterbildungsmöglichkeiten gibt es?",
      "Quelles possibilités de formation sont proposées ?",
      "¿Qué oportunidades de formación están disponibles?"
    ],

    employerQuestion4: [
      "What are the next steps in the recruitment process?",
      "Care sunt următoarele etape ale recrutării?",
      "Quali sono le prossime fasi della selezione?",
      "Was sind die nächsten Schritte im Bewerbungsprozess?",
      "Quelles sont les prochaines étapes du recrutement ?",
      "¿Cuáles son los próximos pasos del proceso de selección?"
    ],

    generalHint: [
      "Keep your answer relevant, concise and supported by real examples.",
      "Oferă un răspuns relevant, concis și susținut de exemple reale.",
      "Fornisci una risposta pertinente, concisa e reale.",
      "Antworte relevant, präzise und mit echten Beispielen.",
      "Répondez de manière pertinente avec des exemples réels.",
      "Responde de forma relevante y con ejemplos reales."
    ],

    skillHint: [
      "Explain your actual proficiency and provide a verified practical example.",
      "Explică nivelul tău real și oferă un exemplu practic verificabil.",
      "Spiega il tuo livello reale con un esempio pratico.",
      "Erkläre dein tatsächliches Niveau anhand eines Beispiels.",
      "Expliquez votre niveau réel avec un exemple pratique.",
      "Explica tu nivel real con un ejemplo práctico."
    ],

    gapHint: [
      "Be transparent about your current level. Describe realistic learning steps.",
      "Fii transparent privind nivelul actual și descrie pași realiști de învățare.",
      "Sii trasparente sul tuo livello e descrivi passi realistici.",
      "Sei transparent über dein Niveau und realistische Lernschritte.",
      "Soyez transparent sur votre niveau et vos étapes d'apprentissage.",
      "Sé transparente sobre tu nivel y tus pasos de aprendizaje."
    ],

    emptyAnswer: [
      "Write an answer before requesting feedback.",
      "Scrie un răspuns înainte de a solicita feedback.",
      "Scrivi una risposta prima di richiedere feedback.",
      "Schreibe zuerst eine Antwort.",
      "Rédigez une réponse avant de demander un retour.",
      "Escribe una respuesta antes de solicitar comentarios."
    ],

    improveDetail: [
      "Add more specific and relevant details.",
      "Adaugă detalii mai specifice și relevante.",
      "Aggiungi dettagli più specifici.",
      "Ergänze konkrete und relevante Details.",
      "Ajoutez des détails plus précis.",
      "Añade detalles más específicos."
    ],

    improveConciseness: [
      "Consider shortening your answer.",
      "Ia în considerare scurtarea răspunsului.",
      "Valuta una risposta più breve.",
      "Erwäge eine kürzere Antwort.",
      "Envisagez une réponse plus concise.",
      "Considera acortar tu respuesta."
    ],

    addExample: [
      "Include a concrete example from your real experience.",
      "Include un exemplu concret din experiența ta reală.",
      "Includi un esempio concreto della tua esperienza.",
      "Ergänze ein konkretes Beispiel aus deiner Erfahrung.",
      "Ajoutez un exemple concret de votre expérience.",
      "Incluye un ejemplo concreto de tu experiencia."
    ],

    reviewSTAR: [
      "Check that your answer covers situation, task, action and result.",
      "Verifică dacă răspunsul acoperă situația, sarcina, acțiunea și rezultatul.",
      "Verifica situazione, compito, azione e risultato.",
      "Prüfe Situation, Aufgabe, Handlung und Ergebnis.",
      "Vérifiez la situation, la tâche, l'action et le résultat.",
      "Comprueba situación, tarea, acción y resultado."
    ],

    answerReady: [
      "Your answer is ready for personal review.",
      "Răspunsul este pregătit pentru revizuire personală.",
      "La risposta è pronta per la revisione.",
      "Deine Antwort kann überprüft werden.",
      "Votre réponse est prête à être relue.",
      "Tu respuesta está lista para revisión."
    ],

    targetPosition: [
      "target position",
      "postul vizat",
      "ruolo desiderato",
      "Zielposition",
      "poste visé",
      "puesto objetivo"
    ],

    disclaimer: [
      "Practice questions and rule-based feedback. Actual interview questions may differ. No hiring prediction.",
      "Întrebări de antrenament și feedback algoritmic. Întrebările reale pot fi diferite. Nu prezice angajarea.",
      "Domande di pratica e feedback basato su regole. Nessuna previsione di assunzione.",
      "Übungsfragen und regelbasiertes Feedback. Keine Einstellungsprognose.",
      "Questions d'entraînement et retour algorithmique. Aucune prédiction d'embauche.",
      "Preguntas de práctica y comentarios basados en reglas. Sin predicción de contratación."
    ]

  };

  const DIFFICULTIES = Object.freeze([
    "basic",
    "intermediate",
    "advanced"
  ]);

  function safeText(value, limit = 150000) {
    return typeof value === "string"
      ? value.trim().slice(0, limit)
      : "";
  }

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

  function t(
    key,
    language = getLanguage(),
    values = {}
  ) {
    const index = LANGUAGES.indexOf(
      normalizeLanguage(language)
    );

    const template =
      DICTIONARY[key]?.[index] ||
      DICTIONARY[key]?.[0] ||
      key;

    return template.replace(
      /\{(\w+)\}/g,
      (match, name) =>
        Object.prototype.hasOwnProperty.call(
          values, name
        )
          ? String(values[name])
          : match
    );
  }

  function normalizeDifficulty(value) {
    return DIFFICULTIES.includes(value)
      ? value : "intermediate";
  }

  function normalizeText(value) {
    return safeText(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/ß/g, "ss")
      .replace(/\s+/g, " ")
      .trim();
  }

  function countWords(value) {
    return safeText(value)
      .split(/\s+/)
      .filter(Boolean)
      .length;
  }

  function readBuilder() {
    const fields = {
      professionalTitle: "bTitle",
      education: "bEducation",
      summary: "bSummary",
      experience: "bExperience",
      skills: "bSkills"
    };

    const result = {};

    Object.entries(fields).forEach(
      ([key, id]) => {
        result[key] = safeText(
          document.getElementById(id)?.value
        );
      }
    );

    return result;
  }

  function contentToText(content) {
    return [
      content?.professionalTitle,
      content?.education,
      content?.summary,
      content?.experience,
      content?.skills
    ]
      .map(value => safeText(value))
      .filter(Boolean)
      .join("\n");
  }

  /* STAR INTERVIEW FRAMEWORK */

  function getSTARFramework(
    language = getLanguage()
  ) {
    return [
      ["situation", "situationHint"],
      ["task", "taskHint"],
      ["action", "actionHint"],
      ["result", "resultHint"]
    ].map(([id, hint]) => ({
      id,
      label: t(id, language),
      guidance: t(hint, language)
    }));
  }

  function buildSTARAnswer(
    input = {},
    language = getLanguage()
  ) {
    const framework =
      getSTARFramework(language);

    const sections = framework.map(
      section => ({
        id: section.id,
        label: section.label,
        value: safeText(
          input[section.id], 10000
        )
      })
    );

    const completed = sections.filter(
      section => section.value
    );

    return {
      ok: completed.length > 0,

      complete: completed.length === 4,

      completedSections: completed.length,

      missingSections: sections
        .filter(section => !section.value)
        .map(section => section.id),

      sections,

      text: completed.map(
        section =>
          section.label + ": " + section.value
      ).join("\n\n")
    };
  }

  /* QUESTION GENERATION */

  function createQuestion(options) {
    const language = options.language;

    const framework =
      options.framework || "direct";

    return {
      id: options.id,

      category: options.category,

      categoryLabel: t(
        options.category, language
      ),

      difficulty: options.difficulty,

      difficultyLabel: t(
        options.difficulty, language
      ),

      question: t(
        options.key,
        language,
        options.values || {}
      ),

      framework,

      guidance: t(
        options.hint || "generalHint",
        language
      ),

      skillId: options.skillId || null,

      skillName: options.skillName || null,

      starFramework: framework === "STAR"
        ? getSTARFramework(language)
        : null
    };
  }

  function getSkillContext(options) {
    const engine = window.WorknelySkillGap;

    if (
      typeof engine?.detectSkills !== "function"
    ) {
      return {
        available: false,
        matched: [],
        missing: [],
        detected: []
      };
    }

    const resumeText =
      safeText(options.resumeText);

    const jobDescription =
      safeText(options.jobDescription);

    const detected = engine.detectSkills(
      resumeText
    );

    if (
      resumeText &&
      jobDescription &&
      typeof engine.analyze === "function"
    ) {
      const analysis = engine.analyze({
        content: {},
        resumeText,
        jobDescription,
        language: options.language,
        emit: false
      });

      if (analysis?.ok) {
        return {
          available: Boolean(
            analysis.available
          ),
          matched: analysis.matchedSkills || [],
          missing: analysis.missingSkills || [],
          detected
        };
      }
    }

    return {
      available: false,
      matched: [],
      missing: [],
      detected
    };
  }

  function generate(options = {}) {

    const language = normalizeLanguage(
      options.language || getLanguage()
    );

    const difficulty = normalizeDifficulty(
      options.difficulty
    );

    const explicitText = safeText(
      options.resumeText
    );

    const content =
      options.content ||
      (explicitText ? {} : readBuilder());

    const resumeText =
      explicitText || contentToText(content);

    const jobDescription = safeText(
      options.jobDescription
    );

    const targetRole = safeText(
      options.targetRole ||
      content.professionalTitle,
      200
    ) || t("targetPosition", language);

    const requestedCount = Number(
      options.questionCount
    );

    const questionCount =
      Number.isFinite(requestedCount) &&
      requestedCount > 0

        ? Math.min(
            30,
            Math.max(
              5,
              Math.floor(requestedCount)
            )
          )

        : 15;

    const skillContext = getSkillContext({
      resumeText,
      jobDescription,
      language
    });

    const questions = [];

    function add(
      id,
      key,
      category,
      level,
      framework = "direct",
      values = {},
      hint = "generalHint",
      skill = null
    ) {
      if (
        questions.some(
          question => question.id === id
        )
      ) return;

      questions.push(
        createQuestion({
          id,
          key,
          category,
          difficulty: level,
          framework,
          values,
          hint,
          language,
          skillId: skill?.id,
          skillName: skill?.name
        })
      );
    }

    /* CORE INTERVIEW QUESTIONS */

    add(
      "introduction",
      "introduction",
      "general",
      "basic"
    );

    add(
      "motivation",
      "targetMotivation",
      "motivation",
      "basic",
      "direct",
      { role: targetRole }
    );

    add(
      "strengths",
      "strengths",
      "general",
      "basic"
    );

    add(
      "challenge",
      "challenge",
      "behavioral",
      "intermediate",
      "STAR"
    );

    add(
      "teamwork",
      "teamwork",
      "behavioral",
      "intermediate",
      "STAR"
    );

    /* PERSONALIZED SKILL QUESTIONS */

    const relevantSkills =
      skillContext.matched.length

        ? skillContext.matched

        : skillContext.available

          ? []

          : skillContext.detected;

    relevantSkills.slice(0, 6).forEach(
      skill => {
        add(
          "skill-" + skill.id,

          difficulty === "advanced"
            ? "advancedSkill"
            : "skillQuestion",

          "technical",

          difficulty,

          "direct",

          { skill: skill.name },

          "skillHint",

          skill
        );
      }
    );

    /* SKILL GAP QUESTIONS */

    skillContext.missing
      .slice(0, 5)
      .forEach(skill => {
        add(
          "gap-" + skill.id,

          "gapQuestion",

          "gap",

          difficulty,

          "direct",

          { skill: skill.name },

          "gapHint",

          skill
        );
      });

    /* ADDITIONAL BEHAVIORAL QUESTIONS */

    add(
      "achievement",
      "achievement",
      "behavioral",
      "intermediate",
      "STAR"
    );

    add(
      "weakness",
      "weakness",
      "general",
      "intermediate"
    );

    add(
      "pressure",
      "pressure",
      "behavioral",
      "intermediate",
      "STAR"
    );

    add(
      "learning",
      "learning",
      "general",
      "basic"
    );

    if (difficulty !== "basic") {
      add(
        "mistake",
        "mistake",
        "behavioral",
        difficulty,
        "STAR"
      );
    }

    /* DIFFICULTY SELECTION */

    const ranks = {
      basic: 1,
      intermediate: 2,
      advanced: 3
    };

    const selected = questions
      .filter(question =>
        ranks[question.difficulty] <=
        ranks[difficulty]
      )
      .slice(0, questionCount)
      .map((question, index) => ({
        ...question,
        order: index + 1
      }));

    const employerQuestions = [
      "employerQuestion1",
      "employerQuestion2",
      "employerQuestion3",
      "employerQuestion4"
    ].map((key, index) => ({
      id: key,
      order: index + 1,
      question: t(key, language)
    }));

    const result = {
      ok: true,

      version: VERSION,

      language,

      targetRole,

      difficulty,

      difficultyLabel: t(
        difficulty, language
      ),

      personalized: Boolean(
        selected.some(
          question => question.skillId
        )
      ),

      questionCount: selected.length,

      questions: selected,

      employerQuestions,

      starFramework:
        getSTARFramework(language),

      skillContextAvailable:
        skillContext.available,

      matchedSkillCount:
        skillContext.matched.length,

      missingSkillCount:
        skillContext.missing.length,

      disclaimer:
        t("disclaimer", language),

      generatedAt:
        new Date().toISOString()
    };

    if (options.emit !== false) {
      document.dispatchEvent(
        new CustomEvent(
          "worknely:interviewgenerated",
          {
            detail: {
              version: VERSION,
              questionCount:
                result.questionCount,
              difficulty,
              personalized:
                result.personalized
            }
          }
        )
      );
    }

    return result;
  }

  /* PRACTICE ANSWER FEEDBACK */

  function evaluateAnswer(options = {}) {

    const language = normalizeLanguage(
      options.language || getLanguage()
    );

    const answer = safeText(
      options.answer, 20000
    );

    if (!answer) {
      return {
        ok: false,
        version: VERSION,
        reason: "emptyAnswer",
        message: t(
          "emptyAnswer", language
        )
      };
    }

    const wordCount = countWords(answer);

    const normalized = normalizeText(answer);

    const exampleIndicators = [
      "for example",
      "for instance",
      "de exemplu",
      "per esempio",
      "ad esempio",
      "zum beispiel",
      "par exemple",
      "por ejemplo"
    ];

    const exampleSignal =
      exampleIndicators.some(
        indicator =>
          normalized.includes(indicator)
      );

    const quantitativeSignal =
      /\b\d+(?:[.,]\d+)?\s*%|\b\d+\s+(?:projects?|clients?|proiecte|progetti|projekte|projets|proyectos)\b/i
        .test(answer);

    const feedback = [];

    if (wordCount < 35) {
      feedback.push({
        id: "detail",
        message: t(
          "improveDetail", language
        )
      });
    }

    if (wordCount > 250) {
      feedback.push({
        id: "conciseness",
        message: t(
          "improveConciseness", language
        )
      });
    }

    if (
      !exampleSignal &&
      !quantitativeSignal
    ) {
      feedback.push({
        id: "example",
        message: t(
          "addExample", language
        )
      });
    }

    const requiresSTAR =
      options.framework === "STAR";

    const star = options.starSections
      ? buildSTARAnswer(
          options.starSections,
          language
        )
      : null;

    if (
      requiresSTAR &&
      !star?.complete
    ) {
      feedback.push({
        id: "star",
        message: t(
          "reviewSTAR", language
        )
      });
    }

    return {
      ok: true,

      version: VERSION,

      language,

      wordCount,

      approximateSpeakingSeconds:
        Math.round(wordCount / 130 * 60),

      exampleSignal,

      quantitativeSignal,

      starComplete:
        requiresSTAR
          ? star?.complete ?? null
          : null,

      feedback,

      feedbackCount:
        feedback.length,

      message: t(
        "answerReady", language
      ),

      disclaimer: t(
        "disclaimer", language
      )
    };
  }

  /* LOCAL PRACTICE SESSION */

  function createSession(options = {}) {

    const interview = generate({
      ...options,
      emit: false
    });

    let currentIndex = 0;

    let closed = false;

    const answers = new Map();

    function getCurrentQuestion() {
      if (closed) return null;

      return interview.questions[
        currentIndex
      ] || null;
    }

    function saveAnswer(value) {
      const question =
        getCurrentQuestion();

      if (!question) {
        return {
          ok: false,
          reason: "sessionUnavailable"
        };
      }

      const answer = safeText(
        value, 20000
      );

      if (!answer) {
        answers.delete(question.id);

        return {
          ok: false,
          reason: "emptyAnswer"
        };
      }

      answers.set(
        question.id,
        answer
      );

      return {
        ok: true,

        questionId: question.id,

        feedback: evaluateAnswer({
          answer,
          framework: question.framework,
          language: interview.language
        })
      };
    }

    function next() {
      if (
        !closed &&
        currentIndex <
          interview.questions.length - 1
      ) {
        currentIndex++;
      }

      return getCurrentQuestion();
    }

    function previous() {
      if (!closed && currentIndex > 0) {
        currentIndex--;
      }

      return getCurrentQuestion();
    }

    function getProgress() {
      const total =
        interview.questions.length;

      const answered =
        closed ? 0 : answers.size;

      return {
        closed,

        current: closed
          ? 0 : currentIndex + 1,

        total,

        answered,

        remaining: total - answered,

        completion: total
          ? Math.round(
              answered / total * 100
            )
          : 0
      };
    }

    function getReport() {
      if (closed) {
        return {
          ok: false,
          reason: "sessionClosed"
        };
      }

      return {
        ok: true,

        version: VERSION,

        language: interview.language,

        targetRole: interview.targetRole,

        progress: getProgress(),

        answers: interview.questions.map(
          question => ({
            questionId: question.id,

            question: question.question,

            answer:
              answers.get(question.id) || "",

            answered:
              answers.has(question.id)
          })
        )
      };
    }

    function clear() {
      answers.clear();

      currentIndex = 0;

      closed = true;

      return {
        ok: true,
        cleared: true
      };
    }

    return Object.freeze({
      version: VERSION,
      getCurrentQuestion,
      saveAnswer,
      next,
      previous,
      getProgress,
      getReport,
      clear
    });
  }

  /* WORKNELY INTEGRATION */

  function generateBuilder(options = {}) {
    return generate({
      ...options,
      content: readBuilder()
    });
  }

  function generateComparison(options = {}) {
    return generate({
      ...options,

      content: {},

      resumeText:
        document.getElementById("resume")
          ?.value || "",

      jobDescription:
        document.getElementById("job")
          ?.value || ""
    });
  }

  function getState() {
    return {
      version: VERSION,

      ready: true,

      skillEngineReady: Boolean(
        window.WorknelySkillGap
          ?.detectSkills
      ),

      skillEngineVersion:
        window.WorknelySkillGap
          ?.version || null,

      supportedLanguages:
        LANGUAGES.length,

      difficultyLevels:
        DIFFICULTIES.length,

      processing: "local",

      externalAI: false,

      persistentAnswerStorage: false,

      starFramework: true,

      practiceSessions: true,

      hiringPrediction: false
    };
  }

  /* INTERNAL SELF-TEST */

  function selfTest() {

    const interview = generate({
      content: {},

      targetRole: "Software Developer",

      language: "en",

      difficulty: "intermediate",

      emit: false
    });

    const star = buildSTARAnswer({
      situation:
        "A project was behind schedule.",

      task:
        "Coordinate the remaining tasks.",

      action:
        "Reviewed priorities with the team.",

      result:
        "Completed the agreed deliverables."
    }, "en");

    const session = createSession({
      content: {},

      targetRole: "Developer",

      language: "en"
    });

    const first =
      session.getCurrentQuestion();

    const saved = session.saveAnswer(
      "I have practical experience developing web applications."
    );

    const progress =
      session.getProgress();

    const next = session.next();

    session.clear();

    const checks = {

      questionGeneration:
        interview.ok === true &&
        interview.questionCount > 0,

      uniqueQuestionIds:
        new Set(
          interview.questions.map(
            question => question.id
          )
        ).size === interview.questionCount,

      targetRoleIntegration:
        interview.questions.some(
          question =>
            question.question.includes(
              "Software Developer"
            )
        ),

      starFramework:
        star.complete === true &&
        star.completedSections === 4,

      emptyAnswerProtection:
        evaluateAnswer({
          answer: ""
        }).ok === false,

      sessionAnswerSaving:
        saved.ok === true,

      sessionProgress:
        progress.answered === 1,

      sessionNavigation:
        first?.id !== next?.id,

      sessionPrivacy:
        session.getReport().ok === false,

      multilingualSupport:
        LANGUAGES.every(language =>
          t("title", language) !== "title"
        ),

      employerQuestions:
        interview.employerQuestions
          .length === 4
    };

    const dependenciesReady =
      getState().skillEngineReady;

    if (dependenciesReady) {
      const personalized = generate({
        content: {},

        resumeText:
          "JavaScript, HTML, CSS",

        jobDescription:
          "JavaScript required.\n" +
          "Python mandatory.",

        targetRole: "Developer",

        difficulty: "advanced",

        language: "en",

        emit: false
      });

      checks.personalizedQuestions =
        personalized.questions.some(
          question =>
            question.skillId === "javascript"
        );

      checks.skillGapQuestions =
        personalized.questions.some(
          question =>
            question.skillId === "python" &&
            question.category === "gap"
        );
    }

    return {
      version: VERSION,

      passed:
        Object.values(checks)
          .every(Boolean),

      dependenciesReady,

      integrationTested:
        dependenciesReady,

      checks
    };
  }

  /* PUBLIC INTERVIEW API */

  window.WorknelyInterviewPreparation =
    Object.freeze({

      version: VERSION,

      languages: LANGUAGES,

      difficulties: DIFFICULTIES,

      getLanguage,

      t,

      readBuilder,

      getSTARFramework,

      buildSTARAnswer,

      generate,

      generateBuilder,

      generateComparison,

      evaluateAnswer,

      createSession,

      selfTest,

      getState
    });

  document.dispatchEvent(
    new CustomEvent(
      "worknely:interviewpreparationready",
      {
        detail: getState()
      }
    )
  );

  console.info(
    "Worknely V" + VERSION +
    " Interview Preparation Studio initialized."
  );

})();

/*
 * END WORKNELY V7.17.5
 *
 * Personalized Interview Preparation
 * STAR Answer Framework
 * Professional Skill Questions
 * Local Practice Sessions
 * International Localization
 * Privacy-First Architecture
 * People Technology
 */
