
/*
 * WORKNELY V7.16.3
 * Live Resume Preview Engine
 *
 * Real-Time Resume Rendering
 * Professional Template Synchronization
 * Responsive Preview
 * International Localization
 * Document Language Control
 * Sample Resume Mode
 * Native PDF Preview Integration
 *
 * Requires:
 * worknely-templates.js V7.16.1
 *
 * No external dependencies.
 * No additional costs.
 */

(() => {

  "use strict";

  const VERSION = "7.16.3";

  const ROOT_ID = "wnLiveResumePreview";

  const STYLE_ID = "wn-live-preview-styles";

  const LANGUAGES = [
    "en", "ro", "it", "de", "fr", "es"
  ];

  const FIELD_KEYS = [
    "fullName",
    "professionalTitle",
    "contact",
    "summary",
    "experience",
    "education",
    "skills"
  ];

  let root = null;
  let source = null;
  let frame = null;
  let observer = null;
  let sampleMode = false;
  let documentLanguage = "auto";
  let previewMode = "responsive";
  let fieldMap = {};
  let customReader = null;
  let lastContent = null;
  let renderedLanguage = null;

  /* INTERNATIONAL DICTIONARY */

  const translations = {

    en: {
      overline: "WORKNELY DESIGN STUDIO",
      title: "Live Resume Preview",
      description: "See your resume update as you write.",
      template: "Active template",
      live: "Live preview",
      sample: "Sample resume",
      personal: "My resume",
      responsive: "Responsive",
      paper: "A4 Preview",
      language: "Document language",
      automatic: "Interface language",
      empty: "Start completing your resume to see your professional preview.",
      sampleNotice: "You are viewing fictional sample content. Your personal information has not been changed.",
      print: "Save / Print PDF",
      printError: "Unable to open the print preview. Please allow pop-ups and try again.",
      unavailable: "The preview engine is currently unavailable.",
      previewLabel: "Resume document preview",
      ready: "Preview ready",
      noContent: "Complete your resume before exporting."
    },

    ro: {
      overline: "WORKNELY DESIGN STUDIO",
      title: "Previzualizare live a CV-ului",
      description: "Vezi cum se actualizează CV-ul în timp ce scrii.",
      template: "Șablon activ",
      live: "Previzualizare live",
      sample: "CV demonstrativ",
      personal: "CV-ul meu",
      responsive: "Adaptiv",
      paper: "Previzualizare A4",
      language: "Limba documentului",
      automatic: "Limba interfeței",
      empty: "Începe să completezi CV-ul pentru a vedea previzualizarea profesională.",
      sampleNotice: "Vizualizezi un exemplu fictiv. Informațiile tale personale nu au fost modificate.",
      print: "Salvare / Imprimare PDF",
      printError: "Previzualizarea pentru imprimare nu poate fi deschisă. Permite ferestrele pop-up și încearcă din nou.",
      unavailable: "Motorul de previzualizare nu este disponibil momentan.",
      previewLabel: "Previzualizarea documentului CV",
      ready: "Previzualizare disponibilă",
      noContent: "Completează CV-ul înainte de export."
    },

    it: {
      overline: "WORKNELY DESIGN STUDIO",
      title: "Anteprima del curriculum",
      description: "Guarda il tuo curriculum aggiornarsi mentre scrivi.",
      template: "Modello attivo",
      live: "Anteprima in tempo reale",
      sample: "Curriculum di esempio",
      personal: "Il mio curriculum",
      responsive: "Adattivo",
      paper: "Anteprima A4",
      language: "Lingua del documento",
      automatic: "Lingua dell'interfaccia",
      empty: "Inizia a compilare il curriculum per visualizzare l'anteprima professionale.",
      sampleNotice: "Stai visualizzando contenuti fittizi. I tuoi dati personali non sono stati modificati.",
      print: "Salva / Stampa PDF",
      printError: "Impossibile aprire l'anteprima di stampa. Consenti i pop-up e riprova.",
      unavailable: "Il motore di anteprima non è attualmente disponibile.",
      previewLabel: "Anteprima del documento",
      ready: "Anteprima pronta",
      noContent: "Completa il curriculum prima di esportarlo."
    },

    de: {
      overline: "WORKNELY DESIGN STUDIO",
      title: "Live-Lebenslaufvorschau",
      description: "Sieh, wie sich dein Lebenslauf beim Schreiben aktualisiert.",
      template: "Aktive Vorlage",
      live: "Live-Vorschau",
      sample: "Beispiel-Lebenslauf",
      personal: "Mein Lebenslauf",
      responsive: "Adaptiv",
      paper: "A4-Vorschau",
      language: "Dokumentsprache",
      automatic: "Oberflächensprache",
      empty: "Fülle deinen Lebenslauf aus, um die professionelle Vorschau zu sehen.",
      sampleNotice: "Du siehst fiktive Beispieldaten. Deine persönlichen Daten wurden nicht verändert.",
      print: "PDF speichern / drucken",
      printError: "Die Druckvorschau konnte nicht geöffnet werden. Erlaube Pop-ups und versuche es erneut.",
      unavailable: "Die Vorschau-Engine ist derzeit nicht verfügbar.",
      previewLabel: "Dokumentvorschau",
      ready: "Vorschau bereit",
      noContent: "Vervollständige deinen Lebenslauf vor dem Export."
    },

    fr: {
      overline: "WORKNELY DESIGN STUDIO",
      title: "Aperçu du CV en direct",
      description: "Visualisez votre CV pendant sa rédaction.",
      template: "Modèle actif",
      live: "Aperçu en direct",
      sample: "Exemple de CV",
      personal: "Mon CV",
      responsive: "Adaptatif",
      paper: "Aperçu A4",
      language: "Langue du document",
      automatic: "Langue de l'interface",
      empty: "Commencez à remplir votre CV pour afficher votre aperçu professionnel.",
      sampleNotice: "Vous visualisez un exemple fictif. Vos informations personnelles n'ont pas été modifiées.",
      print: "Enregistrer / Imprimer PDF",
      printError: "Impossible d'ouvrir l'aperçu avant impression. Autorisez les fenêtres contextuelles et réessayez.",
      unavailable: "Le moteur d'aperçu est actuellement indisponible.",
      previewLabel: "Aperçu du document",
      ready: "Aperçu prêt",
      noContent: "Complétez votre CV avant de l'exporter."
    },

    es: {
      overline: "WORKNELY DESIGN STUDIO",
      title: "Vista previa del currículum",
      description: "Observa cómo se actualiza tu currículum mientras escribes.",
      template: "Plantilla activa",
      live: "Vista previa en directo",
      sample: "Currículum de ejemplo",
      personal: "Mi currículum",
      responsive: "Adaptable",
      paper: "Vista previa A4",
      language: "Idioma del documento",
      automatic: "Idioma de la interfaz",
      empty: "Completa tu currículum para ver la vista previa profesional.",
      sampleNotice: "Estás viendo contenido ficticio. Tus datos personales no se han modificado.",
      print: "Guardar / Imprimir PDF",
      printError: "No se pudo abrir la vista previa de impresión. Permite las ventanas emergentes e inténtalo de nuevo.",
      unavailable: "El motor de vista previa no está disponible actualmente.",
      previewLabel: "Vista previa del documento",
      ready: "Vista previa lista",
      noContent: "Completa tu currículum antes de exportarlo."
    }

  };

  const languageNames = {
    en: "English",
    ro: "Română",
    it: "Italiano",
    de: "Deutsch",
    fr: "Français",
    es: "Español"
  };

  /* LANGUAGE UTILITIES */

  function normalizeLanguage(value) {

    const code = String(value || "")
      .toLowerCase()
      .split("-")[0];

    return LANGUAGES.includes(code)
      ? code
      : "en";

  }

  function getLanguage() {

    let stored = null;

    try {

      stored = localStorage.getItem(
        "worknely.language"
      );

    } catch {

      // Storage may be unavailable.

    }

    return normalizeLanguage(

      window.WorknelyLocalization
        ?.getLanguage?.() ||

      stored ||

      document.documentElement.lang ||

      "en"

    );

  }

  function t(key) {

    return translations[getLanguage()]?.[key] ||
      translations.en[key] ||
      key;

  }

  function getDocumentLanguage() {

    return documentLanguage === "auto"

      ? getLanguage()

      : normalizeLanguage(documentLanguage);

  }

  /* ENGINE ACCESS */

  function getEngine() {

    return window.WorknelyTemplates || null;

  }

  function engineAvailable() {

    const engine = getEngine();

    return Boolean(

      engine &&

      typeof engine.renderInto === "function" &&

      typeof engine.getState === "function" &&

      typeof engine.getTemplate === "function" &&

      typeof engine.getSampleResume === "function" &&

      typeof engine.normalizeContent === "function" &&

      typeof engine.openPrintPreview === "function"

    );

  }

  /* SAFE HTML */

  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  }

  /* RESUME FIELD ADAPTER */

  const defaultFields = {

    fullName: [
      "#fullName",
      "#resumeFullName",
      "#resumeName",
      "#builderName",
      "#rbName",
      '[name="fullName"]',
      '[name="full_name"]'
    ],

    professionalTitle: [
      "#professionalTitle",
      "#resumeProfessionalTitle",
      "#resumeRole",
      "#builderTitle",
      "#rbTitle",
      '[name="professionalTitle"]',
      '[name="professional_title"]'
    ],

    contact: [
      "#contact",
      "#resumeContact",
      "#builderContact",
      "#rbContact",
      '[name="contact"]'
    ],

    summary: [
      "#summary",
      "#resumeSummary",
      "#builderSummary",
      "#rbSummary",
      '[name="summary"]'
    ],

    experience: [
      "#experience",
      "#resumeExperience",
      "#builderExperience",
      "#rbExperience",
      '[name="experience"]'
    ],

    education: [
      "#education",
      "#resumeEducation",
      "#builderEducation",
      "#rbEducation",
      '[name="education"]'
    ],

    skills: [
      "#skills",
      "#resumeSkills",
      "#builderSkills",
      "#rbSkills",
      '[name="skills"]'
    ]

  };

  function findField(key) {

    if (!source) return null;

    const configured = fieldMap[key];

    if (

      configured &&

      configured.nodeType === 1

    ) {

      return source.contains(configured)

        ? configured

        : null;

    }

    const selectors = configured

      ? Array.isArray(configured)

        ? configured

        : [configured]

      : defaultFields[key] || [];

    for (const selector of selectors) {

      if (typeof selector !== "string") {

        continue;

      }

      try {

        const element =
          source.querySelector(selector);

        if (element) return element;

      } catch {

        // Ignore invalid selectors.

      }

    }

    return null;

  }

  function readField(element) {

    if (!element) return "";

    if (typeof element.value === "string") {

      return element.value;

    }

    if (element.isContentEditable) {

      return element.innerText || "";

    }

    return "";

  }

  function readResume() {

    const engine = getEngine();

    if (!engineAvailable()) return {};

    if (typeof customReader === "function") {

      try {

        return engine.normalizeContent(
          customReader()
        );

      } catch {

        return engine.normalizeContent({});

      }

    }

    const content = {};

    FIELD_KEYS.forEach(key => {

      content[key] =
        readField(findField(key));

    });

    return engine.normalizeContent(content);

  }

  function hasContent(content) {

    return FIELD_KEYS.some(key =>

      typeof content[key] === "string" &&

      content[key].trim().length > 0

    );

  }

  function getPreviewContent() {

    if (!engineAvailable()) return {};

    return sampleMode

      ? getEngine().getSampleResume()

      : readResume();

  }

  /* LIVE PREVIEW DESIGN SYSTEM */

  const CSS = `

    .wn-live-preview,
    .wn-live-preview * {
      box-sizing:border-box;
    }

    .wn-live-preview {
      width:100%;
      min-width:0;
      margin:20px 0;
      padding:16px;
      border:1px solid #e9e3f5;
      border-radius:16px;
      background:#ffffff;
      color:#241442;
      font-family:Inter,-apple-system,
        BlinkMacSystemFont,"Segoe UI",sans-serif;
      box-shadow:0 8px 28px rgba(40,20,90,.045);
    }

    .wn-live-preview [hidden] {
      display:none!important;
    }

    .wn-preview-heading {
      display:block;
      margin:0 0 16px;
    }

    .wn-preview-overline {
      display:block;
      margin:0 0 7px;
      color:#5424ff;
      font-size:10px;
      font-weight:800;
      letter-spacing:1.4px;
    }

    .wn-live-preview .wn-preview-heading h2 {
      margin:0 0 6px;
      padding:0;
      color:#241442;
      font-size:clamp(22px,4vw,30px);
      font-weight:800;
      line-height:1.2;
      letter-spacing:-.7px;
    }

    .wn-live-preview .wn-preview-heading p {
      margin:0;
      color:#706780;
      font-size:13px;
      line-height:1.5;
    }

    .wn-preview-toolbar {
      display:flex;
      flex-wrap:wrap;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      margin:0 0 12px;
    }

    .wn-preview-template {
      display:flex;
      align-items:center;
      gap:9px;
      min-width:0;
    }

    .wn-preview-color {
      width:20px;
      height:20px;
      flex-shrink:0;
      border:2px solid #ffffff;
      border-radius:50%;
      box-shadow:0 0 0 1px #ded7ee;
      background:#242424;
    }

    .wn-preview-template-label {
      display:block;
      color:#706780;
      font-size:10px;
      font-weight:600;
    }

    .wn-preview-template-name {
      display:block;
      color:#241442;
      font-size:13px;
      font-weight:800;
      overflow-wrap:anywhere;
    }

    .wn-preview-switch {
      display:flex;
      flex-wrap:wrap;
      gap:5px;
    }

    .wn-live-preview .wn-preview-button {
      display:inline-flex;
      justify-content:center;
      align-items:center;
      min-height:40px;
      width:auto;
      margin:0;
      padding:8px 12px;
      border:1px solid #e9e3f5;
      border-radius:8px;
      background:#ffffff;
      color:#625b71;
      font:inherit;
      font-size:11px;
      font-weight:700;
      line-height:1.4;
      text-align:center;
      white-space:normal;
      cursor:pointer;
      box-shadow:none;
      touch-action:manipulation;
    }

    .wn-live-preview
    .wn-preview-button[aria-pressed="true"] {
      background:#5424ff;
      border-color:#5424ff;
      color:#ffffff;
    }

    .wn-preview-settings {
      display:flex;
      flex-wrap:wrap;
      align-items:end;
      justify-content:space-between;
      gap:12px;
      margin:0 0 14px;
      padding:12px;
      border:1px solid #eee9f7;
      border-radius:10px;
      background:#faf9fd;
    }

    .wn-preview-language {
      display:flex;
      flex-direction:column;
      gap:5px;
      min-width:140px;
      max-width:100%;
    }

    .wn-preview-language label {
      color:#625b71;
      font-size:11px;
      font-weight:700;
    }

    .wn-live-preview
    .wn-preview-language select {
      width:100%;
      min-height:42px;
      margin:0;
      padding:8px;
      border:1px solid #e1daef;
      border-radius:8px;
      background:#ffffff;
      color:#241442;
      font:inherit;
      font-size:16px;
    }

    .wn-preview-stage {
      position:relative;
      width:100%;
      min-width:0;
      padding:14px;
      border:1px solid #e9e3f5;
      border-radius:12px;
      background:#efedf4;
      overflow:hidden;
    }

    .wn-preview-document {
      width:100%;
      min-width:0;
      margin:0 auto;
    }

    .wn-preview-document .wn-tpl-resume {
      box-shadow:0 3px 18px rgba(25,15,50,.09);
    }

    .wn-preview-stage[data-mode="paper"]
    .wn-preview-document {
      position:relative;
      width:100%;
      overflow:hidden;
    }

    .wn-preview-stage[data-mode="paper"]
    .wn-tpl-resume {
      width:794px!important;
      max-width:none!important;
      min-height:1123px;
      margin:0!important;
      padding:56px!important;
      font-size:14px!important;
      line-height:1.5!important;
      transform-origin:top left;
    }

    .wn-preview-stage[data-mode="paper"]
    .wn-tpl-resume h1 {
      font-size:34px!important;
    }

    .wn-preview-stage[data-mode="paper"]
    .wn-tpl-resume h2 {
      font-size:16px!important;
    }

    .wn-preview-stage[data-mode="paper"]
    .wn-tpl-columns {
      grid-template-columns:
        minmax(0,1.8fr) minmax(0,1fr)!important;
      gap:20px!important;
    }

    .wn-preview-empty {
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      min-height:220px;
      padding:24px;
      border:1px dashed #d8cdef;
      border-radius:10px;
      background:#ffffff;
      text-align:center;
      color:#706780;
      font-size:13px;
      line-height:1.6;
    }

    .wn-preview-empty-icon {
      display:grid;
      place-items:center;
      width:46px;
      height:46px;
      margin:0 0 12px;
      border-radius:12px;
      background:#f1ebff;
      color:#5424ff;
      font-size:24px;
    }

    .wn-preview-notice {
      margin:10px 0 0;
      padding:10px;
      border-radius:8px;
      background:#f8f5ff;
      color:#625b71;
      font-size:11px;
      line-height:1.5;
    }

    .wn-preview-actions {
      display:flex;
      justify-content:flex-end;
      flex-wrap:wrap;
      gap:8px;
      margin:14px 0 0;
    }

    .wn-live-preview
    .wn-preview-print {
      width:auto;
      min-height:44px;
      margin:0;
      padding:12px 18px;
      border:0;
      border-radius:9px;
      background:linear-gradient(
        120deg,#5424ff,#7134e9
      );
      color:#ffffff;
      font:inherit;
      font-size:12px;
      font-weight:800;
      line-height:1.4;
      cursor:pointer;
    }

    .wn-live-preview
    .wn-preview-print:disabled {
      opacity:.45;
      cursor:not-allowed;
    }

    .wn-preview-status {
      margin:8px 0 0;
      color:#706780;
      font-size:12px;
      line-height:1.5;
    }

    .wn-preview-status[data-type="error"] {
      color:#b42318;
    }

    .wn-live-preview button:focus-visible,
    .wn-live-preview select:focus-visible {
      outline:3px solid #5424ff;
      outline-offset:3px;
    }

    @media(max-width:600px) {

      .wn-live-preview {
        padding:12px;
        border-radius:13px;
      }

      .wn-preview-stage {
        padding:8px;
      }

      .wn-preview-toolbar,
      .wn-preview-settings {
        align-items:stretch;
        flex-direction:column;
      }

      .wn-preview-switch {
        width:100%;
      }

      .wn-live-preview
      .wn-preview-button {
        flex:1;
        min-height:44px;
      }

      .wn-preview-language {
        width:100%;
      }

      .wn-preview-actions {
        display:block;
      }

      .wn-live-preview
      .wn-preview-print {
        width:100%;
      }

    }

    @media print {

      .wn-live-preview {
        display:none!important;
      }

    }

  `;

  /* STYLE INSTALLATION */

  function installStyles() {

    if (document.getElementById(STYLE_ID)) {

      return;

    }

    const style =
      document.createElement("style");

    style.id = STYLE_ID;
    style.textContent = CSS;

    document.head.appendChild(style);

  }

  /* DOCUMENT LANGUAGE OPTIONS */

  function languageOptions() {

    return `

      <option value="auto">
        ${escapeHTML(t("automatic"))}
      </option>

      ${LANGUAGES.map(code => `

        <option value="${code}">
          ${escapeHTML(languageNames[code])}
        </option>

      `).join("")}

    `;

  }

  /* PREVIEW INTERFACE */

  function renderInterface() {

    if (!root) return false;

    installStyles();

    renderedLanguage = getLanguage();

    root.setAttribute(
      "aria-label",
      t("previewLabel")
    );

    if (!engineAvailable()) {

      root.innerHTML = `

        <p class="wn-preview-status"
           role="status">

          ${escapeHTML(t("unavailable"))}

        </p>

      `;

      return false;

    }

    root.innerHTML = `

      <div class="wn-preview-heading">

        <span class="wn-preview-overline">
          ${escapeHTML(t("overline"))}
        </span>

        <h2>${escapeHTML(t("title"))}</h2>

        <p>${escapeHTML(t("description"))}</p>

      </div>

      <div class="wn-preview-toolbar">

        <div class="wn-preview-template">

          <span
            class="wn-preview-color"
            data-preview-color
            aria-hidden="true"
          ></span>

          <div>

            <span class="wn-preview-template-label">
              ${escapeHTML(t("template"))}
            </span>

            <strong
              class="wn-preview-template-name"
              data-preview-template-name
            ></strong>

          </div>

        </div>

        <div class="wn-preview-switch">

          <button
            type="button"
            class="wn-preview-button"
            data-preview-content="personal"
            aria-pressed="${!sampleMode}"
          >
            ${escapeHTML(t("personal"))}
          </button>

          <button
            type="button"
            class="wn-preview-button"
            data-preview-content="sample"
            aria-pressed="${sampleMode}"
          >
            ${escapeHTML(t("sample"))}
          </button>

        </div>

      </div>

      <div class="wn-preview-settings">

        <div class="wn-preview-language">

          <label for="wnPreviewDocumentLanguage">
            ${escapeHTML(t("language"))}
          </label>

          <select
            id="wnPreviewDocumentLanguage"
            data-preview-language
          >

            ${languageOptions()}

          </select>

        </div>

        <div class="wn-preview-switch">

          <button
            type="button"
            class="wn-preview-button"
            data-preview-mode="responsive"
            aria-pressed="${
              previewMode === "responsive"
            }"
          >
            ${escapeHTML(t("responsive"))}
          </button>

          <button
            type="button"
            class="wn-preview-button"
            data-preview-mode="paper"
            aria-pressed="${
              previewMode === "paper"
            }"
          >
            ${escapeHTML(t("paper"))}
          </button>

        </div>

      </div>

      <div
        class="wn-preview-stage"
        data-preview-stage
        data-mode="${previewMode}"
      >

        <div
          class="wn-preview-document"
          data-preview-document
        ></div>

      </div>

      <p
        class="wn-preview-notice"
        data-preview-notice
        ${sampleMode ? "" : "hidden"}
      >

        ${escapeHTML(t("sampleNotice"))}

      </p>

      <div class="wn-preview-actions">

        <button
          type="button"
          class="wn-preview-print"
          data-preview-print
          disabled
        >

          ${escapeHTML(t("print"))}

        </button>

      </div>

      <p
        class="wn-preview-status"
        data-preview-status
        role="status"
        aria-live="polite"
        hidden
      ></p>

    `;

    const languageSelect =
      root.querySelector(
        "[data-preview-language]"
      );

    languageSelect.value = documentLanguage;

    observeStage();

    renderPreview();

    return true;

  }

  /* PREVIEW STATUS */

  function setStatus(message = "", type = "info") {

    const status = root?.querySelector(
      "[data-preview-status]"
    );

    if (!status) return;

    status.textContent = message;
    status.dataset.type = type;
    status.hidden = !message;

  }

  /* A4 PAPER SCALING */

  function resizePaper() {

    if (!root) return;

    const target = root.querySelector(
      "[data-preview-document]"
    );

    const paper = target?.querySelector(
      ".wn-tpl-resume"
    );

    if (!target || !paper) return;

    if (previewMode !== "paper") {

      target.style.height = "";
      paper.style.transform = "";

      return;

    }

    const width = target.clientWidth;

    if (!width) return;

    const scale = Math.min(
      1,
      width / 794
    );

    paper.style.transform =
      "scale(" + scale + ")";

    target.style.height =
      Math.ceil(
        paper.offsetHeight * scale
      ) + "px";

  }

  function observeStage() {

    observer?.disconnect();

    if (

      !root ||

      typeof ResizeObserver !== "function"

    ) return;

    const stage = root.querySelector(
      "[data-preview-stage]"
    );

    if (!stage) return;

    observer = new ResizeObserver(() => {

      resizePaper();

    });

    observer.observe(stage);

  }

  /* TEMPLATE STATE SYNCHRONIZATION */

  function updateControls() {

    if (!root || !engineAvailable()) return;

    const engine = getEngine();
    const state = engine.getState();

    const template =
      engine.getTemplate(state.templateId);

    const name = root.querySelector(
      "[data-preview-template-name]"
    );

    const color = root.querySelector(
      "[data-preview-color]"
    );

    const notice = root.querySelector(
      "[data-preview-notice]"
    );

    const stage = root.querySelector(
      "[data-preview-stage]"
    );

    if (name) {

      name.textContent = template.name;

    }

    if (color) {

      color.style.backgroundColor =
        state.accentColor;

    }

    if (notice) {

      notice.hidden = !sampleMode;

    }

    if (stage) {

      stage.dataset.mode = previewMode;

    }

    root.querySelectorAll(
      "[data-preview-content]"
    ).forEach(button => {

      const selected = sampleMode

        ? button.dataset.previewContent === "sample"

        : button.dataset.previewContent === "personal";

      button.setAttribute(
        "aria-pressed",
        String(selected)
      );

    });

    root.querySelectorAll(
      "[data-preview-mode]"
    ).forEach(button => {

      button.setAttribute(

        "aria-pressed",

        String(
          button.dataset.previewMode === previewMode
        )

      );

    });

  }

  /* LIVE RESUME RENDERING */

  function renderPreview() {

    if (!root || !engineAvailable()) {

      return false;

    }

    const target = root.querySelector(
      "[data-preview-document]"
    );

    const printButton = root.querySelector(
      "[data-preview-print]"
    );

    if (!target) return false;

    const content = getPreviewContent();

    lastContent = { ...content };

    updateControls();

    const available = hasContent(content);

    if (printButton) {

      printButton.disabled =
        !available || sampleMode;

    }

    if (!available) {

      target.style.height = "";

      target.innerHTML = `

        <div class="wn-preview-empty">

          <span
            class="wn-preview-empty-icon"
            aria-hidden="true"
          >▤</span>

          ${escapeHTML(t("empty"))}

        </div>

      `;

      return true;

    }

    const engine = getEngine();
    const state = engine.getState();

    engine.renderInto(

      target,

      content,

      {
        templateId:state.templateId,
        accentColor:state.accentColor,
        documentLanguage:getDocumentLanguage()
      }

    );

    resizePaper();

    return true;

  }

  /* FRAME-BASED RENDER SCHEDULING */

  function refresh() {

    if (!root) return false;

    if (frame !== null) {

      cancelAnimationFrame(frame);

    }

    frame = requestAnimationFrame(() => {

      frame = null;

      renderPreview();

    });

    return true;

  }

  /* SAMPLE MODE */

  function setSampleMode(enabled) {

    sampleMode = Boolean(enabled);

    setStatus("");

    renderPreview();

    return sampleMode;

  }

  /* PREVIEW DISPLAY MODE */

  function setPreviewMode(mode) {

    if (

      mode !== "responsive" &&

      mode !== "paper"

    ) return false;

    previewMode = mode;

    renderPreview();

    return true;

  }

  /* DOCUMENT LANGUAGE */

  function setDocumentLanguage(language) {

    if (

      language !== "auto" &&

      !LANGUAGES.includes(language)

    ) return false;

    documentLanguage = language;

    const select = root?.querySelector(
      "[data-preview-language]"
    );

    if (select) {

      select.value = language;

    }

    renderPreview();

    return true;

  }

  /* NATIVE PRINT PREVIEW */

  function printResume() {

    if (!engineAvailable()) return false;

    const content = readResume();

    if (

      sampleMode ||

      !hasContent(content)

    ) {

      setStatus(
        t("noContent"),
        "error"
      );

      return false;

    }

    const engine = getEngine();
    const state = engine.getState();

    const result = engine.openPrintPreview(

      content,

      {
        templateId:state.templateId,
        accentColor:state.accentColor,
        documentLanguage:getDocumentLanguage(),
        title:content.fullName || "Worknely Resume"
      }

    );

    if (!result?.ok) {

      setStatus(
        t("printError"),
        "error"
      );

      return false;

    }

    setStatus("");

    return true;

  }

  /* DELEGATED INTERACTIONS */

  function handleClick(event) {

    if (!(event.target instanceof Element)) {

      return;

    }

    const contentButton =
      event.target.closest(
        "[data-preview-content]"
      );

    if (

      contentButton &&

      root.contains(contentButton)

    ) {

      setSampleMode(

        contentButton.dataset.previewContent ===
        "sample"

      );

      return;

    }

    const modeButton =
      event.target.closest(
        "[data-preview-mode]"
      );

    if (

      modeButton &&

      root.contains(modeButton)

    ) {

      setPreviewMode(
        modeButton.dataset.previewMode
      );

      return;

    }

    const printButton =
      event.target.closest(
        "[data-preview-print]"
      );

    if (

      printButton &&

      root.contains(printButton)

    ) {

      printResume();

    }

  }

  function handleChange(event) {

    if (

      event.target.matches?.(
        "[data-preview-language]"
      )

    ) {

      setDocumentLanguage(
        event.target.value
      );

    }

  }

  /* SOURCE FIELD EVENTS */

  function handleSourceInput(event) {

    if (

      root &&

      root.contains(event.target)

    ) return;

    if (sampleMode) {

      sampleMode = false;

    }

    setStatus("");

    refresh();

  }

  function handleSourceReset() {

    sampleMode = false;

    refresh();

  }

  function detachSource() {

    if (!source) return;

    source.removeEventListener(
      "input",
      handleSourceInput
    );

    source.removeEventListener(
      "change",
      handleSourceInput
    );

    source.removeEventListener(
      "reset",
      handleSourceReset
    );

    source = null;

  }

  function bindSource(target, options = {}) {

    let element = null;

    try {

      element = typeof target === "string"

        ? document.querySelector(target)

        : target;

    } catch {

      return false;

    }

    if (

      !element ||

      element.nodeType !== 1

    ) return false;

    detachSource();

    source = element;

    fieldMap = options.fields || {};

    customReader =

      typeof options.readContent === "function"

        ? options.readContent

        : null;

    source.addEventListener(
      "input",
      handleSourceInput
    );

    source.addEventListener(
      "change",
      handleSourceInput
    );

    source.addEventListener(
      "reset",
      handleSourceReset
    );

    refresh();

    return true;

  }

  /* PREVIEW MOUNTING */

  function mount(target, options = {}) {

    let element;

    try {

      element = typeof target === "string"

        ? document.querySelector(target)

        : target;

    } catch {

      return false;

    }

    if (

      !element ||

      element.nodeType !== 1

    ) return false;

    if (root && root !== element) {

      unmount();

    }

    if (root !== element) {

      root = element;

      root.classList.add(
        "wn-live-preview"
      );

      root.setAttribute(
        "role",
        "region"
      );

      root.addEventListener(
        "click",
        handleClick
      );

      root.addEventListener(
        "change",
        handleChange
      );

    }

    if (options.source) {

      bindSource(
        options.source,
        options
      );

    }

    const ready = renderInterface();

    if (ready) {

      document.dispatchEvent(

        new CustomEvent(

          "worknely:previewready",

          {
            detail:{
              version:VERSION,
              sourceConnected:Boolean(source)
            }
          }

        )

      );

    }

    return ready;

  }

  /* PREVIEW CLEANUP */

  function unmount() {

    if (frame !== null) {

      cancelAnimationFrame(frame);
      frame = null;

    }

    observer?.disconnect();
    observer = null;

    detachSource();

    if (!root) return false;

    root.removeEventListener(
      "click",
      handleClick
    );

    root.removeEventListener(
      "change",
      handleChange
    );

    root.innerHTML = "";

    root.classList.remove(
      "wn-live-preview"
    );

    root.removeAttribute("role");
    root.removeAttribute("aria-label");

    root = null;
    customReader = null;
    lastContent = null;
    fieldMap = {};

    return true;

  }

  /* INTERNATIONAL SYNCHRONIZATION */

  function refreshLanguage() {

    if (!root) return;

    if (renderedLanguage !== getLanguage()) {

      renderInterface();

    }

  }

  document.addEventListener(

    "worknely:languagechange",

    refreshLanguage

  );

  document.addEventListener(

    "worknely:localizationready",

    refreshLanguage

  );

  /* GLOBAL TEMPLATE EVENTS */

  document.addEventListener(

    "worknely:templatechange",

    event => {

      if (!root) return;

      if (event.detail?.reason === "language") {

        refreshLanguage();

        return;

      }

      refresh();

    }

  );

  /* EXTERNAL RESUME UPDATE EVENT */

  document.addEventListener(

    "worknely:resumechange",

    () => {

      sampleMode = false;

      refresh();

    }

  );

  /* AUTOMATIC MOUNTING */

  function autoMount() {

    const element =
      document.getElementById(ROOT_ID);

    if (!element || root === element) {

      return false;

    }

    const sourceSelector =
      element.dataset.previewSource;

    const options = sourceSelector

      ? { source:sourceSelector }

      : {};

    return mount(element, options);

  }

  document.addEventListener(

    "worknely:templatesready",

    () => {

      if (root) {

        renderInterface();

      } else {

        autoMount();

      }

    }

  );

  window.addEventListener(

    "resize",

    resizePaper,

    { passive:true }

  );

  window.addEventListener(

    "pageshow",

    () => {

      refreshLanguage();

      refresh();

    }

  );

  /* PUBLIC LIVE PREVIEW API */

  window.WorknelyLivePreview = Object.freeze({

    version:VERSION,

    mount,

    unmount,

    bindSource,

    refresh,

    render:renderPreview,

    readResume,

    setSampleMode,

    setPreviewMode,

    setDocumentLanguage,

    getDocumentLanguage,

    printResume,

    getContent:() => lastContent

      ? { ...lastContent }

      : null,

    getState:() => ({

      version:VERSION,

      mounted:Boolean(root),

      sourceConnected:Boolean(source),

      sampleMode,

      previewMode,

      documentLanguage:getDocumentLanguage()

    })

  });

  /* INITIALIZATION */

  function initialize() {

    autoMount();

    console.info(

      "Worknely V" + VERSION +

      " Live Resume Preview Engine ready."

    );

  }

  if (document.readyState === "loading") {

    document.addEventListener(

      "DOMContentLoaded",

      initialize,

      { once:true }

    );

  } else {

    initialize();

  }

})();

/*
 * END WORKNELY V7.16.3
 * LIVE RESUME PREVIEW ENGINE
 */
