
/*
 * WORKNELY V7.16.1
 * Professional Resume Template Engine
 *
 * Original Worknely Template Collection
 * Modular Template Architecture
 * International Localization
 * Custom Accent Colors
 * Responsive Resume Rendering
 * Print Ready Layouts
 * Future Membership Integration
 *
 * No external dependencies.
 * No active payment restrictions.
 * Compatible with GitHub Pages.
 */

(() => {

  "use strict";

  const VERSION = "7.16.1";

  const STORAGE_KEY =
    "worknely.resume.template";

  const COLOR_KEY =
    "worknely.resume.color";

  const DEFAULT_TEMPLATE = "ats";

  const LANGUAGES = [
    "en", "ro", "it", "de", "fr", "es"
  ];

  /* TEMPLATE REGISTRY */

  const TEMPLATES = Object.freeze({

    ats: Object.freeze({

      id: "ats",
      name: "ATS Professional",
      membership: "free",
      layout: "single",
      accent: "#242424",
      font: "Arial, Helvetica, sans-serif",
      description: "atsDescription",
      category: "atsCategory"

    }),

    classic: Object.freeze({

      id: "classic",
      name: "Classic",
      membership: "free",
      layout: "single",
      accent: "#343434",
      font: "Georgia, Times New Roman, serif",
      description: "classicDescription",
      category: "classicCategory"

    }),

    executive: Object.freeze({

      id: "executive",
      name: "Executive",
      membership: "pro",
      layout: "single",
      accent: "#172b45",
      font: "Arial, Helvetica, sans-serif",
      description: "executiveDescription",
      category: "executiveCategory"

    }),

    modern: Object.freeze({

      id: "modern",
      name: "Modern",
      membership: "pro",
      layout: "sidebar",
      accent: "#5424ff",
      font: "Arial, Helvetica, sans-serif",
      description: "modernDescription",
      category: "modernCategory"

    }),

    creative: Object.freeze({

      id: "creative",
      name: "Creative",
      membership: "premium",
      layout: "sidebar",
      accent: "#ec22ad",
      font: "Arial, Helvetica, sans-serif",
      description: "creativeDescription",
      category: "creativeCategory"

    })

  });

  /* PROFESSIONAL COLOR COLLECTION */

  const COLORS = Object.freeze([

    Object.freeze({
      id: "graphite",
      value: "#242424"
    }),

    Object.freeze({
      id: "navy",
      value: "#172b45"
    }),

    Object.freeze({
      id: "purple",
      value: "#5424ff"
    }),

    Object.freeze({
      id: "pink",
      value: "#ec22ad"
    }),

    Object.freeze({
      id: "teal",
      value: "#087f8c"
    }),

    Object.freeze({
      id: "emerald",
      value: "#176b50"
    }),

    Object.freeze({
      id: "burgundy",
      value: "#78354b"
    }),

    Object.freeze({
      id: "slate",
      value: "#526176"
    }),

    Object.freeze({
      id: "blue",
      value: "#2457a6"
    }),

    Object.freeze({
      id: "bronze",
      value: "#95683c"
    })

  ]);

  /* INTERNATIONAL DICTIONARY */

  const translations = {

    en: {

      templates: "Professional Resume Templates",
      choose: "Choose your template",
      introduction: "Find a professional design that matches your career goals.",
      preview: "Live Preview",
      customize: "Customize",
      colors: "Accent Colors",
      selected: "Selected",
      select: "Use Template",
      free: "Free",
      pro: "Pro",
      premium: "Premium",
      available: "Available in preview",
      reset: "Reset Design",
      print: "Save / Print PDF",
      sample: "Sample Resume",
      summary: "Professional Summary",
      experience: "Professional Experience",
      education: "Education",
      skills: "Skills",
      contact: "Contact",
      unnamed: "Your Name",
      role: "Professional Title",
      atsDescription: "A clean single-column layout designed for straightforward resume parsing.",
      classicDescription: "Timeless typography and a balanced professional structure.",
      executiveDescription: "A refined design for senior professionals and leadership roles.",
      modernDescription: "A contemporary layout with a structured professional sidebar.",
      creativeDescription: "A distinctive design for creative and communication-focused careers.",
      atsCategory: "Recruitment & ATS",
      classicCategory: "Corporate & Administration",
      executiveCategory: "Management & Leadership",
      modernCategory: "Technology & Business",
      creativeCategory: "Marketing & Design"

    },

    ro: {

      templates: "Șabloane profesionale de CV",
      choose: "Alege șablonul",
      introduction: "Descoperă un design profesional potrivit obiectivelor tale.",
      preview: "Previzualizare live",
      customize: "Personalizează",
      colors: "Culori de accent",
      selected: "Selectat",
      select: "Utilizează șablonul",
      free: "Gratuit",
      pro: "Pro",
      premium: "Premium",
      available: "Disponibil în previzualizare",
      reset: "Resetează designul",
      print: "Salvare / Imprimare PDF",
      sample: "CV demonstrativ",
      summary: "Profil profesional",
      experience: "Experiență profesională",
      education: "Educație",
      skills: "Competențe",
      contact: "Contact",
      unnamed: "Numele tău",
      role: "Titlu profesional",
      atsDescription: "Structură simplă, pe o singură coloană, concepută pentru procesarea automată a CV-urilor.",
      classicDescription: "Tipografie atemporală și structură profesională echilibrată.",
      executiveDescription: "Design rafinat pentru profesioniști seniori și funcții de conducere.",
      modernDescription: "Design contemporan cu o coloană laterală structurată.",
      creativeDescription: "Design distinctiv pentru cariere creative și comunicare.",
      atsCategory: "Recrutare și ATS",
      classicCategory: "Corporații și administrație",
      executiveCategory: "Management și leadership",
      modernCategory: "Tehnologie și business",
      creativeCategory: "Marketing și design"

    },

    it: {

      templates: "Modelli professionali di curriculum",
      choose: "Scegli il tuo modello",
      introduction: "Trova un design professionale adatto ai tuoi obiettivi.",
      preview: "Anteprima in tempo reale",
      customize: "Personalizza",
      colors: "Colori di accento",
      selected: "Selezionato",
      select: "Usa modello",
      free: "Gratuito",
      pro: "Pro",
      premium: "Premium",
      available: "Disponibile in anteprima",
      reset: "Ripristina design",
      print: "Salva / Stampa PDF",
      sample: "Curriculum di esempio",
      summary: "Profilo professionale",
      experience: "Esperienza professionale",
      education: "Formazione",
      skills: "Competenze",
      contact: "Contatti",
      unnamed: "Il tuo nome",
      role: "Titolo professionale",
      atsDescription: "Struttura semplice a colonna singola per facilitare la lettura automatica del curriculum.",
      classicDescription: "Tipografia senza tempo e struttura professionale equilibrata.",
      executiveDescription: "Design raffinato per professionisti senior e ruoli dirigenziali.",
      modernDescription: "Design contemporaneo con una barra laterale strutturata.",
      creativeDescription: "Design distintivo per professioni creative e comunicazione.",
      atsCategory: "Selezione e ATS",
      classicCategory: "Aziende e amministrazione",
      executiveCategory: "Management e leadership",
      modernCategory: "Tecnologia e business",
      creativeCategory: "Marketing e design"

    },

    de: {

      templates: "Professionelle Lebenslaufvorlagen",
      choose: "Wähle deine Vorlage",
      introduction: "Finde ein professionelles Design für deine Karriereziele.",
      preview: "Live-Vorschau",
      customize: "Anpassen",
      colors: "Akzentfarben",
      selected: "Ausgewählt",
      select: "Vorlage verwenden",
      free: "Kostenlos",
      pro: "Pro",
      premium: "Premium",
      available: "In der Vorschau verfügbar",
      reset: "Design zurücksetzen",
      print: "PDF speichern / drucken",
      sample: "Beispiel-Lebenslauf",
      summary: "Berufliches Profil",
      experience: "Berufserfahrung",
      education: "Ausbildung",
      skills: "Fähigkeiten",
      contact: "Kontakt",
      unnamed: "Dein Name",
      role: "Berufsbezeichnung",
      atsDescription: "Ein übersichtliches einspaltiges Layout für die automatische Lebenslaufverarbeitung.",
      classicDescription: "Zeitlose Typografie und eine ausgewogene professionelle Struktur.",
      executiveDescription: "Elegantes Design für erfahrene Fach- und Führungskräfte.",
      modernDescription: "Modernes Layout mit strukturierter Seitenleiste.",
      creativeDescription: "Individuelles Design für kreative Berufe und Kommunikation.",
      atsCategory: "Recruiting und ATS",
      classicCategory: "Unternehmen und Verwaltung",
      executiveCategory: "Management und Führung",
      modernCategory: "Technologie und Wirtschaft",
      creativeCategory: "Marketing und Design"

    },

    fr: {

      templates: "Modèles professionnels de CV",
      choose: "Choisissez votre modèle",
      introduction: "Trouvez un design professionnel adapté à vos objectifs.",
      preview: "Aperçu en direct",
      customize: "Personnaliser",
      colors: "Couleurs d'accent",
      selected: "Sélectionné",
      select: "Utiliser le modèle",
      free: "Gratuit",
      pro: "Pro",
      premium: "Premium",
      available: "Disponible en aperçu",
      reset: "Réinitialiser le design",
      print: "Enregistrer / Imprimer PDF",
      sample: "Exemple de CV",
      summary: "Profil professionnel",
      experience: "Expérience professionnelle",
      education: "Formation",
      skills: "Compétences",
      contact: "Coordonnées",
      unnamed: "Votre nom",
      role: "Titre professionnel",
      atsDescription: "Une structure simple à une colonne conçue pour faciliter la lecture automatique du CV.",
      classicDescription: "Typographie intemporelle et structure professionnelle équilibrée.",
      executiveDescription: "Design raffiné pour les cadres et les postes de direction.",
      modernDescription: "Design contemporain avec une colonne latérale structurée.",
      creativeDescription: "Design distinctif pour les métiers créatifs et la communication.",
      atsCategory: "Recrutement et ATS",
      classicCategory: "Entreprise et administration",
      executiveCategory: "Management et direction",
      modernCategory: "Technologie et affaires",
      creativeCategory: "Marketing et design"

    },

    es: {

      templates: "Plantillas profesionales de currículum",
      choose: "Elige tu plantilla",
      introduction: "Encuentra un diseño profesional adaptado a tus objetivos.",
      preview: "Vista previa en directo",
      customize: "Personalizar",
      colors: "Colores de acento",
      selected: "Seleccionado",
      select: "Usar plantilla",
      free: "Gratis",
      pro: "Pro",
      premium: "Premium",
      available: "Disponible en vista previa",
      reset: "Restablecer diseño",
      print: "Guardar / Imprimir PDF",
      sample: "Currículum de ejemplo",
      summary: "Perfil profesional",
      experience: "Experiencia profesional",
      education: "Formación",
      skills: "Competencias",
      contact: "Contacto",
      unnamed: "Tu nombre",
      role: "Título profesional",
      atsDescription: "Estructura sencilla de una columna para facilitar el procesamiento automático del currículum.",
      classicDescription: "Tipografía atemporal y estructura profesional equilibrada.",
      executiveDescription: "Diseño refinado para profesionales sénior y puestos directivos.",
      modernDescription: "Diseño contemporáneo con una columna lateral estructurada.",
      creativeDescription: "Diseño distintivo para profesiones creativas y comunicación.",
      atsCategory: "Selección y ATS",
      classicCategory: "Empresas y administración",
      executiveCategory: "Dirección y liderazgo",
      modernCategory: "Tecnología y negocios",
      creativeCategory: "Marketing y diseño"

    }

  };

  /* SAFE BROWSER STORAGE */

  function readStorage(key) {

    try {

      return localStorage.getItem(key);

    } catch {

      return null;

    }

  }

  function writeStorage(key, value) {

    try {

      localStorage.setItem(
        key,
        String(value)
      );

      return true;

    } catch {

      return false;

    }

  }

  function removeStorage(key) {

    try {

      localStorage.removeItem(key);

    } catch {

      // Storage may be unavailable.

    }

  }

  /* LANGUAGE ENGINE */

  function normalizeLanguage(value) {

    const language = String(value || "")
      .toLowerCase()
      .split("-")[0];

    return LANGUAGES.includes(language)
      ? language
      : "en";

  }

  function getLanguage() {

    return normalizeLanguage(

      window.WorknelyLocalization
        ?.getLanguage?.() ||

      readStorage("worknely.language") ||

      document.documentElement.lang ||

      "en"

    );

  }

  function t(key, language = getLanguage()) {

    const code =
      normalizeLanguage(language);

    return translations[code]?.[key] ||
      translations.en[key] ||
      key;

  }

  /* VALIDATION */

  function validTemplate(id) {

    return typeof id === "string" &&
      Object.prototype.hasOwnProperty.call(
        TEMPLATES,
        id
      );

  }

  function validColor(value) {

    return typeof value === "string" &&
      /^#[0-9a-fA-F]{6}$/.test(value);

  }

  function getTemplate(id) {

    return TEMPLATES[
      validTemplate(id)
        ? id
        : DEFAULT_TEMPLATE
    ];

  }

  /* TEMPLATE STATE */

  let selectedTemplate =

    validTemplate(
      readStorage(STORAGE_KEY)
    )

      ? readStorage(STORAGE_KEY)

      : DEFAULT_TEMPLATE;

  let customColor =

    validColor(
      readStorage(COLOR_KEY)
    )

      ? readStorage(COLOR_KEY)

      : null;

  function getAccent() {

    return customColor ||
      getTemplate(selectedTemplate).accent;

  }

  function getState() {

    return Object.freeze({

      version: VERSION,

      templateId: selectedTemplate,

      accentColor: getAccent(),

      customColor,

      membership:
        getTemplate(selectedTemplate).membership

    });

  }

  /* TEMPLATE EVENTS */

  function emitChange(reason) {

    document.dispatchEvent(

      new CustomEvent(
        "worknely:templatechange",
        {
          detail: {
            ...getState(),
            reason
          }
        }
      )

    );

  }

  function selectTemplate(id, options = {}) {

    if (!validTemplate(id)) {

      return getState();

    }

    const changed =
      selectedTemplate !== id;

    selectedTemplate = id;

    if (
      changed &&
      options.keepColor !== true
    ) {

      customColor = null;

    }

    if (options.persist !== false) {

      writeStorage(
        STORAGE_KEY,
        selectedTemplate
      );

      if (customColor) {

        writeStorage(
          COLOR_KEY,
          customColor
        );

      } else {

        removeStorage(COLOR_KEY);

      }

    }

    if (options.silent !== true) {

      emitChange("template");

    }

    return getState();

  }

  function setAccentColor(
    value,
    options = {}
  ) {

    if (!validColor(value)) {

      return getState();

    }

    customColor =
      value.toLowerCase();

    if (options.persist !== false) {

      writeStorage(
        COLOR_KEY,
        customColor
      );

    }

    if (options.silent !== true) {

      emitChange("color");

    }

    return getState();

  }

  function resetDesign(options = {}) {

    selectedTemplate =
      DEFAULT_TEMPLATE;

    customColor = null;

    if (options.persist !== false) {

      removeStorage(STORAGE_KEY);
      removeStorage(COLOR_KEY);

    }

    if (options.silent !== true) {

      emitChange("reset");

    }

    return getState();

  }

  /* DOCUMENT DESIGN IMPORT */

  function applyDesign(
    design = {},
    options = {}
  ) {

    selectedTemplate = validTemplate(
      design.templateId
    )
      ? design.templateId
      : DEFAULT_TEMPLATE;

    customColor = validColor(
      design.customColor
    )
      ? design.customColor.toLowerCase()
      : validColor(design.accentColor)
        ? design.accentColor.toLowerCase()
        : null;

    if (options.persist !== false) {

      writeStorage(
        STORAGE_KEY,
        selectedTemplate
      );

      if (customColor) {

        writeStorage(
          COLOR_KEY,
          customColor
        );

      } else {

        removeStorage(COLOR_KEY);

      }

    }

    if (options.silent !== true) {

      emitChange("import");

    }

    return getState();

  }

  /* SAFE RESUME CONTENT */

  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  }

  function normalizeContent(content = {}) {

    const source =
      content &&
      typeof content === "object"
        ? content
        : {};

    const keys = [

      "fullName",
      "professionalTitle",
      "contact",
      "summary",
      "experience",
      "education",
      "skills"

    ];

    const result = {};

    keys.forEach(key => {

      result[key] =

        typeof source[key] === "string"

          ? source[key].trim()

          : "";

    });

    return result;

  }

  /* DEMONSTRATION CONTENT */

  const SAMPLE_RESUME = Object.freeze({

    fullName: "Alex Morgan",

    professionalTitle:
      "Digital Marketing Specialist",

    contact:
      "alex@example.com\nLondon, United Kingdom",

    summary:
      "Results-oriented professional with experience in digital marketing, customer engagement and business development.",

    experience:
      "Digital Marketing Specialist\nExample Company | 2023–Present\n\n• Developed digital campaigns.\n• Analyzed marketing performance.\n• Coordinated content strategies.",

    education:
      "Bachelor's Degree in Business Administration\nExample University | 2020",

    skills:
      "Digital Marketing\nContent Strategy\nData Analysis\nProject Management\nCommunication"

  });

  function getSampleResume() {

    return { ...SAMPLE_RESUME };

  }

  /* RESUME SECTION FACTORY */

  function renderSection(
    key,
    value,
    language
  ) {

    if (!value) return "";

    return `

      <section class="wn-tpl-section">

        <h2>
          ${escapeHTML(t(key, language))}
        </h2>

        <div class="wn-tpl-content">
          ${escapeHTML(value)}
        </div>

      </section>

    `;

  }

  /* RESUME HEADER */

  function renderHeader(
    content,
    language,
    includeContact = true
  ) {

    return `

      <header class="wn-tpl-header">

        <h1>
          ${escapeHTML(
            content.fullName ||
            t("unnamed", language)
          )}
        </h1>

        ${
          content.professionalTitle

            ? `
              <div class="wn-tpl-role">
                ${escapeHTML(
                  content.professionalTitle
                )}
              </div>
            `

            : ""
        }

        ${
          includeContact && content.contact

            ? `
              <div class="wn-tpl-contact">
                ${escapeHTML(content.contact)}
              </div>
            `

            : ""
        }

      </header>

    `;

  }

  /* PROFESSIONAL TEMPLATE RENDERER */

  function renderResume(
    content = {},
    options = {}
  ) {

    const data =
      normalizeContent(content);

    const template = getTemplate(
      options.templateId ||
      selectedTemplate
    );

    const language =
      normalizeLanguage(
        options.documentLanguage ||
        options.language ||
        getLanguage()
      );

    const accent = validColor(
      options.accentColor
    )

      ? options.accentColor

      : template.id === selectedTemplate

        ? getAccent()

        : template.accent;

    const summary = renderSection(
      "summary",
      data.summary,
      language
    );

    const experience = renderSection(
      "experience",
      data.experience,
      language
    );

    const education = renderSection(
      "education",
      data.education,
      language
    );

    const skills = renderSection(
      "skills",
      data.skills,
      language
    );

    const contact = renderSection(
      "contact",
      data.contact,
      language
    );

    const hasSidebar =

      template.layout === "sidebar" &&
      Boolean(data.contact || data.skills);

    let body;

    if (hasSidebar) {

      body = `

        ${renderHeader(data, language, false)}

        <div class="wn-tpl-columns">

          <div class="wn-tpl-main">

            ${summary}
            ${experience}
            ${education}

          </div>

          <aside class="wn-tpl-sidebar">

            ${contact}
            ${skills}

          </aside>

        </div>

      `;

    } else {

      body = `

        ${renderHeader(data, language)}

        <div class="wn-tpl-main">

          ${summary}
          ${experience}
          ${education}
          ${skills}

        </div>

      `;

    }

    return `

      <article

        class="wn-tpl-resume wn-tpl-${template.id}"

        lang="${language}"

        style="--wn-tpl-accent:${accent};--wn-tpl-font:${template.font};"

        data-template="${template.id}"

      >

        ${body}

      </article>

    `;

  }

  /* TEMPLATE STYLE ENGINE */

  const TEMPLATE_CSS = `

    .wn-tpl-resume,
    .wn-tpl-resume * {
      box-sizing:border-box;
    }

    .wn-tpl-resume {
      display:block;
      width:100%;
      max-width:210mm;
      min-width:0;
      margin:0 auto;
      padding:16mm;
      background:#ffffff;
      color:#202124;
      font-family:var(--wn-tpl-font,Arial,sans-serif);
      font-size:11pt;
      line-height:1.5;
      text-align:left;
      overflow-wrap:anywhere;
    }

    .wn-tpl-resume .wn-tpl-header {
      display:block;
      position:static;
      margin:0 0 20px;
      padding:0 0 14px;
      background:transparent;
      border:0;
      border-bottom:2px solid var(--wn-tpl-accent);
      box-shadow:none;
    }

    .wn-tpl-resume h1 {
      margin:0 0 6px;
      padding:0;
      color:#171717;
      font-size:26pt;
      font-weight:750;
      line-height:1.15;
      letter-spacing:-.6px;
    }

    .wn-tpl-resume .wn-tpl-role {
      margin:0 0 8px;
      color:var(--wn-tpl-accent);
      font-size:13pt;
      font-weight:600;
    }

    .wn-tpl-resume .wn-tpl-contact {
      color:#444444;
      font-size:10pt;
      white-space:pre-wrap;
      overflow-wrap:anywhere;
    }

    .wn-tpl-resume .wn-tpl-section {
      display:block;
      margin:0 0 17px;
      padding:0;
      background:transparent;
      border:0;
      border-radius:0;
      box-shadow:none;
    }

    .wn-tpl-resume .wn-tpl-section h2 {
      margin:0 0 7px;
      padding:0 0 4px;
      border-bottom:1px solid #d7d7d7;
      color:var(--wn-tpl-accent);
      font-size:12pt;
      font-weight:750;
      line-height:1.3;
      break-after:avoid;
      page-break-after:avoid;
    }

    .wn-tpl-resume .wn-tpl-content {
      margin:0;
      padding:0;
      color:#202124;
      font-size:inherit;
      line-height:inherit;
      white-space:pre-wrap;
      overflow-wrap:anywhere;
      orphans:3;
      widows:3;
    }

    .wn-tpl-resume .wn-tpl-main {
      min-width:0;
    }

    /* ATS PROFESSIONAL */

    .wn-tpl-ats {
      font-family:Arial,Helvetica,sans-serif;
    }

    .wn-tpl-ats .wn-tpl-header {
      border-bottom:1px solid #999999;
    }

    .wn-tpl-ats .wn-tpl-role,
    .wn-tpl-ats .wn-tpl-section h2 {
      color:#242424;
    }

    .wn-tpl-ats .wn-tpl-section h2 {
      text-transform:uppercase;
      font-size:11pt;
      letter-spacing:.4px;
    }

    /* CLASSIC */

    .wn-tpl-classic .wn-tpl-header {
      text-align:center;
      border-bottom:3px double var(--wn-tpl-accent);
    }

    .wn-tpl-classic h1 {
      font-family:Georgia,serif;
      font-weight:600;
      font-size:28pt;
    }

    .wn-tpl-classic .wn-tpl-section h2 {
      font-family:Georgia,serif;
      font-size:13pt;
    }

    /* EXECUTIVE */

    .wn-tpl-executive .wn-tpl-header {
      border:0;
      border-left:5px solid var(--wn-tpl-accent);
      padding:18px 20px;
      background:#f4f6f9;
    }

    .wn-tpl-executive h1 {
      color:var(--wn-tpl-accent);
      font-size:29pt;
    }

    .wn-tpl-executive .wn-tpl-section h2 {
      border-bottom:2px solid var(--wn-tpl-accent);
    }

    /* TWO COLUMN LAYOUT */

    .wn-tpl-columns {
      display:grid;
      grid-template-columns:
        minmax(0,1.8fr) minmax(0,1fr);
      align-items:start;
      gap:20px;
    }

    .wn-tpl-resume .wn-tpl-sidebar {
      min-width:0;
      margin:0;
      padding:14px;
      border:0;
      border-radius:0;
      background:#f4f5f8;
      box-shadow:none;
    }

    .wn-tpl-sidebar .wn-tpl-content {
      font-size:10pt;
    }

    /* MODERN */

    .wn-tpl-modern .wn-tpl-header {
      border-top:5px solid var(--wn-tpl-accent);
      border-bottom:1px solid #dddddd;
      padding:18px 0 14px;
    }

    .wn-tpl-modern h1 {
      color:var(--wn-tpl-accent);
    }

    .wn-tpl-modern .wn-tpl-sidebar {
      border-top:3px solid var(--wn-tpl-accent);
    }

    /* CREATIVE */

    .wn-tpl-creative .wn-tpl-header {
      border:0;
      border-left:7px solid var(--wn-tpl-accent);
      padding:12px 18px;
      background:#faf8fc;
    }

    .wn-tpl-creative h1 {
      font-size:30pt;
      letter-spacing:-1px;
    }

    .wn-tpl-creative .wn-tpl-section h2 {
      border-bottom:0;
      border-left:3px solid var(--wn-tpl-accent);
      padding-left:8px;
    }

    .wn-tpl-creative .wn-tpl-sidebar {
      background:#faf8fc;
      border-top:4px solid var(--wn-tpl-accent);
    }

    /* MOBILE PREVIEW */

    @media screen and (max-width:600px) {

      .wn-tpl-resume {
        padding:22px 18px;
        font-size:10pt;
      }

      .wn-tpl-resume h1 {
        font-size:23pt;
      }

      .wn-tpl-columns {
        grid-template-columns:minmax(0,1fr);
        gap:12px;
      }

    }

    /* PRINT OPTIMIZATION */

    @media print {

      .wn-tpl-resume {
        width:100%;
        max-width:none;
        min-height:0;
        margin:0;
        padding:0;
        box-shadow:none;
        -webkit-print-color-adjust:exact;
        print-color-adjust:exact;
      }

      .wn-tpl-resume .wn-tpl-header {
        break-inside:avoid;
        page-break-inside:avoid;
      }

      .wn-tpl-resume h2 {
        break-after:avoid;
        page-break-after:avoid;
      }

    }

  `;

  /* SCOPED CSS INSTALLATION */

  function installStyles(
    targetDocument = document
  ) {

    const id =
      "wn-professional-template-styles";

    if (
      targetDocument.getElementById(id)
    ) {

      return true;

    }

    const style =
      targetDocument.createElement("style");

    style.id = id;

    style.textContent = TEMPLATE_CSS;

    const parent =
      targetDocument.head ||
      targetDocument.documentElement;

    if (!parent) return false;

    parent.appendChild(style);

    return true;

  }

  /* LIVE PREVIEW API */

  function renderInto(
    target,
    content = {},
    options = {}
  ) {

    const element =

      typeof target === "string"

        ? document.querySelector(target)

        : target;

    if (
      !element ||
      element.nodeType !== 1
    ) {

      return false;

    }

    installStyles(
      element.ownerDocument
    );

    element.innerHTML = renderResume(
      content,
      options
    );

    return true;

  }

  /* TEMPLATE CATALOG */

  function getTemplates(
    language = getLanguage()
  ) {

    return Object.values(TEMPLATES)
      .map(template => ({

        ...template,

        descriptionText: t(
          template.description,
          language
        ),

        categoryText: t(
          template.category,
          language
        ),

        membershipText: t(
          template.membership,
          language
        ),

        selected:
          template.id === selectedTemplate,

        available: true

      }));

  }

  /* PRINTABLE DOCUMENT GENERATOR */

  function createPrintableDocument(
    content = {},
    options = {}
  ) {

    const data =
      normalizeContent(content);

    const language =
      normalizeLanguage(
        options.documentLanguage ||
        options.language ||
        getLanguage()
      );

    const title = escapeHTML(

      options.title ||

      data.fullName ||

      "Worknely Resume"

    );

    return `

<!DOCTYPE html>
<html lang="${language}">
<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width,initial-scale=1">

<title>${title}</title>

<style>

${TEMPLATE_CSS}

html,body {
  margin:0;
  padding:0;
  background:#f4f1fa;
}

.wn-print-toolbar {
  display:flex;
  justify-content:center;
  padding:14px;
  background:#ffffff;
  border-bottom:1px solid #e9e3f5;
}

.wn-print-toolbar button {
  min-height:44px;
  padding:10px 20px;
  border:0;
  border-radius:9px;
  background:#5424ff;
  color:#ffffff;
  font:600 14px Arial,sans-serif;
  cursor:pointer;
}

.wn-print-document {
  max-width:210mm;
  margin:20px auto;
  background:#ffffff;
}

@page {
  size:A4;
  margin:15mm;
}

@media print {

  html,body {
    background:#ffffff;
  }

  .wn-print-toolbar {
    display:none!important;
  }

  .wn-print-document {
    width:auto;
    max-width:none;
    margin:0;
  }

}

</style>

</head>

<body>

<div class="wn-print-toolbar">

  <button id="wnPrintResume"
          type="button">

    ${escapeHTML(t("print"))}

  </button>

</div>

<main class="wn-print-document">

  ${renderResume(data, options)}

</main>

</body>
</html>

    `;

  }

  /* NATIVE PDF PRINT API */

  function openPrintPreview(
    content = {},
    options = {}
  ) {

    const printWindow =
      window.open("", "_blank");

    if (!printWindow) {

      return {
        ok: false,
        reason: "popup-blocked"
      };

    }

    try {

      printWindow.opener = null;

      printWindow.document.open();

      printWindow.document.write(

        createPrintableDocument(
          content,
          options
        )

      );

      printWindow.document.close();

      const button =
        printWindow.document
          .getElementById("wnPrintResume");

      button?.addEventListener(
        "click",
        () => printWindow.print()
      );

      return {
        ok: true
      };

    } catch {

      printWindow.close();

      return {
        ok: false,
        reason: "print-error"
      };

    }

  }

  /* CROSS-TAB SYNCHRONIZATION */

  window.addEventListener(

    "storage",

    event => {

      if (

        event.key !== STORAGE_KEY &&

        event.key !== COLOR_KEY &&

        event.key !== null

      ) return;

      const template =
        readStorage(STORAGE_KEY);

      const color =
        readStorage(COLOR_KEY);

      selectedTemplate =
        validTemplate(template)

          ? template

          : DEFAULT_TEMPLATE;

      customColor =
        validColor(color)

          ? color

          : null;

      emitChange("storage");

    }

  );

  /* INTERNATIONAL TEMPLATE EVENTS */

  document.addEventListener(

    "worknely:languagechange",

    () => {

      emitChange("language");

    }

  );

  /* PUBLIC TEMPLATE ENGINE API */

  window.WorknelyTemplates = Object.freeze({

    version: VERSION,

    defaultTemplate: DEFAULT_TEMPLATE,

    templates: TEMPLATES,

    colors: COLORS,

    getLanguage,

    t,

    getTemplate,

    getTemplates,

    getState,

    getSampleResume,

    selectTemplate,

    setAccentColor,

    resetDesign,

    applyDesign,

    normalizeContent,

    renderResume,

    renderInto,

    installStyles,

    createPrintableDocument,

    openPrintPreview,

    getStyles: () => TEMPLATE_CSS

  });

  /* ENGINE READY */

  document.dispatchEvent(

    new CustomEvent(

      "worknely:templatesready",

      {

        detail: {

          version: VERSION,

          templates:
            Object.keys(TEMPLATES).length,

          state: getState()

        }

      }

    )

  );

  console.info(

    "Worknely V" + VERSION +

    " Professional Template Engine ready."

  );

})();

/*
 * END WORKNELY V7.16.1
 * PROFESSIONAL RESUME TEMPLATE ENGINE
 */
