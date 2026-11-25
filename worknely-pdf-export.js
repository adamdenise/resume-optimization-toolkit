
/*
 * WORKNELY V7.16.12
 * Professional PDF Stability Fix
 * CDN Recovery and Unicode Support
 * Direct PDF Generation
 * iOS Download and Sharing
 * Six Language Interface
 * A4 / US Letter
 * Local Processing
 */

(() => {
  "use strict";

  const VERSION = "7.16.12";
  const ROOT_ID = "wnProfessionalPDFExport";
  const STYLE_ID = "wn-professional-pdf-styles";

  const PDF_LIBRARIES = [
    "https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js",
    "https://unpkg.com/jspdf@2.5.2/dist/jspdf.umd.min.js"
  ];

  const FONT_SOURCES = [
    "https://cdn.jsdelivr.net/gh/notofonts/noto-fonts@main/hinted/ttf/NotoSans/",
    "https://raw.githubusercontent.com/notofonts/noto-fonts/main/hinted/ttf/NotoSans/"
  ];

  const LANGUAGES = [
    "en", "ro", "it", "de", "fr", "es"
  ];

  const FORMATS = Object.freeze({
    a4: {
      name: "A4",
      size: "210 × 297 mm",
      css: "A4"
    },
    letter: {
      name: "US Letter",
      size: "216 × 279 mm",
      css: "letter"
    }
  });

  const FIELD_MAP = {
    fullName: "bName",
    professionalTitle: "bTitle",
    contact: "bContact",
    education: "bEducation",
    summary: "bSummary",
    experience: "bExperience",
    skills: "bSkills"
  };

  const languageNames = {
    en: "English",
    ro: "Română",
    it: "Italiano",
    de: "Deutsch",
    fr: "Français",
    es: "Español"
  };

  let root = null;
  let paperFormat = "a4";
  let renderedLanguage = null;
  let statusKey = "";
  let customReader = null;
  let exporting = false;
  let libraryPromise = null;
  let fontPromise = null;
  let preparedFile = null;
  let preparedURL = null;
  let documentRevision = 0;
  let lastError = null;

  /* INTERNATIONAL DICTIONARY */

  const translations = {
    en: {
      overline: "WORKNELY DESIGN STUDIO",
      title: "Professional PDF Export",
      description: "Create a professional PDF using your selected resume design.",
      format: "Paper format",
      template: "Selected template",
      color: "Accent color",
      language: "Document language",
      filename: "Document name",
      export: "Generate professional PDF",
      preparing: "Preparing PDF...",
      ready: "Your PDF is ready to download or share.",
      empty: "Complete your resume before exporting.",
      unavailable: "The template engine is unavailable.",
      failed: "Unable to generate the PDF.",
      libraryError: "The PDF library could not be loaded. Please try again.",
      fontError: "The document fonts could not be loaded. Please try again.",
      changed: "The document has changed. Generate the PDF again.",
      download: "Download PDF",
      share: "Share / Save PDF",
      open: "Open PDF",
      shareFailed: "Sharing is unavailable. Use Download PDF instead.",
      privacy: "Your resume is processed locally on your device.",
      note: "On iPhone, use Share / Save PDF or open the PDF in Safari.",
      defaultName: "Professional Resume",
      summary: "Professional Profile",
      experience: "Professional Experience",
      education: "Education",
      skills: "Skills",
      contact: "Contact"
    },

    ro: {
      overline: "WORKNELY DESIGN STUDIO",
      title: "Export PDF profesional",
      description: "Creează un PDF profesional folosind designul selectat.",
      format: "Formatul paginii",
      template: "Șablon selectat",
      color: "Culoare de accent",
      language: "Limba documentului",
      filename: "Denumirea documentului",
      export: "Generează PDF profesional",
      preparing: "Se pregătește PDF-ul...",
      ready: "PDF-ul este pregătit pentru descărcare sau partajare.",
      empty: "Completează CV-ul înainte de export.",
      unavailable: "Motorul de șabloane nu este disponibil.",
      failed: "PDF-ul nu a putut fi generat.",
      libraryError: "Biblioteca PDF nu a putut fi încărcată. Încearcă din nou.",
      fontError: "Fonturile documentului nu au putut fi încărcate. Încearcă din nou.",
      changed: "Documentul a fost modificat. Generează PDF-ul din nou.",
      download: "Descarcă PDF",
      share: "Partajează / Salvează PDF",
      open: "Deschide PDF",
      shareFailed: "Partajarea nu este disponibilă. Utilizează Descarcă PDF.",
      privacy: "CV-ul este procesat local pe dispozitivul tău.",
      note: "Pe iPhone, folosește Partajează / Salvează PDF sau deschide PDF-ul în Safari.",
      defaultName: "CV Profesional",
      summary: "Profil profesional",
      experience: "Experiență profesională",
      education: "Educație",
      skills: "Competențe",
      contact: "Contact"
    },

    it: {
      overline: "WORKNELY DESIGN STUDIO",
      title: "Esportazione PDF professionale",
      description: "Crea un PDF professionale utilizzando il modello selezionato.",
      format: "Formato della pagina",
      template: "Modello selezionato",
      color: "Colore di accento",
      language: "Lingua del documento",
      filename: "Nome del documento",
      export: "Genera PDF professionale",
      preparing: "Preparazione del PDF...",
      ready: "Il PDF è pronto per essere scaricato o condiviso.",
      empty: "Completa il curriculum prima di esportarlo.",
      unavailable: "Il motore dei modelli non è disponibile.",
      failed: "Impossibile generare il PDF.",
      libraryError: "Impossibile caricare la libreria PDF. Riprova.",
      fontError: "Impossibile caricare i caratteri del documento. Riprova.",
      changed: "Il documento è stato modificato. Genera nuovamente il PDF.",
      download: "Scarica PDF",
      share: "Condividi / Salva PDF",
      open: "Apri PDF",
      shareFailed: "Condivisione non disponibile. Utilizza Scarica PDF.",
      privacy: "Il curriculum viene elaborato localmente sul dispositivo.",
      note: "Su iPhone, usa Condividi / Salva PDF oppure apri il PDF in Safari.",
      defaultName: "Curriculum Professionale",
      summary: "Profilo professionale",
      experience: "Esperienza professionale",
      education: "Formazione",
      skills: "Competenze",
      contact: "Contatti"
    },

    de: {
      overline: "WORKNELY DESIGN STUDIO",
      title: "Professioneller PDF-Export",
      description: "Erstelle ein professionelles PDF mit deiner ausgewählten Vorlage.",
      format: "Papierformat",
      template: "Ausgewählte Vorlage",
      color: "Akzentfarbe",
      language: "Dokumentsprache",
      filename: "Dokumentname",
      export: "Professionelles PDF erstellen",
      preparing: "PDF wird vorbereitet...",
      ready: "Dein PDF steht zum Download bereit.",
      empty: "Vervollständige deinen Lebenslauf vor dem Export.",
      unavailable: "Die Vorlagenfunktion ist nicht verfügbar.",
      failed: "PDF konnte nicht erstellt werden.",
      libraryError: "Die PDF-Bibliothek konnte nicht geladen werden.",
      fontError: "Die Schriftarten konnten nicht geladen werden.",
      changed: "Das Dokument wurde geändert. Erstelle das PDF erneut.",
      download: "PDF herunterladen",
      share: "PDF teilen / speichern",
      open: "PDF öffnen",
      shareFailed: "Teilen nicht verfügbar. Lade das PDF herunter.",
      privacy: "Dein Lebenslauf wird lokal verarbeitet.",
      note: "Auf dem iPhone kannst du das PDF teilen oder in Safari öffnen.",
      defaultName: "Professioneller Lebenslauf",
      summary: "Berufliches Profil",
      experience: "Berufserfahrung",
      education: "Ausbildung",
      skills: "Fähigkeiten",
      contact: "Kontakt"
    },

    fr: {
      overline: "WORKNELY DESIGN STUDIO",
      title: "Export PDF professionnel",
      description: "Créez un PDF professionnel avec votre modèle sélectionné.",
      format: "Format du papier",
      template: "Modèle sélectionné",
      color: "Couleur d'accent",
      language: "Langue du document",
      filename: "Nom du document",
      export: "Générer le PDF professionnel",
      preparing: "Préparation du PDF...",
      ready: "Votre PDF est prêt à être téléchargé ou partagé.",
      empty: "Complétez votre CV avant de l'exporter.",
      unavailable: "Le moteur de modèles est indisponible.",
      failed: "Impossible de générer le PDF.",
      libraryError: "Impossible de charger la bibliothèque PDF. Réessayez.",
      fontError: "Impossible de charger les polices du document.",
      changed: "Le document a été modifié. Générez à nouveau le PDF.",
      download: "Télécharger le PDF",
      share: "Partager / Enregistrer le PDF",
      open: "Ouvrir le PDF",
      shareFailed: "Partage indisponible. Téléchargez le PDF.",
      privacy: "Votre CV est traité localement sur votre appareil.",
      note: "Sur iPhone, partagez le PDF ou ouvrez-le dans Safari.",
      defaultName: "CV Professionnel",
      summary: "Profil professionnel",
      experience: "Expérience professionnelle",
      education: "Formation",
      skills: "Compétences",
      contact: "Coordonnées"
    },

    es: {
      overline: "WORKNELY DESIGN STUDIO",
      title: "Exportación PDF profesional",
      description: "Crea un PDF profesional con tu plantilla seleccionada.",
      format: "Formato del papel",
      template: "Plantilla seleccionada",
      color: "Color de acento",
      language: "Idioma del documento",
      filename: "Nombre del documento",
      export: "Generar PDF profesional",
      preparing: "Preparando PDF...",
      ready: "Tu PDF está listo para descargar o compartir.",
      empty: "Completa tu currículum antes de exportarlo.",
      unavailable: "El motor de plantillas no está disponible.",
      failed: "No se pudo generar el PDF.",
      libraryError: "No se pudo cargar la biblioteca PDF. Inténtalo de nuevo.",
      fontError: "No se pudieron cargar las fuentes del documento.",
      changed: "El documento ha cambiado. Genera el PDF de nuevo.",
      download: "Descargar PDF",
      share: "Compartir / Guardar PDF",
      open: "Abrir PDF",
      shareFailed: "No se puede compartir. Descarga el PDF.",
      privacy: "Tu currículum se procesa localmente en tu dispositivo.",
      note: "En iPhone, comparte el PDF o ábrelo en Safari.",
      defaultName: "Currículum Profesional",
      summary: "Perfil profesional",
      experience: "Experiencia profesional",
      education: "Formación",
      skills: "Competencias",
      contact: "Contacto"
    }
  };

  /* LANGUAGE */

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
    } catch {}

    return normalizeLanguage(
      window.WorknelyLocalization
        ?.getLanguage?.() ||
      stored ||
      document.documentElement.lang ||
      "en"
    );
  }

  function t(key, language = getLanguage()) {
    return translations[language]?.[key] ||
      translations.en[key] ||
      key;
  }

  function getDocumentLanguage() {
    return normalizeLanguage(
      window.WorknelyLivePreview
        ?.getDocumentLanguage?.() ||
      getLanguage()
    );
  }

  /* SAFE TEXT */

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeFilename(value) {
    return String(value || "")
      .replace(/[<>:"/\\|?*\u0000-\u001f]/g, " ")
      .replace(/\.pdf$/i, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 100)
      || t("defaultName");
  }

  function normalizeColor(value) {
    const color = String(value || "")
      .toLowerCase();

    return /^#[0-9a-f]{6}$/.test(color)
      ? color
      : "#242424";
  }

  function getEngine() {
    return window.WorknelyTemplates || null;
  }

  function engineAvailable() {
    const engine = getEngine();

    return Boolean(
      engine &&
      typeof engine.getState === "function" &&
      typeof engine.getTemplate === "function"
    );
  }

  /* RESUME DATA */

  function normalizeContent(content = {}) {
    const result = {};

    Object.keys(FIELD_MAP).forEach(key => {
      result[key] =
        typeof content?.[key] === "string"
          ? content[key].trim()
          : "";
    });

    return result;
  }

  function hasContent(content) {
    return Object.keys(FIELD_MAP).some(key =>
      typeof content?.[key] === "string" &&
      content[key].trim().length > 0
    );
  }

  function readBuilderFields() {
    const content = {};
    let found = false;

    Object.entries(FIELD_MAP).forEach(
      ([key, id]) => {
        const field = document.getElementById(id);

        if (field) {
          found = true;
          content[key] = String(
            field.value || ""
          ).trim();
        }
      }
    );

    return {
      found,
      content: normalizeContent(content)
    };
  }

  function readResume() {
    const builder = readBuilderFields();

    if (builder.found) {
      return builder.content;
    }

    if (typeof customReader === "function") {
      try {
        const content = normalizeContent(
          customReader()
        );

        if (hasContent(content)) {
          return content;
        }
      } catch {}
    }

    try {
      return normalizeContent(
        window.WorknelyLivePreview
          ?.readResume?.() || {}
      );
    } catch {
      return normalizeContent();
    }
  }

  /* ERROR MANAGEMENT */

  function createError(code) {
    const error = new Error(code);
    error.worknelyCode = code;
    return error;
  }

  /* PDF LIBRARY RECOVERY */

  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");

      let finished = false;

      const timer = setTimeout(() => {
        finish(false);
      }, 15000);

      function finish(success) {
        if (finished) return;

        finished = true;

        clearTimeout(timer);

        script.onload = null;
        script.onerror = null;

        if (
          success &&
          typeof window.jspdf?.jsPDF === "function"
        ) {
          resolve(window.jspdf.jsPDF);
        } else {
          script.remove();
          reject(createError("libraryError"));
        }
      }

      script.src = url;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.referrerPolicy = "no-referrer";

      script.onload = () => finish(true);
      script.onerror = () => finish(false);

      document.head.appendChild(script);
    });
  }

  function loadPDFLibrary() {
    if (typeof window.jspdf?.jsPDF === "function") {
      return Promise.resolve(
        window.jspdf.jsPDF
      );
    }

    if (libraryPromise) {
      return libraryPromise;
    }

    libraryPromise = (async () => {
      for (const source of PDF_LIBRARIES) {
        try {
          return await loadScript(source);
        } catch {}
      }

      throw createError("libraryError");
    })().catch(error => {
      libraryPromise = null;
      throw error;
    });

    return libraryPromise;
  }

  /* UNICODE FONT SUPPORT */

  function bufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = "";

    for (
      let i = 0;
      i < bytes.length;
      i += 8192
    ) {
      binary += String.fromCharCode(
        ...bytes.subarray(i, i + 8192)
      );
    }

    return btoa(binary);
  }

  async function fetchFont(filename) {
    for (const base of FONT_SOURCES) {
      const controller = new AbortController();

      const timer = setTimeout(
        () => controller.abort(),
        15000
      );

      try {
        const response = await fetch(
          base + filename,
          {
            credentials: "omit",
            referrerPolicy: "no-referrer",
            signal: controller.signal
          }
        );

        if (!response.ok) {
          throw createError("fontError");
        }

        const buffer = await response.arrayBuffer();

        if (buffer.byteLength < 1000) {
          throw createError("fontError");
        }

        const signature = new DataView(buffer)
          .getUint32(0);

        if (signature !== 0x00010000) {
          throw createError("fontError");
        }

        return bufferToBase64(buffer);

      } catch {
        // Try the next available font source.
      } finally {
        clearTimeout(timer);
      }
    }

    throw createError("fontError");
  }

  function loadFonts() {
    if (fontPromise) {
      return fontPromise;
    }

    fontPromise = Promise.all([
      fetchFont("NotoSans-Regular.ttf"),
      fetchFont("NotoSans-Bold.ttf")
    ]).catch(error => {
      fontPromise = null;
      throw error;
    });

    return fontPromise;
  }

  function registerFonts(pdf, fonts) {
    pdf.addFileToVFS(
      "NotoSans-Regular.ttf",
      fonts[0]
    );

    pdf.addFont(
      "NotoSans-Regular.ttf",
      "WorknelySans",
      "normal"
    );

    pdf.addFileToVFS(
      "NotoSans-Bold.ttf",
      fonts[1]
    );

    pdf.addFont(
      "NotoSans-Bold.ttf",
      "WorknelySans",
      "bold"
    );

    const registered = pdf.getFontList();

    if (
      !registered.WorknelySans?.includes("normal") ||
      !registered.WorknelySans?.includes("bold")
    ) {
      throw createError("fontError");
    }
  }

  /* INTERFACE STYLES */

  const CSS = `
    .wn-pdf-export,
    .wn-pdf-export * {
      box-sizing:border-box;
    }

    .wn-pdf-export {
      width:100%;
      min-width:0;
      margin:20px 0;
      padding:18px;
      border:1px solid #e9e3f5;
      border-radius:16px;
      background:#fff;
      color:#241442;
      font-family:Inter,-apple-system,
        BlinkMacSystemFont,"Segoe UI",sans-serif;
      box-shadow:0 8px 28px rgba(40,20,90,.045);
    }

    .wn-pdf-export [hidden] {
      display:none!important;
    }

    .wn-pdf-overline {
      display:block;
      margin-bottom:7px;
      color:#5424ff;
      font-size:11px;
      font-weight:800;
      letter-spacing:1.4px;
    }

    .wn-pdf-export h2 {
      margin:0 0 8px;
      font-size:clamp(22px,4vw,30px);
      line-height:1.2;
      font-weight:800;
      color:#241442;
    }

    .wn-pdf-description {
      margin:0 0 18px;
      color:#706780;
      font-size:13px;
      line-height:1.6;
    }

    .wn-pdf-settings {
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:12px;
      margin-bottom:16px;
    }

    .wn-pdf-field {
      min-width:0;
    }

    .wn-pdf-field label {
      display:block;
      margin-bottom:6px;
      color:#625b71;
      font-size:12px;
      font-weight:700;
    }

    .wn-pdf-export input,
    .wn-pdf-export select {
      display:block;
      width:100%;
      min-width:0;
      min-height:46px;
      margin:0;
      padding:10px;
      border:1px solid #e1daef;
      border-radius:9px;
      background:#fff;
      color:#241442;
      font:inherit;
      font-size:16px;
    }

    .wn-pdf-details {
      display:grid;
      grid-template-columns:
        repeat(3,minmax(0,1fr));
      gap:12px;
      margin-bottom:16px;
      padding:14px;
      border:1px solid #eee9f7;
      border-radius:12px;
      background:#faf9fd;
    }

    .wn-pdf-detail-label {
      display:block;
      margin-bottom:6px;
      color:#706780;
      font-size:11px;
      font-weight:600;
    }

    .wn-pdf-detail-value {
      display:block;
      font-size:13px;
      font-weight:750;
      color:#241442;
      overflow-wrap:anywhere;
    }

    .wn-pdf-color {
      display:inline-block;
      width:14px;
      height:14px;
      margin-right:5px;
      border-radius:50%;
      vertical-align:middle;
      border:1px solid #ded7ee;
    }

    .wn-pdf-export .wn-pdf-button {
      display:block;
      width:100%;
      min-height:48px;
      margin:0;
      padding:13px 18px;
      border:0;
      border-radius:10px;
      background:linear-gradient(
        120deg,#5424ff,#7134e9
      );
      color:#fff;
      font:inherit;
      font-size:14px;
      font-weight:800;
      line-height:1.4;
      cursor:pointer;
      touch-action:manipulation;
    }

    .wn-pdf-export .wn-pdf-button:disabled {
      opacity:.55;
      cursor:not-allowed;
    }

    .wn-pdf-status {
      margin:12px 0 0;
      color:#08784c;
      font-size:13px;
      line-height:1.5;
    }

    .wn-pdf-status[data-type="error"] {
      color:#b42318;
    }

    .wn-pdf-notice {
      margin:12px 0 0;
      color:#706780;
      font-size:11px;
      line-height:1.6;
    }

    .wn-pdf-file-actions {
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:8px;
      margin-top:12px;
    }

    .wn-pdf-file-actions a,
    .wn-pdf-file-actions button {
      display:flex;
      align-items:center;
      justify-content:center;
      min-height:46px;
      padding:10px 12px;
      border:1px solid #e1d7ff;
      border-radius:10px;
      background:#f3efff;
      color:#5424ff;
      text-align:center;
      text-decoration:none;
      font:inherit;
      font-size:13px;
      font-weight:750;
      cursor:pointer;
    }

    .wn-pdf-file-actions
    [data-wn-pdf-share] {
      grid-column:1/-1;
      background:#5424ff;
      color:#fff;
      border-color:#5424ff;
    }

    .wn-pdf-export button:focus-visible,
    .wn-pdf-export a:focus-visible,
    .wn-pdf-export input:focus-visible,
    .wn-pdf-export select:focus-visible {
      outline:3px solid #5424ff;
      outline-offset:3px;
    }

    @media(max-width:600px) {
      .wn-pdf-export {
        padding:12px;
      }

      .wn-pdf-settings,
      .wn-pdf-details {
        grid-template-columns:1fr;
      }
    }

    @media print {
      .wn-pdf-export {
        display:none!important;
      }
    }
  `;

  function installStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement("style");

    style.id = STYLE_ID;
    style.textContent = CSS;

    document.head.appendChild(style);
  }

  /* STATUS */

  function setStatus(key = "") {
    statusKey = key;

    const status = root?.querySelector(
      "[data-wn-pdf-status]"
    );

    if (!status) return;

    status.textContent = key ? t(key) : "";
    status.hidden = !key;

    status.dataset.type = [
      "empty",
      "unavailable",
      "failed",
      "libraryError",
      "fontError",
      "changed",
      "shareFailed"
    ].includes(key)
      ? "error"
      : "info";
  }

  function setBusy(value) {
    exporting = Boolean(value);

    const button = root?.querySelector(
      "[data-wn-pdf-export]"
    );

    if (!button) return;

    button.disabled = exporting;

    button.textContent = exporting
      ? t("preparing")
      : t("export");

    button.setAttribute(
      "aria-busy",
      String(exporting)
    );
  }

  /* PDF DOCUMENT GENERATION */

  function createPDF(
    JsPDF,
    fonts,
    content,
    settings
  ) {
    const pdf = new JsPDF({
      orientation: "portrait",
      unit: "mm",
      format: settings.paperFormat,
      compress: true,
      putOnlyUsedFonts: true
    });

    registerFonts(pdf, fonts);

    const width = pdf.internal.pageSize
      .getWidth();

    const height = pdf.internal.pageSize
      .getHeight();

    const margin = 15;
    const bodyWidth = width - margin * 2;
    const bottom = height - 16;

    const template = settings.templateId;
    const accent = settings.accentColor;

    const isATS = template === "ats";
    const isClassic = template === "classic";
    const isExecutive = template === "executive";
    const isModern = template === "modern";
    const isCreative = template === "creative";

    const headingColor = isATS
      ? "#242424"
      : accent;

    let y = margin;

    pdf.setProperties({
      title: settings.filename,
      author: content.fullName || "",
      subject: content.professionalTitle || "",
      creator: "Worknely"
    });

    function setFont(
      size,
      weight = "normal",
      color = "#242424"
    ) {
      pdf.setFont(
        "WorknelySans",
        weight
      );

      pdf.setFontSize(size);
      pdf.setTextColor(color);
    }

    function drawPageDecoration() {
      if (isModern) {
        pdf.setFillColor(accent);

        pdf.rect(
          0, 0, width, 4, "F"
        );
      }

      if (isCreative) {
        pdf.setFillColor(accent);

        pdf.rect(
          0, 0, 4, height, "F"
        );
      }
    }

    function newPage() {
      pdf.addPage();
      drawPageDecoration();
      y = margin;
    }

    function ensureSpace(required) {
      if (y + required > bottom) {
        newPage();
      }
    }

    function writeText(value, options = {}) {
      const text = String(value || "")
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .replace(/\t/g, "    ")
        .trim();

      if (!text) return;

      const size = options.size || 10;

      const lineHeight =
        options.lineHeight || 4.8;

      const align = options.align || "left";
      const weight = options.weight || "normal";
      const color = options.color || "#242424";

      const left = options.left ?? margin;

      const availableWidth =
        options.width ?? bodyWidth;

      text.split("\n").forEach(paragraph => {
        if (!paragraph.trim()) {
          ensureSpace(2.5);
          y += 2.5;
          return;
        }

        setFont(size, weight, color);

        const lines = pdf.splitTextToSize(
          paragraph.trim(),
          availableWidth
        );

        lines.forEach(line => {
          ensureSpace(lineHeight);

          setFont(size, weight, color);

          const x = align === "center"
            ? left + availableWidth / 2
            : left;

          pdf.text(
            line,
            x,
            y,
            { align }
          );

          y += lineHeight;
        });
      });
    }

    function divider(color = "#d5d5d5") {
      pdf.setDrawColor(color);
      pdf.setLineWidth(0.3);

      pdf.line(
        margin,
        y,
        width - margin,
        y
      );
    }

    function section(key, value) {
      if (!String(value || "").trim()) {
        return;
      }

      ensureSpace(23);

      y += 4;

      writeText(
        t(key, settings.documentLanguage)
          .toLocaleUpperCase(
            settings.documentLanguage
          ),
        {
          size: 11,
          weight: "bold",
          color: headingColor,
          lineHeight: 5.5
        }
      );

      divider(
        isATS ? "#bcbcbc" : accent
      );

      y += 5;

      writeText(value, {
        size: 10,
        lineHeight: 4.8
      });

      y += 2;
    }

    drawPageDecoration();

    /* HEADER */

    const headerLeft = isExecutive
      ? margin + 5
      : margin;

    const headerWidth = width
      - headerLeft
      - margin;

    if (isExecutive) {
      pdf.setFillColor(accent);

      pdf.rect(
        margin,
        y - 4,
        2,
        18,
        "F"
      );

      y += 3;
    }

    writeText(
      content.fullName || settings.filename,
      {
        size: isClassic ? 23 : 25,
        weight: "bold",
        color: isATS
          ? "#171717"
          : accent,
        align: isClassic
          ? "center"
          : "left",
        lineHeight: 10,
        left: headerLeft,
        width: headerWidth
      }
    );

    if (content.professionalTitle) {
      writeText(
        content.professionalTitle,
        {
          size: 12,
          weight: "bold",
          color: "#343434",
          align: isClassic
            ? "center"
            : "left",
          lineHeight: 6,
          left: headerLeft,
          width: headerWidth
        }
      );
    }

    y += 2;

    if (content.contact) {
      writeText(content.contact, {
        size: 9,
        color: "#505050",
        align: isClassic
          ? "center"
          : "left",
        lineHeight: 4.5,
        left: headerLeft,
        width: headerWidth
      });
    }

    y += 3;

    divider(
      isATS ? "#777777" : accent
    );

    y += 4;

    section("summary", content.summary);
    section("experience", content.experience);
    section("education", content.education);
    section("skills", content.skills);

    return pdf;
  }

  /* PREPARED FILE MANAGEMENT */

  function clearPreparedFile() {
    documentRevision += 1;

    if (preparedURL) {
      URL.revokeObjectURL(preparedURL);
    }

    preparedURL = null;
    preparedFile = null;

    updateFileActions();
  }

  function updateFileActions() {
    if (!root) return;

    const actions = root.querySelector(
      "[data-wn-pdf-actions]"
    );

    if (!actions) return;

    actions.hidden = !preparedFile;

    const download = actions.querySelector(
      "[data-wn-pdf-download]"
    );

    const open = actions.querySelector(
      "[data-wn-pdf-open]"
    );

    const share = actions.querySelector(
      "[data-wn-pdf-share]"
    );

    if (!preparedFile || !preparedURL) {
      download?.removeAttribute("href");
      open?.removeAttribute("href");
      return;
    }

    if (download) {
      download.href = preparedURL;
      download.download = preparedFile.name;
    }

    if (open) {
      open.href = preparedURL;
    }

    if (share) {
      let canShare = false;

      try {
        canShare = Boolean(
          navigator.share &&
          navigator.canShare?.({
            files: [preparedFile]
          })
        );
      } catch {}

      share.hidden = !canShare;
    }
  }

  /* NATIVE iOS SHARING */

  async function sharePDF() {
    if (!preparedFile) return;

    try {
      if (
        !navigator.share ||
        !navigator.canShare?.({
          files: [preparedFile]
        })
      ) {
        setStatus("shareFailed");
        return;
      }

      await navigator.share({
        files: [preparedFile],
        title: preparedFile.name
      });

    } catch (error) {
      if (error?.name !== "AbortError") {
        setStatus("shareFailed");
      }
    }
  }

  /* EXPORT API */

  async function exportResume(options = {}) {
    if (exporting) {
      return {
        ok: false,
        reason: "busy"
      };
    }

    if (!engineAvailable()) {
      setStatus("unavailable");

      return {
        ok: false,
        reason: "unavailable"
      };
    }

    const engine = getEngine();
    const state = engine.getState();

    const content = options.content
      ? normalizeContent(options.content)
      : readResume();

    if (!hasContent(content)) {
      clearPreparedFile();
      setStatus("empty");

      return {
        ok: false,
        reason: "empty"
      };
    }

    const filenameInput = root?.querySelector(
      "[data-wn-pdf-filename]"
    );

    const selectedFormat =
      options.paperFormat || paperFormat;

    const requestedTemplate =
      options.templateId || state.templateId;

    const validTemplates = [
      "ats",
      "classic",
      "executive",
      "modern",
      "creative"
    ];

    const templateId = validTemplates.includes(
      requestedTemplate
    )
      ? requestedTemplate
      : "ats";

    const template = engine.getTemplate(
      templateId
    );

    const settings = {
      templateId,

      accentColor: normalizeColor(
        options.accentColor ||
        (
          templateId === state.templateId
            ? state.accentColor
            : template?.accent
        )
      ),

      documentLanguage: normalizeLanguage(
        options.documentLanguage ||
        getDocumentLanguage()
      ),

      paperFormat:
        Object.prototype.hasOwnProperty.call(
          FORMATS,
          selectedFormat
        )
          ? selectedFormat
          : "a4",

      filename: normalizeFilename(
        options.filename ||
        filenameInput?.value ||
        content.fullName ||
        t("defaultName")
      )
    };

    clearPreparedFile();

    const revision = documentRevision;

    lastError = null;

    setBusy(true);
    setStatus("");

    try {
      const [JsPDF, fonts] =
        await Promise.all([
          loadPDFLibrary(),
          loadFonts()
        ]);

      if (revision !== documentRevision) {
        throw createError("changed");
      }

      const pdf = createPDF(
        JsPDF,
        fonts,
        content,
        settings
      );

      const blob = pdf.output("blob");

      if (!blob || blob.size < 100) {
        throw createError("failed");
      }

      const signature = await blob
        .slice(0, 5)
        .text();

      if (signature !== "%PDF-") {
        throw createError("failed");
      }

      if (revision !== documentRevision) {
        throw createError("changed");
      }

      const filename =
        settings.filename + ".pdf";

      const file = new File(
        [blob],
        filename,
        {
          type: "application/pdf"
        }
      );

      if (options.returnFile === true) {
        return {
          ok: true,
          file,
          blob,
          filename,
          paperFormat: settings.paperFormat
        };
      }

      preparedFile = file;

      preparedURL = URL.createObjectURL(file);

      updateFileActions();
      setStatus("ready");

      document.dispatchEvent(
        new CustomEvent(
          "worknely:pdfprepared",
          {
            detail: {
              version: VERSION,
              templateId: settings.templateId,
              paperFormat: settings.paperFormat,
              documentLanguage:
                settings.documentLanguage
            }
          }
        )
      );

      return {
        ok: true,
        file,
        blob,
        filename,
        paperFormat: settings.paperFormat
      };

    } catch (error) {
      const code = [
        "libraryError",
        "fontError",
        "changed",
        "failed"
      ].includes(error?.worknelyCode)
        ? error.worknelyCode
        : "failed";

      lastError = code;

      console.warn(
        "Worknely PDF:",
        code,
        error?.name || "Error"
      );

      setStatus(code);

      return {
        ok: false,
        reason: code
      };

    } finally {
      setBusy(false);
    }
  }

  /* DESIGN SYNCHRONIZATION */

  function refresh() {
    if (!root || !engineAvailable()) {
      return false;
    }

    const engine = getEngine();
    const state = engine.getState();

    const template = engine.getTemplate(
      state.templateId
    );

    const templateName = root.querySelector(
      "[data-wn-pdf-template]"
    );

    const color = root.querySelector(
      "[data-wn-pdf-color]"
    );

    const colorValue = root.querySelector(
      "[data-wn-pdf-color-value]"
    );

    const language = root.querySelector(
      "[data-wn-pdf-language]"
    );

    const filename = root.querySelector(
      "[data-wn-pdf-filename]"
    );

    if (templateName) {
      templateName.textContent =
        template?.name || state.templateId;
    }

    if (color) {
      color.style.backgroundColor =
        normalizeColor(state.accentColor);
    }

    if (colorValue) {
      colorValue.textContent =
        normalizeColor(state.accentColor)
          .toUpperCase();
    }

    if (language) {
      language.textContent =
        languageNames[getDocumentLanguage()];
    }

    if (filename && !filename.value.trim()) {
      filename.placeholder = normalizeFilename(
        readResume().fullName ||
        t("defaultName")
      );
    }

    if (
      statusKey === "empty" &&
      hasContent(readResume())
    ) {
      setStatus("");
    }

    return true;
  }

  /* EXPORT INTERFACE */

  function renderInterface() {
    if (!root) return false;

    installStyles();

    renderedLanguage = getLanguage();

    const previousFilename = root.querySelector(
      "[data-wn-pdf-filename]"
    )?.value || "";

    root.setAttribute(
      "aria-label",
      t("title")
    );

    if (!engineAvailable()) {
      root.textContent = t("unavailable");
      return false;
    }

    root.innerHTML = `
      <span class="wn-pdf-overline">
        ${escapeHTML(t("overline"))}
      </span>

      <h2>${escapeHTML(t("title"))}</h2>

      <p class="wn-pdf-description">
        ${escapeHTML(t("description"))}
      </p>

      <div class="wn-pdf-settings">

        <div class="wn-pdf-field">
          <label for="wnPDFPaperFormat">
            ${escapeHTML(t("format"))}
          </label>

          <select
            id="wnPDFPaperFormat"
            data-wn-pdf-format
          >
            <option value="a4">
              A4 — 210 × 297 mm
            </option>

            <option value="letter">
              US Letter — 8.5 × 11 in
            </option>
          </select>
        </div>

        <div class="wn-pdf-field">
          <label for="wnPDFDocumentName">
            ${escapeHTML(t("filename"))}
          </label>

          <input
            type="text"
            id="wnPDFDocumentName"
            data-wn-pdf-filename
            maxlength="100"
            autocomplete="off"
          >
        </div>
      </div>

      <div class="wn-pdf-details">

        <div>
          <span class="wn-pdf-detail-label">
            ${escapeHTML(t("template"))}
          </span>

          <strong
            class="wn-pdf-detail-value"
            data-wn-pdf-template
          ></strong>
        </div>

        <div>
          <span class="wn-pdf-detail-label">
            ${escapeHTML(t("color"))}
          </span>

          <strong class="wn-pdf-detail-value">
            <span
              class="wn-pdf-color"
              data-wn-pdf-color
              aria-hidden="true"
            ></span>

            <span
              data-wn-pdf-color-value
            ></span>
          </strong>
        </div>

        <div>
          <span class="wn-pdf-detail-label">
            ${escapeHTML(t("language"))}
          </span>

          <strong
            class="wn-pdf-detail-value"
            data-wn-pdf-language
          ></strong>
        </div>
      </div>

      <button
        type="button"
        class="wn-pdf-button"
        data-wn-pdf-export
      >
        ${escapeHTML(t("export"))}
      </button>

      <p
        class="wn-pdf-status"
        data-wn-pdf-status
        role="status"
        aria-live="polite"
        hidden
      ></p>

      <div
        class="wn-pdf-file-actions"
        data-wn-pdf-actions
        hidden
      >

        <button
          type="button"
          data-wn-pdf-share
        >
          ${escapeHTML(t("share"))}
        </button>

        <a data-wn-pdf-download>
          ${escapeHTML(t("download"))}
        </a>

        <a
          data-wn-pdf-open
          target="_blank"
          rel="noopener noreferrer"
        >
          ${escapeHTML(t("open"))}
        </a>

      </div>

      <p class="wn-pdf-notice">
        ${escapeHTML(t("privacy"))}
      </p>

      <p class="wn-pdf-notice">
        ${escapeHTML(t("note"))}
      </p>
    `;

    root.querySelector(
      "[data-wn-pdf-format]"
    ).value = paperFormat;

    root.querySelector(
      "[data-wn-pdf-filename]"
    ).value = previousFilename;

    refresh();
    updateFileActions();
    setStatus(statusKey);
    setBusy(exporting);

    return true;
  }

  /* PAPER FORMAT */

  function setPaperFormat(format) {
    if (
      !Object.prototype.hasOwnProperty.call(
        FORMATS,
        format
      )
    ) {
      return false;
    }

    if (paperFormat !== format) {
      clearPreparedFile();
      setStatus("");
    }

    paperFormat = format;

    const select = root?.querySelector(
      "[data-wn-pdf-format]"
    );

    if (select) {
      select.value = format;
    }

    return true;
  }

  /* USER INTERACTIONS */

  function handleClick(event) {
    if (!(event.target instanceof Element)) {
      return;
    }

    const exportButton = event.target.closest(
      "[data-wn-pdf-export]"
    );

    const shareButton = event.target.closest(
      "[data-wn-pdf-share]"
    );

    if (
      exportButton &&
      root?.contains(exportButton)
    ) {
      event.preventDefault();
      exportResume();
    }

    if (
      shareButton &&
      root?.contains(shareButton)
    ) {
      event.preventDefault();
      sharePDF();
    }
  }

  function handleChange(event) {
    if (
      event.target.matches?.(
        "[data-wn-pdf-format]"
      )
    ) {
      setPaperFormat(event.target.value);
    }
  }

  function handleInput(event) {
    if (
      event.target.matches?.(
        "[data-wn-pdf-filename]"
      )
    ) {
      clearPreparedFile();
      setStatus("");
    }
  }

  /* MOUNTING */

  function mount(
    target = "#" + ROOT_ID,
    options = {}
  ) {
    let element;

    try {
      element = typeof target === "string"
        ? document.querySelector(target)
        : target;
    } catch {
      return false;
    }

    if (!element || element.nodeType !== 1) {
      return false;
    }

    if (root && root !== element) {
      unmount();
    }

    if (root !== element) {
      root = element;

      root.classList.add("wn-pdf-export");

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

      root.addEventListener(
        "input",
        handleInput
      );
    }

    if (
      typeof options.readContent === "function"
    ) {
      customReader = options.readContent;
    }

    const ready = renderInterface();

    if (ready) {
      document.dispatchEvent(
        new CustomEvent(
          "worknely:pdfexportready",
          {
            detail: {
              version: VERSION
            }
          }
        )
      );
    }

    return ready;
  }

  function unmount() {
    if (!root) return false;

    clearPreparedFile();

    root.removeEventListener(
      "click",
      handleClick
    );

    root.removeEventListener(
      "change",
      handleChange
    );

    root.removeEventListener(
      "input",
      handleInput
    );

    root.innerHTML = "";

    root.classList.remove(
      "wn-pdf-export"
    );

    root.removeAttribute("role");
    root.removeAttribute("aria-label");

    root = null;
    customReader = null;
    statusKey = "";

    return true;
  }

  /* SYNCHRONIZATION EVENTS */

  function refreshLanguage() {
    if (
      root &&
      renderedLanguage !== getLanguage()
    ) {
      renderInterface();
    }
  }

  function invalidateDocument() {
    clearPreparedFile();
    setStatus("");
    refresh();
  }

  document.addEventListener(
    "worknely:languagechange",
    refreshLanguage
  );

  document.addEventListener(
    "worknely:localizationready",
    refreshLanguage
  );

  [
    "worknely:templatechange",
    "worknely:resumechange",
    "worknely:designrestored",
    "worknely:designcontextcleared",
    "worknely:accountresumeloaded"
  ].forEach(eventName => {
    document.addEventListener(
      eventName,
      invalidateDocument
    );
  });

  document.addEventListener(
    "worknely:previewready",
    refresh
  );

  document.addEventListener(
    "input",
    event => {
      if (
        Object.values(FIELD_MAP)
          .includes(event.target?.id)
      ) {
        invalidateDocument();
      }
    }
  );

  document.addEventListener(
    "change",
    event => {
      if (
        event.target.matches?.(
          "[data-preview-language]"
        )
      ) {
        queueMicrotask(
          invalidateDocument
        );
      }
    }
  );

  /* AUTOMATIC MOUNT */

  function autoMount() {
    const element = document.getElementById(
      ROOT_ID
    );

    if (element && root !== element) {
      return mount(element);
    }

    return false;
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
    "pageshow",
    () => {
      refreshLanguage();
      refresh();
    }
  );

  /* PUBLIC API */

  window.WorknelyPDFExport = Object.freeze({
    version: VERSION,

    mount,
    unmount,
    refresh,
    exportResume,
    setPaperFormat,
    normalizeFilename,
    readResume,
    clearPreparedFile,

    formats: FORMATS,

    isMounted: () => Boolean(root),

    getState: () => ({
      version: VERSION,
      mounted: Boolean(root),
      paperFormat,
      exporting,
      documentLanguage: getDocumentLanguage(),
      fileReady: Boolean(preparedFile),
      lastError
    })
  });

  /* INITIALIZATION */

  function initialize() {
    autoMount();

    console.info(
      "Worknely V" +
      VERSION +
      " Professional PDF Export ready."
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      { once: true }
    );
  } else {
    initialize();
  }

})();

/*
 * END WORKNELY V7.16.12
 * PROFESSIONAL PDF STABILITY FIX
 */
