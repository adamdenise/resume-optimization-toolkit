/*
 * WORKNELY V7.21.2
 * International Privacy Center
 * Authentication-Aware Privacy Interface
 * Six International Languages
 * Responsive Privacy Architecture
 * WORKNELY — PEOPLE TECHNOLOGY
 */

(() => {
  "use strict";

  const VERSION = "7.21.2";
  const ROOT_ID = "wnPrivacyCenter";
  const MOUNT_ID = "wnPrivacyCenterMount";
  const STYLE_ID = "wnPrivacyCenterStyles";

  const LANGUAGES = Object.freeze([
    "en", "ro", "it", "de", "fr", "es"
  ]);

  const KEYS = [
    "title",
    "subtitle",
    "personal",
    "email",
    "inventory",
    "resumes",
    "career",
    "jobs",
    "export",
    "exportDescription",
    "preferences",
    "preferencesDescription",
    "policy",
    "terms",
    "delete",
    "deleteDescription",
    "coming",
    "signIn",
    "loading",
    "unavailable",
    "refresh",
    "recovery",
    "privacyNote",
    "account"
  ];

  const RAW = {
    en: [
      "Privacy Center",
      "Your data. Your privacy. Your control.",
      "Personal Data",
      "Email address",
      "Data Inventory",
      "Saved resumes",
      "Saved career analyses",
      "Job applications",
      "Export My Data",
      "Request a portable copy of your personal data.",
      "Privacy Preferences",
      "Manage applicable privacy preferences.",
      "Privacy Policy",
      "Terms of Service",
      "Delete My Account",
      "Request permanent deletion of your account and associated data.",
      "Not yet available",
      "Sign in to access your personal information.",
      "Verifying your account...",
      "Account information is currently unavailable.",
      "Refresh",
      "Complete account recovery before continuing.",
      "This center is under development. Export and deletion are not yet enabled.",
      "Account information"
    ],

    ro: [
      "Centru de confidențialitate",
      "Datele tale. Confidențialitatea ta. Controlul tău.",
      "Date personale",
      "Adresă de e-mail",
      "Inventarul datelor",
      "CV-uri salvate",
      "Analize profesionale salvate",
      "Candidaturi",
      "Exportă datele mele",
      "Solicită o copie portabilă a datelor personale.",
      "Preferințe de confidențialitate",
      "Gestionează preferințele de confidențialitate aplicabile.",
      "Politica de confidențialitate",
      "Termeni și condiții",
      "Șterge contul meu",
      "Solicită ștergerea permanentă a contului și a datelor asociate.",
      "Indisponibil momentan",
      "Autentifică-te pentru a accesa informațiile personale.",
      "Se verifică identitatea contului...",
      "Informațiile contului sunt momentan indisponibile.",
      "Actualizează",
      "Finalizează recuperarea contului înainte de a continua.",
      "Acest centru este în dezvoltare. Exportul și ștergerea nu sunt încă activate.",
      "Informațiile contului"
    ],

    it: [
      "Centro privacy",
      "I tuoi dati. La tua privacy. Il tuo controllo.",
      "Dati personali",
      "Indirizzo e-mail",
      "Inventario dei dati",
      "CV salvati",
      "Analisi professionali salvate",
      "Candidature",
      "Esporta i miei dati",
      "Richiedi una copia portabile dei tuoi dati personali.",
      "Preferenze sulla privacy",
      "Gestisci le preferenze sulla privacy applicabili.",
      "Informativa sulla privacy",
      "Termini di servizio",
      "Elimina il mio account",
      "Richiedi la cancellazione permanente del tuo account e dei dati associati.",
      "Non ancora disponibile",
      "Accedi per consultare le tue informazioni personali.",
      "Verifica dell'account...",
      "Le informazioni dell'account non sono disponibili.",
      "Aggiorna",
      "Completa il recupero dell'account prima di continuare.",
      "Questo centro è in sviluppo. Esportazione e cancellazione non sono ancora attive.",
      "Informazioni dell'account"
    ],

    de: [
      "Datenschutzcenter",
      "Deine Daten. Deine Privatsphäre. Deine Kontrolle.",
      "Personenbezogene Daten",
      "E-Mail-Adresse",
      "Datenübersicht",
      "Gespeicherte Lebensläufe",
      "Gespeicherte Karriereanalysen",
      "Bewerbungen",
      "Meine Daten exportieren",
      "Fordere eine portable Kopie deiner personenbezogenen Daten an.",
      "Datenschutzeinstellungen",
      "Verwalte deine anwendbaren Datenschutzeinstellungen.",
      "Datenschutzerklärung",
      "Nutzungsbedingungen",
      "Mein Konto löschen",
      "Beantrage die dauerhafte Löschung deines Kontos und der zugehörigen Daten.",
      "Noch nicht verfügbar",
      "Melde dich an, um deine persönlichen Informationen aufzurufen.",
      "Konto wird überprüft...",
      "Kontoinformationen sind derzeit nicht verfügbar.",
      "Aktualisieren",
      "Schließe zuerst die Kontowiederherstellung ab.",
      "Dieses Center befindet sich in Entwicklung. Export und Löschung sind noch nicht aktiviert.",
      "Kontoinformationen"
    ],

    fr: [
      "Centre de confidentialité",
      "Vos données. Votre confidentialité. Votre contrôle.",
      "Données personnelles",
      "Adresse e-mail",
      "Inventaire des données",
      "CV enregistrés",
      "Analyses de carrière enregistrées",
      "Candidatures",
      "Exporter mes données",
      "Demandez une copie portable de vos données personnelles.",
      "Préférences de confidentialité",
      "Gérez les préférences de confidentialité applicables.",
      "Politique de confidentialité",
      "Conditions d'utilisation",
      "Supprimer mon compte",
      "Demandez la suppression définitive de votre compte et des données associées.",
      "Pas encore disponible",
      "Connectez-vous pour accéder à vos informations personnelles.",
      "Vérification du compte...",
      "Les informations du compte sont indisponibles.",
      "Actualiser",
      "Terminez la récupération du compte avant de continuer.",
      "Ce centre est en développement. L'exportation et la suppression ne sont pas encore activées.",
      "Informations du compte"
    ],

    es: [
      "Centro de privacidad",
      "Tus datos. Tu privacidad. Tu control.",
      "Datos personales",
      "Dirección de correo electrónico",
      "Inventario de datos",
      "Currículums guardados",
      "Análisis profesionales guardados",
      "Candidaturas",
      "Exportar mis datos",
      "Solicita una copia portátil de tus datos personales.",
      "Preferencias de privacidad",
      "Gestiona las preferencias de privacidad aplicables.",
      "Política de privacidad",
      "Términos del servicio",
      "Eliminar mi cuenta",
      "Solicita la eliminación permanente de tu cuenta y los datos asociados.",
      "Todavía no disponible",
      "Inicia sesión para acceder a tu información personal.",
      "Verificando tu cuenta...",
      "La información de la cuenta no está disponible.",
      "Actualizar",
      "Completa la recuperación de la cuenta antes de continuar.",
      "Este centro está en desarrollo. La exportación y la eliminación aún no están activadas.",
      "Información de la cuenta"
    ]
  };

  const DICTIONARY = Object.freeze(
    Object.fromEntries(
      LANGUAGES.map(language => [
        language,
        Object.freeze(
          Object.fromEntries(
            KEYS.map((key, index) => [
              key, RAW[language][index]
            ])
          )
        )
      ])
    )
  );

  let root = null;
  let client = null;
  let subscription = null;
  let owner = null;
  let account = null;
  let counts = null;
  let generation = 0;
  let loading = false;
  let recovery = false;
  let suspended = false;
  let error = false;
  let scheduled = false;

  function getLanguage() {
    const value =
      window.WorknelyLocalization?.getLanguage() ||
      document.getElementById("language")?.value ||
      document.documentElement.lang ||
      "en";

    const language = String(value)
      .toLowerCase()
      .split("-")[0];

    return LANGUAGES.includes(language)
      ? language
      : "en";
  }

  function t(key) {
    return DICTIONARY[getLanguage()][key] ||
      DICTIONARY.en[key] ||
      key;
  }

  function node(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text !== undefined) {
      element.textContent = String(text);
    }

    return element;
  }

  function getClient() {
    const value = window.worknelySupabase;

    return value?.auth?.getUser &&
      typeof value.from === "function"
      ? value
      : null;
  }

  function recoveryActive() {
    const update =
      document.getElementById("wnUpdatePassword");

    return recovery ||
      Boolean(update && !update.hidden);
  }

  function clear() {
    generation++;
    account = null;
    counts = null;
    loading = false;
    error = false;
    render();
  }

  function scheduleRefresh() {
    if (scheduled || suspended) return;

    scheduled = true;

    setTimeout(() => {
      scheduled = false;

      if (!suspended && !recoveryActive()) {
        refresh();
      }
    }, 0);
  }

  function bindAuthentication() {
    const next = getClient();

    if (!next) return false;

    if (client === next && subscription) {
      return true;
    }

    subscription?.unsubscribe?.();

    client = next;
    owner = null;
    clear();

    const bindingClient = next;

    const response = next.auth.onAuthStateChange(
      (event, session) => {

        if (client !== bindingClient) return;

        if (event === "PASSWORD_RECOVERY") {
          recovery = true;
          owner = null;
          clear();
          return;
        }

        if (event === "SIGNED_OUT") {
          recovery = false;
          owner = null;
          clear();
          return;
        }

        const nextOwner =
          session?.user?.id || null;

        const changed = nextOwner !== owner;

        if (changed) {
          owner = nextOwner;
          clear();
        }

        if (
          nextOwner &&
          !recoveryActive() &&
          (
            changed ||
            event === "INITIAL_SESSION" ||
            event === "SIGNED_IN"
          )
        ) {
          scheduleRefresh();
        }
      }
    );

    subscription =
      response?.data?.subscription || null;

    return Boolean(subscription);
  }

  async function countRecords(
    activeClient,
    table,
    userId
  ) {
    const result = await activeClient
      .from(table)
      .select("id", {
        count: "exact",
        head: true
      })
      .eq("user_id", userId);

    if (
      result.error ||
      !Number.isSafeInteger(result.count) ||
      result.count < 0
    ) {
      return null;
    }

    return result.count;
  }

  async function refresh() {
    if (suspended || recoveryActive()) {
      clear();
      return false;
    }

    if (!bindAuthentication()) {
      error = true;
      render();
      return false;
    }

    const activeClient = client;
    const ticket = ++generation;

    account = null;
    counts = null;
    error = false;
    loading = true;

    render();

    function valid() {
      return ticket === generation &&
        client === activeClient &&
        !suspended &&
        !recoveryActive();
    }

    try {
      const initial =
        await activeClient.auth.getUser();

      if (!valid()) return false;

      const user = initial.data?.user;

      if (initial.error) {
        error = true;
        return false;
      }

      if (!user?.id) {
        owner = null;
        return false;
      }

      if (owner && owner !== user.id) {
        owner = null;
        error = true;
        return false;
      }

      owner = user.id;

      const results = await Promise.allSettled([
        countRecords(
          activeClient,
          "resumes",
          user.id
        ),
        countRecords(
          activeClient,
          "career_analyses",
          user.id
        ),
        countRecords(
          activeClient,
          "job_applications",
          user.id
        )
      ]);

      if (!valid()) return false;

      const verified =
        await activeClient.auth.getUser();

      if (
        !valid() ||
        verified.error ||
        verified.data?.user?.id !== user.id ||
        owner !== user.id
      ) {
        if (valid()) error = true;
        return false;
      }

      account = Object.freeze({
        email: String(
          verified.data.user.email || ""
        ).slice(0, 320)
      });

      const value = index =>
        results[index].status === "fulfilled"
          ? results[index].value
          : null;

      counts = Object.freeze({
        resumes: value(0),
        career: value(1),
        jobs: value(2)
      });

      return true;

    } catch {
      if (valid()) {
        error = true;
      }

      return false;

    } finally {
      if (ticket === generation) {
        loading = false;
        render();
      }
    }
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = node("style");
    style.id = STYLE_ID;

    style.textContent = `
      #wnPrivacyCenter {
        width:100%;
        max-width:100%;
        min-width:0;
        color:#241442;
        font-family:inherit;
      }

      #wnPrivacyCenter,
      #wnPrivacyCenter * {
        box-sizing:border-box;
      }

      #wnPrivacyCenter .wnpc-hero {
        padding:clamp(18px,4vw,32px);
        border:1px solid #e6dcff;
        border-radius:20px;
        background:linear-gradient(
          125deg,#f7f2ff,#fff0fa
        );
        margin-bottom:16px;
      }

      #wnPrivacyCenter .wnpc-brand {
        color:#7138ed;
        font-size:11px;
        font-weight:800;
        letter-spacing:1.6px;
      }

      #wnPrivacyCenter h2 {
        margin:10px 0 6px;
        font-size:clamp(24px,5vw,34px);
        line-height:1.2;
        overflow-wrap:anywhere;
      }

      #wnPrivacyCenter h3 {
        font-size:16px;
        margin:0 0 12px;
        overflow-wrap:anywhere;
      }

      #wnPrivacyCenter p {
        margin:5px 0;
        line-height:1.6;
        font-size:13px;
        overflow-wrap:anywhere;
      }

      #wnPrivacyCenter .wnpc-grid {
        display:grid;
        grid-template-columns:
          repeat(2,minmax(0,1fr));
        gap:12px;
        margin:12px 0;
      }

      #wnPrivacyCenter .wnpc-card {
        background:#fff;
        border:1px solid #e8e1f6;
        border-radius:15px;
        padding:16px;
        min-width:0;
        overflow-wrap:anywhere;
      }

      #wnPrivacyCenter .wnpc-email {
        font-size:15px;
        font-weight:650;
        overflow-wrap:anywhere;
        user-select:text;
      }

      #wnPrivacyCenter .wnpc-metric {
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:12px;
        padding:10px 0;
        border-bottom:1px solid #eee8f8;
        font-size:13px;
      }

      #wnPrivacyCenter .wnpc-value {
        color:#7138ed;
        font-weight:800;
        font-size:18px;
        flex-shrink:0;
      }

      #wnPrivacyCenter .wnpc-button {
        display:inline-flex;
        align-items:center;
        justify-content:center;
        min-height:44px;
        width:100%;
        padding:10px 14px;
        margin-top:12px;
        border:0;
        border-radius:10px;
        background:#7138ed;
        color:#fff;
        font-family:inherit;
        font-size:13px;
        font-weight:700;
        white-space:normal;
        cursor:pointer;
      }

      #wnPrivacyCenter .wnpc-button:disabled {
        background:#f0edf5;
        color:#6c6478;
        cursor:not-allowed;
      }

      #wnPrivacyCenter .wnpc-button:focus-visible {
        outline:3px solid #7138ed;
        outline-offset:3px;
      }

      #wnPrivacyCenter .wnpc-danger {
        border-color:#fecdd3;
        background:#fffafb;
      }

      #wnPrivacyCenter .wnpc-danger h3 {
        color:#b42332;
      }

      #wnPrivacyCenter .wnpc-note {
        padding:12px;
        border-radius:12px;
        background:#f5f1ff;
        color:#574775;
        margin:12px 0;
      }

      @media(max-width:700px) {
        #wnPrivacyCenter .wnpc-grid {
          grid-template-columns:minmax(0,1fr);
        }
      }

      @media print {
        #wnPrivacyCenter {
          display:none!important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function card(title, description, danger) {
    const element = node(
      "section",
      "wnpc-card" +
      (danger ? " wnpc-danger" : "")
    );

    element.appendChild(
      node("h3", "", title)
    );

    if (description) {
      element.appendChild(
        node("p", "", description)
      );
    }

    return element;
  }

  function button(label, disabled, handler) {
    const element = node(
      "button",
      "wnpc-button",
      label
    );

    element.type = "button";
    element.disabled = disabled;

    if (!disabled && handler) {
      element.addEventListener(
        "click",
        handler
      );
    }

    return element;
  }

  function metric(label, value) {
    const element = node(
      "div",
      "wnpc-metric"
    );

    element.append(
      node("span", "", label),
      node(
        "strong",
        "wnpc-value",
        value === null ||
        value === undefined
          ? "—"
          : new Intl.NumberFormat(
              getLanguage()
            ).format(value)
      )
    );

    return element;
  }

  function render() {
    if (!root?.isConnected || suspended) {
      return;
    }

    root.replaceChildren();
    root.lang = getLanguage();

    root.setAttribute(
      "aria-busy",
      String(loading)
    );

    const hero = node(
      "header",
      "wnpc-hero"
    );

    hero.append(
      node(
        "div",
        "wnpc-brand",
        "WORKNELY PRIVACY"
      ),
      node("h2", "", t("title")),
      node("p", "", t("subtitle"))
    );

    root.appendChild(hero);

    if (recoveryActive()) {
      root.appendChild(
        node(
          "p",
          "wnpc-note",
          t("recovery")
        )
      );

      return;
    }

    if (loading) {
      const status = node(
        "p",
        "wnpc-note",
        t("loading")
      );

      status.setAttribute("role", "status");

      root.appendChild(status);
      return;
    }

    if (!account || !owner) {
      root.append(
        node(
          "p",
          "wnpc-note",
          error
            ? t("unavailable")
            : t("signIn")
        ),
        button(
          t("refresh"),
          false,
          refresh
        )
      );

      return;
    }

    const personal = card(t("personal"));

    personal.append(
      node("p", "", t("email")),
      node(
        "div",
        "wnpc-email",
        account.email || "—"
      )
    );

    const inventory = card(t("inventory"));

    inventory.append(
      metric(
        t("resumes"),
        counts?.resumes
      ),
      metric(
        t("career"),
        counts?.career
      ),
      metric(
        t("jobs"),
        counts?.jobs
      )
    );

    const overview = node(
      "div",
      "wnpc-grid"
    );

    overview.append(personal, inventory);

    root.appendChild(overview);

    const features = node(
      "div",
      "wnpc-grid"
    );

    const definitions = [
      ["export", "exportDescription"],
      ["preferences", "preferencesDescription"],
      ["policy", null],
      ["terms", null],
      ["delete", "deleteDescription"]
    ];

    definitions.forEach(([key, description]) => {
      const element = card(
        t(key),
        description
          ? t(description)
          : "",
        key === "delete"
      );

      element.appendChild(
        button(
          t("coming"),
          true
        )
      );

      features.appendChild(element);
    });

    root.append(
      features,
      node(
        "p",
        "wnpc-note",
        t("privacyNote")
      ),
      button(
        t("refresh"),
        false,
        refresh
      )
    );
  }

  function mount(target) {
    const container =
      typeof target === "string"
        ? document.querySelector(target)
        : target instanceof HTMLElement
          ? target
          : document.getElementById(MOUNT_ID);

    if (!container) return false;

    installStyles();

    root = document.getElementById(ROOT_ID);

    if (!root) {
      root = node("section");
      root.id = ROOT_ID;
    }

    if (root.parentElement !== container) {
      container.appendChild(root);
    }

    render();

    return true;
  }

  function initialize() {
    if (suspended) return false;

    if (!mount()) return false;

    bindAuthentication();

    if (
      !account &&
      !loading &&
      !recoveryActive()
    ) {
      scheduleRefresh();
    }

    return true;
  }

  function handleDataChange(event) {
    if (
      owner &&
      event.detail?.userId === owner
    ) {
      scheduleRefresh();
    }
  }

  function getState() {
    return {
      version: VERSION,
      mounted: Boolean(root?.isConnected),
      authenticated: Boolean(
        owner && account &&
        !recoveryActive() &&
        !suspended
      ),
      loading,
      recoveryMode: recoveryActive(),
      language: getLanguage(),
      supportedLanguages: [...LANGUAGES],
      readOnly: true,
      exportEnabled: false,
      deletionEnabled: false,
      localDataStorage: false
    };
  }

  function selfTest() {
    const checks = LANGUAGES.map(language => ({
      name: "Dictionary: " + language,
      passed: KEYS.every(key =>
        typeof DICTIONARY[language][key] === "string" &&
        DICTIONARY[language][key].length > 0
      )
    }));

    checks.push(
      {
        name: "Export disabled",
        passed: getState().exportEnabled === false
      },
      {
        name: "Deletion disabled",
        passed: getState().deletionEnabled === false
      },
      {
        name: "Read-only module",
        passed: getState().readOnly === true
      }
    );

    return {
      version: VERSION,
      total: checks.length,
      passed: checks.filter(
        check => check.passed
      ).length,
      checks,
      liveDatabaseTested: false
    };
  }

  document.addEventListener(
    "worknely:languagechange",
    render
  );

  document.addEventListener(
    "worknely:localizationready",
    render
  );

  document.addEventListener(
    "worknely:workspacechange",
    initialize
  );

  document.addEventListener(
    "worknely:careerhistorychange",
    handleDataChange
  );

  document.addEventListener(
    "worknely:jobapplicationschange",
    handleDataChange
  );

  document.addEventListener(
    "change",
    event => {
      if (event.target?.id === "language") {
        render();
      }
    }
  );

  window.addEventListener("pagehide", () => {
    suspended = true;
    owner = null;
    clear();
    root?.replaceChildren();
  });

  window.addEventListener("pageshow", () => {
    suspended = false;
    initialize();
  });

  window.WorknelyPrivacyCenter = Object.freeze({
    version: VERSION,
    mount,
    initialize,
    refresh,
    clear,
    getState,
    selfTest
  });

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      { once: true }
    );
  } else {
    initialize();
  }

  window.addEventListener(
    "load",
    initialize,
    { once: true }
  );

  document.dispatchEvent(
    new CustomEvent(
      "worknely:privacycenterready",
      {
        detail: {
          version: VERSION
        }
      }
    )
  );

})();

/*
 * END WORKNELY V7.21.2
 * INTERNATIONAL PRIVACY CENTER
 * WORKNELY — PEOPLE TECHNOLOGY
 */
