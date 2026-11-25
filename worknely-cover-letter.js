/*
 * WORKNELY V7.17.6
 * International Cover Letter Studio
 * Career Intelligence Architecture
 * Privacy-First Local Processing
 * People Technology
 */

(function () {
  "use strict";

  const VERSION = "7.17.6";

  const LANGUAGES = Object.freeze([
    "en", "ro", "it", "de", "fr", "es"
  ]);

  const TONES = Object.freeze([
    "professional",
    "confident",
    "concise"
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
      "Cover Letter Studio",
      "Studio scrisori de intenție",
      "Studio lettere di presentazione",
      "Anschreiben Studio",
      "Studio lettres de motivation",
      "Estudio de cartas de presentación"
    ],

    professional: [
      "Professional",
      "Profesional",
      "Professionale",
      "Professionell",
      "Professionnel",
      "Profesional"
    ],

    confident: [
      "Confident",
      "Încrezător",
      "Sicuro",
      "Selbstbewusst",
      "Assuré",
      "Seguro"
    ],

    concise: [
      "Concise",
      "Concis",
      "Conciso",
      "Prägnant",
      "Concis",
      "Conciso"
    ],

    targetRole: [
      "Target position",
      "Postul vizat",
      "Posizione desiderata",
      "Zielposition",
      "Poste visé",
      "Puesto objetivo"
    ],

    company: [
      "Company",
      "Companie",
      "Azienda",
      "Unternehmen",
      "Entreprise",
      "Empresa"
    ],

    subject: [
      "Application for {role}",
      "Candidatură pentru postul de {role}",
      "Candidatura per la posizione di {role}",
      "Bewerbung als {role}",
      "Candidature au poste de {role}",
      "Candidatura para el puesto de {role}"
    ],

    greeting: [
      "Dear Hiring Team,",
      "Stimată echipă de recrutare,",
      "Gentile team di selezione,",
      "Sehr geehrtes Recruiting-Team,",
      "Madame, Monsieur,",
      "Estimado equipo de selección:"
    ],

    greetingNamed: [
      "Dear {recipient},",
      "În atenția: {recipient},",
      "Alla cortese attenzione di {recipient},",
      "Zu Händen von {recipient},",
      "À l'attention de {recipient},",
      "A la atención de {recipient}:"
    ],

    introduction: [
      "I would like to submit my application for the position of {role}.",
      "Doresc să îmi depun candidatura pentru postul de {role}.",
      "Desidero presentare la mia candidatura per la posizione di {role}.",
      "Hiermit bewerbe ich mich um die Position als {role}.",
      "Je souhaite vous présenter ma candidature au poste de {role}.",
      "Me gustaría presentar mi candidatura para el puesto de {role}."
    ],

    introductionCompany: [
      "I would like to apply for the position of {role} at {company}.",
      "Doresc să candidez pentru postul de {role} în cadrul companiei {company}.",
      "Desidero candidarmi per la posizione di {role} presso {company}.",
      "Hiermit bewerbe ich mich als {role} bei {company}.",
      "Je souhaite postuler au poste de {role} au sein de {company}.",
      "Me gustaría presentar mi candidatura para el puesto de {role} en {company}."
    ],

    confidentIntro: [
      "I am interested in the opportunity to contribute my professional skills in the role of {role}.",
      "Sunt interesat(ă) de oportunitatea de a contribui prin competențele mele profesionale în rolul de {role}.",
      "Sono interessato/a alla possibilità di contribuire con le mie competenze nel ruolo di {role}.",
      "Ich möchte meine beruflichen Kompetenzen in der Position als {role} einbringen.",
      "Je souhaite mettre mes compétences professionnelles au service du poste de {role}.",
      "Me interesa aportar mis competencias profesionales en el puesto de {role}."
    ],

    profile: [
      "My professional background includes the following:",
      "Profilul meu profesional include următoarele:",
      "Il mio profilo professionale comprende:",
      "Mein berufliches Profil umfasst:",
      "Mon parcours professionnel comprend :",
      "Mi perfil profesional incluye:"
    ],

    experience: [
      "My relevant professional experience includes:",
      "Experiența mea profesională relevantă include:",
      "La mia esperienza professionale pertinente comprende:",
      "Meine relevante Berufserfahrung umfasst:",
      "Mon expérience professionnelle pertinente comprend :",
      "Mi experiencia profesional relevante incluye:"
    ],

    education: [
      "My educational background includes:",
      "Pregătirea mea educațională include:",
      "La mia formazione comprende:",
      "Meine Ausbildung umfasst:",
      "Ma formation comprend :",
      "Mi formación académica incluye:"
    ],

    skills: [
      "My professional skills include {skills}.",
      "Competențele mele profesionale includ {skills}.",
      "Le mie competenze professionali includono {skills}.",
      "Zu meinen beruflichen Kompetenzen gehören {skills}.",
      "Mes compétences professionnelles comprennent {skills}.",
      "Mis competencias profesionales incluyen {skills}."
    ],

    relevantSkills: [
      "The skills I have listed that correspond to the job description include {skills}.",
      "Competențele menționate în profilul meu care corespund descrierii postului includ {skills}.",
      "Le competenze indicate nel mio profilo pertinenti all'annuncio includono {skills}.",
      "Meine angegebenen Kompetenzen, die zur Stellenbeschreibung passen, umfassen {skills}.",
      "Les compétences mentionnées dans mon profil correspondant à l'offre comprennent {skills}.",
      "Las competencias indicadas en mi perfil que coinciden con la oferta incluyen {skills}."
    ],

    motivation: [
      "My motivation for this opportunity:",
      "Motivația mea pentru această oportunitate:",
      "La mia motivazione per questa opportunità:",
      "Meine Motivation für diese Gelegenheit:",
      "Ma motivation pour cette opportunité :",
      "Mi motivación para esta oportunidad:"
    ],

    contribution: [
      "I would welcome the opportunity to discuss how my background could contribute to your team's objectives.",
      "Aș aprecia oportunitatea de a discuta despre modul în care profilul meu profesional poate contribui la obiectivele echipei dumneavoastră.",
      "Sarei lieto/a di discutere come il mio profilo possa contribuire agli obiettivi del vostro team.",
      "Gerne erläutere ich, wie mein beruflicher Hintergrund zu den Zielen Ihres Teams beitragen könnte.",
      "Je serais ravi(e) d'échanger sur la contribution que mon parcours pourrait apporter à votre équipe.",
      "Me gustaría conversar sobre cómo mi trayectoria podría contribuir a los objetivos de su equipo."
    ],

    closing: [
      "Thank you for considering my application. I look forward to the opportunity to discuss my candidacy.",
      "Vă mulțumesc pentru analizarea candidaturii mele și aștept cu interes oportunitatea unei discuții.",
      "Vi ringrazio per l'attenzione e resto a disposizione per un eventuale colloquio.",
      "Vielen Dank für die Berücksichtigung meiner Bewerbung. Über ein persönliches Gespräch würde ich mich freuen.",
      "Je vous remercie de l'attention portée à ma candidature et reste à votre disposition pour un entretien.",
      "Gracias por considerar mi candidatura. Quedo a su disposición para una entrevista."
    ],

    conciseClosing: [
      "Thank you for your time and consideration.",
      "Vă mulțumesc pentru timpul și atenția acordate.",
      "Vi ringrazio per il tempo e l'attenzione.",
      "Vielen Dank für Ihre Zeit und Aufmerksamkeit.",
      "Je vous remercie pour votre attention.",
      "Gracias por su tiempo y consideración."
    ],

    signature: [
      "Kind regards,",
      "Cu stimă,",
      "Cordiali saluti,",
      "Mit freundlichen Grüßen",
      "Cordialement,",
      "Atentamente,"
    ],

    missingRole: [
      "Enter the target position.",
      "Introdu postul vizat.",
      "Inserisci la posizione desiderata.",
      "Gib die Zielposition ein.",
      "Indiquez le poste visé.",
      "Introduce el puesto objetivo."
    ],

    missingProfile: [
      "Add professional information before generating a letter.",
      "Adaugă informații profesionale înainte de generarea scrisorii.",
      "Aggiungi informazioni professionali prima di generare la lettera.",
      "Füge berufliche Informationen hinzu.",
      "Ajoutez des informations professionnelles.",
      "Añade información profesional."
    ],

    missingName: [
      "Add your name before sending the letter.",
      "Adaugă numele înainte de trimiterea scrisorii.",
      "Aggiungi il tuo nome prima dell'invio.",
      "Füge vor dem Versand deinen Namen hinzu.",
      "Ajoutez votre nom avant l'envoi.",
      "Añade tu nombre antes de enviarla."
    ],

    missingCompany: [
      "Add the company name for better personalization.",
      "Adaugă numele companiei pentru personalizare.",
      "Aggiungi il nome dell'azienda.",
      "Ergänze den Unternehmensnamen.",
      "Ajoutez le nom de l'entreprise.",
      "Añade el nombre de la empresa."
    ],

    missingMotivation: [
      "Add a personal motivation specific to this opportunity.",
      "Adaugă o motivație personală specifică acestei oportunități.",
      "Aggiungi una motivazione personale specifica.",
      "Ergänze eine persönliche Motivation.",
      "Ajoutez une motivation personnelle spécifique.",
      "Añade una motivación personal específica."
    ],

    reviewLength: [
      "Review the length and keep only relevant information.",
      "Verifică lungimea și păstrează informațiile relevante.",
      "Verifica la lunghezza e mantieni le informazioni pertinenti.",
      "Prüfe die Länge und behalte relevante Informationen.",
      "Vérifiez la longueur et gardez les informations pertinentes.",
      "Revisa la extensión y conserva la información relevante."
    ],

    reviewLanguage: [
      "Verify that your source information is written in the selected letter language.",
      "Verifică dacă informațiile introduse sunt redactate în limba selectată pentru scrisoare.",
      "Verifica che le informazioni siano nella lingua selezionata.",
      "Prüfe, ob deine Angaben in der gewählten Sprache verfasst sind.",
      "Vérifiez que vos informations sont dans la langue sélectionnée.",
      "Comprueba que tus datos estén escritos en el idioma seleccionado."
    ],

    generated: [
      "Your cover letter draft is ready for review.",
      "Scrisoarea de intenție este pregătită pentru revizuire.",
      "La bozza della lettera è pronta per la revisione.",
      "Dein Anschreiben ist zur Überprüfung bereit.",
      "Votre lettre est prête à être relue.",
      "Tu carta está lista para revisión."
    ],

    disclaimer: [
      "Rule-based draft using your supplied information. Review accuracy, language and suitability before sending.",
      "Draft algoritmic bazat pe informațiile furnizate. Verifică exactitatea, limba și relevanța înainte de trimitere.",
      "Bozza basata sui dati forniti. Verifica accuratezza, lingua e pertinenza.",
      "Regelbasierter Entwurf. Prüfe Richtigkeit, Sprache und Eignung.",
      "Brouillon fondé sur vos informations. Vérifiez son exactitude et sa pertinence.",
      "Borrador basado en tus datos. Revisa exactitud, idioma y pertinencia."
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

  function normalizeTone(value) {
    return TONES.includes(value)
      ? value : "professional";
  }

  function normalizeContent(input) {
    const result = {};

    Object.keys(FIELDS).forEach(key => {
      result[key] = safeText(input?.[key]);
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
    const data = normalizeContent(content);

    return [
      data.professionalTitle,
      data.summary,
      data.experience,
      data.education,
      data.skills
    ].filter(Boolean).join("\n");
  }

  function countWords(value) {
    return safeText(value)
      .split(/\s+/)
      .filter(Boolean)
      .length;
  }

  function cleanText(value) {
    return safeText(value)
      .replace(/\r\n?/g, "\n")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function normalizeSkill(value) {
    return safeText(value)
      .normalize("NFC")
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  function parseSkills(value) {
    const seen = new Set();

    return safeText(value)
      .split(/[,;\n|•]+/)
      .map(item => item.trim())
      .filter(Boolean)
      .filter(item => {
        const key = normalizeSkill(item);

        if (seen.has(key)) return false;

        seen.add(key);
        return true;
      });
  }

  function selectPassages(value, maxWords) {
    const text = cleanText(value);

    if (!text) return "";

    if (countWords(text) <= maxWords) {
      return text;
    }

    const passages = text
      .split(/\n+|(?<=[.!?])\s+/)
      .map(item => item.trim())
      .filter(Boolean);

    const selected = [];

    let words = 0;

    for (const passage of passages) {
      const size = countWords(passage);

      if (words + size > maxWords) {
        continue;
      }

      selected.push(passage);
      words += size;
    }

    return selected.join("\n");
  }

  /* CAREER INTELLIGENCE INTEGRATION */

  function getRelevantSkills(options = {}) {
    const content = normalizeContent(
      options.content
    );

    const listedSkills = parseSkills(
      content.skills
    );

    const engine = window.WorknelySkillGap;

    const jobDescription = safeText(
      options.jobDescription
    );

    if (
      !jobDescription ||
      typeof engine?.detectSkills !== "function"
    ) {
      return {
        available: false,
        matched: [],
        listed: listedSkills
      };
    }

    const jobSkills = engine.detectSkills(
      jobDescription
    );

    const requiredIds = new Set(
      jobSkills.map(skill => skill.id)
    );

    const matched = listedSkills.filter(
      skill =>
        engine.detectSkills(skill).some(
          detected =>
            requiredIds.has(detected.id)
        )
    );

    return {
      available: jobSkills.length > 0,
      matched,
      listed: listedSkills
    };
  }

  /* COVER LETTER GENERATION */

  function generate(options = {}) {

    const language = normalizeLanguage(
      options.language || getLanguage()
    );

    const tone = normalizeTone(
      options.tone
    );

    const content = normalizeContent(
      options.content || readBuilder()
    );

    const targetRole = safeText(
      options.targetRole ||
      content.professionalTitle,
      200
    );

    const company = safeText(
      options.company, 200
    );

    const recipient = safeText(
      options.recipient, 150
    );

    const motivation = cleanText(
      safeText(options.motivation, 3000)
    );

    const jobDescription = safeText(
      options.jobDescription
    );

    if (!targetRole) {
      return {
        ok: false,
        version: VERSION,
        reason: "missingRole",
        message: t(
          "missingRole", language
        )
      };
    }

    const hasProfile = [
      content.summary,
      content.experience,
      content.education,
      content.skills
    ].some(Boolean);

    if (!hasProfile) {
      return {
        ok: false,
        version: VERSION,
        reason: "missingProfile",
        message: t(
          "missingProfile", language
        )
      };
    }

    const concise = tone === "concise";

    const paragraphs = [];

    const subject = t(
      "subject",
      language,
      { role: targetRole }
    );

    const greeting = recipient

      ? t(
          "greetingNamed",
          language,
          { recipient }
        )

      : t("greeting", language);

    paragraphs.push(greeting);

    /* INTRODUCTION */

    const introKey = company

      ? "introductionCompany"

      : tone === "confident"

        ? "confidentIntro"

        : "introduction";

    paragraphs.push(
      t(
        introKey,
        language,
        {
          role: targetRole,
          company
        }
      )
    );

    /* VERIFIED PROFESSIONAL PROFILE */

    const summary = selectPassages(
      content.summary,
      concise ? 45 : 85
    );

    const experience = selectPassages(
      content.experience,
      concise ? 65 : 120
    );

    const education = selectPassages(
      content.education,
      concise ? 25 : 45
    );

    if (summary) {
      paragraphs.push(
        t("profile", language) +
        "\n" + summary
      );
    }

    if (experience) {
      paragraphs.push(
        t("experience", language) +
        "\n" + experience
      );
    }

    if (
      education &&
      (!concise || !experience)
    ) {
      paragraphs.push(
        t("education", language) +
        "\n" + education
      );
    }

    /* SKILL ALIGNMENT */

    const skillContext = getRelevantSkills({
      content,
      jobDescription
    });

    const selectedSkills = (
      skillContext.matched.length

        ? skillContext.matched

        : skillContext.listed

    ).slice(0, concise ? 4 : 7);

    if (selectedSkills.length) {
      paragraphs.push(
        t(
          skillContext.matched.length
            ? "relevantSkills"
            : "skills",

          language,

          {
            skills: selectedSkills.join(", ")
          }
        )
      );
    }

    /* USER-SUPPLIED MOTIVATION */

    if (motivation) {
      paragraphs.push(
        t("motivation", language) +
        "\n" + motivation
      );
    }

    if (!concise) {
      paragraphs.push(
        t("contribution", language)
      );
    }

    paragraphs.push(
      t(
        concise
          ? "conciseClosing"
          : "closing",
        language
      )
    );

    /* SIGNATURE */

    const signature = [
      t("signature", language),
      content.fullName
    ].filter(Boolean);

    if (
      options.includeContact === true &&
      content.contact
    ) {
      signature.push(content.contact);
    }

    paragraphs.push(
      signature.join("\n")
    );

    const body = paragraphs.join("\n\n");

    const text = subject + "\n\n" + body;

    const wordCount = countWords(text);

    /* PERSONAL REVIEW CHECKLIST */

    const warnings = [];

    function addWarning(key) {
      warnings.push({
        id: key,
        message: t(key, language)
      });
    }

    if (!content.fullName) {
      addWarning("missingName");
    }

    if (!company) {
      addWarning("missingCompany");
    }

    if (!motivation) {
      addWarning("missingMotivation");
    }

    if (wordCount > 400) {
      addWarning("reviewLength");
    }

    addWarning("reviewLanguage");

    const omittedFields = [];

    if (content.summary && !summary) {
      omittedFields.push("summary");
    }

    if (content.experience && !experience) {
      omittedFields.push("experience");
    }

    if (
      content.education &&
      (!education || (concise && experience))
    ) {
      omittedFields.push("education");
    }

    const result = {
      ok: true,

      version: VERSION,

      language,

      tone,

      toneLabel: t(tone, language),

      targetRole,

      company,

      recipient,

      subject,

      body,

      text,

      paragraphs: [...paragraphs],

      wordCount,

      selectedSkills,

      matchedSkillCount:
        skillContext.matched.length,

      jobPersonalization:
        skillContext.matched.length > 0,

      omittedFields,

      warnings,

      reviewRequired: true,

      message: t(
        "generated", language
      ),

      disclaimer: t(
        "disclaimer", language
      ),

      generatedAt:
        new Date().toISOString()
    };

    if (options.emit !== false) {
      document.dispatchEvent(
        new CustomEvent(
          "worknely:coverlettergenerated",
          {
            detail: {
              version: VERSION,
              language,
              tone,
              wordCount,
              jobPersonalization:
                result.jobPersonalization
            }
          }
        )
      );
    }

    return result;
  }

  /* GENERATE ALL THREE WRITING STYLES */

  function generateVariants(options = {}) {

    const content = normalizeContent(
      options.content || readBuilder()
    );

    const variants = TONES.map(tone =>
      generate({
        ...options,
        content,
        tone,
        emit: false
      })
    );

    return {
      ok: variants.every(
        variant => variant.ok
      ),

      version: VERSION,

      variants
    };
  }

  /* BUILDER INTEGRATION */

  function generateBuilder(options = {}) {
    return generate({
      ...options,
      content: readBuilder()
    });
  }

  /* SAFE TEXT FILE EXPORT */

  function normalizeFilename(value) {

    const filename = safeText(value, 100)

      .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-")

      .replace(/\.txt$/i, "")

      .replace(/[.\s]+$/g, "")

      .trim();

    return (
      filename || "Worknely-Cover-Letter"
    ) + ".txt";
  }

  function createTextFile(
    letter,
    options = {}
  ) {

    const text = safeText(
      typeof letter === "string"
        ? letter
        : letter?.text
    );

    if (!text) {
      return {
        ok: false,
        reason: "emptyLetter"
      };
    }

    const filename = normalizeFilename(
      options.filename
    );

    const blob = new Blob(
      [text],
      {
        type: "text/plain;charset=utf-8"
      }
    );

    const file =
      typeof File === "function"

        ? new File(
            [blob],
            filename,
            {
              type: blob.type
            }
          )

        : null;

    return {
      ok: true,
      filename,
      blob,
      file
    };
  }

  /* CLIPBOARD INTEGRATION */

  async function copyLetter(letter) {

    const text = safeText(
      typeof letter === "string"
        ? letter
        : letter?.text
    );

    if (!text) {
      return {
        ok: false,
        reason: "emptyLetter"
      };
    }

    if (
      !navigator.clipboard ||
      typeof navigator.clipboard.writeText
        !== "function"
    ) {
      return {
        ok: false,
        reason: "clipboardUnavailable"
      };
    }

    try {

      await navigator.clipboard.writeText(
        text
      );

      return {
        ok: true
      };

    } catch {

      return {
        ok: false,
        reason: "clipboardDenied"
      };
    }
  }

  /* MODULE STATUS */

  function getState() {
    return {
      version: VERSION,

      ready: true,

      supportedLanguages:
        LANGUAGES.length,

      supportedTones:
        TONES.length,

      skillEngineReady: Boolean(
        window.WorknelySkillGap
          ?.detectSkills
      ),

      skillEngineVersion:
        window.WorknelySkillGap
          ?.version || null,

      processing: "local",

      externalAI: false,

      automaticTranslation: false,

      automaticFabrication: false,

      persistentLetterStorage: false,

      textExport: true,

      clipboardSupport: Boolean(
        navigator.clipboard
      ),

      reviewRequired: true
    };
  }

  /* INTERNAL SELF-TEST */

  function selfTest() {

    const content = {
      fullName: "Alex Morgan",

      professionalTitle:
        "Software Developer",

      contact:
        "alex@example.com",

      summary:
        "Software developer with experience in web applications.",

      experience:
        "Developed JavaScript applications and maintained project documentation.",

      education:
        "Computer Science",

      skills:
        "JavaScript, HTML, CSS, SQL"
    };

    const result = generate({
      content,

      targetRole:
        "Frontend Developer",

      company:
        "Example Company",

      motivation:
        "I am interested in accessible web development.",

      language: "en",

      tone: "professional",

      emit: false
    });

    const variants = generateVariants({
      content,

      targetRole:
        "Frontend Developer",

      language: "en"
    });

    const checks = {

      generationSuccessful:
        result.ok === true,

      namePreserved:
        result.text.includes(
          "Alex Morgan"
        ),

      companyPersonalization:
        result.text.includes(
          "Example Company"
        ),

      targetRolePersonalization:
        result.text.includes(
          "Frontend Developer"
        ),

      experiencePreservation:
        result.text.includes(
          content.experience
        ),

      contactPrivacy:
        !result.text.includes(
          content.contact
        ),

      motivationPreservation:
        result.text.includes(
          "I am interested in accessible web development."
        ),

      threeWritingStyles:
        variants.ok === true &&
        variants.variants.length === 3,

      conciseVariant:
        variants.variants[2].wordCount <
        variants.variants[0].wordCount,

      missingRoleProtection:
        generate({
          content: {
            summary: "Professional experience"
          },
          emit: false
        }).reason === "missingRole",

      emptyProfileProtection:
        generate({
          content: {},
          targetRole: "Developer",
          emit: false
        }).reason === "missingProfile",

      multilingualSupport:
        LANGUAGES.every(language =>
          generate({
            content,
            targetRole: "Developer",
            language,
            emit: false
          }).ok === true
        ),

      safeFilename:
        normalizeFilename("Test: Letter") ===
        "Test- Letter.txt",

      textExport:
        createTextFile(result).ok === true
    };

    const dependenciesReady =
      getState().skillEngineReady;

    if (dependenciesReady) {

      const personalized = generate({
        content,

        targetRole: "Developer",

        jobDescription:
          "JavaScript required. Python mandatory.",

        language: "en",

        emit: false
      });

      checks.skillPersonalization =
        personalized.selectedSkills
          .includes("JavaScript");

      checks.noInventedSkills =
        !personalized.selectedSkills
          .includes("Python");
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

  /* PUBLIC COVER LETTER API */

  window.WorknelyCoverLetter =
    Object.freeze({

      version: VERSION,

      languages: LANGUAGES,

      tones: TONES,

      getLanguage,

      t,

      readBuilder,

      normalizeContent,

      parseSkills,

      getRelevantSkills,

      generate,

      generateVariants,

      generateBuilder,

      normalizeFilename,

      createTextFile,

      copyLetter,

      selfTest,

      getState
    });

  document.dispatchEvent(
    new CustomEvent(
      "worknely:coverletterready",
      {
        detail: getState()
      }
    )
  );

  console.info(
    "Worknely V" + VERSION +
    " Cover Letter Studio initialized."
  );

})();

/*
 * END WORKNELY V7.17.6
 *
 * International Cover Letter Studio
 * Personalized Professional Applications
 * Verified Candidate Information
 * Three Professional Writing Styles
 * Privacy-First Architecture
 * People Technology
 */
