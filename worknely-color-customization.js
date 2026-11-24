
/*
 * WORKNELY V7.16.4
 * Professional Color Customization Engine
 *
 * Professional Accent Color Collection
 * Custom HEX Color Support
 * Native Color Picker
 * Live Template Synchronization
 * Contrast Accessibility Guidance
 * Six Language Localization
 * Local Design Persistence
 *
 * Requires:
 * worknely-templates.js V7.16.1
 *
 * Compatible with:
 * worknely-template-gallery.js V7.16.2
 * worknely-live-preview.js V7.16.3
 *
 * No external dependencies.
 * No additional costs.
 */

(() => {

  "use strict";

  const VERSION = "7.16.4";

  const ROOT_ID = "wnColorCustomization";

  const STYLE_ID =
    "wn-color-customization-styles";

  const LANGUAGES = [
    "en", "ro", "it", "de", "fr", "es"
  ];

  let root = null;

  let renderedLanguage = null;

  let statusKey = "";

  /* INTERNATIONAL DICTIONARY */

  const translations = {

    en: {

      overline: "WORKNELY DESIGN STUDIO",
      title: "Personalize your design",
      description: "Create a professional visual identity with your preferred accent color.",
      palette: "Professional color palette",
      custom: "Custom color",
      current: "Current accent",
      hex: "HEX color code",
      apply: "Apply color",
      reset: "Restore default color",
      selected: "Selected",
      applied: "Accent color updated.",
      restored: "Default template color restored.",
      invalid: "Enter a valid six-digit HEX color, such as #5424FF.",
      contrastGood: "Good text contrast on white.",
      contrastLow: "This color may be difficult to read on a white background.",
      contrast: "Contrast ratio",
      sample: "Professional Summary",
      sampleText: "Your experience. Your skills. Your professional identity.",
      unavailable: "The color customization engine is unavailable.",
      picker: "Choose a custom accent color",
      atsNotice: "ATS Professional keeps its main text and section headings neutral for readability.",
      persistence: "Your design preference is saved in this browser.",
      graphite: "Graphite",
      navy: "Midnight Navy",
      purple: "Electric Purple",
      pink: "Signature Pink",
      teal: "Professional Teal",
      emerald: "Emerald Green",
      burgundy: "Burgundy",
      slate: "Slate Grey",
      blue: "Royal Blue",
      bronze: "Warm Bronze"

    },

    ro: {

      overline: "WORKNELY DESIGN STUDIO",
      title: "Personalizează designul",
      description: "Creează o identitate vizuală profesională folosind culoarea de accent preferată.",
      palette: "Paletă profesională de culori",
      custom: "Culoare personalizată",
      current: "Culoare actuală",
      hex: "Cod de culoare HEX",
      apply: "Aplică culoarea",
      reset: "Restabilește culoarea implicită",
      selected: "Selectat",
      applied: "Culoarea de accent a fost actualizată.",
      restored: "Culoarea implicită a șablonului a fost restabilită.",
      invalid: "Introdu un cod HEX valid cu șase cifre, de exemplu #5424FF.",
      contrastGood: "Contrast bun al textului pe fundal alb.",
      contrastLow: "Această culoare poate fi dificil de citit pe fundal alb.",
      contrast: "Raport de contrast",
      sample: "Profil profesional",
      sampleText: "Experiența ta. Competențele tale. Identitatea ta profesională.",
      unavailable: "Motorul de personalizare cromatică nu este disponibil.",
      picker: "Alege o culoare de accent personalizată",
      atsNotice: "ATS Professional păstrează textul principal și titlurile secțiunilor în culori neutre pentru lizibilitate.",
      persistence: "Preferința de design este salvată în acest browser.",
      graphite: "Grafit",
      navy: "Bleumarin",
      purple: "Mov electric",
      pink: "Roz emblematic",
      teal: "Turcoaz profesional",
      emerald: "Verde smarald",
      burgundy: "Burgund",
      slate: "Gri ardezie",
      blue: "Albastru regal",
      bronze: "Bronz cald"

    },

    it: {

      overline: "WORKNELY DESIGN STUDIO",
      title: "Personalizza il design",
      description: "Crea un'identità visiva professionale con il tuo colore preferito.",
      palette: "Palette professionale",
      custom: "Colore personalizzato",
      current: "Colore attuale",
      hex: "Codice colore HEX",
      apply: "Applica colore",
      reset: "Ripristina colore predefinito",
      selected: "Selezionato",
      applied: "Colore di accento aggiornato.",
      restored: "Colore predefinito ripristinato.",
      invalid: "Inserisci un codice HEX valido di sei cifre, ad esempio #5424FF.",
      contrastGood: "Buon contrasto del testo su sfondo bianco.",
      contrastLow: "Questo colore potrebbe essere difficile da leggere su sfondo bianco.",
      contrast: "Rapporto di contrasto",
      sample: "Profilo professionale",
      sampleText: "La tua esperienza. Le tue competenze. La tua identità professionale.",
      unavailable: "Il motore di personalizzazione non è disponibile.",
      picker: "Scegli un colore personalizzato",
      atsNotice: "ATS Professional mantiene il testo principale e i titoli delle sezioni in colori neutri.",
      persistence: "La preferenza di design viene salvata in questo browser.",
      graphite: "Grafite",
      navy: "Blu notte",
      purple: "Viola elettrico",
      pink: "Rosa distintivo",
      teal: "Petrolio professionale",
      emerald: "Verde smeraldo",
      burgundy: "Bordeaux",
      slate: "Grigio ardesia",
      blue: "Blu reale",
      bronze: "Bronzo caldo"

    },

    de: {

      overline: "WORKNELY DESIGN STUDIO",
      title: "Personalisiere dein Design",
      description: "Gestalte deine professionelle Identität mit deiner bevorzugten Akzentfarbe.",
      palette: "Professionelle Farbpalette",
      custom: "Benutzerdefinierte Farbe",
      current: "Aktuelle Akzentfarbe",
      hex: "HEX-Farbcode",
      apply: "Farbe anwenden",
      reset: "Standardfarbe wiederherstellen",
      selected: "Ausgewählt",
      applied: "Akzentfarbe aktualisiert.",
      restored: "Standardfarbe wiederhergestellt.",
      invalid: "Gib einen gültigen sechsstelligen HEX-Code ein, zum Beispiel #5424FF.",
      contrastGood: "Guter Textkontrast auf weißem Hintergrund.",
      contrastLow: "Diese Farbe könnte auf weißem Hintergrund schwer lesbar sein.",
      contrast: "Kontrastverhältnis",
      sample: "Berufliches Profil",
      sampleText: "Deine Erfahrung. Deine Fähigkeiten. Deine berufliche Identität.",
      unavailable: "Die Farbanpassung ist derzeit nicht verfügbar.",
      picker: "Benutzerdefinierte Akzentfarbe wählen",
      atsNotice: "ATS Professional verwendet neutrale Farben für Haupttext und Abschnittsüberschriften.",
      persistence: "Deine Designpräferenz wird in diesem Browser gespeichert.",
      graphite: "Graphit",
      navy: "Mitternachtsblau",
      purple: "Elektrisches Violett",
      pink: "Signature Pink",
      teal: "Petrol",
      emerald: "Smaragdgrün",
      burgundy: "Burgunderrot",
      slate: "Schiefergrau",
      blue: "Königsblau",
      bronze: "Warmes Bronze"

    },

    fr: {

      overline: "WORKNELY DESIGN STUDIO",
      title: "Personnalisez votre design",
      description: "Créez une identité visuelle professionnelle avec votre couleur préférée.",
      palette: "Palette professionnelle",
      custom: "Couleur personnalisée",
      current: "Couleur actuelle",
      hex: "Code couleur HEX",
      apply: "Appliquer la couleur",
      reset: "Restaurer la couleur par défaut",
      selected: "Sélectionné",
      applied: "Couleur d'accent mise à jour.",
      restored: "Couleur par défaut restaurée.",
      invalid: "Saisissez un code HEX valide à six chiffres, par exemple #5424FF.",
      contrastGood: "Bon contraste du texte sur fond blanc.",
      contrastLow: "Cette couleur peut être difficile à lire sur fond blanc.",
      contrast: "Rapport de contraste",
      sample: "Profil professionnel",
      sampleText: "Votre expérience. Vos compétences. Votre identité professionnelle.",
      unavailable: "Le moteur de personnalisation est indisponible.",
      picker: "Choisir une couleur personnalisée",
      atsNotice: "ATS Professional conserve des couleurs neutres pour le texte principal et les titres des sections.",
      persistence: "Votre préférence de design est enregistrée dans ce navigateur.",
      graphite: "Graphite",
      navy: "Bleu nuit",
      purple: "Violet électrique",
      pink: "Rose signature",
      teal: "Bleu pétrole",
      emerald: "Vert émeraude",
      burgundy: "Bordeaux",
      slate: "Gris ardoise",
      blue: "Bleu royal",
      bronze: "Bronze chaud"

    },

    es: {

      overline: "WORKNELY DESIGN STUDIO",
      title: "Personaliza tu diseño",
      description: "Crea una identidad visual profesional con tu color de acento preferido.",
      palette: "Paleta profesional de colores",
      custom: "Color personalizado",
      current: "Color actual",
      hex: "Código de color HEX",
      apply: "Aplicar color",
      reset: "Restaurar color predeterminado",
      selected: "Seleccionado",
      applied: "Color de acento actualizado.",
      restored: "Color predeterminado restaurado.",
      invalid: "Introduce un código HEX válido de seis dígitos, por ejemplo #5424FF.",
      contrastGood: "Buen contraste del texto sobre fondo blanco.",
      contrastLow: "Este color puede ser difícil de leer sobre fondo blanco.",
      contrast: "Relación de contraste",
      sample: "Perfil profesional",
      sampleText: "Tu experiencia. Tus competencias. Tu identidad profesional.",
      unavailable: "El motor de personalización no está disponible.",
      picker: "Elige un color personalizado",
      atsNotice: "ATS Professional mantiene colores neutros para el texto principal y los títulos de las secciones.",
      persistence: "Tu preferencia de diseño se guarda en este navegador.",
      graphite: "Grafito",
      navy: "Azul medianoche",
      purple: "Violeta eléctrico",
      pink: "Rosa distintivo",
      teal: "Verde azulado",
      emerald: "Verde esmeralda",
      burgundy: "Burdeos",
      slate: "Gris pizarra",
      blue: "Azul real",
      bronze: "Bronce cálido"

    }

  };

  /* LANGUAGE UTILITIES */

  function getLanguage() {

    let stored = null;

    try {

      stored = localStorage.getItem(
        "worknely.language"
      );

    } catch {}

    const value =

      window.WorknelyLocalization
        ?.getLanguage?.() ||

      stored ||

      document.documentElement.lang ||

      "en";

    const code = String(value)
      .toLowerCase()
      .split("-")[0];

    return LANGUAGES.includes(code)
      ? code
      : "en";

  }

  function t(key) {

    return translations[getLanguage()]?.[key] ||
      translations.en[key] ||
      key;

  }

  /* ENGINE ACCESS */

  function getEngine() {

    return window.WorknelyTemplates || null;

  }

  function engineAvailable() {

    const engine = getEngine();

    return Boolean(

      engine &&

      typeof engine.getState === "function" &&

      typeof engine.getTemplate === "function" &&

      typeof engine.setAccentColor === "function" &&

      typeof engine.selectTemplate === "function" &&

      typeof engine.applyDesign === "function" &&

      Array.isArray(engine.colors)

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

  /* COLOR VALIDATION */

  function normalizeColor(value) {

    let color = String(value || "")
      .trim()
      .toLowerCase();

    if (!color.startsWith("#")) {

      color = "#" + color;

    }

    return /^#[0-9a-f]{6}$/.test(color)

      ? color

      : null;

  }

  /* WCAG RELATIVE LUMINANCE */

  function hexToRGB(value) {

    const color = normalizeColor(value);

    if (!color) return null;

    return {

      r:parseInt(color.slice(1,3),16),

      g:parseInt(color.slice(3,5),16),

      b:parseInt(color.slice(5,7),16)

    };

  }

  function linearChannel(value) {

    const channel = value / 255;

    return channel <= .04045

      ? channel / 12.92

      : Math.pow(
          (channel + .055) / 1.055,
          2.4
        );

  }

  function luminance(value) {

    const rgb = hexToRGB(value);

    if (!rgb) return null;

    return (

      .2126 * linearChannel(rgb.r) +

      .7152 * linearChannel(rgb.g) +

      .0722 * linearChannel(rgb.b)

    );

  }

  function contrastRatio(
    foreground,
    background = "#ffffff"
  ) {

    const first = luminance(foreground);

    const second = luminance(background);

    if (first === null || second === null) {

      return null;

    }

    return (

      (Math.max(first,second) + .05) /

      (Math.min(first,second) + .05)

    );

  }

  /* DESIGN SYSTEM */

  const CSS = `

    .wn-color-customization,
    .wn-color-customization * {
      box-sizing:border-box;
    }

    .wn-color-customization {
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

    .wn-color-customization [hidden] {
      display:none!important;
    }

    .wn-color-overline {
      display:block;
      margin:0 0 7px;
      color:#5424ff;
      font-size:10px;
      font-weight:800;
      letter-spacing:1.4px;
    }

    .wn-color-customization
    .wn-color-heading h2 {
      margin:0 0 7px;
      padding:0;
      color:#241442;
      font-size:clamp(22px,4vw,30px);
      font-weight:800;
      line-height:1.2;
      letter-spacing:-.6px;
    }

    .wn-color-customization
    .wn-color-heading p {
      margin:0 0 18px;
      color:#706780;
      font-size:13px;
      line-height:1.55;
    }

    .wn-color-label {
      display:block;
      margin:0 0 10px;
      color:#241442;
      font-size:13px;
      font-weight:750;
      line-height:1.4;
    }

    .wn-color-palette {
      display:grid;
      grid-template-columns:
        repeat(5,minmax(0,1fr));
      gap:8px;
      margin:0 0 18px;
    }

    .wn-color-customization
    .wn-color-swatch {
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      gap:6px;
      width:100%;
      min-width:0;
      min-height:80px;
      margin:0;
      padding:9px 4px;
      border:1px solid #e9e3f5;
      border-radius:10px;
      background:#ffffff;
      color:#625b71;
      font:inherit;
      font-size:10px;
      font-weight:650;
      line-height:1.3;
      text-align:center;
      white-space:normal;
      overflow-wrap:anywhere;
      cursor:pointer;
      box-shadow:none;
      touch-action:manipulation;
    }

    .wn-color-customization
    .wn-color-swatch[aria-pressed="true"] {
      border-color:#5424ff;
      background:#f8f5ff;
      box-shadow:inset 0 0 0 1px #5424ff;
    }

    .wn-color-circle {
      display:grid;
      place-items:center;
      width:32px;
      height:32px;
      flex-shrink:0;
      border:2px solid #ffffff;
      border-radius:50%;
      box-shadow:0 0 0 1px #e0d9ed;
    }

    .wn-color-check {
      font-size:15px;
      font-weight:800;
      line-height:1;
    }

    .wn-color-custom-panel {
      display:block;
      margin:0 0 16px;
      padding:14px;
      border:1px solid #eee9f7;
      border-radius:12px;
      background:#faf9fd;
    }

    .wn-color-input-row {
      display:flex;
      align-items:end;
      flex-wrap:wrap;
      gap:8px;
    }

    .wn-color-picker-wrap {
      display:flex;
      align-items:center;
      flex-shrink:0;
    }

    .wn-color-customization
    input[type="color"] {
      display:block;
      width:48px;
      height:46px;
      min-width:48px;
      margin:0;
      padding:4px;
      border:1px solid #e1daef;
      border-radius:8px;
      background:#ffffff;
      cursor:pointer;
    }

    .wn-color-hex-wrap {
      flex:1;
      min-width:100px;
    }

    .wn-color-hex-wrap label {
      display:block;
      margin:0 0 5px;
      color:#625b71;
      font-size:11px;
      font-weight:700;
    }

    .wn-color-customization
    .wn-color-hex {
      width:100%;
      min-width:0;
      min-height:46px;
      margin:0;
      padding:10px;
      border:1px solid #e1daef;
      border-radius:8px;
      background:#ffffff;
      color:#241442;
      font-family:monospace;
      font-size:16px;
      text-transform:uppercase;
    }

    .wn-color-customization
    .wn-color-hex[aria-invalid="true"] {
      border-color:#b42318;
    }

    .wn-color-customization
    .wn-color-apply {
      width:auto;
      min-height:46px;
      margin:0;
      padding:10px 16px;
      border:0;
      border-radius:8px;
      background:#5424ff;
      color:#ffffff;
      font:inherit;
      font-size:12px;
      font-weight:750;
      line-height:1.4;
      white-space:normal;
      cursor:pointer;
    }

    .wn-color-current {
      display:flex;
      align-items:center;
      gap:10px;
      margin:0 0 14px;
    }

    .wn-color-current-value {
      display:block;
      color:#241442;
      font-family:monospace;
      font-size:15px;
      font-weight:700;
    }

    .wn-color-current-label {
      display:block;
      margin:0 0 3px;
      color:#706780;
      font-size:11px;
    }

    .wn-color-example {
      display:block;
      margin:0 0 12px;
      padding:18px;
      border:1px solid #e9e3f5;
      border-radius:10px;
      background:#ffffff;
      overflow-wrap:anywhere;
    }

    .wn-color-example-heading {
      display:block;
      margin:0 0 8px;
      font-size:16px;
      font-weight:800;
      line-height:1.3;
    }

    .wn-color-example-line {
      width:100%;
      height:3px;
      margin:0 0 10px;
      border-radius:2px;
    }

    .wn-color-example p {
      margin:0;
      color:#444444;
      font-size:12px;
      line-height:1.5;
    }

    .wn-color-contrast {
      display:block;
      margin:0 0 12px;
      padding:10px;
      border:1px solid #e9e3f5;
      border-radius:8px;
      background:#faf9fd;
      color:#625b71;
      font-size:11px;
      line-height:1.5;
    }

    .wn-color-contrast[data-level="low"] {
      border-color:#e9d3a7;
      background:#fff9ef;
      color:#80551a;
    }

    .wn-color-contrast strong {
      display:block;
      margin:0 0 3px;
    }

    .wn-color-customization
    .wn-color-reset {
      display:block;
      width:100%;
      min-height:44px;
      margin:0;
      padding:10px;
      border:1px solid #e1daef;
      border-radius:9px;
      background:#ffffff;
      color:#5424ff;
      font:inherit;
      font-size:12px;
      font-weight:750;
      white-space:normal;
      cursor:pointer;
    }

    .wn-color-status {
      margin:10px 0 0;
      color:#625b71;
      font-size:12px;
      line-height:1.5;
    }

    .wn-color-status[data-type="error"] {
      color:#b42318;
    }

    .wn-color-notice {
      margin:10px 0 0;
      color:#706780;
      font-size:11px;
      line-height:1.5;
    }

    .wn-color-customization button:focus-visible,
    .wn-color-customization input:focus-visible {
      outline:3px solid #5424ff;
      outline-offset:3px;
    }

    @media(max-width:600px) {

      .wn-color-customization {
        padding:12px;
        border-radius:13px;
      }

      .wn-color-palette {
        grid-template-columns:
          repeat(3,minmax(0,1fr));
        gap:7px;
      }

      .wn-color-customization
      .wn-color-swatch {
        min-height:78px;
      }

      .wn-color-customization
      .wn-color-apply {
        flex-basis:100%;
      }

    }

    @media(max-width:340px) {

      .wn-color-palette {
        grid-template-columns:
          repeat(2,minmax(0,1fr));
      }

    }

    @media print {

      .wn-color-customization {
        display:none!important;
      }

    }

  `;

  /* INSTALL STYLES */

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

  /* COLOR PALETTE */

  function getPalette() {

    if (!engineAvailable()) return [];

    return getEngine().colors

      .filter(item =>

        normalizeColor(item.value)

      )

      .map(item => ({

        id:item.id,

        value:normalizeColor(item.value),

        name:t(item.id)

      }));

  }

  function createSwatches() {

    const state =
      getEngine().getState();

    return getPalette().map(color => {

      const selected =

        color.value ===
        normalizeColor(state.accentColor);

      const checkColor =

        contrastRatio(
          "#ffffff",
          color.value
        ) >= 4.5

          ? "#ffffff"

          : "#111111";

      return `

        <button

          type="button"

          class="wn-color-swatch"

          data-wn-accent="${color.value}"

          aria-pressed="${selected}"

          aria-label="${escapeHTML(
            color.name + " " + color.value
          )}"

        >

          <span

            class="wn-color-circle"

            style="background:${color.value}"

            aria-hidden="true"

          >

            <span

              class="wn-color-check"

              style="color:${checkColor}"

              ${selected ? "" : "hidden"}

            >✓</span>

          </span>

          <span>

            ${escapeHTML(color.name)}

          </span>

        </button>

      `;

    }).join("");

  }

  /* STATUS CONTROLLER */

  function setStatus(key = "") {

    statusKey = key;

    if (!root) return;

    const status = root.querySelector(
      "[data-wn-color-status]"
    );

    if (!status) return;

    status.textContent = key ? t(key) : "";

    status.hidden = !key;

    status.dataset.type =

      key === "invalid"

        ? "error"

        : "info";

  }

  /* CONTRAST GUIDANCE */

  function updateContrast(color) {

    if (!root) return;

    const ratio = contrastRatio(color);

    if (ratio === null) return;

    const box = root.querySelector(
      "[data-wn-color-contrast]"
    );

    const value = root.querySelector(
      "[data-wn-contrast-value]"
    );

    const message = root.querySelector(
      "[data-wn-contrast-message]"
    );

    const readable = ratio >= 4.5;

    if (box) {

      box.dataset.level =

        readable ? "good" : "low";

    }

    if (value) {

      const formatted =
        new Intl.NumberFormat(
          getLanguage(),
          {
            minimumFractionDigits:2,
            maximumFractionDigits:2
          }
        ).format(ratio);

      value.textContent =

        t("contrast") +

        ": " +

        formatted +

        ":1";

    }

    if (message) {

      message.textContent = t(

        readable

          ? "contrastGood"

          : "contrastLow"

      );

    }

  }

  /* SYNCHRONIZE INTERFACE */

  function updateInterface() {

    if (!root || !engineAvailable()) {

      return false;

    }

    const state =
      getEngine().getState();

    const color =

      normalizeColor(state.accentColor) ||

      "#242424";

    const picker = root.querySelector(
      "[data-wn-color-picker]"
    );

    const hex = root.querySelector(
      "[data-wn-color-hex]"
    );

    const current = root.querySelector(
      "[data-wn-current-color]"
    );

    const currentValue = root.querySelector(
      "[data-wn-current-value]"
    );

    const exampleHeading = root.querySelector(
      "[data-wn-color-example-heading]"
    );

    const exampleLine = root.querySelector(
      "[data-wn-color-example-line]"
    );

    const atsNotice = root.querySelector(
      "[data-wn-ats-notice]"
    );

    if (picker) {

      picker.value = color;

    }

    if (hex) {

      hex.value = color.toUpperCase();

      hex.removeAttribute("aria-invalid");

    }

    if (current) {

      current.style.backgroundColor = color;

    }

    if (currentValue) {

      currentValue.textContent =
        color.toUpperCase();

    }

    if (exampleHeading) {

      exampleHeading.style.color = color;

    }

    if (exampleLine) {

      exampleLine.style.backgroundColor = color;

    }

    if (atsNotice) {

      atsNotice.hidden =

        state.templateId !== "ats";

    }

    root.querySelectorAll(
      "[data-wn-accent]"
    ).forEach(button => {

      const selected =

        button.dataset.wnAccent === color;

      button.setAttribute(

        "aria-pressed",

        String(selected)

      );

      const check = button.querySelector(
        ".wn-color-check"
      );

      if (check) {

        check.hidden = !selected;

      }

    });

    updateContrast(color);

    return true;

  }

  /* APPLY PROFESSIONAL COLOR */

  function applyColor(value, options = {}) {

    if (!engineAvailable()) return false;

    const color = normalizeColor(value);

    if (!color) {

      const hex = root?.querySelector(
        "[data-wn-color-hex]"
      );

      hex?.setAttribute(
        "aria-invalid",
        "true"
      );

      setStatus("invalid");

      return false;

    }

    getEngine().setAccentColor(color);

    updateInterface();

    if (options.announce !== false) {

      setStatus("applied");

    }

    return true;

  }

  /* RESTORE TEMPLATE DEFAULT COLOR */

  function restoreDefaultColor() {

    if (!engineAvailable()) return false;

    const engine = getEngine();

    const state = engine.getState();

    /*
     * Restore only the accent color.
     * Preserve the selected template.
     * Preserve all resume content.
     */

    engine.applyDesign({

      templateId:state.templateId,

      customColor:null

    });

    updateInterface();

    setStatus("restored");

    return true;

  }

  /* COMPLETE INTERFACE */

  function renderInterface() {

    if (!root) return false;

    installStyles();

    renderedLanguage = getLanguage();

    root.setAttribute(
      "aria-label",
      t("title")
    );

    if (!engineAvailable()) {

      root.innerHTML = `

        <p class="wn-color-status"
           role="status">

          ${escapeHTML(t("unavailable"))}

        </p>

      `;

      return false;

    }

    root.innerHTML = `

      <div class="wn-color-heading">

        <span class="wn-color-overline">

          ${escapeHTML(t("overline"))}

        </span>

        <h2>${escapeHTML(t("title"))}</h2>

        <p>${escapeHTML(t("description"))}</p>

      </div>

      <h3 class="wn-color-label">

        ${escapeHTML(t("palette"))}

      </h3>

      <div

        class="wn-color-palette"

        role="group"

        aria-label="${escapeHTML(t("palette"))}"

      >

        ${createSwatches()}

      </div>

      <div class="wn-color-custom-panel">

        <h3 class="wn-color-label">

          ${escapeHTML(t("custom"))}

        </h3>

        <div class="wn-color-input-row">

          <div class="wn-color-picker-wrap">

            <input

              type="color"

              data-wn-color-picker

              value="#242424"

              aria-label="${escapeHTML(t("picker"))}"

            >

          </div>

          <div class="wn-color-hex-wrap">

            <label for="wnCustomHexColor">

              ${escapeHTML(t("hex"))}

            </label>

            <input

              type="text"

              id="wnCustomHexColor"

              class="wn-color-hex"

              data-wn-color-hex

              maxlength="7"

              autocomplete="off"

              autocorrect="off"

              autocapitalize="characters"

              spellcheck="false"

              placeholder="#5424FF"

            >

          </div>

          <button

            type="button"

            class="wn-color-apply"

            data-wn-color-apply

          >

            ${escapeHTML(t("apply"))}

          </button>

        </div>

      </div>

      <div class="wn-color-current">

        <span

          class="wn-color-circle"

          data-wn-current-color

          aria-hidden="true"

        ></span>

        <div>

          <span class="wn-color-current-label">

            ${escapeHTML(t("current"))}

          </span>

          <strong

            class="wn-color-current-value"

            data-wn-current-value

          ></strong>

        </div>

      </div>

      <div class="wn-color-example">

        <strong

          class="wn-color-example-heading"

          data-wn-color-example-heading

        >

          ${escapeHTML(t("sample"))}

        </strong>

        <div

          class="wn-color-example-line"

          data-wn-color-example-line

          aria-hidden="true"

        ></div>

        <p>

          ${escapeHTML(t("sampleText"))}

        </p>

      </div>

      <div

        class="wn-color-contrast"

        data-wn-color-contrast

        aria-live="polite"

      >

        <strong data-wn-contrast-value></strong>

        <span data-wn-contrast-message></span>

      </div>

      <button

        type="button"

        class="wn-color-reset"

        data-wn-color-reset

      >

        ${escapeHTML(t("reset"))}

      </button>

      <p

        class="wn-color-status"

        data-wn-color-status

        role="status"

        aria-live="polite"

        hidden

      ></p>

      <p

        class="wn-color-notice"

        data-wn-ats-notice

        hidden

      >

        ${escapeHTML(t("atsNotice"))}

      </p>

      <p class="wn-color-notice">

        ${escapeHTML(t("persistence"))}

      </p>

    `;

    updateInterface();

    setStatus(statusKey);

    return true;

  }

  /* CLICK INTERACTIONS */

  function handleClick(event) {

    if (!(event.target instanceof Element)) {

      return;

    }

    const swatch = event.target.closest(
      "[data-wn-accent]"
    );

    if (swatch && root.contains(swatch)) {

      applyColor(
        swatch.dataset.wnAccent
      );

      return;

    }

    const apply = event.target.closest(
      "[data-wn-color-apply]"
    );

    if (apply && root.contains(apply)) {

      const hex = root.querySelector(
        "[data-wn-color-hex]"
      );

      applyColor(hex?.value);

      return;

    }

    const reset = event.target.closest(
      "[data-wn-color-reset]"
    );

    if (reset && root.contains(reset)) {

      restoreDefaultColor();

    }

  }

  /* COLOR PICKER EVENTS */

  function handleInput(event) {

    const element = event.target;

    if (

      element.matches?.(
        "[data-wn-color-picker]"
      )

    ) {

      applyColor(

        element.value,

        { announce:false }

      );

      return;

    }

    if (

      element.matches?.(
        "[data-wn-color-hex]"
      )

    ) {

      element.removeAttribute(
        "aria-invalid"
      );

      setStatus("");

    }

  }

  function handleChange(event) {

    if (

      event.target.matches?.(
        "[data-wn-color-picker]"
      )

    ) {

      applyColor(event.target.value);

    }

  }

  /* KEYBOARD SUPPORT */

  function handleKeydown(event) {

    if (

      event.key === "Enter" &&

      event.target.matches?.(
        "[data-wn-color-hex]"
      )

    ) {

      event.preventDefault();

      applyColor(event.target.value);

    }

  }

  /* MOUNTING API */

  function mount(
    target = "#" + ROOT_ID
  ) {

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
        "wn-color-customization"
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
        "input",
        handleInput
      );

      root.addEventListener(
        "change",
        handleChange
      );

      root.addEventListener(
        "keydown",
        handleKeydown
      );

    }

    const ready = renderInterface();

    if (ready) {

      document.dispatchEvent(

        new CustomEvent(

          "worknely:colorcustomizationready",

          {

            detail:{

              version:VERSION,

              colors:getPalette().length

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
      "input",
      handleInput
    );

    root.removeEventListener(
      "change",
      handleChange
    );

    root.removeEventListener(
      "keydown",
      handleKeydown
    );

    root.innerHTML = "";

    root.classList.remove(
      "wn-color-customization"
    );

    root.removeAttribute("role");

    root.removeAttribute("aria-label");

    root = null;

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

  /* TEMPLATE SYNCHRONIZATION */

  document.addEventListener(

    "worknely:templatechange",

    event => {

      if (!root) return;

      if (

        event.detail?.reason === "language"

      ) {

        refreshLanguage();

        return;

      }

      if (

        event.detail?.reason !== "color"

      ) {

        setStatus("");

      }

      updateInterface();

    }

  );

  /* AUTOMATIC MOUNT */

  function autoMount() {

    const element =
      document.getElementById(ROOT_ID);

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

      updateInterface();

    }

  );

  /* PUBLIC COLOR ENGINE API */

  window.WorknelyColorCustomization =
    Object.freeze({

      version:VERSION,

      mount,

      unmount,

      applyColor,

      restoreDefaultColor,

      normalizeColor,

      contrastRatio,

      getPalette,

      refresh:updateInterface,

      getState:() => ({

        version:VERSION,

        mounted:Boolean(root),

        accentColor:

          getEngine()?.getState()
            .accentColor || null

      })

    });

  /* INITIALIZATION */

  function initialize() {

    autoMount();

    console.info(

      "Worknely V" + VERSION +

      " Professional Color Customization ready."

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
 * END WORKNELY V7.16.4
 * PROFESSIONAL COLOR CUSTOMIZATION ENGINE
 */
