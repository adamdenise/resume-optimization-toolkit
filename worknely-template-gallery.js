
/*
 * WORKNELY V7.16.2
 * Interactive Professional Template Gallery
 *
 * Original Worknely Resume Collection
 * Dynamic Template Thumbnails
 * Six Language Localization
 * Responsive Mobile First Interface
 * Accessible Template Selection
 * Global Template State Synchronization
 * Future Membership Integration
 *
 * Requires:
 * worknely-templates.js V7.16.1
 *
 * No external dependencies.
 * No active payment restrictions.
 */

(() => {

  "use strict";

  const VERSION = "7.16.2";

  const ROOT_ID =
    "wnTemplateGallery";

  const STYLE_ID =
    "wn-template-gallery-styles";

  const LANGUAGES = [
    "en", "ro", "it", "de", "fr", "es"
  ];

  const TEMPLATE_ORDER = [
    "ats",
    "classic",
    "executive",
    "modern",
    "creative"
  ];

  let mountedRoot = null;

  let initialized = false;

  let renderedLanguage = null;

  let engine = null;

  /* INTERNATIONAL GALLERY DICTIONARY */

  const translations = {

    en: {

      overline: "WORKNELY DESIGN STUDIO",

      title: "Find your professional style.",

      description:
        "Choose a professional resume template that matches your career ambitions.",

      collection:
        "Professional Template Collection",

      all: "All Templates",

      free: "Free",

      pro: "Pro",

      premium: "Premium",

      selected: "Selected",

      select: "Use Template",

      active: "Your selected template",

      available: "Preview access",

      preview: "Template preview",

      previewNotice:
        "All templates are available during the Worknely development preview.",

      count: "{count} templates",

      empty: "No templates available.",

      ats: "Single-column layout",

      classic: "Timeless professional design",

      executive: "Leadership-focused design",

      modern: "Contemporary two-column layout",

      creative: "Distinctive creative layout",

      selectedStatus:
        "{name} template selected.",

      engineError:
        "The template engine is currently unavailable.",

      retry: "Try again",

      galleryLabel:
        "Professional resume template gallery"

    },

    ro: {

      overline: "WORKNELY DESIGN STUDIO",

      title: "Descoperă stilul tău profesional.",

      description:
        "Alege un șablon profesional de CV potrivit ambițiilor tale.",

      collection:
        "Colecția de șabloane profesionale",

      all: "Toate șabloanele",

      free: "Gratuit",

      pro: "Pro",

      premium: "Premium",

      selected: "Selectat",

      select: "Utilizează șablonul",

      active: "Șablonul tău selectat",

      available: "Acces demonstrativ",

      preview: "Previzualizare șablon",

      previewNotice:
        "Toate șabloanele sunt disponibile în perioada de dezvoltare Worknely.",

      count: "{count} șabloane",

      empty: "Nu există șabloane disponibile.",

      ats: "Structură pe o singură coloană",

      classic: "Design profesional atemporal",

      executive: "Design orientat spre leadership",

      modern: "Design contemporan pe două coloane",

      creative: "Design creativ distinctiv",

      selectedStatus:
        "Șablonul {name} a fost selectat.",

      engineError:
        "Motorul de șabloane nu este disponibil momentan.",

      retry: "Încearcă din nou",

      galleryLabel:
        "Galerie de șabloane profesionale de CV"

    },

    it: {

      overline: "WORKNELY DESIGN STUDIO",

      title: "Trova il tuo stile professionale.",

      description:
        "Scegli un modello di curriculum professionale adatto alle tue ambizioni.",

      collection:
        "Collezione di modelli professionali",

      all: "Tutti i modelli",

      free: "Gratuito",

      pro: "Pro",

      premium: "Premium",

      selected: "Selezionato",

      select: "Usa modello",

      active: "Il modello selezionato",

      available: "Accesso in anteprima",

      preview: "Anteprima del modello",

      previewNotice:
        "Tutti i modelli sono disponibili durante la fase di sviluppo di Worknely.",

      count: "{count} modelli",

      empty: "Nessun modello disponibile.",

      ats: "Struttura a colonna singola",

      classic: "Design professionale senza tempo",

      executive: "Design orientato alla leadership",

      modern: "Design contemporaneo a due colonne",

      creative: "Design creativo distintivo",

      selectedStatus:
        "Modello {name} selezionato.",

      engineError:
        "Il motore dei modelli non è attualmente disponibile.",

      retry: "Riprova",

      galleryLabel:
        "Galleria di modelli professionali di curriculum"

    },

    de: {

      overline: "WORKNELY DESIGN STUDIO",

      title: "Finde deinen professionellen Stil.",

      description:
        "Wähle eine professionelle Lebenslaufvorlage, die zu deinen Karrierezielen passt.",

      collection:
        "Professionelle Vorlagensammlung",

      all: "Alle Vorlagen",

      free: "Kostenlos",

      pro: "Pro",

      premium: "Premium",

      selected: "Ausgewählt",

      select: "Vorlage verwenden",

      active: "Deine ausgewählte Vorlage",

      available: "Vorschauzugang",

      preview: "Vorlagenvorschau",

      previewNotice:
        "Alle Vorlagen sind während der Entwicklungsphase von Worknely verfügbar.",

      count: "{count} Vorlagen",

      empty: "Keine Vorlagen verfügbar.",

      ats: "Einspaltiges Layout",

      classic: "Zeitloses professionelles Design",

      executive: "Design für Führungskräfte",

      modern: "Modernes zweispaltiges Layout",

      creative: "Individuelles kreatives Layout",

      selectedStatus:
        "Vorlage {name} ausgewählt.",

      engineError:
        "Die Vorlagen-Engine ist derzeit nicht verfügbar.",

      retry: "Erneut versuchen",

      galleryLabel:
        "Galerie professioneller Lebenslaufvorlagen"

    },

    fr: {

      overline: "WORKNELY DESIGN STUDIO",

      title: "Trouvez votre style professionnel.",

      description:
        "Choisissez un modèle de CV professionnel adapté à vos ambitions.",

      collection:
        "Collection de modèles professionnels",

      all: "Tous les modèles",

      free: "Gratuit",

      pro: "Pro",

      premium: "Premium",

      selected: "Sélectionné",

      select: "Utiliser le modèle",

      active: "Votre modèle sélectionné",

      available: "Accès en aperçu",

      preview: "Aperçu du modèle",

      previewNotice:
        "Tous les modèles sont disponibles pendant la phase de développement de Worknely.",

      count: "{count} modèles",

      empty: "Aucun modèle disponible.",

      ats: "Structure à une colonne",

      classic: "Design professionnel intemporel",

      executive: "Design destiné aux cadres",

      modern: "Design contemporain à deux colonnes",

      creative: "Design créatif distinctif",

      selectedStatus:
        "Modèle {name} sélectionné.",

      engineError:
        "Le moteur de modèles est actuellement indisponible.",

      retry: "Réessayer",

      galleryLabel:
        "Galerie de modèles professionnels de CV"

    },

    es: {

      overline: "WORKNELY DESIGN STUDIO",

      title: "Encuentra tu estilo profesional.",

      description:
        "Elige una plantilla de currículum profesional que se adapte a tus ambiciones.",

      collection:
        "Colección de plantillas profesionales",

      all: "Todas las plantillas",

      free: "Gratis",

      pro: "Pro",

      premium: "Premium",

      selected: "Seleccionado",

      select: "Usar plantilla",

      active: "Tu plantilla seleccionada",

      available: "Acceso de vista previa",

      preview: "Vista previa de la plantilla",

      previewNotice:
        "Todas las plantillas están disponibles durante la fase de desarrollo de Worknely.",

      count: "{count} plantillas",

      empty: "No hay plantillas disponibles.",

      ats: "Diseño de una sola columna",

      classic: "Diseño profesional atemporal",

      executive: "Diseño orientado al liderazgo",

      modern: "Diseño contemporáneo de dos columnas",

      creative: "Diseño creativo distintivo",

      selectedStatus:
        "Plantilla {name} seleccionada.",

      engineError:
        "El motor de plantillas no está disponible actualmente.",

      retry: "Intentar de nuevo",

      galleryLabel:
        "Galería de plantillas profesionales de currículum"

    }

  };

  /* GALLERY STATE */

  let currentFilter = "all";

  const FILTERS = [
    "all",
    "free",
    "pro",
    "premium"
  ];

  /* LANGUAGE UTILITIES */

  function getLanguage() {

    let storedLanguage = null;

    try {

      storedLanguage =
        localStorage.getItem(
          "worknely.language"
        );

    } catch {

      // Storage may be unavailable.

    }

    const value =

      window.WorknelyLocalization
        ?.getLanguage?.() ||

      storedLanguage ||

      document.documentElement.lang ||

      "en";

    const language = String(value)
      .toLowerCase()
      .split("-")[0];

    return LANGUAGES.includes(language)
      ? language
      : "en";

  }

  function t(key, variables = {}) {

    const language = getLanguage();

    let value =

      translations[language]?.[key] ||

      translations.en[key] ||

      key;

    Object.entries(variables)
      .forEach(([name, replacement]) => {

        value = value
          .split("{" + name + "}")
          .join(String(replacement));

      });

    return value;

  }

  /* SAFE HTML UTILITIES */

  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  }

  function validFilter(filter) {

    return FILTERS.includes(filter);

  }

  function getEngine() {

    return window.WorknelyTemplates || null;

  }

  function engineAvailable() {

    const candidate = getEngine();

    return Boolean(

      candidate &&

      typeof candidate.getTemplates === "function" &&

      typeof candidate.getState === "function" &&

      typeof candidate.selectTemplate === "function" &&

      typeof candidate.renderResume === "function" &&

      typeof candidate.installStyles === "function" &&

      typeof candidate.getSampleResume === "function"

    );

  }

  /* GALLERY DESIGN SYSTEM */

  const GALLERY_CSS = `

    .wn-template-gallery {

      --wn-gallery-purple:#5424ff;
      --wn-gallery-pink:#ec22ad;
      --wn-gallery-ink:#241442;
      --wn-gallery-muted:#706780;
      --wn-gallery-border:#e9e3f5;

      width:100%;
      min-width:0;
      margin:20px 0;
      padding:16px;

      background:#ffffff;

      border:1px solid
        var(--wn-gallery-border);

      border-radius:16px;

      color:var(--wn-gallery-ink);

      font-family:Inter,-apple-system,
        BlinkMacSystemFont,"Segoe UI",
        sans-serif;

      box-shadow:
        0 8px 28px rgba(40,20,90,.045);

    }

    .wn-template-gallery,
    .wn-template-gallery * {

      box-sizing:border-box;

    }

    .wn-template-gallery [hidden] {

      display:none!important;

    }

    /* GALLERY HERO */

    .wn-gallery-hero {

      display:block;

      margin:0 0 18px;

      padding:20px;

      border:0;

      border-radius:13px;

      background:linear-gradient(
        120deg,
        #5424ff,
        #7134e9 65%,
        #b52fcb
      );

      color:#ffffff;

      box-shadow:none;

    }

    .wn-gallery-overline {

      display:block;

      margin:0 0 7px;

      color:#e9e1ff;

      font-size:10px;

      font-weight:800;

      letter-spacing:1.4px;

      line-height:1.4;

    }

    .wn-template-gallery
    .wn-gallery-hero h2 {

      margin:0 0 7px;

      padding:0;

      color:#ffffff;

      font-size:clamp(
        23px,
        4vw,
        34px
      );

      font-weight:800;

      line-height:1.15;

      letter-spacing:-.8px;

    }

    .wn-template-gallery
    .wn-gallery-hero p {

      max-width:620px;

      margin:0;

      color:#f3edff;

      font-size:13px;

      line-height:1.55;

    }

    /* GALLERY TOOLBAR */

    .wn-gallery-toolbar {

      display:flex;

      justify-content:space-between;

      align-items:center;

      flex-wrap:wrap;

      gap:10px;

      margin:0 0 12px;

    }

    .wn-gallery-heading {

      margin:0;

      font-size:16px;

      font-weight:800;

      line-height:1.35;

      color:var(--wn-gallery-ink);

    }

    .wn-gallery-count {

      color:var(--wn-gallery-muted);

      font-size:11px;

      font-weight:600;

    }

    /* MEMBERSHIP FILTERS */

    .wn-gallery-filters {

      display:flex;

      align-items:center;

      flex-wrap:wrap;

      gap:6px;

      margin:0 0 16px;

    }

    .wn-template-gallery
    .wn-gallery-filter {

      display:inline-flex;

      align-items:center;

      justify-content:center;

      width:auto;

      min-height:36px;

      margin:0;

      padding:7px 12px;

      border:1px solid
        var(--wn-gallery-border);

      border-radius:100px;

      background:#ffffff;

      color:var(--wn-gallery-muted);

      font:inherit;

      font-size:11px;

      font-weight:700;

      line-height:1.3;

      cursor:pointer;

      box-shadow:none;

    }

    .wn-template-gallery
    .wn-gallery-filter[aria-pressed="true"] {

      border-color:
        var(--wn-gallery-purple);

      background:
        var(--wn-gallery-purple);

      color:#ffffff;

    }

    /* TEMPLATE GRID */

    .wn-gallery-grid {

      display:grid;

      grid-template-columns:
        repeat(3,minmax(0,1fr));

      align-items:stretch;

      gap:12px;

    }

    /* TEMPLATE CARD */

    .wn-gallery-card {

      position:relative;

      display:flex;

      flex-direction:column;

      min-width:0;

      margin:0;

      padding:10px;

      border:1px solid
        var(--wn-gallery-border);

      border-radius:12px;

      background:#ffffff;

      box-shadow:none;

    }

    .wn-gallery-card[data-selected="true"] {

      border-color:
        var(--wn-gallery-purple);

      box-shadow:
        inset 0 0 0 1px
        var(--wn-gallery-purple);

    }

    /* GENERATED TEMPLATE THUMBNAIL */

    .wn-gallery-thumbnail {

      position:relative;

      width:100%;

      aspect-ratio:210 / 265;

      overflow:hidden;

      border:1px solid #e7e3ed;

      border-radius:8px;

      background:#efedf4;

      pointer-events:none;

      user-select:none;

    }

    .wn-gallery-paper {

      position:absolute;

      top:50%;

      left:50%;

      width:794px;

      height:1123px;

      overflow:hidden;

      background:#ffffff;

      transform:
        translate(-50%,-50%)
        scale(.18);

      transform-origin:center;

      box-shadow:
        0 12px 40px
        rgba(25,15,50,.12);

    }

    .wn-gallery-paper
    .wn-tpl-resume {

      width:794px!important;

      max-width:none!important;

      min-height:1123px;

      margin:0!important;

      padding:55px!important;

      font-size:14px!important;

      line-height:1.45!important;

    }

    .wn-gallery-paper
    .wn-tpl-resume h1 {

      font-size:34px!important;

    }

    .wn-gallery-paper
    .wn-tpl-resume h2 {

      font-size:16px!important;

    }

    .wn-gallery-paper
    .wn-tpl-columns {

      grid-template-columns:
        minmax(0,1.8fr)
        minmax(0,1fr)!important;

      gap:20px!important;

    }

    .wn-gallery-paper
    .wn-tpl-resume
    .wn-tpl-content {

      font-size:14px!important;

    }

    /* TEMPLATE CARD CONTENT */

    .wn-gallery-card-top {

      display:flex;

      justify-content:space-between;

      align-items:flex-start;

      flex-wrap:wrap;

      gap:6px;

      margin:10px 0 5px;

    }

    .wn-gallery-card-name {

      min-width:0;

      margin:0;

      padding:0;

      font-size:14px;

      font-weight:800;

      line-height:1.35;

      color:var(--wn-gallery-ink);

      overflow-wrap:anywhere;

    }

    .wn-gallery-tier {

      display:inline-flex;

      align-items:center;

      padding:4px 7px;

      border-radius:100px;

      background:#f1eff5;

      color:#625b71;

      font-size:9px;

      font-weight:800;

      line-height:1.2;

    }

    .wn-gallery-tier[data-tier="pro"] {

      background:#eee8ff;

      color:#5424ff;

    }

    .wn-gallery-tier[data-tier="premium"] {

      background:#fce9f7;

      color:#a71980;

    }

    .wn-gallery-category {

      margin:0 0 6px;

      color:var(--wn-gallery-muted);

      font-size:10px;

      font-weight:650;

      line-height:1.4;

    }

    .wn-gallery-description {

      margin:0 0 10px;

      color:var(--wn-gallery-muted);

      font-size:11px;

      line-height:1.5;

      overflow-wrap:anywhere;

    }

    /* TEMPLATE SELECTION BUTTON */

    .wn-template-gallery
    .wn-gallery-select {

      display:flex;

      justify-content:center;

      align-items:center;

      gap:6px;

      width:100%;

      min-height:40px;

      margin:auto 0 0;

      padding:8px;

      border:1px solid
        var(--wn-gallery-border);

      border-radius:8px;

      background:#f6f3ff;

      color:var(--wn-gallery-purple);

      font:inherit;

      font-size:11px;

      font-weight:750;

      line-height:1.35;

      text-align:center;

      white-space:normal;

      cursor:pointer;

      box-shadow:none;

    }

    .wn-template-gallery
    .wn-gallery-select[aria-pressed="true"] {

      border-color:
        var(--wn-gallery-purple);

      background:
        var(--wn-gallery-purple);

      color:#ffffff;

    }

    .wn-gallery-check {

      display:inline-block;

      flex-shrink:0;

      font-weight:800;

    }

    /* SELECTED TEMPLATE SUMMARY */

    .wn-gallery-active {

      display:flex;

      align-items:center;

      gap:10px;

      margin:16px 0 0;

      padding:12px;

      border:1px solid #e6ddff;

      border-radius:10px;

      background:#f8f5ff;

    }

    .wn-gallery-active-icon {

      display:grid;

      place-items:center;

      flex-shrink:0;

      width:34px;

      height:34px;

      border-radius:50%;

      background:#5424ff;

      color:#ffffff;

      font-size:16px;

      font-weight:800;

    }

    .wn-gallery-active-text {

      min-width:0;

      flex:1;

    }

    .wn-gallery-active-label {

      display:block;

      color:var(--wn-gallery-muted);

      font-size:10px;

      font-weight:650;

      line-height:1.4;

    }

    .wn-gallery-active-name {

      display:block;

      margin-top:3px;

      color:var(--wn-gallery-ink);

      font-size:14px;

      font-weight:800;

      line-height:1.3;

      overflow-wrap:anywhere;

    }

    .wn-gallery-active-color {

      width:22px;

      height:22px;

      flex-shrink:0;

      border:2px solid #ffffff;

      border-radius:50%;

      box-shadow:0 0 0 1px #ded7ee;

    }

    /* PREVIEW NOTICE */

    .wn-gallery-notice {

      display:block;

      margin:12px 0 0;

      padding:10px;

      border-radius:8px;

      background:#faf9fc;

      color:var(--wn-gallery-muted);

      font-size:11px;

      line-height:1.5;

      text-align:center;

    }

    .wn-gallery-empty {

      grid-column:1 / -1;

      margin:0;

      padding:20px;

      color:var(--wn-gallery-muted);

      font-size:13px;

      text-align:center;

    }

    .wn-gallery-status {

      position:absolute;

      width:1px;

      height:1px;

      padding:0;

      margin:-1px;

      overflow:hidden;

      clip:rect(0,0,0,0);

      white-space:nowrap;

      border:0;

    }

    /* ACCESSIBILITY */

    .wn-template-gallery button {

      -webkit-tap-highlight-color:
        transparent;

      touch-action:manipulation;

    }

    .wn-template-gallery
    button:focus-visible {

      outline:3px solid #5424ff;

      outline-offset:3px;

    }

    @media(hover:hover) {

      .wn-gallery-card:hover {

        border-color:#a995ff;

      }

      .wn-template-gallery
      .wn-gallery-select:hover {

        filter:brightness(.98);

      }

    }

    /* TABLET */

    @media(max-width:850px) {

      .wn-gallery-grid {

        grid-template-columns:
          repeat(2,minmax(0,1fr));

      }

    }

    /* IPHONE */

    @media(max-width:600px) {

      .wn-template-gallery {

        padding:12px;

        border-radius:13px;

      }

      .wn-gallery-hero {

        padding:16px;

        margin-bottom:14px;

      }

      .wn-template-gallery
      .wn-gallery-hero h2 {

        font-size:24px;

      }

      .wn-template-gallery
      .wn-gallery-hero p {

        font-size:12px;

      }

      .wn-gallery-grid {

        grid-template-columns:
          repeat(2,minmax(0,1fr));

        gap:8px;

      }

      .wn-gallery-card {

        padding:8px;

      }

      .wn-gallery-card-name {

        font-size:12px;

      }

      .wn-gallery-description {

        font-size:10px;

      }

      .wn-gallery-category {

        font-size:9px;

      }

      .wn-template-gallery
      .wn-gallery-select,

      .wn-template-gallery
      .wn-gallery-filter {

        min-height:44px;

      }

    }

    @media(max-width:340px) {

      .wn-gallery-grid {

        grid-template-columns:
          minmax(0,1fr);

      }

      .wn-gallery-thumbnail {

        aspect-ratio:210 / 230;

      }

    }

    @media print {

      .wn-template-gallery {

        display:none!important;

      }

    }

  `;

  /* STYLE INSTALLATION */

  function installStyles() {

    if (
      document.getElementById(STYLE_ID)
    ) {

      return;

    }

    const style =
      document.createElement("style");

    style.id = STYLE_ID;

    style.textContent = GALLERY_CSS;

    document.head.appendChild(style);

  }

  /* TEMPLATE CATALOG */

  function getCatalog() {

    if (!engineAvailable()) {

      return [];

    }

    const templates =
      getEngine().getTemplates(
        getLanguage()
      );

    return templates
      .slice()
      .sort((a,b) => {

        const first =
          TEMPLATE_ORDER.indexOf(a.id);

        const second =
          TEMPLATE_ORDER.indexOf(b.id);

        return (

          (first < 0 ? 999 : first) -

          (second < 0 ? 999 : second)

        );

      });

  }

  function getFilteredTemplates() {

    const templates = getCatalog();

    if (currentFilter === "all") {

      return templates;

    }

    return templates.filter(

      template =>
        template.membership === currentFilter

    );

  }

  /* RESPONSIVE THUMBNAIL SCALING */

  let resizeObserver = null;

  function resizeThumbnail(element) {

    if (!element) return;

    const paper =
      element.querySelector(
        ".wn-gallery-paper"
      );

    if (!paper) return;

    const width =
      element.clientWidth;

    const height =
      element.clientHeight;

    if (!width || !height) return;

    const scale = Math.min(

      (width - 12) / 794,

      (height - 12) / 1123

    );

    paper.style.transform =

      "translate(-50%,-50%) scale(" +

      Math.max(.01, scale) +

      ")";

  }

  function resizeAllThumbnails() {

    if (!mountedRoot) return;

    mountedRoot.querySelectorAll(
      ".wn-gallery-thumbnail"
    ).forEach(resizeThumbnail);

  }

  function observeThumbnails() {

    if (resizeObserver) {

      resizeObserver.disconnect();

    }

    resizeAllThumbnails();

    if (
      typeof ResizeObserver !== "function"
    ) {

      return;

    }

    resizeObserver = new ResizeObserver(

      entries => {

        entries.forEach(entry => {

          resizeThumbnail(entry.target);

        });

      }

    );

    mountedRoot.querySelectorAll(
      ".wn-gallery-thumbnail"
    ).forEach(element => {

      resizeObserver.observe(element);

    });

  }

  /* TEMPLATE THUMBNAIL FACTORY */

  function createThumbnail(template) {

    const sample =
      engine.getSampleResume();

    const resume = engine.renderResume(

      sample,

      {

        templateId:template.id,

        accentColor:template.accent,

        documentLanguage:getLanguage()

      }

    );

    return `

      <div class="wn-gallery-thumbnail"
           aria-hidden="true">

        <div class="wn-gallery-paper">

          ${resume}

        </div>

      </div>

    `;

  }

  /* TEMPLATE CARD FACTORY */

  function createCard(template) {

    const selected =

      engine.getState().templateId ===
      template.id;

    const id =
      escapeHTML(template.id);

    const name =
      escapeHTML(template.name);

    const membership =
      escapeHTML(template.membership);

    return `

      <article

        class="wn-gallery-card"

        data-template-card="${id}"

        data-selected="${selected}"

      >

        ${createThumbnail(template)}

        <div class="wn-gallery-card-top">

          <h3 class="wn-gallery-card-name">

            ${name}

          </h3>

          <span

            class="wn-gallery-tier"

            data-tier="${membership}"

          >

            ${escapeHTML(
              t(template.membership)
            )}

          </span>

        </div>

        <p class="wn-gallery-category">

          ${escapeHTML(
            template.categoryText
          )}

        </p>

        <p class="wn-gallery-description">

          ${escapeHTML(
            template.descriptionText
          )}

        </p>

        <button

          class="wn-gallery-select"

          type="button"

          data-select-template="${id}"

          aria-pressed="${selected}"

          aria-label="${escapeHTML(
            (selected
              ? t("selected")
              : t("select")) +
            ": " +
            template.name
          )}"

        >

          <span

            class="wn-gallery-check"

            aria-hidden="true"

            ${selected ? "" : "hidden"}

          >✓</span>

          <span data-gallery-button-label>

            ${escapeHTML(
              selected
                ? t("selected")
                : t("select")
            )}

          </span>

        </button>

      </article>

    `;

  }

  /* FILTER BUTTON FACTORY */

  function createFilters() {

    return FILTERS.map(filter => {

      return `

        <button

          class="wn-gallery-filter"

          type="button"

          data-gallery-filter="${filter}"

          aria-pressed="${
            currentFilter === filter
          }"

        >

          ${escapeHTML(t(filter))}

        </button>

      `;

    }).join("");

  }

  /* ACTIVE TEMPLATE SUMMARY */

  function updateSelection() {

    if (

      !mountedRoot ||

      !engineAvailable()

    ) return;

    const state =
      engine.getState();

    const activeTemplate =

      getCatalog().find(

        template =>
          template.id === state.templateId

      );

    mountedRoot.querySelectorAll(
      "[data-template-card]"
    ).forEach(card => {

      const selected =

        card.dataset.templateCard ===
        state.templateId;

      card.dataset.selected =
        String(selected);

      const button =
        card.querySelector(
          "[data-select-template]"
        );

      const check =
        card.querySelector(
          ".wn-gallery-check"
        );

      const label =
        card.querySelector(
          "[data-gallery-button-label]"
        );

      const templateName =

        card.querySelector(
          ".wn-gallery-card-name"
        )?.textContent.trim() || "";

      if (button) {

        button.setAttribute(

          "aria-pressed",

          String(selected)

        );

        button.setAttribute(

          "aria-label",

          (selected
            ? t("selected")
            : t("select")) +

          ": " +

          templateName

        );

      }

      if (check) {

        check.hidden = !selected;

      }

      if (label) {

        label.textContent =

          selected
            ? t("selected")
            : t("select");

      }

    });

    const name =
      mountedRoot.querySelector(
        "[data-gallery-active-name]"
      );

    const color =
      mountedRoot.querySelector(
        "[data-gallery-active-color]"
      );

    if (name) {

      name.textContent =
        activeTemplate?.name || "";

    }

    if (

      color &&

      /^#[0-9a-f]{6}$/i.test(
        state.accentColor || ""
      )

    ) {

      color.style.backgroundColor =
        state.accentColor;

    }

  }

  /* LIVE ACCESSIBILITY STATUS */

  function announce(message) {

    if (!mountedRoot) return;

    const status =
      mountedRoot.querySelector(
        "[data-gallery-status]"
      );

    if (status) {

      status.textContent = message;

    }

  }

  /* GALLERY GRID RENDERING */

  function renderGrid() {

    if (

      !mountedRoot ||

      !engineAvailable()

    ) return;

    const grid =
      mountedRoot.querySelector(
        "[data-gallery-grid]"
      );

    const count =
      mountedRoot.querySelector(
        "[data-gallery-count]"
      );

    if (!grid) return;

    const templates =
      getFilteredTemplates();

    grid.innerHTML = templates.length

      ? templates.map(createCard).join("")

      : `

        <p class="wn-gallery-empty">

          ${escapeHTML(t("empty"))}

        </p>

      `;

    if (count) {

      count.textContent = t(

        "count",

        { count:templates.length }

      );

    }

    mountedRoot.querySelectorAll(
      "[data-gallery-filter]"
    ).forEach(button => {

      button.setAttribute(

        "aria-pressed",

        String(

          button.dataset.galleryFilter ===
          currentFilter

        )

      );

    });

    updateSelection();

    observeThumbnails();

  }

  /* COMPLETE GALLERY RENDERER */

  function renderGallery() {

    if (!mountedRoot) return false;

    if (!engineAvailable()) {

      mountedRoot.innerHTML = `

        <p class="wn-gallery-empty"
           role="status">

          ${escapeHTML(t("engineError"))}

        </p>

        <button

          class="wn-gallery-filter"

          type="button"

          data-gallery-retry

        >

          ${escapeHTML(t("retry"))}

        </button>

      `;

      return false;

    }

    engine = getEngine();

    engine.installStyles(document);

    installStyles();

    const focused =
      document.activeElement;

    const focusedFilter =

      mountedRoot.contains(focused)

        ? focused.dataset?.galleryFilter

        : null;

    const focusedTemplate =

      mountedRoot.contains(focused)

        ? focused.dataset?.selectTemplate

        : null;

    renderedLanguage =
      getLanguage();

    mountedRoot.setAttribute(

      "aria-label",

      t("galleryLabel")

    );

    mountedRoot.innerHTML = `

      <div class="wn-gallery-hero">

        <span class="wn-gallery-overline">

          ${escapeHTML(t("overline"))}

        </span>

        <h2>

          ${escapeHTML(t("title"))}

        </h2>

        <p>

          ${escapeHTML(t("description"))}

        </p>

      </div>

      <div class="wn-gallery-toolbar">

        <h3 class="wn-gallery-heading">

          ${escapeHTML(t("collection"))}

        </h3>

        <span

          class="wn-gallery-count"

          data-gallery-count

          aria-live="polite"

        ></span>

      </div>

      <div

        class="wn-gallery-filters"

        role="group"

        aria-label="${escapeHTML(
          t("collection")
        )}"

      >

        ${createFilters()}

      </div>

      <div

        class="wn-gallery-grid"

        data-gallery-grid

      ></div>

      <div class="wn-gallery-active">

        <div

          class="wn-gallery-active-icon"

          aria-hidden="true"

        >✓</div>

        <div class="wn-gallery-active-text">

          <span class="wn-gallery-active-label">

            ${escapeHTML(t("active"))}

          </span>

          <strong

            class="wn-gallery-active-name"

            data-gallery-active-name

          ></strong>

        </div>

        <span

          class="wn-gallery-active-color"

          data-gallery-active-color

          aria-hidden="true"

        ></span>

      </div>

      <p class="wn-gallery-notice">

        ${escapeHTML(t("previewNotice"))}

      </p>

      <div

        class="wn-gallery-status"

        data-gallery-status

        role="status"

        aria-live="polite"

        aria-atomic="true"

      ></div>

    `;

    renderGrid();

    if (focusedFilter) {

      Array.from(

        mountedRoot.querySelectorAll(
          "[data-gallery-filter]"
        )

      ).find(

        button =>
          button.dataset.galleryFilter ===
          focusedFilter

      )?.focus({ preventScroll:true });

    } else if (focusedTemplate) {

      Array.from(

        mountedRoot.querySelectorAll(
          "[data-select-template]"
        )

      ).find(

        button =>
          button.dataset.selectTemplate ===
          focusedTemplate

      )?.focus({ preventScroll:true });

    }

    return true;

  }

  /* MEMBERSHIP FILTER CONTROLLER */

  function setFilter(filter) {

    if (!validFilter(filter)) {

      return false;

    }

    currentFilter = filter;

    renderGrid();

    return true;

  }

  /* TEMPLATE SELECTION CONTROLLER */

  function selectTemplate(id) {

    if (!engineAvailable()) {

      return false;

    }

    const template =
      getCatalog().find(

        item => item.id === id

      );

    if (!template) {

      return false;

    }

    /*
     * All templates remain accessible
     * during the development preview.
     *
     * Membership labels do not enforce
     * payment or subscription access.
     */

    engine.selectTemplate(id);

    updateSelection();

    announce(

      t("selectedStatus", {

        name:template.name

      })

    );

    document.dispatchEvent(

      new CustomEvent(

        "worknely:galleryselection",

        {

          detail:{

            templateId:id,

            state:engine.getState(),

            version:VERSION

          }

        }

      )

    );

    return true;

  }

  /* DELEGATED GALLERY INTERACTION */

  function handleClick(event) {

    if (!mountedRoot) return;

    if (
      !(event.target instanceof Element)
    ) return;

    const filterButton =
      event.target.closest(
        "[data-gallery-filter]"
      );

    if (

      filterButton &&

      mountedRoot.contains(filterButton)

    ) {

      setFilter(

        filterButton.dataset.galleryFilter

      );

      return;

    }

    const templateButton =
      event.target.closest(
        "[data-select-template]"
      );

    if (

      templateButton &&

      mountedRoot.contains(templateButton)

    ) {

      selectTemplate(

        templateButton.dataset.selectTemplate

      );

      return;

    }

    const retryButton =
      event.target.closest(
        "[data-gallery-retry]"
      );

    if (

      retryButton &&

      mountedRoot.contains(retryButton)

    ) {

      renderGallery();

    }

  }

  /* GALLERY MOUNTING API */

  function mount(target = "#" + ROOT_ID) {

    const root =

      typeof target === "string"

        ? document.querySelector(target)

        : target;

    if (

      !root ||

      root.nodeType !== 1

    ) {

      return false;

    }

    if (mountedRoot !== root) {

      if (mountedRoot) {

        mountedRoot.removeEventListener(

          "click",

          handleClick

        );

      }

      if (resizeObserver) {

        resizeObserver.disconnect();

      }

      mountedRoot = root;

      mountedRoot.classList.add(

        "wn-template-gallery"

      );

      mountedRoot.setAttribute(

        "role",

        "region"

      );

      mountedRoot.addEventListener(

        "click",

        handleClick

      );

    }

    installStyles();

    const rendered =
      renderGallery();

    if (rendered) {

      document.dispatchEvent(

        new CustomEvent(

          "worknely:galleryready",

          {

            detail:{

              version:VERSION,

              templateCount:
                getCatalog().length

            }

          }

        )

      );

    }

    return rendered;

  }

  /* GALLERY UNMOUNTING API */

  function unmount() {

    if (!mountedRoot) {

      return false;

    }

    mountedRoot.removeEventListener(

      "click",

      handleClick

    );

    if (resizeObserver) {

      resizeObserver.disconnect();

      resizeObserver = null;

    }

    mountedRoot.innerHTML = "";

    mountedRoot.classList.remove(

      "wn-template-gallery"

    );

    mountedRoot.removeAttribute(

      "aria-label"

    );

    mountedRoot.removeAttribute(

      "role"

    );

    mountedRoot = null;

    return true;

  }

  /* GLOBAL TEMPLATE SYNCHRONIZATION */

  document.addEventListener(

    "worknely:templatechange",

    event => {

      if (!mountedRoot) return;

      if (

        event.detail?.reason === "language"

      ) {

        if (
          renderedLanguage !== getLanguage()
        ) {

          renderGallery();

        }

        return;

      }

      updateSelection();

    }

  );

  /* INTERNATIONAL LOCALIZATION */

  function refreshLanguage() {

    if (!mountedRoot) return;

    if (

      renderedLanguage !== getLanguage()

    ) {

      renderGallery();

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

  /* ENGINE READY SYNCHRONIZATION */

  document.addEventListener(

    "worknely:templatesready",

    () => {

      if (mountedRoot) {

        renderGallery();

      } else {

        autoMount();

      }

    }

  );

  /* RESPONSIVE FALLBACK */

  window.addEventListener(

    "resize",

    resizeAllThumbnails,

    { passive:true }

  );

  window.addEventListener(

    "pageshow",

    () => {

      refreshLanguage();

      updateSelection();

      resizeAllThumbnails();

    }

  );

  /* SAFE AUTOMATIC MOUNT */

  function autoMount() {

    const root =
      document.getElementById(ROOT_ID);

    if (

      root &&

      mountedRoot !== root

    ) {

      mount(root);

    }

  }

  function initialize() {

    if (initialized) return;

    initialized = true;

    autoMount();

    console.info(

      "Worknely V" + VERSION +

      " Interactive Template Gallery ready."

    );

  }

  /* PUBLIC GALLERY API */

  window.WorknelyTemplateGallery =
    Object.freeze({

      version:VERSION,

      mount,

      unmount,

      render:renderGallery,

      setFilter,

      getFilter:() => currentFilter,

      selectTemplate,

      getCatalog,

      refresh:() => {

        if (!mountedRoot) {

          autoMount();

          return Boolean(mountedRoot);

        }

        return renderGallery();

      },

      isMounted:() => Boolean(mountedRoot)

    });

  /* INITIALIZATION */

  if (

    document.readyState === "loading"

  ) {

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
 * END WORKNELY V7.16.2
 * INTERACTIVE PROFESSIONAL TEMPLATE GALLERY
 */
