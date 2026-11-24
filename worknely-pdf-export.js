
/*
 * WORKNELY V7.16.5
 * Professional PDF Export Engine
 *
 * Professional Resume Export
 * Template and Accent Synchronization
 * A4 / US Letter Format
 * International Export Interface
 * Native Browser Printing
 * Mobile Safari / Chrome Support
 * Local Document Processing
 *
 * Requires:
 * worknely-templates.js V7.16.1
 * worknely-live-preview.js V7.16.3
 *
 * No external dependencies.
 */

(() => {

  "use strict";

  const VERSION = "7.16.5";

  const ROOT_ID = "wnProfessionalPDFExport";

  const STYLE_ID = "wn-professional-pdf-styles";

  const LANGUAGES = [
    "en", "ro", "it", "de", "fr", "es"
  ];

  const FORMATS = Object.freeze({

    a4: {

      name:"A4",

      size:"210 × 297 mm",

      css:"A4"

    },

    letter: {

      name:"US Letter",

      size:"216 × 279 mm",

      css:"letter"

    }

  });

  let root = null;

  let paperFormat = "a4";

  let renderedLanguage = null;

  let statusKey = "";

  let customReader = null;

  let exporting = false;

  /* INTERNATIONAL DICTIONARY */

  const translations = {

    en: {

      overline:"WORKNELY DESIGN STUDIO",

      title:"Professional PDF Export",

      description:"Export your personalized resume as a professional document.",

      format:"Paper format",

      template:"Selected template",

      color:"Accent color",

      language:"Document language",

      filename:"Document name",

      export:"Export professional PDF",

      preparing:"Preparing document...",

      ready:"Your print-ready document is open.",

      empty:"Complete your resume before exporting.",

      unavailable:"The PDF export engine is unavailable.",

      popup:"Unable to open the document. Please allow pop-ups and try again.",

      failed:"Unable to prepare the document. Please try again.",

      print:"Save / Print PDF",

      close:"Close",

      instructions:"Choose Save as PDF or use your device's print and sharing options.",

      mobile:"On iPhone, open the print preview and use the Share menu to save your document to Files.",

      privacy:"Your resume is processed locally by this export module.",

      note:"Final pagination and PDF options depend on your browser.",

      defaultName:"Professional Resume"

    },

    ro: {

      overline:"WORKNELY DESIGN STUDIO",

      title:"Export PDF profesional",

      description:"Exportă CV-ul personalizat sub forma unui document profesional.",

      format:"Formatul paginii",

      template:"Șablon selectat",

      color:"Culoare de accent",

      language:"Limba documentului",

      filename:"Denumirea documentului",

      export:"Exportă PDF profesional",

      preparing:"Se pregătește documentul...",

      ready:"Documentul pregătit pentru imprimare este deschis.",

      empty:"Completează CV-ul înainte de export.",

      unavailable:"Motorul de export PDF nu este disponibil.",

      popup:"Documentul nu poate fi deschis. Permite ferestrele pop-up și încearcă din nou.",

      failed:"Documentul nu poate fi pregătit. Încearcă din nou.",

      print:"Salvează / Imprimă PDF",

      close:"Închide",

      instructions:"Selectează salvarea ca PDF sau utilizează opțiunile de imprimare și partajare ale dispozitivului.",

      mobile:"Pe iPhone, deschide previzualizarea pentru imprimare și utilizează meniul Partajare pentru salvarea în Fișiere.",

      privacy:"CV-ul este procesat local de acest modul de export.",

      note:"Paginarea finală și opțiunile PDF depind de browser.",

      defaultName:"CV Profesional"

    },

    it: {

      overline:"WORKNELY DESIGN STUDIO",

      title:"Esportazione PDF professionale",

      description:"Esporta il tuo curriculum personalizzato come documento professionale.",

      format:"Formato della pagina",

      template:"Modello selezionato",

      color:"Colore di accento",

      language:"Lingua del documento",

      filename:"Nome del documento",

      export:"Esporta PDF professionale",

      preparing:"Preparazione del documento...",

      ready:"Il documento pronto per la stampa è aperto.",

      empty:"Completa il curriculum prima di esportarlo.",

      unavailable:"Il motore di esportazione PDF non è disponibile.",

      popup:"Impossibile aprire il documento. Consenti i pop-up e riprova.",

      failed:"Impossibile preparare il documento. Riprova.",

      print:"Salva / Stampa PDF",

      close:"Chiudi",

      instructions:"Seleziona Salva come PDF oppure utilizza le opzioni di stampa e condivisione.",

      mobile:"Su iPhone, apri l'anteprima di stampa e usa il menu Condividi per salvare il documento in File.",

      privacy:"Il curriculum viene elaborato localmente da questo modulo.",

      note:"L'impaginazione finale dipende dal browser.",

      defaultName:"Curriculum Professionale"

    },

    de: {

      overline:"WORKNELY DESIGN STUDIO",

      title:"Professioneller PDF-Export",

      description:"Exportiere deinen personalisierten Lebenslauf als professionelles Dokument.",

      format:"Papierformat",

      template:"Ausgewählte Vorlage",

      color:"Akzentfarbe",

      language:"Dokumentsprache",

      filename:"Dokumentname",

      export:"Professionelles PDF exportieren",

      preparing:"Dokument wird vorbereitet...",

      ready:"Das druckfertige Dokument ist geöffnet.",

      empty:"Vervollständige deinen Lebenslauf vor dem Export.",

      unavailable:"Die PDF-Exportfunktion ist nicht verfügbar.",

      popup:"Das Dokument konnte nicht geöffnet werden. Erlaube Pop-ups und versuche es erneut.",

      failed:"Das Dokument konnte nicht vorbereitet werden.",

      print:"PDF speichern / drucken",

      close:"Schließen",

      instructions:"Wähle Als PDF speichern oder nutze die Druck- und Freigabeoptionen.",

      mobile:"Öffne auf dem iPhone die Druckvorschau und speichere das Dokument über das Teilen-Menü in Dateien.",

      privacy:"Der Lebenslauf wird von diesem Modul lokal verarbeitet.",

      note:"Das endgültige Seitenlayout hängt vom Browser ab.",

      defaultName:"Professioneller Lebenslauf"

    },

    fr: {

      overline:"WORKNELY DESIGN STUDIO",

      title:"Export PDF professionnel",

      description:"Exportez votre CV personnalisé sous forme de document professionnel.",

      format:"Format du papier",

      template:"Modèle sélectionné",

      color:"Couleur d'accent",

      language:"Langue du document",

      filename:"Nom du document",

      export:"Exporter le PDF professionnel",

      preparing:"Préparation du document...",

      ready:"Le document prêt à imprimer est ouvert.",

      empty:"Complétez votre CV avant de l'exporter.",

      unavailable:"Le moteur d'export PDF est indisponible.",

      popup:"Impossible d'ouvrir le document. Autorisez les fenêtres contextuelles.",

      failed:"Impossible de préparer le document. Réessayez.",

      print:"Enregistrer / Imprimer PDF",

      close:"Fermer",

      instructions:"Choisissez Enregistrer en PDF ou utilisez les options d'impression et de partage.",

      mobile:"Sur iPhone, ouvrez l'aperçu avant impression et utilisez le menu Partager pour enregistrer le document dans Fichiers.",

      privacy:"Votre CV est traité localement par ce module.",

      note:"La pagination finale dépend du navigateur.",

      defaultName:"CV Professionnel"

    },

    es: {

      overline:"WORKNELY DESIGN STUDIO",

      title:"Exportación PDF profesional",

      description:"Exporta tu currículum personalizado como documento profesional.",

      format:"Formato del papel",

      template:"Plantilla seleccionada",

      color:"Color de acento",

      language:"Idioma del documento",

      filename:"Nombre del documento",

      export:"Exportar PDF profesional",

      preparing:"Preparando documento...",

      ready:"El documento listo para imprimir está abierto.",

      empty:"Completa tu currículum antes de exportarlo.",

      unavailable:"El motor de exportación PDF no está disponible.",

      popup:"No se pudo abrir el documento. Permite las ventanas emergentes.",

      failed:"No se pudo preparar el documento. Inténtalo de nuevo.",

      print:"Guardar / Imprimir PDF",

      close:"Cerrar",

      instructions:"Selecciona Guardar como PDF o utiliza las opciones de impresión y uso compartido.",

      mobile:"En iPhone, abre la vista previa de impresión y utiliza el menú Compartir para guardar el documento en Archivos.",

      privacy:"Tu currículum se procesa localmente en este módulo.",

      note:"La paginación final depende del navegador.",

      defaultName:"Currículum Profesional"

    }

  };

  const languageNames = {

    en:"English",

    ro:"Română",

    it:"Italiano",

    de:"Deutsch",

    fr:"Français",

    es:"Español"

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

    } catch {}

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

  /* SAFE TEXT PROCESSING */

  function escapeHTML(value) {

    return String(value ?? "")

      .replace(/&/g,"&amp;")

      .replace(/</g,"&lt;")

      .replace(/>/g,"&gt;")

      .replace(/"/g,"&quot;")

      .replace(/'/g,"&#39;");

  }

  function normalizeFilename(value) {

    const name = String(value || "")

      .replace(/[<>:"/\\|?*\u0000-\u001f]/g," ")

      .replace(/\.pdf$/i,"")

      .replace(/\s+/g," ")

      .trim()

      .slice(0,100);

    return name || t("defaultName");

  }

  function normalizeColor(value) {

    const color = String(value || "")
      .toLowerCase();

    return /^#[0-9a-f]{6}$/.test(color)

      ? color

      : "#242424";

  }

  /* ENGINE ACCESS */

  function getEngine() {

    return window.WorknelyTemplates || null;

  }

  function getPreview() {

    return window.WorknelyLivePreview || null;

  }

  function engineAvailable() {

    const engine = getEngine();

    return Boolean(

      engine &&

      typeof engine.renderInto === "function" &&

      typeof engine.getState === "function" &&

      typeof engine.getTemplate === "function" &&

      typeof engine.normalizeContent === "function"

    );

  }

  /* RESUME DATA */

  function readResume() {

    if (!engineAvailable()) return {};

    let content = {};

    try {

      if (typeof customReader === "function") {

        content = customReader();

      } else {

        content = getPreview()?.readResume?.() || {};

      }

      return getEngine().normalizeContent(content);

    } catch {

      return {};

    }

  }

  function hasContent(content) {

    return [

      "fullName",

      "professionalTitle",

      "contact",

      "summary",

      "experience",

      "education",

      "skills"

    ].some(key =>

      typeof content[key] === "string" &&

      content[key].trim().length > 0

    );

  }

  function getDocumentLanguage() {

    return normalizeLanguage(

      getPreview()?.getDocumentLanguage?.() ||

      getLanguage()

    );

  }

  /* EXPORT INTERFACE STYLES */

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
      background:#ffffff;
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
      margin:0 0 7px;
      color:#5424ff;
      font-size:10px;
      font-weight:800;
      letter-spacing:1.4px;
    }

    .wn-pdf-export h2 {
      margin:0 0 8px;
      color:#241442;
      font-size:clamp(22px,4vw,30px);
      font-weight:800;
      line-height:1.2;
      letter-spacing:-.6px;
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
      margin:0 0 16px;
    }

    .wn-pdf-field {
      min-width:0;
    }

    .wn-pdf-field label {
      display:block;
      margin:0 0 6px;
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
      background:#ffffff;
      color:#241442;
      font:inherit;
      font-size:16px;
    }

    .wn-pdf-details {
      display:grid;
      grid-template-columns:
        repeat(3,minmax(0,1fr));
      gap:10px;
      margin:0 0 16px;
      padding:14px;
      border:1px solid #eee9f7;
      border-radius:12px;
      background:#faf9fd;
    }

    .wn-pdf-detail-label {
      display:block;
      margin:0 0 6px;
      color:#706780;
      font-size:10px;
      font-weight:600;
    }

    .wn-pdf-detail-value {
      display:block;
      color:#241442;
      font-size:12px;
      font-weight:750;
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
      color:#ffffff;
      font:inherit;
      font-size:14px;
      font-weight:800;
      line-height:1.4;
      cursor:pointer;
      touch-action:manipulation;
    }

    .wn-pdf-button:disabled {
      opacity:.5;
      cursor:not-allowed;
    }

    .wn-pdf-status {
      margin:12px 0 0;
      color:#625b71;
      font-size:12px;
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

    .wn-pdf-export button:focus-visible,
    .wn-pdf-export input:focus-visible,
    .wn-pdf-export select:focus-visible {
      outline:3px solid #5424ff;
      outline-offset:3px;
    }

    @media(max-width:600px) {

      .wn-pdf-export {
        padding:12px;
      }

      .wn-pdf-settings {
        grid-template-columns:1fr;
      }

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

  /* EXPORT STATUS */

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

      "popup",

      "failed"

    ].includes(key) ? "error" : "info";

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

  /* DOCUMENT STYLES */

  function getPrintCSS(format) {

    const selected = FORMATS[format] || FORMATS.a4;

    const width = format === "letter"

      ? "215.9mm"

      : "210mm";

    return `

      @page {

        size:${selected.css};

        margin:14mm;

      }

      html,body {

        margin:0;

        padding:0;

        background:#efedf4;

        color:#222222;

        font-family:Arial,Helvetica,sans-serif;

      }

      *,*::before,*::after {

        box-sizing:border-box;

      }

      .wn-print-toolbar {

        position:sticky;

        top:0;

        z-index:10;

        padding:16px;

        background:#ffffff;

        border-bottom:1px solid #e9e3f5;

      }

      .wn-print-toolbar h1 {

        margin:0 0 8px;

        color:#5424ff;

        font-size:20px;

      }

      .wn-print-toolbar p {

        margin:0 0 12px;

        color:#625b71;

        font-size:13px;

        line-height:1.5;

      }

      .wn-print-actions {

        display:flex;

        flex-wrap:wrap;

        gap:8px;

      }

      .wn-print-actions button {

        min-height:44px;

        padding:12px 18px;

        border:0;

        border-radius:9px;

        background:#5424ff;

        color:#ffffff;

        font-size:14px;

        font-weight:700;

        cursor:pointer;

      }

      .wn-print-actions .wn-print-close {

        background:#f1edf9;

        color:#5424ff;

      }

      .wn-print-page {

        width:${width};

        max-width:100%;

        margin:20px auto;

        padding:14mm;

        background:#ffffff;

        box-shadow:0 4px 24px rgba(0,0,0,.08);

      }

      .wn-print-page .wn-tpl-resume {

        width:100%!important;

        max-width:none!important;

        min-height:0!important;

        height:auto!important;

        margin:0!important;

        padding:0!important;

        box-shadow:none!important;

        overflow:visible!important;

        transform:none!important;

        overflow-wrap:anywhere;

      }

      .wn-print-page h1,

      .wn-print-page h2,

      .wn-print-page h3 {

        break-after:avoid;

        page-break-after:avoid;

      }

      .wn-print-page p,

      .wn-print-page li {

        orphans:3;

        widows:3;

      }

      @media(max-width:600px) {

        .wn-print-page {

          margin:8px auto;

          padding:18px;

        }

      }

      @media print {

        html,body {

          background:#ffffff!important;

          width:auto!important;

          height:auto!important;

          overflow:visible!important;

          -webkit-print-color-adjust:exact;

          print-color-adjust:exact;

        }

        .wn-print-toolbar {

          display:none!important;

        }

        .wn-print-page {

          width:auto!important;

          max-width:none!important;

          margin:0!important;

          padding:0!important;

          box-shadow:none!important;

          overflow:visible!important;

        }

        .wn-print-page .wn-tpl-resume {

          border:0!important;

          border-radius:0!important;

          min-height:0!important;

          height:auto!important;

          overflow:visible!important;

        }

        .wn-print-page .wn-tpl-columns {

          display:grid;

          grid-template-columns:

            minmax(0,1.8fr)

            minmax(0,1fr);

        }

      }

    `;

  }

  /* RENDER RESUME INTO A TEMPORARY ELEMENT */

  function prepareResume(content, options) {

    const engine = getEngine();

    const target = document.createElement("div");

    engine.renderInto(

      target,

      content,

      {

        templateId:options.templateId,

        accentColor:options.accentColor,

        documentLanguage:options.documentLanguage

      }

    );

    if (!target.children.length) {

      throw new Error("Empty document");

    }

    return target;

  }

  /* COPY TRUSTED TEMPLATE STYLES */

  function copyTemplateStyles(targetDocument) {

    const styles = document.querySelectorAll(
      "style"
    );

    styles.forEach(sourceStyle => {

      const css = sourceStyle.textContent || "";

      const id = sourceStyle.id || "";

      const isTemplateStyle =

        /wn-tpl-/.test(css) &&

        !/preview|gallery|color-customization|pdf-export/.test(id);

      if (!isTemplateStyle) return;

      const style = targetDocument.createElement(
        "style"
      );

      style.textContent = css;

      targetDocument.head.appendChild(style);

    });

  }

  /* DOCUMENT WINDOW */

  function buildPrintWindow(

    printWindow,

    content,

    options

  ) {

    const prepared = prepareResume(

      content,

      options

    );

    const doc = printWindow.document;

    doc.open();

    doc.write(`

      <!DOCTYPE html>

      <html lang="${options.documentLanguage}">

        <head>

          <meta charset="UTF-8">

          <meta

            name="viewport"

            content="width=device-width,initial-scale=1"

          >

          <meta

            name="robots"

            content="noindex,nofollow"

          >

          <title>

            ${escapeHTML(options.filename)}

          </title>

        </head>

        <body>

          <header

            class="wn-print-toolbar"

            lang="${getLanguage()}"

          >

            <h1>Worknely</h1>

            <p>

              ${escapeHTML(t("instructions"))}

            </p>

            <p>

              ${escapeHTML(t("mobile"))}

            </p>

            <div class="wn-print-actions">

              <button

                type="button"

                id="wnPrintDocument"

              >

                ${escapeHTML(t("print"))}

              </button>

              <button

                type="button"

                id="wnCloseDocument"

                class="wn-print-close"

              >

                ${escapeHTML(t("close"))}

              </button>

            </div>

          </header>

          <main

            class="wn-print-page"

            id="wnPrintPage"

          ></main>

        </body>

      </html>

    `);

    doc.close();

    copyTemplateStyles(doc);

    const style = doc.createElement("style");

    style.textContent = getPrintCSS(

      options.paperFormat

    );

    doc.head.appendChild(style);

    const page = doc.getElementById(

      "wnPrintPage"

    );

    Array.from(prepared.childNodes)

      .forEach(node => {

        page.appendChild(

          doc.importNode(node,true)

        );

      });

    doc.getElementById(

      "wnPrintDocument"

    ).addEventListener("click",() => {

      printWindow.focus();

      printWindow.print();

    });

    doc.getElementById(

      "wnCloseDocument"

    ).addEventListener("click",() => {

      printWindow.close();

    });

    try {

      printWindow.opener = null;

    } catch {}

    return true;

  }

  /* PROFESSIONAL EXPORT */

  function exportResume(options = {}) {

    if (exporting) {

      return {ok:false,reason:"busy"};

    }

    if (!engineAvailable()) {

      setStatus("unavailable");

      return {

        ok:false,

        reason:"unavailable"

      };

    }

    const engine = getEngine();

    const state = engine.getState();

    const content = options.content

      ? engine.normalizeContent(options.content)

      : readResume();

    if (!hasContent(content)) {

      setStatus("empty");

      return {

        ok:false,

        reason:"empty"

      };

    }

    const filenameInput = root?.querySelector(

      "[data-wn-pdf-filename]"

    );

    const selectedFormat =

      options.paperFormat || paperFormat;

    const settings = {

      templateId:

        state.templateId,

      accentColor:

        normalizeColor(state.accentColor),

      documentLanguage:

        normalizeLanguage(

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

      filename:

        normalizeFilename(

          options.filename ||

          filenameInput?.value ||

          content.fullName ||

          t("defaultName")

        )

    };

    setBusy(true);

    setStatus("");

    /*
     * Open synchronously during the user's
     * click to reduce mobile popup blocking.
     */

    let printWindow = null;

    try {

      printWindow = window.open(

        "",

        "_blank"

      );

      if (!printWindow) {

        setStatus("popup");

        return {

          ok:false,

          reason:"popup"

        };

      }

      buildPrintWindow(

        printWindow,

        content,

        settings

      );

      setStatus("ready");

      document.dispatchEvent(

        new CustomEvent(

          "worknely:pdfprepared",

          {

            detail:{

              version:VERSION,

              templateId:settings.templateId,

              paperFormat:settings.paperFormat,

              documentLanguage:

                settings.documentLanguage

            }

          }

        )

      );

      return {

        ok:true,

        paperFormat:settings.paperFormat

      };

    } catch {

      try {

        printWindow?.close();

      } catch {}

      setStatus("failed");

      return {

        ok:false,

        reason:"failed"

      };

    } finally {

      setBusy(false);

    }

  }

  /* UPDATE DESIGN INFORMATION */

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

      const content = readResume();

      filename.placeholder = normalizeFilename(

        content.fullName || t("defaultName")

      );

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

      <h2>

        ${escapeHTML(t("title"))}

      </h2>

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

            <span data-wn-pdf-color-value></span>

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

    const button = event.target.closest(

      "[data-wn-pdf-export]"

    );

    if (button && root.contains(button)) {

      exportResume();

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

  /* MOUNTING API */

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

      root.setAttribute("role","region");

      root.addEventListener(

        "click",

        handleClick

      );

      root.addEventListener(

        "change",

        handleChange

      );

    }

    if (typeof options.readContent === "function") {

      customReader = options.readContent;

    }

    const ready = renderInterface();

    if (ready) {

      document.dispatchEvent(

        new CustomEvent(

          "worknely:pdfexportready",

          {

            detail:{

              version:VERSION

            }

          }

        )

      );

    }

    return ready;

  }

  /* CLEANUP */

  function unmount() {

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

    root.classList.remove("wn-pdf-export");

    root.removeAttribute("role");

    root.removeAttribute("aria-label");

    root = null;

    customReader = null;

    statusKey = "";

    return true;

  }

  /* INTERNATIONAL SYNCHRONIZATION */

  function refreshLanguage() {

    if (

      root &&

      renderedLanguage !== getLanguage()

    ) {

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

  document.addEventListener(

    "worknely:templatechange",

    refresh

  );

  document.addEventListener(

    "worknely:resumechange",

    refresh

  );

  document.addEventListener(

    "worknely:previewready",

    refresh

  );

  document.addEventListener(

    "change",

    event => {

      if (

        event.target.matches?.(

          "[data-preview-language]"

        )

      ) {

        queueMicrotask(refresh);

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

  /* PUBLIC PDF EXPORT API */

  window.WorknelyPDFExport = Object.freeze({

    version:VERSION,

    mount,

    unmount,

    refresh,

    exportResume,

    setPaperFormat,

    normalizeFilename,

    formats:FORMATS,

    getState:() => ({

      version:VERSION,

      mounted:Boolean(root),

      paperFormat,

      exporting,

      documentLanguage:getDocumentLanguage()

    })

  });

  /* INITIALIZATION */

  function initialize() {

    autoMount();

    console.info(

      "Worknely V" + VERSION +

      " Professional PDF Export Engine ready."

    );

  }

  if (document.readyState === "loading") {

    document.addEventListener(

      "DOMContentLoaded",

      initialize,

      {once:true}

    );

  } else {

    initialize();

  }

})();

/*
 * END WORKNELY V7.16.5
 * PROFESSIONAL PDF EXPORT ENGINE
 */
