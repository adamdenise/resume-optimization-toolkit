/*
 * WORKNELY V7.17.4
 * Career Match Intelligence
 * International Career Decision Engine
 * Privacy-First Local Processing
 * People Technology
 */

(function () {
  "use strict";

  const VERSION = "7.17.4";

  const LANGUAGES = Object.freeze([
    "en", "ro", "it", "de", "fr", "es"
  ]);

  const WEIGHTS = Object.freeze({
    keywords: 30,
    skills: 45,
    role: 15,
    experience: 10
  });

  const DICTIONARY = {

    title: [
      "Career Match Intelligence",
      "Compatibilitate profesională",
      "Compatibilità professionale",
      "Berufliche Übereinstimmung",
      "Compatibilité professionnelle",
      "Compatibilidad profesional"
    ],

    keywords: [
      "Keyword alignment",
      "Relevanța cuvintelor-cheie",
      "Corrispondenza delle parole chiave",
      "Schlüsselwortübereinstimmung",
      "Correspondance des mots-clés",
      "Coincidencia de palabras clave"
    ],

    skills: [
      "Skill alignment",
      "Compatibilitatea competențelor",
      "Compatibilità delle competenze",
      "Kompetenzübereinstimmung",
      "Correspondance des compétences",
      "Compatibilidad de competencias"
    ],

    role: [
      "Target role alignment",
      "Compatibilitatea rolului",
      "Compatibilità del ruolo",
      "Übereinstimmung der Zielposition",
      "Correspondance du poste",
      "Compatibilidad del puesto"
    ],

    experience: [
      "Experience alignment",
      "Compatibilitatea experienței",
      "Compatibilità dell'esperienza",
      "Übereinstimmung der Erfahrung",
      "Correspondance de l'expérience",
      "Compatibilidad de experiencia"
    ],

    excellent: [
      "Very strong alignment",
      "Compatibilitate foarte ridicată",
      "Compatibilità molto elevata",
      "Sehr hohe Übereinstimmung",
      "Très forte compatibilité",
      "Compatibilidad muy alta"
    ],

    strong: [
      "Strong alignment",
      "Compatibilitate ridicată",
      "Compatibilità elevata",
      "Hohe Übereinstimmung",
      "Forte compatibilité",
      "Compatibilidad alta"
    ],

    moderate: [
      "Moderate alignment",
      "Compatibilitate moderată",
      "Compatibilità moderata",
      "Mittlere Übereinstimmung",
      "Compatibilité modérée",
      "Compatibilidad moderada"
    ],

    limited: [
      "Limited alignment",
      "Compatibilitate limitată",
      "Compatibilità limitata",
      "Begrenzte Übereinstimmung",
      "Compatibilité limitée",
      "Compatibilidad limitada"
    ],

    insufficient: [
      "Insufficient evidence",
      "Informații insuficiente",
      "Informazioni insufficienti",
      "Unzureichende Informationen",
      "Informations insuffisantes",
      "Información insuficiente"
    ],

    apply: [
      "Consider applying after reviewing all mandatory requirements.",
      "Ia în considerare candidatura după verificarea tuturor cerințelor obligatorii.",
      "Valuta la candidatura dopo aver verificato tutti i requisiti obbligatori.",
      "Erwäge eine Bewerbung nach Prüfung aller Pflichtanforderungen.",
      "Envisagez de postuler après vérification des exigences obligatoires.",
      "Considera postularte tras verificar todos los requisitos obligatorios."
    ],

    optimize: [
      "Tailor your resume using relevant and verified professional information.",
      "Adaptează CV-ul folosind informații profesionale relevante și reale.",
      "Adatta il curriculum con informazioni pertinenti e verificate.",
      "Passe deinen Lebenslauf mit relevanten und belegbaren Informationen an.",
      "Adaptez votre CV avec des informations pertinentes et vérifiées.",
      "Adapta tu currículum con información relevante y verificada."
    ],

    develop: [
      "Review the identified gaps and prioritize relevant professional development.",
      "Verifică diferențele identificate și prioritizează dezvoltarea profesională relevantă.",
      "Verifica le lacune e dai priorità allo sviluppo professionale.",
      "Prüfe die Kompetenzlücken und priorisiere relevante Weiterbildung.",
      "Examinez les écarts et privilégiez le développement professionnel pertinent.",
      "Revisa las brechas y prioriza el desarrollo profesional relevante."
    ],

    requiredSkills: [
      "Verify skills marked as mandatory in the job description.",
      "Verifică acele competențe identificate drept obligatorii.",
      "Verifica le competenze identificate come obbligatorie.",
      "Prüfe die als verpflichtend erkannten Kompetenzen.",
      "Vérifiez les compétences identifiées comme obligatoires.",
      "Verifica las competencias identificadas como obligatorias."
    ],

    experienceReview: [
      "Review the experience requirement before applying.",
      "Verifică cerința de experiență înainte de a candida.",
      "Verifica il requisito di esperienza prima di candidarti.",
      "Prüfe die Erfahrungsanforderung vor der Bewerbung.",
      "Vérifiez l'expérience requise avant de postuler.",
      "Verifica la experiencia requerida antes de postularte."
    ],

    experienceUnknown: [
      "Relevant years of experience could not be confirmed.",
      "Anii de experiență relevantă nu au putut fi confirmați.",
      "Gli anni di esperienza pertinente non sono stati confermati.",
      "Relevante Berufserfahrung konnte nicht bestätigt werden.",
      "Les années d'expérience pertinente n'ont pas été confirmées.",
      "No se pudieron confirmar los años de experiencia relevante."
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

    unavailable: [
      "Career Intelligence modules are unavailable.",
      "Modulele Career Intelligence nu sunt disponibile.",
      "Moduli Career Intelligence non disponibili.",
      "Career Intelligence Module sind nicht verfügbar.",
      "Modules Career Intelligence indisponibles.",
      "Módulos Career Intelligence no disponibles."
    ],

    disclaimer: [
      "Estimated document alignment, not a hiring probability or eligibility decision. Verify all employer requirements.",
      "Compatibilitate estimată a documentului, nu probabilitate de angajare sau decizie de eligibilitate. Verifică toate cerințele angajatorului.",
      "Compatibilità stimata del documento, non probabilità di assunzione o decisione di idoneità.",
      "Geschätzte Dokumentübereinstimmung, keine Einstellungswahrscheinlichkeit oder Eignungsentscheidung.",
      "Compatibilité documentaire estimée, sans prédiction d'embauche ni décision d'éligibilité.",
      "Compatibilidad documental estimada, no probabilidad de contratación ni decisión de elegibilidad."
    ]

  };

  const ROLE_STOP_WORDS = new Set([
    "the", "and", "for", "with",
    "of", "a", "an", "in",
    "de", "la", "si", "cu",
    "di", "del", "della", "con",
    "der", "die", "das", "und",
    "des", "du", "et", "en",
    "el", "los", "las", "y"
  ]);

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

  function normalize(value) {
    return safeText(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/ß/g, "ss")
      .replace(/c\+\+/g, "cplusplus")
      .replace(/c#/g, "csharp")
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function tokenize(value) {
    return normalize(value)
      .split(/\s+/)
      .filter(Boolean);
  }

  function clamp(value) {
    return Math.max(
      0,
      Math.min(100, value)
    );
  }

  function normalizeContent(input) {
    const fields = [
      "fullName",
      "professionalTitle",
      "contact",
      "education",
      "summary",
      "experience",
      "skills"
    ];

    const result = {};

    fields.forEach(key => {
      result[key] = safeText(input?.[key]);
    });

    return result;
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

    const result = {};

    Object.entries(ids).forEach(
      ([key, id]) => {
        result[key] = safeText(
          document.getElementById(id)?.value
        );
      }
    );

    return result;
  }

  function contentToText(content) {
    const data = normalizeContent(content);

    return [
      data.professionalTitle,
      data.summary,
      data.experience,
      data.education,
      data.skills
    ].filter(Boolean).join("\n");
  }

  /* TARGET ROLE ANALYSIS */

  function analyzeRole(
    professionalTitle,
    targetRole
  ) {
    const candidate = normalize(
      professionalTitle
    );

    const target = normalize(targetRole);

    if (!candidate || !target) {
      return {
        available: false,
        score: null,
        matchedTerms: [],
        missingTerms: []
      };
    }

    const candidateTerms = new Set(
      tokenize(candidate)
    );

    const targetTerms = [...new Set(
      tokenize(target).filter(
        word => !ROLE_STOP_WORDS.has(word)
      )
    )];

    if (!targetTerms.length) {
      return {
        available: false,
        score: null,
        matchedTerms: [],
        missingTerms: []
      };
    }

    const matchedTerms = targetTerms.filter(
      word => candidateTerms.has(word)
    );

    const missingTerms = targetTerms.filter(
      word => !candidateTerms.has(word)
    );

    return {
      available: true,

      score: Math.round(
        matchedTerms.length /
        targetTerms.length * 100
      ),

      matchedTerms,
      missingTerms
    };
  }

  /* EXPERIENCE REQUIREMENT ANALYSIS */

  function normalizeYears(value) {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) return null;

    const years = Number(value);

    return Number.isFinite(years) &&
      years >= 0 &&
      years <= 80
        ? years : null;
  }

  function extractExperienceRequirements(
    jobDescription
  ) {
    const text = safeText(jobDescription);

    const pattern =
      /(\d{1,2}(?:[.,]\d+)?)\s*(?:[-–]\s*\d{1,2})?\s*\+?\s*(?:years?|ani|anni|jahre[n]?|ans|années|años)\b/giu;

    const requirements = [];

    for (const match of text.matchAll(pattern)) {
      const years = normalizeYears(
        match[1].replace(",", ".")
      );

      if (years === null) continue;

      const start = Math.max(
        0,
        match.index - 65
      );

      const end = Math.min(
        text.length,
        match.index + match[0].length + 65
      );

      const context = text.slice(start, end);

      const normalizedContext =
        normalize(context);

      const experienceRelated =
        /\b(experience|experienta|esperienza|berufserfahrung|erfahrung|experiencia)\b/
          .test(normalizedContext);

      if (!experienceRelated) continue;

      requirements.push({
        years,
        evidence: match[0]
      });
    }

    return requirements;
  }

  function analyzeExperience(options = {}) {

    const detectedRequirements =
      extractExperienceRequirements(
        options.jobDescription
      );

    const requiredYears = normalizeYears(
      options.requiredYears
    );

    const candidateYears = normalizeYears(
      options.candidateYears
    );

    /*
     * Explicitly confirmed experience values
     * are required for numerical scoring.
     * No inference from age or employment dates.
     */

    const available =
      requiredYears !== null &&
      candidateYears !== null;

    const score = available

      ? requiredYears === 0
        ? 100
        : Math.round(
            clamp(
              candidateYears /
              requiredYears * 100
            )
          )

      : null;

    return {
      available,
      score,
      requiredYears,
      candidateYears,
      detectedRequirements,

      requirementDetected:
        detectedRequirements.length > 0,

      meetsRequirement: available
        ? candidateYears >= requiredYears
        : null,

      gapYears: available
        ? Math.max(
            0,
            requiredYears - candidateYears
          )
        : null,

      confirmationRequired:
        !available &&
        detectedRequirements.length > 0
    };
  }

  /* WEIGHTED CAREER MATCH */

  function calculateScore(factors) {
    let totalWeight = 0;
    let weightedScore = 0;

    Object.entries(WEIGHTS).forEach(
      ([key, weight]) => {

        const value = factors[key];

        if (
          typeof value !== "number" ||
          !Number.isFinite(value)
        ) return;

        totalWeight += weight;

        weightedScore +=
          clamp(value) * weight;
      }
    );

    return {
      score: totalWeight
        ? Math.round(
            weightedScore / totalWeight
          )
        : null,

      evidenceCoverage: totalWeight
    };
  }

  function getMatchLevel(score) {
    if (score === null) return "insufficient";
    if (score >= 85) return "excellent";
    if (score >= 70) return "strong";
    if (score >= 50) return "moderate";
    return "limited";
  }

  /* CAREER MATCH ANALYSIS */

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

    const targetRole = safeText(
      options.targetRole
    ).slice(0, 200);

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

    const careerEngine =
      window.WorknelyCareerIntelligence;

    const skillEngine =
      window.WorknelySkillGap;

    const optimizer =
      window.WorknelyResumeOptimizer;

    if (
      typeof careerEngine?.analyze !== "function" ||
      typeof skillEngine?.analyze !== "function"
    ) {
      return {
        ok: false,
        version: VERSION,
        reason: "unavailable",
        message: t("unavailable", language)
      };
    }

    const career = careerEngine.analyze({
      content,
      resumeText,
      jobDescription,
      language
    });

    const skillGap = skillEngine.analyze({
      content,
      resumeText,
      jobDescription,
      language,
      emit: false
    });

    if (!career?.ok || !skillGap?.ok) {
      return {
        ok: false,
        version: VERSION,
        reason: "analysisFailed",
        message:
          career?.message ||
          skillGap?.message ||
          t("unavailable", language)
      };
    }

    const role = analyzeRole(
      options.professionalTitle ||
      content.professionalTitle,
      targetRole
    );

    const experience = analyzeExperience({
      jobDescription,
      requiredYears: options.requiredYears,
      candidateYears: options.candidateYears
    });

    const factors = {
      keywords: career.relevance?.score ?? null,
      skills: skillGap.coverage ?? null,
      role: role.score,
      experience: experience.score
    };

    const calculation =
      calculateScore(factors);

    const score = calculation.score;

    const level = getMatchLevel(score);

    const mandatoryGaps =
      skillGap.highPriorityGaps || [];

    const recommendations = [];

    if (mandatoryGaps.length) {
      recommendations.push({
        id: "mandatory-skills",
        priority: "high",
        message: t("requiredSkills", language),

        skills: mandatoryGaps.map(
          skill => skill.name
        )
      });
    }

    if (experience.meetsRequirement === false) {
      recommendations.push({
        id: "experience-gap",
        priority: "high",
        message: t(
          "experienceReview", language
        )
      });
    }

    if (experience.confirmationRequired) {
      recommendations.push({
        id: "experience-unconfirmed",
        priority: "medium",
        message: t(
          "experienceUnknown", language
        )
      });
    }

    if (
      score !== null &&
      score >= 70 &&
      !mandatoryGaps.length &&
      experience.meetsRequirement !== false
    ) {
      recommendations.push({
        id: "consider-application",
        priority: "medium",
        message: t("apply", language)
      });
    }

    recommendations.push({
      id: "resume-optimization",
      priority: "medium",
      message: t("optimize", language)
    });

    if (skillGap.missingCount > 0) {
      recommendations.push({
        id: "skill-development",
        priority: "medium",
        message: t("develop", language)
      });
    }

    const optimization =
      typeof optimizer?.analyze === "function"

        ? optimizer.analyze({
            content,
            resumeText,
            jobDescription,
            language,
            emit: false
          })

        : null;

    const result = {
      ok: true,
      version: VERSION,
      language,

      targetRole,

      matchScore: score,

      estimatedCareerMatch: score,

      matchLevel: level,

      matchLabel: t(level, language),

      evidenceCoverage:
        calculation.evidenceCoverage,

      factors: Object.entries(factors)
        .map(([id, value]) => ({
          id,
          label: t(id, language),
          score: value,
          available: value !== null,
          weight: WEIGHTS[id]
        })),

      estimatedATSReadiness:
        career.estimatedATSReadiness,

      estimatedSkillCoverage:
        skillGap.coverage,

      matchedKeywords:
        career.matchedKeywords || [],

      missingKeywords:
        career.missingKeywords || [],

      matchedSkills:
        skillGap.matchedSkills || [],

      missingSkills:
        skillGap.missingSkills || [],

      mandatorySkillGaps:
        mandatoryGaps,

      mandatoryGapCount:
        mandatoryGaps.length,

      roleAnalysis: role,

      experienceAnalysis: experience,

      optimizationSuggestions:
        optimization?.ok
          ? optimization.suggestions
          : [],

      recommendations,

      disclaimer:
        t("disclaimer", language),

      generatedAt:
        new Date().toISOString()
    };

    if (options.emit !== false) {
      document.dispatchEvent(
        new CustomEvent(
          "worknely:careermatchcomplete",
          {
            detail: {
              version: VERSION,
              matchScore: score,
              matchLevel: level,
              evidenceCoverage:
                result.evidenceCoverage,
              mandatoryGapCount:
                result.mandatoryGapCount
            }
          }
        )
      );
    }

    return result;
  }

  /* BUILDER INTEGRATION */

  function analyzeBuilder(options = {}) {
    return analyze({
      ...options,
      content: readBuilder()
    });
  }

  /* COMPARISON INTEGRATION */

  function analyzeComparison(options = {}) {
    return analyze({
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

      ready: Boolean(
        window.WorknelyCareerIntelligence
          ?.analyze &&
        window.WorknelySkillGap
          ?.analyze
      ),

      careerEngineVersion:
        window.WorknelyCareerIntelligence
          ?.version || null,

      skillEngineVersion:
        window.WorknelySkillGap
          ?.version || null,

      optimizerVersion:
        window.WorknelyResumeOptimizer
          ?.version || null,

      supportedLanguages:
        LANGUAGES.length,

      processing: "local",

      externalAI: false,

      hiringPrediction: false,

      estimatedScoring: true
    };
  }

  /* INTERNAL SELF-TEST */

  function selfTest() {

    const role = analyzeRole(
      "Senior Software Developer",
      "Software Developer"
    );

    const experience = analyzeExperience({
      requiredYears: 4,
      candidateYears: 2
    });

    const unknownExperience =
      analyzeExperience({
        jobDescription:
          "Minimum 3 years of experience."
      });

    const weighted = calculateScore({
      keywords: 80,
      skills: 100,
      role: null,
      experience: null
    });

    const checks = {

      roleMatching:
        role.score === 100,

      experienceMatching:
        experience.score === 50,

      experienceGap:
        experience.gapYears === 2,

      unknownExperienceProtection:
        unknownExperience.score === null,

      requirementDetection:
        unknownExperience.requirementDetected,

      weightedScore:
        weighted.score === 92,

      evidenceCoverage:
        weighted.evidenceCoverage === 75,

      emptyFactorsProtection:
        calculateScore({}).score === null,

      multilingualSupport:
        LANGUAGES.every(language =>
          t("title", language) !== "title"
        ),

      emptyResumeProtection:
        analyze({
          content: {},
          resumeText: "",
          jobDescription: "JavaScript",
          emit: false
        }).ok === false
    };

    const dependenciesReady =
      getState().ready;

    if (dependenciesReady) {

      const result = analyze({
        content: {
          professionalTitle:
            "Software Developer",

          experience:
            "Developed JavaScript applications.",

          skills:
            "JavaScript, HTML, CSS"
        },

        targetRole: "Software Developer",

        jobDescription:
          "JavaScript required.\n" +
          "Python mandatory.",

        language: "en",

        emit: false
      });

      checks.integratedAnalysis =
        result.ok === true;

      checks.validMatchScore =
        result.matchScore >= 0 &&
        result.matchScore <= 100;

      checks.mandatoryGapDetection =
        result.mandatorySkillGaps?.some(
          skill => skill.id === "python"
        ) === true;
    }

    return {
      version: VERSION,

      passed:
        Object.values(checks).every(Boolean),

      dependenciesReady,

      integrationTested:
        dependenciesReady,

      checks
    };
  }

  /* PUBLIC CAREER MATCH API */

  window.WorknelyCareerMatch =
    Object.freeze({

      version: VERSION,

      languages: LANGUAGES,

      weights: WEIGHTS,

      getLanguage,

      t,

      readBuilder,

      analyzeRole,

      analyzeExperience,

      extractExperienceRequirements,

      calculateScore,

      getMatchLevel,

      analyze,

      analyzeBuilder,

      analyzeComparison,

      selfTest,

      getState
    });

  document.dispatchEvent(
    new CustomEvent(
      "worknely:careermatchready",
      {
        detail: getState()
      }
    )
  );

  console.info(
    "Worknely V" + VERSION +
    " Career Match Intelligence initialized."
  );

})();

/*
 * END WORKNELY V7.17.4
 *
 * Career Match Intelligence
 * Professional Role Alignment
 * Experience Requirement Analysis
 * Weighted Skill Intelligence
 * International Career Development
 * Privacy-First Architecture
 * People Technology
 */
