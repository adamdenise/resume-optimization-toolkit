/*
 * WORKNELY V7.21.3.1
 * PERSONAL DATA EXPORT ENGINE
 * Authenticated Data Portability
 * Owner-Scoped Database Access
 * International Export Messages
 * Read-Only Architecture
 *
 * WORKNELY — PEOPLE TECHNOLOGY
 */

(() => {

  "use strict";

  const VERSION = "7.21.3.1";

  const PAGE_SIZE = 100;
  const MAX_ROWS = 50000;

  const TABLES = Object.freeze([
    "resumes",
    "career_analyses",
    "job_applications"
  ]);

  const LANGUAGES = Object.freeze([
    "en", "ro", "it", "de", "fr", "es"
  ]);

  const MESSAGES = Object.freeze({

    en: {
      AUTH_REQUIRED: "Please sign in.",
      RECOVERY_ACTIVE: "Finish account recovery first.",
      EXPORT_BUSY: "An export is already running.",
      EXPORT_FAILED: "Unable to export your data.",
      SESSION_CHANGED: "Your session has changed.",
      EXPORT_LIMIT: "The export exceeds the supported size.",
      EXPORT_READY: "Your data is ready to download.",
      DOWNLOAD_FAILED: "Unable to prepare the download.",
      CLIENT_UNAVAILABLE: "The data service is unavailable.",
      CONSENT_REQUIRED: "Confirm your export request."
    },

    ro: {
      AUTH_REQUIRED: "Autentifică-te mai întâi.",
      RECOVERY_ACTIVE: "Finalizează recuperarea contului.",
      EXPORT_BUSY: "Un export este deja în desfășurare.",
      EXPORT_FAILED: "Datele nu au putut fi exportate.",
      SESSION_CHANGED: "Sesiunea ta s-a schimbat.",
      EXPORT_LIMIT: "Exportul depășește dimensiunea acceptată.",
      EXPORT_READY: "Datele tale sunt pregătite pentru descărcare.",
      DOWNLOAD_FAILED: "Descărcarea nu a putut fi pregătită.",
      CLIENT_UNAVAILABLE: "Serviciul de date nu este disponibil.",
      CONSENT_REQUIRED: "Confirmă solicitarea de export."
    },

    it: {
      AUTH_REQUIRED: "Accedi al tuo account.",
      RECOVERY_ACTIVE: "Completa il recupero dell'account.",
      EXPORT_BUSY: "Un'esportazione è già in corso.",
      EXPORT_FAILED: "Impossibile esportare i dati.",
      SESSION_CHANGED: "La sessione è cambiata.",
      EXPORT_LIMIT: "L'esportazione supera il limite consentito.",
      EXPORT_READY: "I tuoi dati sono pronti.",
      DOWNLOAD_FAILED: "Impossibile preparare il download.",
      CLIENT_UNAVAILABLE: "Il servizio dati non è disponibile.",
      CONSENT_REQUIRED: "Conferma la richiesta di esportazione."
    },

    de: {
      AUTH_REQUIRED: "Bitte melde dich an.",
      RECOVERY_ACTIVE: "Schließe die Kontowiederherstellung ab.",
      EXPORT_BUSY: "Ein Export läuft bereits.",
      EXPORT_FAILED: "Daten konnten nicht exportiert werden.",
      SESSION_CHANGED: "Deine Sitzung wurde geändert.",
      EXPORT_LIMIT: "Der Export überschreitet das Limit.",
      EXPORT_READY: "Deine Daten stehen zum Download bereit.",
      DOWNLOAD_FAILED: "Download konnte nicht vorbereitet werden.",
      CLIENT_UNAVAILABLE: "Der Datendienst ist nicht verfügbar.",
      CONSENT_REQUIRED: "Bestätige deine Exportanfrage."
    },

    fr: {
      AUTH_REQUIRED: "Veuillez vous connecter.",
      RECOVERY_ACTIVE: "Terminez la récupération du compte.",
      EXPORT_BUSY: "Une exportation est déjà en cours.",
      EXPORT_FAILED: "Impossible d'exporter les données.",
      SESSION_CHANGED: "Votre session a changé.",
      EXPORT_LIMIT: "L'exportation dépasse la limite autorisée.",
      EXPORT_READY: "Vos données sont prêtes.",
      DOWNLOAD_FAILED: "Impossible de préparer le téléchargement.",
      CLIENT_UNAVAILABLE: "Le service de données est indisponible.",
      CONSENT_REQUIRED: "Confirmez votre demande d'exportation."
    },

    es: {
      AUTH_REQUIRED: "Inicia sesión.",
      RECOVERY_ACTIVE: "Completa la recuperación de la cuenta.",
      EXPORT_BUSY: "Ya hay una exportación en curso.",
      EXPORT_FAILED: "No se pudieron exportar los datos.",
      SESSION_CHANGED: "Tu sesión ha cambiado.",
      EXPORT_LIMIT: "La exportación supera el límite permitido.",
      EXPORT_READY: "Tus datos están listos.",
      DOWNLOAD_FAILED: "No se pudo preparar la descarga.",
      CLIENT_UNAVAILABLE: "El servicio de datos no está disponible.",
      CONSENT_REQUIRED: "Confirma tu solicitud de exportación."
    }

  });

  let client = null;
  let subscription = null;
  let owner = null;
  let generation = 0;
  let busy = false;
  let recovery = false;
  let suspended = false;

  const objectUrls = new Set();

  function getLanguage() {

    const value =
      window.WorknelyLocalization?.getLanguage?.() ||
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

  function t(code) {

    return MESSAGES[getLanguage()][code] ||
      MESSAGES.en[code] ||
      MESSAGES.en.EXPORT_FAILED;

  }

  function fail(code) {

    const error = new Error(code);
    error.code = code;

    throw error;

  }

  function safeError(error) {

    const code = error?.code;

    return Object.prototype.hasOwnProperty.call(
      MESSAGES.en,
      code
    ) ? code : "EXPORT_FAILED";

  }

  function getClient() {

    const candidate = window.worknelySupabase;

    if (
      !candidate ||
      typeof candidate.from !== "function" ||
      typeof candidate.auth?.getUser !== "function"
    ) {
      return null;
    }

    return candidate;

  }

  function releaseUrls() {

    for (const url of objectUrls) {

      URL.revokeObjectURL(url);

    }

    objectUrls.clear();

  }

  function invalidate() {

    generation += 1;
    releaseUrls();

  }

  function bindAuthentication() {

    const next = getClient();

    if (!next) return false;

    if (client === next && subscription) {
      return true;
    }

    subscription?.unsubscribe?.();

    invalidate();

    client = next;
    owner = null;
    recovery = false;

    const result = client.auth.onAuthStateChange(
      (event, session) => {

        const nextOwner =
          session?.user?.id || null;

        if (event === "PASSWORD_RECOVERY") {

          recovery = true;
          owner = nextOwner;
          invalidate();

          return;

        }

        if (event === "SIGNED_OUT") {

          recovery = false;
          owner = null;
          invalidate();

          return;

        }

        if (nextOwner !== owner) {

          owner = nextOwner;
          invalidate();

        }

      }
    );

    subscription =
      result?.data?.subscription || null;

    return true;

  }

  function assertContext(context) {

    if (recovery) {
      fail("RECOVERY_ACTIVE");
    }

    if (
      suspended ||
      context.generation !== generation ||
      context.client !== client ||
      context.userId !== owner
    ) {
      fail("SESSION_CHANGED");
    }

  }

  async function verifyIdentity(context) {

    assertContext(context);

    const { data, error } =
      await context.client.auth.getUser();

    assertContext(context);

    if (
      error ||
      !data?.user ||
      data.user.id !== context.userId
    ) {
      fail("SESSION_CHANGED");
    }

    return data.user;

  }

  async function getContext(expectedUserId) {

    if (!bindAuthentication()) {
      fail("CLIENT_UNAVAILABLE");
    }

    if (recovery) {
      fail("RECOVERY_ACTIVE");
    }

    const currentClient = client;

    const { data, error } =
      await currentClient.auth.getUser();

    if (error || !data?.user?.id) {
      fail("AUTH_REQUIRED");
    }

    if (
      suspended ||
      recovery ||
      currentClient !== client ||
      (owner && owner !== data.user.id)
    ) {
      fail("SESSION_CHANGED");
    }

    if (
      typeof expectedUserId !== "string" ||
      expectedUserId !== data.user.id
    ) {
      fail("SESSION_CHANGED");
    }

    owner = data.user.id;

    const context = {
      client: currentClient,
      userId: data.user.id,
      generation
    };

    await verifyIdentity(context);

    return context;

  }

  /*
   * Read only records belonging to the
   * authenticated user.
   *
   * Keyset pagination prevents the usual
   * default API row limit from silently
   * truncating the export.
   */

  async function readTable(context, table) {

    if (!TABLES.includes(table)) {
      fail("EXPORT_FAILED");
    }

    const rows = [];

    let cursor = null;

    while (true) {

      assertContext(context);

      let query = context.client
        .from(table)
        .select("*")
        .eq("user_id", context.userId)
        .order("id", { ascending: true })
        .limit(PAGE_SIZE);

      if (cursor !== null) {

        query = query.gt("id", cursor);

      }

      const { data, error } = await query;

      assertContext(context);

      if (error || !Array.isArray(data)) {
        fail("EXPORT_FAILED");
      }

      if (data.length === 0) break;

      for (const row of data) {

        if (
          !row ||
          row.user_id !== context.userId ||
          typeof row.id !== "string"
        ) {
          fail("EXPORT_FAILED");
        }

        rows.push(row);

        if (rows.length > MAX_ROWS) {
          fail("EXPORT_LIMIT");
        }

      }

      const nextCursor =
        data[data.length - 1].id;

      if (nextCursor === cursor) {
        fail("EXPORT_FAILED");
      }

      cursor = nextCursor;

    }

    await verifyIdentity(context);

    return rows;

  }

  /*
   * Never export the complete Supabase
   * authentication object.
   *
   * Only explicitly selected account
   * fields are included.
   */

  function buildProfile(user) {

    return {
      id: user.id,
      email: user.email || null,
      created_at: user.created_at || null,
      updated_at: user.updated_at || null,
      email_confirmed_at:
        user.email_confirmed_at || null,
      last_sign_in_at:
        user.last_sign_in_at || null
    };

  }

  function buildDocument(user, datasets) {

    return {

      application: "Worknely",

      export_engine_version: VERSION,

      format_version: "1.0",

      exported_at: new Date().toISOString(),

      language: getLanguage(),

      scope: "authenticated_user_application_data",

      account: buildProfile(user),

      summary: {

        resumes: datasets.resumes.length,

        career_analyses:
          datasets.career_analyses.length,

        job_applications:
          datasets.job_applications.length

      },

      data: {

        resumes: datasets.resumes,

        career_analyses:
          datasets.career_analyses,

        job_applications:
          datasets.job_applications

      },

      limitations: [

        "This export contains the supported application tables and selected account fields.",

        "Authentication credentials, session tokens and server secrets are excluded.",

        "Local browser data, service logs and backups are not included.",

        "Records are collected through separate read requests, not an atomic database snapshot."

      ]

    };

  }

  function createDownload(documentData) {

    const json = JSON.stringify(
      documentData,
      null,
      2
    );

    const blob = new Blob(
      [json],
      {
        type: "application/json;charset=utf-8"
      }
    );

    const date = new Date()
      .toISOString()
      .slice(0, 10);

    return {

      blob,

      filename:
        "worknely-personal-data-" +
        date +
        ".json",

      size: blob.size

    };

  }

  /*
   * Export requires an explicit user
   * request and the expected account ID.
   */

  async function prepareExport(options = {}) {

    if (options.consent !== true) {

      return {
        ok: false,
        code: "CONSENT_REQUIRED",
        message: t("CONSENT_REQUIRED")
      };

    }

    if (busy) {

      return {
        ok: false,
        code: "EXPORT_BUSY",
        message: t("EXPORT_BUSY")
      };

    }

    busy = true;

    try {

      const context = await getContext(
        options.expectedUserId
      );

      const datasets = {};

      for (const table of TABLES) {

        datasets[table] = await readTable(
          context,
          table
        );

      }

      const user = await verifyIdentity(
        context
      );

      const documentData = buildDocument(
        user,
        datasets
      );

      const file = createDownload(
        documentData
      );

      assertContext(context);

      /*
       * Keep the prepared Blob in a
       * private closure. The caller
       * receives a guarded download action.
       */

      let preparedBlob = file.blob;

      function discard() {

        preparedBlob = null;

      }

      async function download() {

        try {

          if (!preparedBlob) {
            fail("DOWNLOAD_FAILED");
          }

          await verifyIdentity(context);

          if (!preparedBlob) {
            fail("DOWNLOAD_FAILED");
          }

          const url = URL.createObjectURL(
            preparedBlob
          );

          objectUrls.add(url);

          const link =
            document.createElement("a");

          link.href = url;
          link.download = file.filename;
          link.rel = "noopener";
          link.style.display = "none";

          try {

            assertContext(context);

            document.body.appendChild(link);

            link.click();

          } finally {

            link.remove();

            setTimeout(() => {

              URL.revokeObjectURL(url);
              objectUrls.delete(url);

            }, 60000);

          }

          discard();

          return {
            ok: true,
            initiated: true
          };

        } catch (error) {

          discard();

          const code = safeError(error);

          return {
            ok: false,
            code,
            message: t(code)
          };

        }

      }

      return Object.freeze({

        ok: true,

        filename: file.filename,

        size: file.size,

        counts: Object.freeze({
          ...documentData.summary
        }),

        message: t("EXPORT_READY"),

        download,

        discard

      });

    } catch (error) {

      const code = safeError(error);

      return {

        ok: false,

        code,

        message: t(code)

      };

    } finally {

      busy = false;

    }

  }

  function getState() {

    return {

      version: VERSION,

      authenticated:
        Boolean(owner) && !recovery,

      busy,

      recoveryMode: recovery,

      suspended,

      clientAvailable:
        Boolean(getClient()),

      supportedLanguages:
        [...LANGUAGES],

      supportedTables:
        [...TABLES],

      readOnly: true,

      automaticExport: false,

      localDataStorage: false,

      format: "JSON"

    };

  }

  /*
   * Internal checks.
   * No database reads or writes.
   */

  function selfTest() {

    const results = [];

    function check(name, condition) {

      results.push({
        name,
        passed: Boolean(condition)
      });

    }

    const profile = buildProfile({

      id: "test-user",

      email: "test@example.com",

      access_token: "secret",

      refresh_token: "secret",

      password: "secret",

      app_metadata: {
        secret: "test"
      }

    });

    const datasets = {

      resumes: [],

      career_analyses: [],

      job_applications: []

    };

    const documentData = buildDocument(
      profile,
      datasets
    );

    check(
      "Version",
      VERSION === "7.21.3.1"
    );

    check(
      "Six languages",
      LANGUAGES.length === 6
    );

    check(
      "Three application tables",
      TABLES.length === 3
    );

    check(
      "Translation coverage",
      LANGUAGES.every(language =>
        Object.keys(MESSAGES.en).every(
          key => Boolean(
            MESSAGES[language][key]
          )
        )
      )
    );

    check(
      "Account ID included",
      profile.id === "test-user"
    );

    check(
      "Email included",
      profile.email === "test@example.com"
    );

    check(
      "Access token excluded",
      !("access_token" in profile)
    );

    check(
      "Refresh token excluded",
      !("refresh_token" in profile)
    );

    check(
      "Password excluded",
      !("password" in profile)
    );

    check(
      "Private auth metadata excluded",
      !("app_metadata" in profile)
    );

    check(
      "Export format",
      documentData.format_version === "1.0"
    );

    check(
      "Empty resumes count",
      documentData.summary.resumes === 0
    );

    check(
      "Empty career count",
      documentData.summary.career_analyses === 0
    );

    check(
      "Empty applications count",
      documentData.summary.job_applications === 0
    );

    check(
      "Read-only configuration",
      getState().readOnly === true
    );

    check(
      "No automatic export",
      getState().automaticExport === false
    );

    check(
      "No local data storage",
      getState().localDataStorage === false
    );

    return {

      version: VERSION,

      total: results.length,

      passed: results.filter(
        result => result.passed
      ).length,

      failed: results.filter(
        result => !result.passed
      ).length,

      results,

      databaseTested: false,

      browserDownloadTested: false

    };

  }

  function initialize() {

    if (!suspended) {

      bindAuthentication();

    }

  }

  window.addEventListener(
    "pagehide",
    () => {

      suspended = true;

      invalidate();

    }
  );

  window.addEventListener(
    "pageshow",
    () => {

      suspended = false;

      initialize();

    }
  );

  document.addEventListener(
    "worknely:workspacechange",
    initialize
  );

  window.addEventListener(
    "load",
    initialize,
    { once: true }
  );

  window.WorknelyDataExport =
    Object.freeze({

      version: VERSION,

      prepareExport,

      getState,

      getLanguage,

      translate: t,

      initialize,

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

  document.dispatchEvent(
    new CustomEvent(
      "worknely:dataexportready",
      {
        detail: {
          version: VERSION
        }
      }
    )
  );

})();

/*
 * END WORKNELY V7.21.3.1
 * PERSONAL DATA EXPORT ENGINE
 * WORKNELY — PEOPLE TECHNOLOGY
 */
