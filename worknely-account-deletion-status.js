
/*
 * WORKNELY V7.21.4.12.20
 * Account Deletion Status Engine
 * Read-Only Privacy Center Integration
 * WORKNELY — PEOPLE TECHNOLOGY
 */

(() => {
  "use strict";

  const VERSION = "7.21.4.12.20";
  const BACKEND_VERSION = "7.21.4.12.16";

  const ENDPOINT =
    "https://xuyronnwsokfadnekeir.supabase.co/functions/v1/dynamic-task";

  const TEXT = Object.freeze({
    en: {
      locked: "Account deletion is currently disabled for security reasons.",
      unavailable: "Account deletion status could not be verified. Deletion remains disabled.",
      checking: "Verifying availability...",
      check: "Check availability",
      disabled: "Deletion unavailable",
      signIn: "Sign in to check availability."
    },
    ro: {
      locked: "Ștergerea contului este momentan dezactivată din motive de securitate.",
      unavailable: "Starea serviciului nu a putut fi verificată. Ștergerea rămâne dezactivată.",
      checking: "Se verifică disponibilitatea...",
      check: "Verifică disponibilitatea",
      disabled: "Ștergere indisponibilă",
      signIn: "Autentifică-te pentru a verifica disponibilitatea."
    },
    it: {
      locked: "La cancellazione dell'account è attualmente disabilitata per motivi di sicurezza.",
      unavailable: "Impossibile verificare lo stato. La cancellazione rimane disabilitata.",
      checking: "Verifica della disponibilità...",
      check: "Verifica disponibilità",
      disabled: "Cancellazione non disponibile",
      signIn: "Accedi per verificare la disponibilità."
    },
    de: {
      locked: "Die Kontolöschung ist derzeit aus Sicherheitsgründen deaktiviert.",
      unavailable: "Der Status konnte nicht überprüft werden. Die Löschung bleibt deaktiviert.",
      checking: "Verfügbarkeit wird überprüft...",
      check: "Verfügbarkeit prüfen",
      disabled: "Löschung nicht verfügbar",
      signIn: "Melde dich an, um die Verfügbarkeit zu prüfen."
    },
    fr: {
      locked: "La suppression du compte est actuellement désactivée pour des raisons de sécurité.",
      unavailable: "Le statut n'a pas pu être vérifié. La suppression reste désactivée.",
      checking: "Vérification de la disponibilité...",
      check: "Vérifier la disponibilité",
      disabled: "Suppression indisponible",
      signIn: "Connectez-vous pour vérifier la disponibilité."
    },
    es: {
      locked: "La eliminación de la cuenta está desactivada actualmente por motivos de seguridad.",
      unavailable: "No se pudo verificar el estado. La eliminación permanece desactivada.",
      checking: "Verificando disponibilidad...",
      check: "Comprobar disponibilidad",
      disabled: "Eliminación no disponible",
      signIn: "Inicia sesión para comprobar la disponibilidad."
    }
  });

  let revision = 0;
  let busy = false;
  let controller = null;

  function translate(key, language = "en") {
    const lang = String(language)
      .toLowerCase()
      .split("-")[0];

    return TEXT[lang]?.[key] ||
      TEXT.en[key] ||
      key;
  }

  function result(status, verified = false) {
    return Object.freeze({
      version: VERSION,
      backendVersion: BACKEND_VERSION,
      status,
      verified,
      securityLock: verified ? true : null,
      deletionEnabled: false,
      dryRunAuthorized: false,
      readOnly: true
    });
  }

  function clear() {
    revision++;
    controller?.abort();
    controller = null;
    busy = false;
  }

  async function checkStatus(options = {}) {
    if (busy) {
      return result("checking");
    }

    const expectedUserId = options.expectedUserId;

    if (
      typeof expectedUserId !== "string" ||
      !expectedUserId
    ) {
      return result("signIn");
    }

    const client = window.worknelySupabase;

    if (
      !client?.auth?.getUser ||
      !client?.auth?.getSession
    ) {
      return result("unavailable");
    }

    busy = true;

    const ticket = ++revision;
    const requestController = new AbortController();

    controller = requestController;

    const timeout = setTimeout(() => {
      requestController.abort();
    }, 12000);

    function valid() {
      const recovery =
        document.getElementById("wnUpdatePassword");

      return ticket === revision &&
        window.worknelySupabase === client &&
        !requestController.signal.aborted &&
        !(recovery && !recovery.hidden);
    }

    try {
      const identity = await client.auth.getUser();

      if (
        !valid() ||
        identity.error ||
        identity.data?.user?.id !== expectedUserId
      ) {
        return result("unavailable");
      }

      const sessionResult =
        await client.auth.getSession();

      const session = sessionResult.data?.session;

      if (
        !valid() ||
        sessionResult.error ||
        !session?.access_token ||
        session.user?.id !== expectedUserId
      ) {
        return result("unavailable");
      }

      const response = await fetch(ENDPOINT, {
        method: "POST",

        cache: "no-store",
        credentials: "omit",
        redirect: "error",

        signal: requestController.signal,

        headers: {
          "Authorization":
            "Bearer " + session.access_token,

          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          action: "status"
        })
      });

      if (!valid() || response.status !== 200) {
        return result("unavailable");
      }

      const data = await response.json();

      const verified =
        await client.auth.getUser();

      if (
        !valid() ||
        verified.error ||
        verified.data?.user?.id !== expectedUserId
      ) {
        return result("unavailable");
      }

      const passed =
        data.version === BACKEND_VERSION &&
        data.ok === true &&
        data.code === "BACKEND_READY" &&
        data.authenticated === true &&
        data.dryRunOnly === true &&
        data.dryRunAuthorized === false &&
        data.deletionEnabled === false &&
        data.securityLock === true &&
        data.mode === "security-locked" &&
        data.controlledTestCompleted === true;

      return passed
        ? result("locked", true)
        : result("unavailable");

    } catch {
      return result("unavailable");

    } finally {
      clearTimeout(timeout);

      if (ticket === revision) {
        controller = null;
        busy = false;
      }
    }
  }

  function getState() {
    return Object.freeze({
      version: VERSION,
      backendVersion: BACKEND_VERSION,
      busy,
      deletionEnabled: false,
      dryRunAuthorized: false,
      readOnly: true,
      localDataStorage: false,
      supportedLanguages: Object.keys(TEXT)
    });
  }

  function selfTest() {
    const keys = [
      "locked",
      "unavailable",
      "checking",
      "check",
      "disabled",
      "signIn"
    ];

    const checks = Object.keys(TEXT).map(lang => ({
      name: "Language: " + lang,

      passed: keys.every(key =>
        typeof TEXT[lang][key] === "string" &&
        TEXT[lang][key].length > 0
      )
    }));

    checks.push(
      {
        name: "Deletion disabled",
        passed: getState().deletionEnabled === false
      },
      {
        name: "Read-only engine",
        passed: getState().readOnly === true
      },
      {
        name: "Dry-run authorization disabled",
        passed: getState().dryRunAuthorized === false
      },
      {
        name: "No local data storage",
        passed: getState().localDataStorage === false
      }
    );

    return {
      version: VERSION,
      total: checks.length,

      passed: checks.filter(
        check => check.passed
      ).length,

      checks,
      liveBackendTested: false
    };
  }

  window.addEventListener("pagehide", clear);

  window.WorknelyAccountDeletionStatus =
    Object.freeze({
      version: VERSION,
      backendVersion: BACKEND_VERSION,
      checkStatus,
      translate,
      clear,
      getState,
      selfTest
    });

  document.dispatchEvent(
    new CustomEvent(
      "worknely:accountdeletionstatusready",
      {
        detail: {
          version: VERSION
        }
      }
    )
  );

})();

/*
 * END WORKNELY V7.21.4.12.20
 * ACCOUNT DELETION STATUS ENGINE
 */
