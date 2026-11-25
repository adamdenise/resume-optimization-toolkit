/*
 * WORKNELY V7.17.7
 * Career Action Plan
 * International Career Intelligence
 * Professional Development Roadmap
 * Privacy-First Architecture
 * People Technology
 */

(function () {
  "use strict";

  const VERSION = "7.17.7";

  const LANGUAGES = Object.freeze([
    "en", "ro", "it", "de", "fr", "es"
  ]);

  const DURATIONS = Object.freeze([
    7, 14, 30
  ]);

  const DICTIONARY = {

    title: [
      "Career Action Plan",
      "Plan de dezvoltare profesională",
      "Piano di sviluppo professionale",
      "Karriereaktionsplan",
      "Plan de développement professionnel",
      "Plan de desarrollo profesional"
    ],

    foundation: [
      "Professional foundation",
      "Fundament profesional",
      "Base professionale",
      "Berufliche Grundlage",
      "Fondations professionnelles",
      "Base profesional"
    ],

    optimization: [
      "Resume optimization",
      "Optimizarea CV-ului",
      "Ottimizzazione del curriculum",
      "Lebenslaufoptimierung",
      "Optimisation du CV",
      "Optimización del currículum"
    ],

    development: [
      "Skill development",
      "Dezvoltarea competențelor",
      "Sviluppo delle competenze",
      "Kompetenzentwicklung",
      "Développement des compétences",
      "Desarrollo de competencias"
    ],

    preparation: [
      "Interview preparation",
      "Pregătire pentru interviu",
      "Preparazione al colloquio",
      "Vorstellungsgespräch vorbereiten",
      "Préparation à l'entretien",
      "Preparación de entrevistas"
    ],

    application: [
      "Job application",
      "Candidatură profesională",
      "Candidatura professionale",
      "Bewerbung",
      "Candidature professionnelle",
      "Candidatura profesional"
    ],

    review: [
      "Progress review",
      "Evaluarea progresului",
      "Revisione dei progressi",
      "Fortschrittskontrolle",
      "Évaluation des progrès",
      "Evaluación del progreso"
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

    pending: [
      "Pending",
      "În așteptare",
      "In attesa",
      "Ausstehend",
      "En attente",
      "Pendiente"
    ],

    completed: [
      "Completed",
      "Finalizat",
      "Completato",
      "Abgeschlossen",
      "Terminé",
      "Completado"
    ],

    inProgress: [
      "In progress",
      "În desfășurare",
      "In corso",
      "In Bearbeitung",
      "En cours",
      "En progreso"
    ],

    targetPosition: [
      "Target position",
      "Postul vizat",
      "Posizione desiderata",
      "Zielposition",
      "Poste visé",
      "Puesto objetivo"
    ],

    defineGoal: [
      "Define your target position",
      "Definește postul vizat",
      "Definisci la posizione desiderata",
      "Definiere deine Zielposition",
      "Définissez votre poste cible",
      "Define tu puesto objetivo"
    ],

    defineGoalDescription: [
      "Identify your preferred role, industry and working conditions.",
      "Identifică rolul, industria și condițiile de muncă preferate.",
      "Identifica ruolo, settore e condizioni di lavoro preferite.",
      "Bestimme Position, Branche und gewünschte Arbeitsbedingungen.",
      "Identifiez le poste, le secteur et les conditions souhaitées.",
      "Identifica el puesto, sector y condiciones laborales preferidas."
    ],

    reviewRequirements: [
      "Review employer requirements",
      "Analizează cerințele angajatorului",
      "Analizza i requisiti del datore di lavoro",
      "Prüfe die Arbeitgeberanforderungen",
      "Analysez les exigences de l'employeur",
      "Analiza los requisitos del empleador"
    ],

    reviewRequirementsDescription: [
      "Separate mandatory requirements from preferred qualifications and verify your eligibility.",
      "Separă cerințele obligatorii de calificările preferate și verifică eligibilitatea.",
      "Distingui i requisiti obbligatori da quelli preferenziali e verifica l'idoneità.",
      "Unterscheide Pflichtanforderungen von Wunschqualifikationen und prüfe deine Eignung.",
      "Distinguez les exigences obligatoires des qualifications souhaitées.",
      "Distingue los requisitos obligatorios de las cualificaciones preferidas."
    ],

    completeResume: [
      "Complete your professional resume",
      "Completează CV-ul profesional",
      "Completa il curriculum professionale",
      "Vervollständige deinen Lebenslauf",
      "Complétez votre CV professionnel",
      "Completa tu currículum profesional"
    ],

    completeResumeDescription: [
      "Review contact details, experience, education and verified professional skills.",
      "Verifică datele de contact, experiența, studiile și competențele reale.",
      "Verifica contatti, esperienza, formazione e competenze reali.",
      "Prüfe Kontaktdaten, Erfahrung, Ausbildung und tatsächliche Kompetenzen.",
      "Vérifiez les coordonnées, l'expérience, la formation et les compétences.",
      "Revisa contacto, experiencia, formación y competencias reales."
    ],

    optimizeResume: [
      "Optimize your resume",
      "Optimizează CV-ul",
      "Ottimizza il curriculum",
      "Optimiere deinen Lebenslauf",
      "Optimisez votre CV",
      "Optimiza tu currículum"
    ],

    optimizeResumeDescription: [
      "Review the Smart Resume Optimization suggestions and apply accurate improvements.",
      "Verifică recomandările Smart Resume Optimization și aplică îmbunătățirile corecte.",
      "Verifica i suggerimenti di ottimizzazione e applica miglioramenti accurati.",
      "Prüfe die Optimierungsvorschläge und übernimm zutreffende Verbesserungen.",
      "Examinez les suggestions et appliquez les améliorations pertinentes.",
      "Revisa las sugerencias y aplica mejoras precisas."
    ],

    verifySkill: [
      "Verify your proficiency in {skill}",
      "Verifică nivelul tău în {skill}",
      "Verifica il tuo livello in {skill}",
      "Prüfe deine Kenntnisse in {skill}",
      "Vérifiez votre niveau en {skill}",
      "Verifica tu nivel en {skill}"
    ],

    verifySkillDescription: [
      "Determine whether this skill is already supported by your real experience. If not, identify an appropriate learning path.",
      "Verifică dacă această competență este susținută de experiența ta reală. În caz contrar, identifică un traseu de învățare.",
      "Verifica se questa competenza è supportata dalla tua esperienza. Altrimenti individua un percorso formativo.",
      "Prüfe, ob deine Erfahrung diese Kompetenz belegt. Andernfalls finde einen geeigneten Lernweg.",
      "Vérifiez si votre expérience confirme cette compétence. Sinon, identifiez une formation adaptée.",
      "Verifica si tu experiencia respalda esta competencia. Si no, identifica una formación adecuada."
    ],

    developSkill: [
      "Practice {skill}",
      "Exersează {skill}",
      "Esercitati in {skill}",
      "Übe {skill}",
      "Pratiquez {skill}",
      "Practica {skill}"
    ],

    developSkillDescription: [
      "Complete an appropriate introductory learning activity or supervised practice. Do not claim proficiency without evidence.",
      "Finalizează o activitate introductivă de învățare sau practică supravegheată. Nu declara competențe fără dovezi.",
      "Completa un'attività formativa introduttiva o pratica supervisionata. Non dichiarare competenze senza prove.",
      "Absolvi eine geeignete Einführung oder betreute Übung. Behaupte keine unbelegten Kompetenzen.",
      "Réalisez une activité d'apprentissage ou une pratique supervisée. Ne revendiquez aucune compétence non démontrée.",
      "Completa una actividad introductoria o práctica supervisada. No declares competencias sin evidencia."
    ],

    evidence: [
      "Document your professional achievements",
      "Documentează realizările profesionale",
      "Documenta i risultati professionali",
      "Dokumentiere berufliche Erfolge",
      "Documentez vos réalisations professionnelles",
      "Documenta tus logros profesionales"
    ],

    evidenceDescription: [
      "Collect real examples, completed projects and measurable outcomes that support your professional profile.",
      "Colectează exemple reale, proiecte finalizate și rezultate măsurabile care susțin profilul profesional.",
      "Raccogli esempi reali, progetti completati e risultati misurabili.",
      "Sammle reale Beispiele, abgeschlossene Projekte und messbare Ergebnisse.",
      "Rassemblez des exemples réels, projets réalisés et résultats mesurables.",
      "Recopila ejemplos reales, proyectos completados y resultados medibles."
    ],

    portfolio: [
      "Prepare professional evidence",
      "Pregătește dovezile profesionale",
      "Prepara le evidenze professionali",
      "Bereite berufliche Nachweise vor",
      "Préparez vos preuves professionnelles",
      "Prepara evidencias profesionales"
    ],

    portfolioDescription: [
      "Organize relevant work samples, certificates or project descriptions without exposing confidential information.",
      "Organizează exemple de lucru, certificate sau descrieri de proiecte fără a expune informații confidențiale.",
      "Organizza esempi, certificati o progetti senza divulgare informazioni riservate.",
      "Ordne Arbeitsproben, Zertifikate und Projekte ohne vertrauliche Informationen offenzulegen.",
      "Organisez vos travaux, certificats et projets sans divulguer de données confidentielles.",
      "Organiza muestras, certificados y proyectos sin divulgar información confidencial."
    ],

    interview: [
      "Practice interview questions",
      "Exersează întrebările de interviu",
      "Esercitati con le domande del colloquio",
      "Übe Vorstellungsgesprächsfragen",
      "Entraînez-vous aux questions d'entretien",
      "Practica preguntas de entrevista"
    ],

    interviewDescription: [
      "Use Interview Preparation Studio to practice relevant questions and prepare truthful answers.",
      "Folosește Interview Preparation Studio pentru a exersa întrebări relevante și răspunsuri autentice.",
      "Usa Interview Preparation Studio per esercitarti con risposte autentiche.",
      "Nutze Interview Preparation Studio für relevante Fragen und ehrliche Antworten.",
      "Utilisez Interview Preparation Studio pour préparer des réponses authentiques.",
      "Utiliza Interview Preparation Studio para practicar respuestas auténticas."
    ],

    star: [
      "Prepare STAR examples",
      "Pregătește exemple STAR",
      "Prepara esempi STAR",
      "Bereite STAR-Beispiele vor",
      "Préparez des exemples STAR",
      "Prepara ejemplos STAR"
    ],

    starDescription: [
      "Prepare two real examples using Situation, Task, Action and Result.",
      "Pregătește două exemple reale folosind Situație, Sarcină, Acțiune și Rezultat.",
      "Prepara due esempi reali con Situazione, Compito, Azione e Risultato.",
      "Bereite zwei reale Beispiele mit Situation, Aufgabe, Handlung und Ergebnis vor.",
      "Préparez deux exemples réels avec Situation, Tâche, Action et Résultat.",
      "Prepara dos ejemplos reales con Situación, Tarea, Acción y Resultado."
    ],

    coverLetter: [
      "Prepare a tailored cover letter",
      "Pregătește o scrisoare de intenție personalizată",
      "Prepara una lettera di presentazione personalizzata",
      "Erstelle ein individuelles Anschreiben",
      "Préparez une lettre de motivation personnalisée",
      "Prepara una carta de presentación personalizada"
    ],

    coverLetterDescription: [
      "Use Cover Letter Studio and review the draft before sending it.",
      "Folosește Cover Letter Studio și verifică documentul înainte de trimitere.",
      "Usa Cover Letter Studio e verifica la bozza prima dell'invio.",
      "Nutze Cover Letter Studio und prüfe den Entwurf vor dem Versand.",
      "Utilisez Cover Letter Studio et relisez le brouillon avant l'envoi.",
      "Utiliza Cover Letter Studio y revisa el borrador antes de enviarlo."
    ],

    researchEmployers: [
      "Research suitable employers",
      "Cercetează angajatorii potriviți",
      "Cerca datori di lavoro adatti",
      "Recherchiere geeignete Arbeitgeber",
      "Recherchez des employeurs adaptés",
      "Investiga empleadores adecuados"
    ],

    researchEmployersDescription: [
      "Identify suitable opportunities and verify employer information using reliable sources.",
      "Identifică oportunități potrivite și verifică informațiile despre angajatori din surse credibile.",
      "Identifica opportunità adatte e verifica le informazioni con fonti affidabili.",
      "Finde geeignete Stellen und prüfe Arbeitgeber anhand zuverlässiger Quellen.",
      "Identifiez des opportunités adaptées et vérifiez les employeurs.",
      "Identifica oportunidades adecuadas y verifica los empleadores."
    ],

    applyJobs: [
      "Review and submit suitable applications",
      "Verifică și trimite candidaturi potrivite",
      "Verifica e invia candidature adatte",
      "Prüfe und versende passende Bewerbungen",
      "Vérifiez et envoyez des candidatures adaptées",
      "Revisa y envía candidaturas adecuadas"
    ],

    applyJobsDescription: [
      "Apply where appropriate after verifying requirements, documents and employer legitimacy.",
      "Candidează unde este potrivit după verificarea cerințelor, documentelor și legitimității angajatorului.",
      "Candidati dopo aver verificato requisiti, documenti e affidabilità del datore.",
      "Bewirb dich nach Prüfung der Anforderungen, Unterlagen und Seriosität.",
      "Postulez après vérification des exigences, documents et de la fiabilité de l'employeur.",
      "Postúlate tras verificar requisitos, documentos y legitimidad del empleador."
    ],

    reassess: [
      "Reassess your career alignment",
      "Reevaluează compatibilitatea profesională",
      "Rivaluta la compatibilità professionale",
      "Bewerte deine berufliche Übereinstimmung erneut",
      "Réévaluez votre compatibilité professionnelle",
      "Reevalúa tu compatibilidad profesional"
    ],

    reassessDescription: [
      "Repeat the Career Match analysis and compare the documented improvements.",
      "Repetă analiza Career Match și compară îmbunătățirile documentate.",
      "Ripeti l'analisi Career Match e confronta i miglioramenti documentati.",
      "Wiederhole die Career Match Analyse und vergleiche dokumentierte Verbesserungen.",
      "Répétez l'analyse Career Match et comparez les améliorations documentées.",
      "Repite el análisis Career Match y compara las mejoras documentadas."
    ],

    finalReview: [
      "Review progress and define next steps",
      "Evaluează progresul și stabilește următorii pași",
      "Valuta i progressi e definisci i prossimi passi",
      "Prüfe Fortschritte und definiere nächste Schritte",
      "Évaluez les progrès et définissez les prochaines étapes",
      "Evalúa el progreso y define los próximos pasos"
    ],

    finalReviewDescription: [
      "Review completed activities, remaining gaps and realistic long-term development priorities.",
      "Verifică activitățile finalizate, diferențele rămase și prioritățile realiste de dezvoltare pe termen lung.",
      "Verifica attività completate, lacune rimanenti e priorità realistiche.",
      "Prüfe abgeschlossene Aufgaben, verbleibende Lücken und langfristige Prioritäten.",
      "Examinez les activités terminées, les écarts restants et les priorités à long terme.",
      "Revisa actividades completadas, brechas restantes y prioridades a largo plazo."
    ],

    generated: [
      "Your personalized career action plan is ready.",
      "Planul tău personalizat de dezvoltare profesională este pregătit.",
      "Il tuo piano professionale personalizzato è pronto.",
      "Dein persönlicher Karriereaktionsplan ist bereit.",
      "Votre plan de développement personnalisé est prêt.",
      "Tu plan profesional personalizado está listo."
    ],

    disclaimer: [
      "Suggested activities, not guaranteed outcomes. Completing a task does not certify competence or guarantee employment.",
      "Activități recomandate, nu rezultate garantate. Finalizarea unei sarcini nu certifică o competență și nu garantează angajarea.",
      "Attività suggerite, non risultati garantiti. Nessuna certificazione o garanzia di assunzione.",
      "Empfohlene Aktivitäten ohne Erfolgsgarantie. Keine Kompetenzzertifizierung oder Beschäftigungsgarantie.",
      "Activités suggérées sans garantie de résultat, de compétence ou d'emploi.",
      "Actividades sugeridas sin garantía de resultados, certificación o empleo."
    ]

  };

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

  function normalizeDuration(value) {
    const duration = Number(value);

    return DURATIONS.includes(duration)
      ? duration : 14;
  }

  function normalizeMinutes(value) {
    const minutes = Number(value);

    return Number.isFinite(minutes) &&
      minutes > 0

      ? Math.min(
          180,
          Math.max(
            15,
            Math.round(minutes)
          )
        )

      : 30;
  }

  function readBuilder() {

    const fields = {
      fullName: "bName",
      professionalTitle: "bTitle",
      contact: "bContact",
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

  /* CAREER INTELLIGENCE CONTEXT */

  function getCareerContext(options = {}) {

    const career =
      window.WorknelyCareerIntelligence;

    const skills =
      window.WorknelySkillGap;

    const optimizer =
      window.WorknelyResumeOptimizer;

    const match =
      window.WorknelyCareerMatch;

    const context = {
      ats: null,
      skillGap: null,
      optimization: null,
      careerMatch: null,
      available: false,
      moduleErrors: []
    };

    const resumeText = safeText(
      options.resumeText
    );

    const jobDescription = safeText(
      options.jobDescription
    );

    if (!resumeText) {
      return context;
    }

    const input = {
      content: options.content || {},
      resumeText,
      jobDescription,
      targetRole: options.targetRole,
      language: options.language,
      emit: false
    };

    function runModule(
      engine,
      key,
      requiresJob = false
    ) {

      if (
        requiresJob &&
        !jobDescription
      ) return;

      if (
        typeof engine?.analyze !== "function"
      ) return;

      try {

        const result = engine.analyze(input);

        if (result?.ok) {

          context[key] = result;

          context.available = true;

        } else {

          context.moduleErrors.push(key);

        }

      } catch {

        context.moduleErrors.push(key);

      }
    }

    runModule(career, "ats");

    runModule(skills, "skillGap", true);

    runModule(optimizer, "optimization");

    runModule(match, "careerMatch", true);

    return context;
  }

  /* ACTION CREATION */

  function createTask(options) {

    const language = options.language;

    return {

      id: options.id,

      day: options.day,

      category: options.category,

      categoryLabel: t(
        options.category,
        language
      ),

      priority: options.priority,

      priorityLabel: t(
        options.priority,
        language
      ),

      title: t(
        options.title,
        language,
        options.values || {}
      ),

      description: t(
        options.description,
        language,
        options.values || {}
      ),

      estimatedMinutes:
        options.minutes,

      tool: options.tool || null,

      skillId: options.skillId || null,

      skillName: options.skillName || null,

      status: "pending"

    };
  }

  /* PERSONALIZED PLAN GENERATION */

  function generate(options = {}) {

    const language = normalizeLanguage(
      options.language || getLanguage()
    );

    const duration = normalizeDuration(
      options.duration
    );

    const dailyMinutes = normalizeMinutes(
      options.dailyMinutes
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

    const context = getCareerContext({

      content,

      resumeText,

      jobDescription,

      targetRole,

      language

    });

    const tasks = [];

    function add(
      id,
      day,
      category,
      priority,
      title,
      description,
      minutes,
      tool = null,
      skill = null
    ) {

      if (
        tasks.some(task => task.id === id)
      ) return;

      tasks.push(

        createTask({

          id,

          day: Math.max(
            1,
            Math.min(duration, day)
          ),

          category,

          priority,

          title,

          description,

          minutes: Math.min(
            dailyMinutes,
            minutes
          ),

          tool,

          skillId: skill?.id,

          skillName: skill?.name,

          values: skill
            ? { skill: skill.name }
            : {},

          language

        })

      );
    }

    /* PHASE 1: PROFESSIONAL FOUNDATION */

    add(
      "define-goal",
      1,
      "foundation",
      "high",
      "defineGoal",
      "defineGoalDescription",
      15
    );

    add(
      "review-requirements",
      1,
      "foundation",
      "high",
      "reviewRequirements",
      "reviewRequirementsDescription",
      20,
      "career-match"
    );

    add(
      "complete-resume",
      2,
      "optimization",
      "high",
      "completeResume",
      "completeResumeDescription",
      30,
      "builder"
    );

    add(
      "optimize-resume",
      3,
      "optimization",
      "high",
      "optimizeResume",
      "optimizeResumeDescription",
      30,
      "resume-optimizer"
    );

    /* PHASE 2: SKILL DEVELOPMENT */

    const missingSkills = Array.isArray(
      context.skillGap?.missingSkills
    )

      ? context.skillGap.missingSkills

      : [];

    const prioritySkills = missingSkills

      .slice()

      .sort((a, b) =>

        (b.weight || 0) -
        (a.weight || 0)

      )

      .slice(

        0,

        duration === 7
          ? 2
          : duration === 14
            ? 4
            : 6

      );

    prioritySkills.forEach(
      (skill, index) => {

        const priority = [

          "high", "medium", "low"

        ].includes(skill.priority)

          ? skill.priority

          : "medium";

        const verifyDay =

          duration === 7

            ? 4

            : 4 + index * 2;

        const practiceDay =

          duration === 7

            ? 5

            : verifyDay + 1;

        add(

          "verify-skill-" + skill.id,

          verifyDay,

          "development",

          priority,

          "verifySkill",

          "verifySkillDescription",

          20,

          "skill-gap",

          skill

        );

        add(

          "practice-skill-" + skill.id,

          practiceDay,

          "development",

          priority,

          "developSkill",

          "developSkillDescription",

          45,

          null,

          skill

        );

      }
    );

    /* PHASE 3: PROFESSIONAL EVIDENCE */

    add(

      "document-achievements",

      duration === 7 ? 4 : 6,

      "development",

      "medium",

      "evidence",

      "evidenceDescription",

      30,

      "builder"

    );

    if (duration >= 14) {

      add(

        "prepare-portfolio",

        duration === 14 ? 9 : 16,

        "development",

        "medium",

        "portfolio",

        "portfolioDescription",

        45

      );

    }

    /* PHASE 4: INTERVIEW PREPARATION */

    const interviewDay =

      duration === 7

        ? 5

        : duration === 14

          ? 10

          : 20;

    add(

      "practice-interview",

      interviewDay,

      "preparation",

      "high",

      "interview",

      "interviewDescription",

      30,

      "interview-preparation"

    );

    add(

      "prepare-star",

      interviewDay,

      "preparation",

      "medium",

      "star",

      "starDescription",

      20,

      "interview-preparation"

    );

    /* PHASE 5: APPLICATION STRATEGY */

    const applicationDay =

      duration === 7

        ? 6

        : duration === 14

          ? 12

          : 25;

    add(

      "prepare-cover-letter",

      applicationDay,

      "application",

      "high",

      "coverLetter",

      "coverLetterDescription",

      25,

      "cover-letter"

    );

    add(

      "research-employers",

      applicationDay,

      "application",

      "medium",

      "researchEmployers",

      "researchEmployersDescription",

      30

    );

    add(

      "submit-applications",

      Math.min(
        duration,
        applicationDay + 1
      ),

      "application",

      "high",

      "applyJobs",

      "applyJobsDescription",

      30

    );

    /* PHASE 6: PROGRESS REVIEW */

    if (
      resumeText &&
      jobDescription
    ) {

      add(

        "reassess-alignment",

        duration,

        "review",

        "medium",

        "reassess",

        "reassessDescription",

        20,

        "career-match"

      );

    }

    add(

      "final-review",

      duration,

      "review",

      "high",

      "finalReview",

      "finalReviewDescription",

      20

    );

    /* DAILY WORKLOAD ORGANIZATION */

    const dailyLoad = new Map();

    const priorities = {
      high: 3,
      medium: 2,
      low: 1
    };

    tasks.sort(

      (a, b) =>

        a.day - b.day ||

        priorities[b.priority] -
        priorities[a.priority]

    );

    tasks.forEach(task => {

      let day = task.day;

      while (

        day < duration &&

        (dailyLoad.get(day) || 0) +
        task.estimatedMinutes >
        dailyMinutes

      ) {

        day++;

      }

      task.day = day;

      dailyLoad.set(

        day,

        (dailyLoad.get(day) || 0) +
        task.estimatedMinutes

      );

    });

    tasks.sort(

      (a, b) => a.day - b.day

    );

    const scheduledTasks = tasks.map(

      (task, index) => ({

        ...task,

        order: index + 1

      })

    );

    const days = Array.from(

      { length: duration },

      (_, index) => {

        const day = index + 1;

        const dayTasks =
          scheduledTasks.filter(

            task => task.day === day

          );

        const estimatedMinutes =
          dayTasks.reduce(

            (total, task) =>
              total + task.estimatedMinutes,

            0

          );

        return {

          day,

          taskCount: dayTasks.length,

          estimatedMinutes,

          exceedsDailyTarget:
            estimatedMinutes > dailyMinutes,

          tasks: dayTasks

        };

      }

    );

    const totalMinutes =
      scheduledTasks.reduce(

        (total, task) =>
          total + task.estimatedMinutes,

        0

      );

    const categories = [

      ...new Set(

        scheduledTasks.map(
          task => task.category
        )

      )

    ].map(category => ({

      id: category,

      label: t(category, language),

      taskCount: scheduledTasks.filter(

        task => task.category === category

      ).length

    }));

    const result = {

      ok: true,

      version: VERSION,

      language,

      targetRole,

      duration,

      dailyMinutes,

      totalMinutes,

      totalHours:

        Math.round(
          totalMinutes / 60 * 10
        ) / 10,

      personalized:

        context.available &&
        Boolean(
          context.skillGap?.available ||
          context.optimization?.ok
        ),

      analysisAvailable:
        context.available,

      moduleErrors:
        context.moduleErrors,

      baseline: {

        estimatedATSReadiness:

          context.ats
            ?.estimatedATSReadiness ?? null,

        estimatedSkillCoverage:

          context.skillGap
            ?.coverage ?? null,

        estimatedCareerMatch:

          context.careerMatch
            ?.matchScore ?? null

      },

      taskCount:
        scheduledTasks.length,

      highPriorityCount:

        scheduledTasks.filter(

          task => task.priority === "high"

        ).length,

      prioritySkills:

        prioritySkills.map(skill => ({

          id: skill.id,

          name: skill.name,

          priority: skill.priority

        })),

      overloadedDays:

        days.filter(

          day => day.exceedsDailyTarget

        ).map(day => day.day),

      workloadFitsDailyTarget:

        days.every(

          day => !day.exceedsDailyTarget

        ),

      categories,

      tasks: scheduledTasks,

      days,

      message: t(
        "generated",
        language
      ),

      disclaimer: t(
        "disclaimer",
        language
      ),

      generatedAt:
        new Date().toISOString()

    };

    if (options.emit !== false) {

      document.dispatchEvent(

        new CustomEvent(

          "worknely:careerplangenerated",

          {

            detail: {

              version: VERSION,

              duration,

              taskCount:
                result.taskCount,

              personalized:
                result.personalized

            }

          }

        )

      );

    }

    return result;
  }

  /* LOCAL PROGRESS TRACKING */

  function createSession(options = {}) {

    const plan = generate({

      ...options,

      emit: false

    });

    const statuses = new Map(

      plan.tasks.map(task => [

        task.id,

        "pending"

      ])

    );

    let closed = false;

    const allowedStatuses = [

      "pending",

      "inProgress",

      "completed"

    ];

    function setTaskStatus(
      taskId,
      status
    ) {

      if (closed) {

        return {

          ok: false,

          reason: "sessionClosed"

        };

      }

      if (!statuses.has(taskId)) {

        return {

          ok: false,

          reason: "unknownTask"

        };

      }

      if (
        !allowedStatuses.includes(status)
      ) {

        return {

          ok: false,

          reason: "invalidStatus"

        };

      }

      statuses.set(taskId, status);

      const progress = getProgress();

      document.dispatchEvent(

        new CustomEvent(

          "worknely:careerplanprogress",

          {

            detail: {

              version: VERSION,

              completed:
                progress.completed,

              total:
                progress.total,

              completion:
                progress.completion

            }

          }

        )

      );

      return {

        ok: true,

        taskId,

        status,

        progress

      };
    }

    function completeTask(taskId) {

      return setTaskStatus(

        taskId,

        "completed"

      );

    }

    function startTask(taskId) {

      return setTaskStatus(

        taskId,

        "inProgress"

      );

    }

    function resetTask(taskId) {

      return setTaskStatus(

        taskId,

        "pending"

      );

    }

    function getProgress() {

      if (closed) {

        return {

          closed: true,

          total: 0,

          completed: 0,

          inProgress: 0,

          pending: 0,

          completion: 0

        };

      }

      const values = [

        ...statuses.values()

      ];

      const total = values.length;

      const completed = values.filter(

        value => value === "completed"

      ).length;

      const inProgress = values.filter(

        value => value === "inProgress"

      ).length;

      return {

        closed: false,

        total,

        completed,

        inProgress,

        pending:

          total - completed - inProgress,

        completion:

          total

            ? Math.round(
                completed / total * 100
              )

            : 0

      };
    }

    function getTasks() {

      if (closed) return [];

      return plan.tasks.map(task => ({

        ...task,

        status:

          statuses.get(task.id) ||

          "pending",

        statusLabel: t(

          statuses.get(task.id) ||

          "pending",

          plan.language

        )

      }));

    }

    function getDay(dayNumber) {

      const day = Number(dayNumber);

      if (

        closed ||

        !Number.isInteger(day) ||

        day < 1 ||

        day > plan.duration

      ) return null;

      const tasks = getTasks().filter(

        task => task.day === day

      );

      return {

        day,

        tasks,

        completed: tasks.filter(

          task => task.status === "completed"

        ).length,

        estimatedMinutes:

          tasks.reduce(

            (total, task) =>

              total + task.estimatedMinutes,

            0

          )

      };

    }

    function getNextTask() {

      if (closed) return null;

      return getTasks().find(

        task => task.status !== "completed"

      ) || null;

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

        language: plan.language,

        targetRole: plan.targetRole,

        duration: plan.duration,

        dailyMinutes: plan.dailyMinutes,

        baseline: { ...plan.baseline },

        progress: getProgress(),

        tasks: getTasks(),

        disclaimer: plan.disclaimer

      };

    }

    function resetProgress() {

      if (closed) {

        return {

          ok: false,

          reason: "sessionClosed"

        };

      }

      statuses.forEach(

        (_, key) =>

          statuses.set(key, "pending")

      );

      return {

        ok: true,

        progress: getProgress()

      };

    }

    function clear() {

      statuses.clear();

      plan.tasks.length = 0;

      plan.days.length = 0;

      plan.prioritySkills.length = 0;

      plan.categories.length = 0;

      plan.targetRole = "";

      plan.baseline = {};

      closed = true;

      return {

        ok: true,

        cleared: true

      };

    }

    return Object.freeze({

      version: VERSION,

      setTaskStatus,

      completeTask,

      startTask,

      resetTask,

      getProgress,

      getTasks,

      getDay,

      getNextTask,

      getReport,

      resetProgress,

      clear

    });

  }

  /* TEXT REPORT EXPORT */

  function formatReport(report) {

    if (!report?.ok) return "";

    const language = normalizeLanguage(

      report.language

    );

    const lines = [

      "WORKNELY",

      t("title", language),

      "",

      t("targetPosition", language) +

        ": " +

        safeText(report.targetRole, 200),

      ""

    ];

    const tasks = Array.isArray(
      report.tasks
    )

      ? report.tasks

      : [];

    tasks.forEach(task => {

      const status = task.status ===
        "completed"

          ? "[x]"

          : "[ ]";

      lines.push(

        status +

        " " +

        task.day +

        " — " +

        safeText(task.title, 500)

      );

      lines.push(

        safeText(
          task.description,
          2000
        )

      );

      lines.push("");

    });

    lines.push(

      t("disclaimer", language)

    );

    return lines.join("\n");

  }

  function createTextFile(report) {

    const text = formatReport(report);

    if (!text) {

      return {

        ok: false,

        reason: "emptyReport"

      };

    }

    const filename =

      "Worknely-Career-Action-Plan.txt";

    const blob = new Blob(

      [text],

      {

        type:
          "text/plain;charset=utf-8"

      }

    );

    const file =

      typeof File === "function"

        ? new File(

            [blob],

            filename,

            { type: blob.type }

          )

        : null;

    return {

      ok: true,

      filename,

      blob,

      file

    };

  }

  /* WORKNELY INTEGRATION */

  function generateBuilder(options = {}) {

    return generate({

      ...options,

      content: readBuilder()

    });

  }

  function generateComparison(
    options = {}
  ) {

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

  /* MODULE STATUS */

  function getState() {

    return {

      version: VERSION,

      ready: true,

      supportedLanguages:
        LANGUAGES.length,

      supportedDurations:
        [...DURATIONS],

      careerEngineReady: Boolean(

        window.WorknelyCareerIntelligence
          ?.analyze

      ),

      skillEngineReady: Boolean(

        window.WorknelySkillGap
          ?.analyze

      ),

      optimizerReady: Boolean(

        window.WorknelyResumeOptimizer
          ?.analyze

      ),

      careerMatchReady: Boolean(

        window.WorknelyCareerMatch
          ?.analyze

      ),

      interviewStudioReady: Boolean(

        window.WorknelyInterviewPreparation
          ?.generate

      ),

      coverLetterStudioReady: Boolean(

        window.WorknelyCoverLetter
          ?.generate

      ),

      processing: "local",

      externalAI: false,

      progressTracking: true,

      persistentProgressStorage: false,

      textExport: true,

      guaranteedEmployment: false

    };

  }

  /* INTERNAL SELF-TEST */

  function selfTest() {

    const plan = generate({

      content: {},

      targetRole: "Software Developer",

      duration: 14,

      dailyMinutes: 30,

      language: "en",

      emit: false

    });

    const session = createSession({

      content: {},

      targetRole: "Developer",

      duration: 7,

      language: "en"

    });

    const first = session.getNextTask();

    const started = session.startTask(
      first?.id
    );

    const completed = session.completeTask(
      first?.id
    );

    const progress =
      session.getProgress();

    const report =
      session.getReport();

    const exported =
      createTextFile(report);

    const checks = {

      generationSuccessful:

        plan.ok === true &&

        plan.taskCount > 0,

      durationValidation:

        plan.duration === 14,

      defaultDuration:

        normalizeDuration(90) === 14,

      dailyTimeValidation:

        normalizeMinutes(10) === 15,

      uniqueTaskIds:

        new Set(

          plan.tasks.map(task => task.id)

        ).size === plan.taskCount,

      validSchedule:

        plan.tasks.every(

          task =>

            task.day >= 1 &&

            task.day <= plan.duration

        ),

      validWorkload:

        plan.days.reduce(

          (total, day) =>

            total + day.estimatedMinutes,

          0

        ) === plan.totalMinutes,

      taskStart:

        started.ok === true,

      taskCompletion:

        completed.ok === true,

      progressTracking:

        progress.completed === 1,

      invalidTaskProtection:

        session.completeTask(
          "unknown-task"
        ).ok === false,

      invalidStatusProtection:

        session.setTaskStatus(

          first?.id,

          "invalid"

        ).ok === false,

      reportGeneration:

        report.ok === true,

      textExport:

        exported.ok === true,

      multilingualSupport:

        LANGUAGES.every(

          language =>

            generate({

              content: {},

              duration: 7,

              language,

              emit: false

            }).ok === true

        ),

      supportedDurations:

        DURATIONS.every(

          duration =>

            generate({

              content: {},

              duration,

              emit: false

            }).duration === duration

        )

    };

    session.resetProgress();

    checks.progressReset =

      session.getProgress().completed === 0;

    session.clear();

    checks.sessionPrivacy =

      session.getReport().ok === false;

    const dependenciesReady =

      getState().careerEngineReady &&

      getState().skillEngineReady &&

      getState().optimizerReady &&

      getState().careerMatchReady;

    if (dependenciesReady) {

      const personalized = generate({

        content: {

          professionalTitle:
            "Software Developer",

          experience:
            "Developed JavaScript applications.",

          skills:
            "JavaScript, HTML, CSS"

        },

        targetRole:
          "Software Developer",

        jobDescription:

          "JavaScript required.\n" +

          "Python mandatory.",

        duration: 14,

        language: "en",

        emit: false

      });

      checks.integratedAnalysis =

        personalized.ok === true &&

        personalized.analysisAvailable;

      checks.personalizedSkillTasks =

        personalized.tasks.some(

          task => task.skillId === "python"

        );

      checks.baselineAvailable =

        typeof personalized.baseline

          .estimatedCareerMatch === "number";

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

  /* PUBLIC CAREER ACTION PLAN API */

  window.WorknelyCareerActionPlan =

    Object.freeze({

      version: VERSION,

      languages: LANGUAGES,

      durations: DURATIONS,

      getLanguage,

      t,

      readBuilder,

      normalizeDuration,

      normalizeMinutes,

      generate,

      generateBuilder,

      generateComparison,

      createSession,

      formatReport,

      createTextFile,

      selfTest,

      getState

    });

  document.dispatchEvent(

    new CustomEvent(

      "worknely:careeractionplanready",

      {

        detail: getState()

      }

    )

  );

  console.info(

    "Worknely V" + VERSION +

    " Career Action Plan initialized."

  );

})();

/*
 * END WORKNELY V7.17.7
 *
 * Personalized Career Roadmap
 * Professional Development Planning
 * Skill Gap Integration
 * Local Progress Tracking
 * International Localization
 * Privacy-First Architecture
 * People Technology
 */
