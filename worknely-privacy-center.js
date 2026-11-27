/*
 * WORKNELY V7.21.3.2
 * International Privacy Center
 * Authentication-Aware Privacy Interface
 * Six International Languages
 * Responsive Privacy Architecture
 * WORKNELY — PEOPLE TECHNOLOGY
 */

(() => {
  "use strict";

  const VERSION = "7.21.3.5.2";
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

  /* PERSONAL DATA EXPORT INTERFACE */

  let exportStage = "idle";
  let preparedExport = null;
  let exportMessage = "";
  let exportRevision = 0;
  let exportExpiryTimer = null;

  const EXPORT_STATUS_TEXT = Object.freeze({
    en: ["Downloading your data...", "Your export has expired. Prepare a new file."],
    ro: ["Se descarcă datele tale...", "Exportul a expirat. Pregătește un fișier nou."],
    it: ["Download dei dati in corso...", "L'esportazione è scaduta. Prepara un nuovo file."],
    de: ["Deine Daten werden heruntergeladen...", "Der Export ist abgelaufen. Erstelle eine neue Datei."],
    fr: ["Téléchargement de vos données...", "Votre export a expiré. Préparez un nouveau fichier."],
    es: ["Descargando tus datos...", "La exportación ha caducado. Prepara un nuevo archivo."]
  });

  function exportStatusText(index) {
    return (EXPORT_STATUS_TEXT[getLanguage()] || EXPORT_STATUS_TEXT.en)[index];
  }

  function clearExportExpiry() {
    clearTimeout(exportExpiryTimer);
    exportExpiryTimer = null;
  }

  function scheduleExportExpiry() {
    clearExportExpiry();
    const revision = exportRevision;
    const expectedOwner = owner;
    exportExpiryTimer = setTimeout(() => {
      if (revision !== exportRevision ||
          owner !== expectedOwner ||
          exportStage !== "ready") return;
      resetExport();
      exportStage = "expired";
      render();
    }, 119000);
  }

  const EXPORT_TEXT = {
    en: ["Request Data Export","Your file contains personal information. Store it securely.","Confirm & Prepare Export","Cancel","Preparing your data...","Download My Data","Download requested. Check your browser or Files.","Export unavailable.","Try again","JSON file","Account deletion is not yet enabled. Export covers supported application data only.","Export failed."],
    ro: ["Solicită exportul datelor","Fișierul conține informații personale. Păstrează-l în siguranță.","Confirmă și pregătește exportul","Anulează","Se pregătesc datele...","Descarcă datele mele","Descărcare solicitată. Verifică browserul sau aplicația Fișiere.","Export indisponibil.","Încearcă din nou","Fișier JSON","Ștergerea contului nu este încă activată. Exportul include doar datele acceptate ale aplicației.","Exportul a eșuat."],
    it: ["Richiedi esportazione","Il file contiene dati personali. Conservalo in modo sicuro.","Conferma e prepara","Annulla","Preparazione dei dati...","Scarica i miei dati","Download richiesto. Controlla il browser o File.","Esportazione non disponibile.","Riprova","File JSON","La cancellazione non è ancora attiva. L'esportazione include solo i dati supportati.","Esportazione non riuscita."],
    de: ["Datenexport anfordern","Die Datei enthält personenbezogene Daten. Bewahre sie sicher auf.","Bestätigen und vorbereiten","Abbrechen","Daten werden vorbereitet...","Meine Daten herunterladen","Download angefordert. Prüfe deinen Browser oder deine Dateien.","Export nicht verfügbar.","Erneut versuchen","JSON-Datei","Die Kontolöschung ist noch nicht aktiviert. Der Export umfasst nur unterstützte Anwendungsdaten.","Export fehlgeschlagen."],
    fr: ["Demander un export","Le fichier contient des données personnelles. Conservez-le en sécurité.","Confirmer et préparer","Annuler","Préparation des données...","Télécharger mes données","Téléchargement demandé. Vérifiez votre navigateur ou vos fichiers.","Export indisponible.","Réessayer","Fichier JSON","La suppression du compte n'est pas encore activée. L'export couvre uniquement les données prises en charge.","Échec de l'export."],
    es: ["Solicitar exportación","El archivo contiene datos personales. Guárdalo de forma segura.","Confirmar y preparar","Cancelar","Preparando tus datos...","Descargar mis datos","Descarga solicitada. Comprueba el navegador o Archivos.","Exportación no disponible.","Reintentar","Archivo JSON","La eliminación de la cuenta aún no está activada. La exportación incluye solo datos compatibles.","Error de exportación."]
  };

  function et(index) {
    return (EXPORT_TEXT[getLanguage()] || EXPORT_TEXT.en)[index];
  }

  function exportEngine() {
    const engine = window.WorknelyDataExport;
    return typeof engine?.prepareExport === "function"
      ? engine : null;
  }

  function resetExport() {
    clearExportExpiry();
    exportRevision++;
    preparedExport?.discard?.();
    preparedExport = null;
    exportStage = "idle";
    exportMessage = "";
  }

  function exportAllowed() {
    return Boolean(
      owner && account && !loading &&
      !suspended && !recoveryActive() &&
      exportEngine()
    );
  }

  function exportValid(ticket, expectedOwner) {
    return ticket === exportRevision &&
      owner === expectedOwner &&
      exportAllowed();
  }

  async function preparePersonalExport() {
    if (!exportAllowed() || exportStage !== "confirm") return;

    const expectedOwner = owner;
    const ticket = ++exportRevision;
    const engine = exportEngine();

    exportStage = "preparing";
    exportMessage = "";
    render();

    try {
      const result = await engine.prepareExport({
        consent: true,
        expectedUserId: expectedOwner
      });

      if (!exportValid(ticket, expectedOwner)) {
        result?.discard?.();
        return;
      }

      if (!result?.ok ||
          typeof result.download !== "function" ||
          typeof result.discard !== "function") {
        result?.discard?.();
        exportStage = "error";
        exportMessage = result?.code || "EXPORT_FAILED";
      } else {
        preparedExport = result;
        exportStage = "ready";
      scheduleExportExpiry();
      }
    } catch {
      if (!exportValid(ticket, expectedOwner)) return;
      exportStage = "error";
      exportMessage = "EXPORT_FAILED";
    }

    render();
  }

  async function downloadPersonalExport() {
    if (!exportAllowed() ||
        exportStage !== "ready" ||
        !preparedExport) return;

    const expectedOwner = owner;
    const ticket = ++exportRevision;
    const file = preparedExport;

    clearExportExpiry();
    exportStage = "downloading";
    render();

    try {
      const result = await file.download();

      if (!exportValid(ticket, expectedOwner)) return;

      preparedExport = null;

      if (result?.ok && result.initiated) {
        exportStage = "done";
      } else {
        exportStage = "error";
        exportMessage = result?.code || "DOWNLOAD_FAILED";
      }
    } catch {
      if (!exportValid(ticket, expectedOwner)) return;
      preparedExport = null;
      exportStage = "error";
      exportMessage = "DOWNLOAD_FAILED";
    } finally {
      file.discard?.();
    }

    render();
  }

  function cancelPersonalExport() {
    resetExport();
    render();
  }

  function renderExportControls(element) {
    if (exportStage === "expired" && exportAllowed()) {
      const notice = document.createElement("p");
      notice.setAttribute("role", "status");
      notice.textContent = exportStatusText(1);
      element.appendChild(notice);

      const retry = document.createElement("button");
      retry.type = "button";
      retry.textContent = et(8);
      retry.style.minHeight = "44px";
      retry.addEventListener("click", cancelPersonalExport);
      element.appendChild(retry);
      return;
    }
    const status = node("p", "wnpc-note");
    status.setAttribute("role", "status");

    if (!exportAllowed()) {
      element.appendChild(button(et(7), true));
      return;
    }

    if (exportStage === "idle") {
      element.appendChild(button(et(0), false, () => {
        if (!exportAllowed()) return;
        exportStage = "confirm";
        render();
      }));
      return;
    }

    if (exportStage === "confirm") {
      status.textContent = et(1);
      element.append(
        status,
        node("p", "", et(9)),
        button(et(2), false, preparePersonalExport),
        button(et(3), false, cancelPersonalExport)
      );
      return;
    }

    if (exportStage === "preparing" ||
        exportStage === "downloading") {
      status.textContent = exportStage === "downloading" ? exportStatusText(0) : et(4);
      element.appendChild(status);
      if (exportStage === "preparing") {
        element.appendChild(
          button(et(3), false, cancelPersonalExport)
        );
      }
      return;
    }

    if (exportStage === "ready" && preparedExport) {
      status.textContent =
        exportEngine()?.translate?.("EXPORT_READY") || et(9);

      element.append(
        status,
        node("p", "", preparedExport.filename),
        node("p", "", new Intl.NumberFormat(
          getLanguage(), {
            style: "unit",
            unit: "kilobyte",
            maximumFractionDigits: 1
          }
        ).format(preparedExport.size / 1024)),
        metric(t("resumes"), preparedExport.counts?.resumes),
        metric(t("career"), preparedExport.counts?.career_analyses),
        metric(t("jobs"), preparedExport.counts?.job_applications),
        button(et(5), false, downloadPersonalExport),
        button(et(3), false, cancelPersonalExport)
      );
      return;
    }

    status.textContent = exportStage === "done"
      ? et(6)
      : exportEngine()?.translate?.(exportMessage) || et(11);

    element.append(
      status,
      button(
        exportStage === "done" ? et(0) : et(8),
        false,
        () => {
          resetExport();
          if (exportAllowed()) exportStage = "confirm";
          render();
        }
      )
    );
  }


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
    resetExport();
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

    resetExport();
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

      if (key === "export") {
        renderExportControls(element);
      } else {
        element.appendChild(
          button(t("coming"), true)
        );
      }

      features.appendChild(element);
    });

    root.append(
      features,
      node(
        "p",
        "wnpc-note",
        exportEngine() ? et(10) : t("privacyNote")
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
      exportEnabled: Boolean(exportEngine()),
      exportAvailable: exportAllowed(),
      exportStage,
      exportInterfaceVersion: VERSION,
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
        name: "Export engine availability",
        passed: getState().exportEnabled === Boolean(exportEngine())
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

  document.addEventListener("worknely:dataexportready", render);

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
 * END WORKNELY V7.21.3.2
 * INTERNATIONAL PRIVACY CENTER
 * WORKNELY — PEOPLE TECHNOLOGY
 */
