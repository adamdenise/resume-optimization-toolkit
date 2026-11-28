/**
 * WORKNELY
 * Privacy Preferences User Interface
 * Version: 7.21.5.4
 * Storage Engine: 7.21.5.3
 *
 * EN / RO / IT / DE / FR / ES
 * Explicit consent only.
 * No direct database writes.
 * No persistent browser storage.
 * Explicit mounting required.
 */

(function () {
  "use strict";

  if (window.WorknelyPrivacyPreferencesUI) return;

  const VERSION = "7.21.5.4";
  const ENGINE_VERSION = "7.21.5.3";
  const ROOT_ID = "wnPrivacyPreferencesUI";
  const STYLE_ID = "wnPrivacyPreferencesUIStyle";

  const FIELDS = Object.freeze([
    "analytics_consent",
    "personalization_consent",
    "marketing_consent"
  ]);

  const LANGUAGES = Object.freeze([
    "en", "ro", "it", "de", "fr", "es"
  ]);

  const UUID_PATTERN =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  // 01. International localization

  const TEXT = {

    en: {
      title: "Privacy Preferences",
      description: "Manage your optional privacy choices.",
      essential: "Essential services",
      essentialDesc: "Required for account security and core functionality.",
      required: "Required",
      analytics: "Analytics",
      analyticsDesc: "Allow optional analytics to help improve Worknely.",
      personalization: "Personalization",
      personalizationDesc: "Allow optional personalization of your experience.",
      marketing: "Marketing",
      marketingDesc: "Allow optional marketing communications.",
      save: "Save preferences",
      withdraw: "Withdraw all optional consent",
      reload: "Load preferences",
      loading: "Loading preferences...",
      saving: "Saving preferences...",
      saved: "Your preferences have been saved.",
      withdrawn: "All optional consents have been withdrawn.",
      ready: "Your saved preferences are displayed.",
      defaults: "No preferences saved. Optional consent is off.",
      signIn: "Sign in to manage your preferences.",
      error: "Unable to complete the operation. Reload and try again.",
      changed: "Your session or preferences changed. Reload to continue.",
      unavailable: "Privacy preferences are temporarily unavailable.",
      outdated: "Review and save your choices for the current consent version.",
      unsaved: "You have unsaved changes.",
      notice: "Optional choices can be changed or withdrawn at any time.",
      version: "Consent version",
      updated: "Last updated",
      never: "Not saved yet"
    },

    ro: {
      title: "Preferințe de confidențialitate",
      description: "Administrează opțiunile tale de confidențialitate.",
      essential: "Servicii esențiale",
      essentialDesc: "Necesare pentru securitatea contului și funcțiile de bază.",
      required: "Necesar",
      analytics: "Analiză statistică",
      analyticsDesc: "Permite analize statistice opționale pentru îmbunătățirea Worknely.",
      personalization: "Personalizare",
      personalizationDesc: "Permite personalizarea opțională a experienței tale.",
      marketing: "Marketing",
      marketingDesc: "Permite comunicările comerciale opționale.",
      save: "Salvează preferințele",
      withdraw: "Retrage toate consimțămintele opționale",
      reload: "Încarcă preferințele",
      loading: "Se încarcă preferințele...",
      saving: "Se salvează preferințele...",
      saved: "Preferințele tale au fost salvate.",
      withdrawn: "Toate consimțămintele opționale au fost retrase.",
      ready: "Preferințele salvate sunt afișate.",
      defaults: "Nu există preferințe salvate. Consimțămintele opționale sunt dezactivate.",
      signIn: "Autentifică-te pentru a administra preferințele.",
      error: "Operațiunea nu a putut fi finalizată. Reîncarcă și încearcă din nou.",
      changed: "Sesiunea sau preferințele s-au schimbat. Reîncarcă pentru a continua.",
      unavailable: "Preferințele sunt temporar indisponibile.",
      outdated: "Revizuiește și salvează opțiunile pentru versiunea actuală.",
      unsaved: "Ai modificări nesalvate.",
      notice: "Opțiunile pot fi modificate sau retrase oricând.",
      version: "Versiunea consimțământului",
      updated: "Ultima actualizare",
      never: "Nesalvat încă"
    },

    it: {
      title: "Preferenze sulla privacy",
      description: "Gestisci le tue preferenze facoltative.",
      essential: "Servizi essenziali",
      essentialDesc: "Necessari per la sicurezza dell'account e le funzioni principali.",
      required: "Necessario",
      analytics: "Analisi statistiche",
      analyticsDesc: "Consenti analisi facoltative per migliorare Worknely.",
      personalization: "Personalizzazione",
      personalizationDesc: "Consenti la personalizzazione facoltativa della tua esperienza.",
      marketing: "Marketing",
      marketingDesc: "Consenti comunicazioni commerciali facoltative.",
      save: "Salva preferenze",
      withdraw: "Revoca tutti i consensi facoltativi",
      reload: "Carica preferenze",
      loading: "Caricamento delle preferenze...",
      saving: "Salvataggio delle preferenze...",
      saved: "Le tue preferenze sono state salvate.",
      withdrawn: "Tutti i consensi facoltativi sono stati revocati.",
      ready: "Le preferenze salvate sono visualizzate.",
      defaults: "Nessuna preferenza salvata. I consensi facoltativi sono disattivati.",
      signIn: "Accedi per gestire le tue preferenze.",
      error: "Impossibile completare l'operazione. Ricarica e riprova.",
      changed: "Sessione o preferenze modificate. Ricarica per continuare.",
      unavailable: "Preferenze temporaneamente non disponibili.",
      outdated: "Rivedi e salva le scelte per la versione attuale.",
      unsaved: "Sono presenti modifiche non salvate.",
      notice: "Puoi modificare o revocare le scelte in qualsiasi momento.",
      version: "Versione del consenso",
      updated: "Ultimo aggiornamento",
      never: "Non ancora salvato"
    },

    de: {
      title: "Datenschutzeinstellungen",
      description: "Verwalte deine optionalen Datenschutzeinstellungen.",
      essential: "Notwendige Dienste",
      essentialDesc: "Erforderlich für Kontosicherheit und grundlegende Funktionen.",
      required: "Erforderlich",
      analytics: "Analyse",
      analyticsDesc: "Erlaube optionale Analysen zur Verbesserung von Worknely.",
      personalization: "Personalisierung",
      personalizationDesc: "Erlaube die optionale Personalisierung deiner Nutzung.",
      marketing: "Marketing",
      marketingDesc: "Erlaube optionale Marketingmitteilungen.",
      save: "Einstellungen speichern",
      withdraw: "Alle optionalen Einwilligungen widerrufen",
      reload: "Einstellungen laden",
      loading: "Einstellungen werden geladen...",
      saving: "Einstellungen werden gespeichert...",
      saved: "Deine Einstellungen wurden gespeichert.",
      withdrawn: "Alle optionalen Einwilligungen wurden widerrufen.",
      ready: "Gespeicherte Einstellungen werden angezeigt.",
      defaults: "Keine Einstellungen gespeichert. Optionale Einwilligungen sind deaktiviert.",
      signIn: "Melde dich an, um deine Einstellungen zu verwalten.",
      error: "Vorgang fehlgeschlagen. Neu laden und erneut versuchen.",
      changed: "Sitzung oder Einstellungen geändert. Bitte neu laden.",
      unavailable: "Einstellungen vorübergehend nicht verfügbar.",
      outdated: "Prüfe und speichere deine Auswahl für die aktuelle Version.",
      unsaved: "Du hast ungespeicherte Änderungen.",
      notice: "Optionale Einwilligungen können jederzeit widerrufen werden.",
      version: "Einwilligungsversion",
      updated: "Letzte Aktualisierung",
      never: "Noch nicht gespeichert"
    },

    fr: {
      title: "Préférences de confidentialité",
      description: "Gérez vos choix facultatifs de confidentialité.",
      essential: "Services essentiels",
      essentialDesc: "Nécessaires à la sécurité du compte et aux fonctions principales.",
      required: "Nécessaire",
      analytics: "Statistiques",
      analyticsDesc: "Autoriser les analyses facultatives pour améliorer Worknely.",
      personalization: "Personnalisation",
      personalizationDesc: "Autoriser la personnalisation facultative de votre expérience.",
      marketing: "Marketing",
      marketingDesc: "Autoriser les communications commerciales facultatives.",
      save: "Enregistrer les préférences",
      withdraw: "Retirer tous les consentements facultatifs",
      reload: "Charger les préférences",
      loading: "Chargement des préférences...",
      saving: "Enregistrement des préférences...",
      saved: "Vos préférences ont été enregistrées.",
      withdrawn: "Tous les consentements facultatifs ont été retirés.",
      ready: "Vos préférences enregistrées sont affichées.",
      defaults: "Aucune préférence enregistrée. Les consentements facultatifs sont désactivés.",
      signIn: "Connectez-vous pour gérer vos préférences.",
      error: "Impossible de terminer l'opération. Rechargez et réessayez.",
      changed: "Session ou préférences modifiées. Rechargez pour continuer.",
      unavailable: "Préférences temporairement indisponibles.",
      outdated: "Vérifiez et enregistrez vos choix pour la version actuelle.",
      unsaved: "Vous avez des modifications non enregistrées.",
      notice: "Vous pouvez modifier ou retirer vos choix à tout moment.",
      version: "Version du consentement",
      updated: "Dernière mise à jour",
      never: "Pas encore enregistré"
    },

    es: {
      title: "Preferencias de privacidad",
      description: "Gestiona tus opciones de privacidad.",
      essential: "Servicios esenciales",
      essentialDesc: "Necesarios para la seguridad de la cuenta y las funciones principales.",
      required: "Necesario",
      analytics: "Análisis",
      analyticsDesc: "Permite análisis opcionales para mejorar Worknely.",
      personalization: "Personalización",
      personalizationDesc: "Permite la personalización opcional de tu experiencia.",
      marketing: "Marketing",
      marketingDesc: "Permite comunicaciones comerciales opcionales.",
      save: "Guardar preferencias",
      withdraw: "Retirar todos los consentimientos opcionales",
      reload: "Cargar preferencias",
      loading: "Cargando preferencias...",
      saving: "Guardando preferencias...",
      saved: "Tus preferencias se han guardado.",
      withdrawn: "Todos los consentimientos opcionales se han retirado.",
      ready: "Se muestran tus preferencias guardadas.",
      defaults: "No hay preferencias guardadas. Los consentimientos opcionales están desactivados.",
      signIn: "Inicia sesión para gestionar tus preferencias.",
      error: "No se pudo completar la operación. Recarga e inténtalo de nuevo.",
      changed: "La sesión o las preferencias cambiaron. Recarga para continuar.",
      unavailable: "Preferencias temporalmente no disponibles.",
      outdated: "Revisa y guarda tus opciones para la versión actual.",
      unsaved: "Tienes cambios sin guardar.",
      notice: "Puedes modificar o retirar tus opciones en cualquier momento.",
      version: "Versión del consentimiento",
      updated: "Última actualización",
      never: "Todavía no guardado"
    }
  };

  Object.values(TEXT).forEach(Object.freeze);
  Object.freeze(TEXT);

  // 02. Private in-memory state

  let root = null;
  let authSubscription = null;
  let boundClient = null;
  let language = "en";
  let owner = null;
  let baseline = null;
  let draft = null;
  let loaded = false;
  let exists = false;
  let busy = false;
  let generation = 0;
  let status = "signIn";
  let statusType = "neutral";
  let ownWrite = false;
  let disposed = true;

  function normalizeLanguage(value) {
    const code = String(value || "en")
      .toLowerCase()
      .split(/[-_]/)[0];

    return LANGUAGES.includes(code)
      ? code
      : "en";
  }

  function t(key) {
    return TEXT[language][key] || TEXT.en[key] || "";
  }

  function defaults() {
    return {
      analytics_consent: false,
      personalization_consent: false,
      marketing_consent: false
    };
  }

  function valuesFrom(row) {
    const result = defaults();

    for (const field of FIELDS) {
      result[field] = row?.[field] === true;
    }

    return result;
  }

  function dirty() {
    if (!loaded || !baseline || !draft) return false;

    return FIELDS.some(
      field => draft[field] !== baseline[field]
    );
  }

  // 03. Existing infrastructure

  function getEngine() {
    const engine = window.WorknelyPrivacyPreferences;

    if (
      !engine ||
      engine.version !== ENGINE_VERSION ||
      typeof engine.load !== "function" ||
      typeof engine.save !== "function" ||
      typeof engine.withdrawAll !== "function" ||
      typeof engine.clear !== "function" ||
      typeof engine.getState !== "function"
    ) {
      throw new Error("ENGINE_UNAVAILABLE");
    }

    return engine;
  }

  function getClient() {
    const client = window.worknelySupabase;

    if (
      !client?.auth ||
      typeof client.auth.getUser !== "function" ||
      typeof client.auth.getSession !== "function" ||
      typeof client.auth.onAuthStateChange !== "function"
    ) {
      throw new Error("AUTH_UNAVAILABLE");
    }

    return client;
  }

  function setStatus(key, type = "neutral") {
    status = key;
    statusType = type;
  }

  async function verifyIdentity(client) {
    const response = await client.auth.getUser();

    const uid = response.data?.user?.id;

    if (
      response.error ||
      typeof uid !== "string" ||
      !UUID_PATTERN.test(uid)
    ) {
      throw new Error("SIGN_IN_REQUIRED");
    }

    const session = await client.auth.getSession();

    if (
      session.error ||
      !session.data?.session?.access_token ||
      session.data.session.user?.id !== uid
    ) {
      throw new Error("INVALID_SESSION");
    }

    return uid;
  }

  // 04. Session continuity

  function assertCurrent(token, uid, client) {
    if (
      disposed ||
      generation !== token ||
      window.worknelySupabase !== client ||
      boundClient !== client ||
      (owner !== null && owner !== uid)
    ) {
      throw new Error("SESSION_CHANGED");
    }
  }

  function invalidate(key = "changed") {
    generation += 1;

    owner = null;
    baseline = null;
    draft = null;
    loaded = false;
    exists = false;

    setStatus(key);

    try {
      getEngine().clear();
    } catch {
      // No storage operation is started here.
    }

    render();
  }

  function bindAuth() {
    const client = getClient();

    if (boundClient === client && authSubscription) {
      return client;
    }

    if (authSubscription) {
      authSubscription.unsubscribe();
      authSubscription = null;
    }

    if (boundClient && boundClient !== client) {
      invalidate();
    }

    boundClient = client;

    const response = client.auth.onAuthStateChange(
      (event, session) => {
        if (disposed || boundClient !== client) return;

        const uid = session?.user?.id || null;

        if (event === "SIGNED_OUT") {
          invalidate("signIn");
          return;
        }

        if (
          event === "PASSWORD_RECOVERY" ||
          (owner && uid !== owner)
        ) {
          invalidate("changed");
          return;
        }

        if (!busy && !loaded && uid) {
          setStatus("defaults");
          render();
        }
      }
    );

    authSubscription = response.data?.subscription;

    if (!authSubscription) {
      boundClient = null;
      throw new Error("AUTH_UNAVAILABLE");
    }

    return client;
  }

  // 05. Scoped DOM utilities

  function element(tag, className, content) {
    const node = document.createElement(tag);

    if (className) node.className = className;

    if (content !== undefined) {
      node.textContent = String(content);
    }

    return node;
  }

  function button(label, className, action, disabled) {
    const node = element("button", className, label);

    node.type = "button";
    node.disabled = Boolean(disabled);

    node.addEventListener("click", action);

    return node;
  }

  // 06. Isolated visual styles

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");

    style.id = STYLE_ID;

    style.textContent = `
      #wnPrivacyPreferencesUI {
        box-sizing: border-box;
        width: 100%;
        min-width: 0;
        padding: clamp(16px, 4vw, 28px);
        border: 1px solid #e7e4ef;
        border-radius: 22px;
        background: #ffffff;
        color: #201a32;
        font-family: Inter, system-ui, -apple-system,
          BlinkMacSystemFont, "Segoe UI", sans-serif;
        line-height: 1.55;
        overflow-wrap: anywhere;
      }

      #wnPrivacyPreferencesUI *,
      #wnPrivacyPreferencesUI *::before,
      #wnPrivacyPreferencesUI *::after {
        box-sizing: border-box;
      }

      #wnPrivacyPreferencesUI .wnpp-title {
        margin: 0 0 8px;
        font-size: clamp(21px, 4vw, 27px);
        font-weight: 750;
        line-height: 1.3;
      }

      #wnPrivacyPreferencesUI .wnpp-description {
        margin: 0 0 20px;
        color: #625b73;
        font-size: 15px;
      }

      #wnPrivacyPreferencesUI .wnpp-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 17px 0;
        border-bottom: 1px solid #eceaf1;
      }

      #wnPrivacyPreferencesUI .wnpp-copy {
        flex: 1;
        min-width: 0;
      }

      #wnPrivacyPreferencesUI .wnpp-name {
        display: block;
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 4px;
      }

      #wnPrivacyPreferencesUI .wnpp-detail {
        display: block;
        font-size: 13px;
        color: #625b73;
      }

      #wnPrivacyPreferencesUI .wnpp-required {
        display: inline-block;
        flex-shrink: 0;
        border-radius: 10px;
        padding: 7px 10px;
        background: #f1eaff;
        color: #5823ad;
        font-size: 12px;
        font-weight: 700;
      }

      #wnPrivacyPreferencesUI .wnpp-switch {
        position: relative;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        width: 54px;
        height: 48px;
        cursor: pointer;
      }

      #wnPrivacyPreferencesUI .wnpp-switch input {
        position: absolute;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        margin: 0;
      }

      #wnPrivacyPreferencesUI .wnpp-track {
        display: block;
        position: relative;
        width: 50px;
        height: 30px;
        border-radius: 30px;
        background: #85808e;
        pointer-events: none;
        transition: background 150ms ease;
      }

      #wnPrivacyPreferencesUI .wnpp-track::after {
        content: "";
        position: absolute;
        top: 4px;
        left: 4px;
        height: 22px;
        width: 22px;
        border-radius: 50%;
        background: #fff;
        transition: transform 150ms ease;
      }

      #wnPrivacyPreferencesUI input:checked + .wnpp-track {
        background: #7028e8;
      }

      #wnPrivacyPreferencesUI input:checked + .wnpp-track::after {
        transform: translateX(20px);
      }

      #wnPrivacyPreferencesUI input:focus-visible + .wnpp-track {
        outline: 3px solid #7028e8;
        outline-offset: 4px;
      }

      #wnPrivacyPreferencesUI input:disabled + .wnpp-track {
        opacity: .5;
      }

      #wnPrivacyPreferencesUI .wnpp-actions {
        display: grid;
        gap: 10px;
        margin-top: 20px;
      }

      #wnPrivacyPreferencesUI button {
        appearance: none;
        width: 100%;
        min-height: 48px;
        margin: 0;
        padding: 12px 16px;
        border-radius: 12px;
        font: inherit;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        white-space: normal;
        text-align: center;
      }

      #wnPrivacyPreferencesUI .wnpp-primary {
        background: #7028e8;
        color: #ffffff;
        border: 1px solid #7028e8;
      }

      #wnPrivacyPreferencesUI .wnpp-secondary {
        background: #ffffff;
        color: #5520b4;
        border: 1px solid #cbb6fa;
      }

      #wnPrivacyPreferencesUI .wnpp-reload {
        background: #f6f4fa;
        color: #514763;
        border: 1px solid #e5e0ed;
      }

      #wnPrivacyPreferencesUI button:disabled {
        opacity: .48;
        cursor: not-allowed;
      }

      #wnPrivacyPreferencesUI button:focus-visible {
        outline: 3px solid #7028e8;
        outline-offset: 3px;
      }

      #wnPrivacyPreferencesUI .wnpp-status {
        margin-top: 16px;
        padding: 12px 14px;
        border-radius: 10px;
        background: #f5f3f8;
        color: #514763;
        font-size: 13px;
      }

      #wnPrivacyPreferencesUI .wnpp-status.success {
        background: #ecfdf3;
        color: #17663b;
      }

      #wnPrivacyPreferencesUI .wnpp-status.error {
        background: #fff1f2;
        color: #9f1239;
      }

      #wnPrivacyPreferencesUI .wnpp-meta {
        margin: 14px 0 0;
        color: #625b73;
        font-size: 12px;
      }

      #wnPrivacyPreferencesUI .wnpp-notice {
        margin: 16px 0 0;
        font-size: 13px;
        color: #625b73;
      }

      @media (prefers-reduced-motion: reduce) {
        #wnPrivacyPreferencesUI .wnpp-track,
        #wnPrivacyPreferencesUI .wnpp-track::after {
          transition: none;
        }
      }
    `;

    document.head.appendChild(style);
  }

  // 07. Render privacy controls

  function createRow(key, field) {
    const row = element("div", "wnpp-row");
    const copy = element("div", "wnpp-copy");

    const title = element(
      "span",
      "wnpp-name",
      t(key)
    );

    const detail = element(
      "span",
      "wnpp-detail",
      t(key + "Desc")
    );

    title.id = ROOT_ID + "-" + key + "-title";
    detail.id = ROOT_ID + "-" + key + "-detail";

    copy.append(title, detail);
    row.appendChild(copy);

    if (!field) {
      row.appendChild(
        element(
          "span",
          "wnpp-required",
          t("required")
        )
      );

      return row;
    }

    const label = element("label", "wnpp-switch");

    const input = document.createElement("input");

    input.type = "checkbox";
    input.id = ROOT_ID + "-" + field;
    input.setAttribute("role", "switch");

    input.setAttribute(
      "aria-labelledby",
      title.id
    );

    input.setAttribute(
      "aria-describedby",
      detail.id
    );

    input.checked =
      loaded && draft?.[field] === true;

    input.disabled = busy || !loaded;

    const track = element("span", "wnpp-track");

    track.setAttribute("aria-hidden", "true");

    input.addEventListener("change", () => {
      if (
        disposed ||
        busy ||
        !loaded ||
        !draft ||
        !owner
      ) {
        input.checked = false;
        return;
      }

      draft[field] = input.checked === true;

      setStatus(
        dirty() ? "unsaved" : "ready"
      );

      updateControls();
    });

    label.append(input, track);
    row.appendChild(label);

    return row;
  }

  function updateControls() {
    if (!root || disposed) return;

    const saveButton = root.querySelector(
      "[data-wnpp-action='save']"
    );

    const withdrawButton = root.querySelector(
      "[data-wnpp-action='withdraw']"
    );

    const reloadButton = root.querySelector(
      "[data-wnpp-action='reload']"
    );

    const statusNode = root.querySelector(
      ".wnpp-status"
    );

    if (saveButton) {
      saveButton.disabled =
        busy || !loaded || !owner;
    }

    if (withdrawButton) {
      withdrawButton.disabled =
        busy || !loaded || !owner;
    }

    if (reloadButton) {
      reloadButton.disabled = busy;
    }

    root.querySelectorAll(
      "input[type='checkbox']"
    ).forEach(input => {
      input.disabled = busy || !loaded;
    });

    if (statusNode) {
      statusNode.className =
        "wnpp-status " + statusType;

      statusNode.textContent = t(status);
    }

    root.setAttribute(
      "aria-busy",
      String(busy)
    );
  }

  function render() {
    if (!root || disposed) return;

    root.lang = language;

    const fragment =
      document.createDocumentFragment();

    const heading = element(
      "h2",
      "wnpp-title",
      t("title")
    );

    heading.id = ROOT_ID + "-heading";

    fragment.append(
      heading,
      element(
        "p",
        "wnpp-description",
        t("description")
      ),
      createRow("essential", null),
      createRow("analytics", FIELDS[0]),
      createRow("personalization", FIELDS[1]),
      createRow("marketing", FIELDS[2])
    );

    const actions = element(
      "div",
      "wnpp-actions"
    );

    const saveButton = button(
      t("save"),
      "wnpp-primary",
      () => save(),
      busy || !loaded
    );

    saveButton.dataset.wnppAction = "save";

    const withdrawButton = button(
      t("withdraw"),
      "wnpp-secondary",
      () => withdrawAll(),
      busy || !loaded
    );

    withdrawButton.dataset.wnppAction =
      "withdraw";

    const reloadButton = button(
      t("reload"),
      "wnpp-reload",
      () => refresh(),
      busy
    );

    reloadButton.dataset.wnppAction = "reload";

    actions.append(
      saveButton,
      withdrawButton,
      reloadButton
    );

    fragment.appendChild(actions);

    const notice = element(
      "div",
      "wnpp-status " + statusType,
      t(status)
    );

    notice.setAttribute("role", "status");
    notice.setAttribute("aria-live", "polite");

    fragment.appendChild(notice);

    if (loaded && baseline) {
      let updated = t("never");

      if (baseline.updated_at) {
        const date = new Date(
          baseline.updated_at
        );

        if (Number.isFinite(date.getTime())) {
          updated = new Intl.DateTimeFormat(
            language,
            {
              dateStyle: "medium",
              timeStyle: "short"
            }
          ).format(date);
        }
      }

      fragment.appendChild(
        element(
          "p",
          "wnpp-meta",
          t("updated") + ": " + updated
        )
      );

      fragment.appendChild(
        element(
          "p",
          "wnpp-meta",
          t("version") + ": " +
            baseline.consent_version
        )
      );
    }

    fragment.appendChild(
      element(
        "p",
        "wnpp-notice",
        t("notice")
      )
    );

    root.replaceChildren(fragment);

    updateControls();
  }

  // 08. Validate engine response

  function validateResponse(result, uid) {
    if (!result?.ok) {
      throw new Error(
        result?.code || "OPERATION_FAILED"
      );
    }

    const row = result.preferences;

    if (
      result.version !== ENGINE_VERSION ||
      !row ||
      row.user_id !== uid ||
      typeof row.consent_version !== "string"
    ) {
      throw new Error("INVALID_DATABASE_RESPONSE");
    }

    for (const field of FIELDS) {
      if (typeof row[field] !== "boolean") {
        throw new Error("INVALID_DATABASE_RESPONSE");
      }
    }

    return {
      user_id: row.user_id,
      ...valuesFrom(row),
      consent_version: row.consent_version,
      created_at: row.created_at || null,
      updated_at: row.updated_at || null
    };
  }

  function acceptRow(row, rowExists, engine) {
    baseline = row;
    exists = rowExists;

    // Old consent versions are never carried
    // forward as renewed affirmative consent.
    const currentVersion =
      row.consent_version === engine.consentVersion;

    draft = currentVersion
      ? valuesFrom(row)
      : defaults();

    loaded = true;

    return currentVersion;
  }

  function reportError(error) {
    const code = error?.message || "";

    if (
      code === "SIGN_IN_REQUIRED" ||
      code === "INVALID_SESSION"
    ) {
      invalidate("signIn");
    } else if (
      code === "ENGINE_UNAVAILABLE" ||
      code === "AUTH_UNAVAILABLE"
    ) {
      invalidate("unavailable");
    } else if (
      code === "SESSION_CHANGED" ||
      code === "OWNER_MISMATCH" ||
      code === "OPERATION_CANCELLED" ||
      code === "SAVE_CONFLICT"
    ) {
      invalidate("changed");
    } else {
      invalidate("error");
    }

    statusType = "error";
  }

  // 09. Authenticated read-only refresh

  async function refresh() {
    if (disposed || !root || busy) {
      return { ok: false };
    }

    busy = true;

    owner = null;
    baseline = null;
    draft = null;
    loaded = false;
    exists = false;

    const token = ++generation;

    setStatus("loading");
    render();

    try {
      const engine = getEngine();
      const client = bindAuth();

      const uid = await verifyIdentity(client);

      assertCurrent(token, uid, client);

      owner = uid;

      const result = await engine.load(uid);

      assertCurrent(token, uid, client);

      const verifiedUid =
        await verifyIdentity(client);

      assertCurrent(token, verifiedUid, client);

      if (verifiedUid !== uid) {
        throw new Error("SESSION_CHANGED");
      }

      const row = validateResponse(
        result,
        uid
      );

      const currentVersion = acceptRow(
        row,
        result.exists === true,
        engine
      );

      setStatus(
        !currentVersion
          ? "outdated"
          : exists
            ? "ready"
            : "defaults"
      );

      return { ok: true };

    } catch (error) {
      if (
        !disposed &&
        generation === token
      ) {
        reportError(error);
      }

      return { ok: false };

    } finally {
      busy = false;
      render();
    }
  }

  // 10. Detect stale database snapshot

  function sameSnapshot(result, row) {
    if ((result.exists === true) !== exists) {
      return false;
    }

    return (
      baseline !== null &&
      row.user_id === baseline.user_id &&
      row.updated_at === baseline.updated_at &&
      row.consent_version === baseline.consent_version &&
      FIELDS.every(
        field => row[field] === baseline[field]
      )
    );
  }

  // 11. Explicit authenticated save

  async function persist(withdraw) {
    if (
      disposed ||
      !root ||
      busy ||
      !loaded ||
      !owner ||
      !draft
    ) {
      return { ok: false };
    }

    const uid = owner;
    const token = generation;

    const requested = withdraw
      ? defaults()
      : valuesFrom(draft);

    busy = true;

    setStatus("saving");
    updateControls();

    try {
      const engine = getEngine();
      const client = getClient();

      assertCurrent(token, uid, client);

      const verifiedUid =
        await verifyIdentity(client);

      if (verifiedUid !== uid) {
        throw new Error("SESSION_CHANGED");
      }

      assertCurrent(token, uid, client);

      // Read current state before submitting.
      // Never silently overwrite a detected stale form.

      const current = await engine.load(uid);

      assertCurrent(token, uid, client);

      const currentRow =
        validateResponse(current, uid);

      if (!sameSnapshot(current, currentRow)) {
        throw new Error("SAVE_CONFLICT");
      }

      const payload = {
        ...requested,
        consent_version: engine.consentVersion
      };

      ownWrite = true;

      let result;

      try {
        result = withdraw
          ? await engine.withdrawAll(uid)
          : await engine.save(payload, uid);
      } finally {
        ownWrite = false;
      }

      assertCurrent(token, uid, client);

      const finalUid =
        await verifyIdentity(client);

      if (finalUid !== uid) {
        throw new Error("SESSION_CHANGED");
      }

      assertCurrent(token, uid, client);

      const saved = validateResponse(
        result,
        uid
      );

      if (
        saved.consent_version !== engine.consentVersion ||
        !FIELDS.every(
          field => saved[field] === requested[field]
        )
      ) {
        throw new Error("INVALID_DATABASE_RESPONSE");
      }

      acceptRow(saved, true, engine);

      setStatus(
        withdraw ? "withdrawn" : "saved",
        "success"
      );

      return { ok: true };

    } catch (error) {
      if (
        !disposed &&
        generation === token
      ) {
        reportError(error);
      }

      return { ok: false };

    } finally {
      ownWrite = false;
      busy = false;
      render();
    }
  }

  function save() {
    return persist(false);
  }

  function withdrawAll() {
    return persist(true);
  }

  // 12. External preference changes

  function onPreferencesChanged() {
    if (disposed || ownWrite) return;

    // Clear potentially stale UI state.
    // No automatic write or consent grant.
    invalidate("changed");
  }

  function onPageHide() {
    if (!disposed) {
      invalidate("changed");
    }
  }

  // 13. Public lifecycle

  function mount(target, options = {}) {
    if (busy) return false;

    const host = typeof target === "string"
      ? document.getElementById(target)
      : target;

    if (
      !host ||
      host.nodeType !== 1 ||
      host === document.body ||
      host === document.documentElement
    ) {
      return false;
    }

    if (root && root.parentElement === host) {
      setLanguage(
        options.language || language
      );

      return true;
    }

    const existing =
      document.getElementById(ROOT_ID);

    if (existing && existing !== root) {
      return false;
    }

    destroy();

    language = normalizeLanguage(
      options.language ||
      document.documentElement.lang ||
      "en"
    );

    disposed = false;

    installStyles();

    root = element("section");
    root.id = ROOT_ID;

    root.setAttribute(
      "aria-labelledby",
      ROOT_ID + "-heading"
    );

    setStatus("signIn");

    host.appendChild(root);

    window.addEventListener(
      "worknely:privacypreferenceschange",
      onPreferencesChanged
    );

    window.addEventListener(
      "pagehide",
      onPageHide
    );

    try {
      bindAuth();
    } catch {
      setStatus("unavailable", "error");
    }

    render();

    // Reading preferences is explicit.
    // Mounting never writes to the database.

    return true;
  }

  function setLanguage(value) {
    language = normalizeLanguage(value);

    render();

    return language;
  }

  function clear() {
    invalidate("signIn");

    return true;
  }

  function destroy() {
    disposed = true;
    generation += 1;

    if (authSubscription) {
      authSubscription.unsubscribe();
      authSubscription = null;
    }

    boundClient = null;

    window.removeEventListener(
      "worknely:privacypreferenceschange",
      onPreferencesChanged
    );

    window.removeEventListener(
      "pagehide",
      onPageHide
    );

    if (root) {
      root.remove();
      root = null;
    }

    owner = null;
    baseline = null;
    draft = null;
    loaded = false;
    exists = false;

    // Do not release the busy flag while
    // an asynchronous operation is pending.

    return true;
  }

  // 14. Safe public status

  function getState() {
    return Object.freeze({
      version: VERSION,
      engineVersion: ENGINE_VERSION,
      mounted: Boolean(root && !disposed),
      languages: LANGUAGES.length,
      language,
      loaded,
      busy,
      dirty: dirty(),
      automaticWrites: false,
      persistentCache: false
    });
  }

  // 15. Non-destructive self-test

  function selfTest() {
    const tests = [];

    function test(name, callback) {
      let passed = false;

      try {
        passed = callback() === true;
      } catch {
        passed = false;
      }

      tests.push(
        Object.freeze({ name, passed })
      );
    }

    test(
      "Correct UI version",
      () => VERSION === "7.21.5.4"
    );

    test(
      "Expected storage version",
      () => ENGINE_VERSION === "7.21.5.3"
    );

    test(
      "Six languages available",
      () => LANGUAGES.length === 6
    );

    test(
      "All translation keys available",
      () => LANGUAGES.every(
        lang => Object.keys(TEXT.en).every(
          key => typeof TEXT[lang][key] === "string" &&
            TEXT[lang][key].length > 0
        )
      )
    );

    test(
      "English fallback",
      () => normalizeLanguage("unknown") === "en"
    );

    test(
      "Regional language normalization",
      () => normalizeLanguage("ro-RO") === "ro"
    );

    test(
      "Optional consent defaults disabled",
      () => FIELDS.every(
        field => defaults()[field] === false
      )
    );

    test(
      "Strict boolean conversion",
      () => valuesFrom({
        analytics_consent: "true"
      }).analytics_consent === false
    );

    test(
      "Independent draft objects",
      () => defaults() !== defaults()
    );

    test(
      "Immutable translation dictionary",
      () => Object.isFrozen(TEXT) &&
        LANGUAGES.every(
          lang => Object.isFrozen(TEXT[lang])
        )
    );

    test(
      "No automatic writes configured",
      () => getState().automaticWrites === false
    );

    test(
      "No persistent cache configured",
      () => getState().persistentCache === false
    );

    const passed = tests.filter(
      item => item.passed
    ).length;

    return Object.freeze({
      ok: passed === tests.length,
      version: VERSION,
      passed,
      total: tests.length,
      tests: Object.freeze(tests),
      databaseWrites: false
    });
  }

  // 16. Immutable public API

  window.WorknelyPrivacyPreferencesUI =
    Object.freeze({
      version: VERSION,
      engineVersion: ENGINE_VERSION,
      mount,
      refresh,
      save,
      withdrawAll,
      setLanguage,
      clear,
      destroy,
      getState,
      selfTest
    });

})();
