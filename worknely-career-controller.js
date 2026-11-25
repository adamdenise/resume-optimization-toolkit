
/*
 * WORKNELY V7.18.1.1
 * Career Intelligence Controller
 * Automatic Initialization & Diagnostics
 * International Integration
 * Privacy-First Processing
 */

(function () {
  "use strict";

  const VERSION = "7.18.1.1";

  const LANGUAGES = Object.freeze([
    "en", "ro", "it", "de", "fr", "es"
  ]);

  const MODULES = Object.freeze([
    {
      id: "ats",
      global: "WorknelyCareerIntelligence",
      file: "worknely-career-intelligence.js",
      version: "7.18.1.1",
      method: "analyze"
    },
    {
      id: "skill-gap",
      global: "WorknelySkillGap",
      file: "worknely-skill-gap.js",
      version: "7.17.2",
      method: "analyze"
    },
    {
      id: "resume-optimizer",
      global: "WorknelyResumeOptimizer",
      file: "worknely-resume-optimizer.js",
      version: "7.17.3",
      method: "analyze"
    },
    {
      id: "career-match",
      global: "WorknelyCareerMatch",
      file: "worknely-career-match.js",
      version: "7.17.4",
      method: "analyze"
    },
    {
      id: "interview-preparation",
      global: "WorknelyInterviewPreparation",
      file: "worknely-interview-preparation.js",
      version: "7.17.5",
      method: "generate"
    },
    {
      id: "cover-letter",
      global: "WorknelyCoverLetter",
      file: "worknely-cover-letter.js",
      version: "7.17.6",
      method: "generate"
    },
    {
      id: "career-action-plan",
      global: "WorknelyCareerActionPlan",
      file: "worknely-career-action-plan.js",
      version: "7.17.7",
      method: "generate"
    }
  ].map(Object.freeze));

  const FIELDS = Object.freeze({
    fullName: "bName",
    professionalTitle: "bTitle",
    contact: "bContact",
    education: "bEducation",
    summary: "bSummary",
    experience: "bExperience",
    skills: "bSkills"
  });

  const DICTIONARY = {
    title: [
      "Career Intelligence",
      "Inteligență profesională",
      "Career Intelligence",
      "Karriereintelligenz",
      "Intelligence professionnelle",
      "Inteligencia profesional"
    ],
    loading: [
      "Loading Career Intelligence...",
      "Se încarcă modulele profesionale...",
      "Caricamento dei moduli...",
      "Karrieremodule werden geladen...",
      "Chargement des modules...",
      "Cargando módulos profesionales..."
    ],
    ready: [
      "Career Intelligence is ready.",
      "Modulele profesionale sunt pregătite.",
      "Career Intelligence è disponibile.",
      "Karriereintelligenz ist bereit.",
      "L'intelligence professionnelle est disponible.",
      "La inteligencia profesional está lista."
    ],
    partial: [
      "Some modules are unavailable.",
      "Unele module nu sunt disponibile.",
      "Alcuni moduli non sono disponibili.",
      "Einige Module sind nicht verfügbar.",
      "Certains modules sont indisponibles.",
      "Algunos módulos no están disponibles."
    ],
    failed: [
      "Unable to complete this operation.",
      "Operațiunea nu a putut fi finalizată.",
      "Impossibile completare l'operazione.",
      "Der Vorgang konnte nicht abgeschlossen werden.",
      "Impossible de terminer cette opération.",
      "No se pudo completar esta operación."
    ],
    unknownModule: [
      "Unknown career module.",
      "Modul profesional necunoscut.",
      "Modulo professionale sconosciuto.",
      "Unbekanntes Karrieremodul.",
      "Module professionnel inconnu.",
      "Módulo profesional desconocido."
    ],
    stale: [
      "The document changed. Please run the analysis again.",
      "Documentul a fost modificat. Repetă analiza.",
      "Il documento è cambiato. Ripeti l'analisi.",
      "Das Dokument wurde geändert. Wiederhole die Analyse.",
      "Le document a changé. Relancez l'analyse.",
      "El documento ha cambiado. Repite el análisis."
    ],
    privacy: [
      "Your career analysis is processed locally.",
      "Analiza profesională este procesată local.",
      "L'analisi professionale viene elaborata localmente.",
      "Deine Karriereanalyse wird lokal verarbeitet.",
      "Votre analyse professionnelle est traitée localement.",
      "Tu análisis profesional se procesa localmente."
    ],
    estimated: [
      "Estimated insights, not hiring guarantees.",
      "Evaluări estimative, fără garanția angajării.",
      "Valutazioni indicative, senza garanzia di assunzione.",
      "Geschätzte Ergebnisse ohne Einstellungsgarantie.",
      "Estimations sans garantie de recrutement.",
      "Estimaciones sin garantía de contratación."
    ],
    interfaceUnavailable: [
      "Career Intelligence interface could not be initialized.",
      "Interfața Career Intelligence nu a putut fi inițializată.",
      "Impossibile inizializzare l'interfaccia Career Intelligence.",
      "Die Karriereoberfläche konnte nicht initialisiert werden.",
      "Impossible d'initialiser l'interface professionnelle.",
      "No se pudo inicializar la interfaz profesional."
    ],
    retry: [
      "Retry loading",
      "Reîncearcă încărcarea",
      "Riprova",
      "Erneut laden",
      "Réessayer",
      "Reintentar"
    ],
    modulesReady: [
      "Modules available",
      "Module disponibile",
      "Moduli disponibili",
      "Verfügbare Module",
      "Modules disponibles",
      "Módulos disponibles"
    ]
  };

  const modulePromises = new Map();
  const activeSessions = new Map();
  const moduleErrors = new Map();

  let initializationPromise = null;
  let initialized = false;
  let loading = false;
  let activeModule = "ats";
  let generation = 0;
  let lastOperation = null;
  let boundClient = null;
  let authSubscription = null;
  let currentOwner = null;
  let ownerKnown = false;
  let diagnosticTimer = null;

  /* EVENT MANAGEMENT */

  function emit(name, detail = {}) {
    document.dispatchEvent(
      new CustomEvent(name, { detail })
    );
  }

  /* LANGUAGE MANAGEMENT */

  function normalizeLanguage(value) {
    const language = String(value || "en")
      .toLowerCase()
      .split("-")[0];

    return LANGUAGES.includes(language)
      ? language
      : "en";
  }

  function getLanguage() {
    let language;

    try {
      language =
        window.WorknelyLocalization
          ?.getLanguage?.();
    } catch {}

    if (!language) {
      language =
        document.getElementById("language")
          ?.value;
    }

    if (!language) {
      try {
        language = localStorage.getItem(
          "worknely.language"
        );
      } catch {}
    }

    return normalizeLanguage(
      language ||
      document.documentElement.lang ||
      "en"
    );
  }

  function t(key, language = getLanguage()) {
    const index = LANGUAGES.indexOf(
      normalizeLanguage(language)
    );

    return DICTIONARY[key]?.[index] ||
      DICTIONARY[key]?.[0] ||
      key;
  }

  /* SAFE INPUT MANAGEMENT */

  function safeText(value, limit = 150000) {
    return typeof value === "string"
      ? value.trim().slice(0, limit)
      : "";
  }

  function normalizeContent(input) {
    const result = {};

    Object.keys(FIELDS).forEach(key => {
      result[key] = safeText(input?.[key]);
    });

    return result;
  }

  function readBuilder() {
    const result = {};

    Object.entries(FIELDS).forEach(
      ([key, id]) => {
        result[key] = safeText(
          document.getElementById(id)?.value
        );
      }
    );

    return result;
  }

  function contentToText(content) {
    const data = normalizeContent(content);

    return [
      data.professionalTitle,
      data.summary,
      data.experience,
      data.education,
      data.skills
    ].filter(Boolean).join("\n");
  }

  function readComparison() {
    return {
      content: {},
      resumeText: safeText(
        document.getElementById("resume")
          ?.value
      ),
      jobDescription: safeText(
        document.getElementById("job")
          ?.value
      )
    };
  }

  function getInput(options = {}) {
    const source =
      options.source === "comparison"
        ? "comparison"
        : "builder";

    const comparison = readComparison();

    const base =
      source === "comparison"
        ? comparison
        : {
            content: readBuilder(),
            jobDescription:
              comparison.jobDescription
          };

    const explicitResume =
      Object.prototype.hasOwnProperty.call(
        options,
        "resumeText"
      );

    const explicitContent =
      Object.prototype.hasOwnProperty.call(
        options,
        "content"
      );

    const content = normalizeContent(
      explicitContent
        ? options.content
        : explicitResume
          ? {}
          : base.content
    );

    const resumeText = explicitResume
      ? safeText(options.resumeText)
      : explicitContent
        ? contentToText(content)
        : safeText(base.resumeText) ||
          contentToText(content);

    return {
      ...options,
      source,
      content,
      resumeText,
      jobDescription: safeText(
        options.jobDescription ??
        base.jobDescription
      ),
      targetRole: safeText(
        options.targetRole ??
        content.professionalTitle,
        200
      ),
      language: normalizeLanguage(
        options.language ||
        getLanguage()
      ),
      emit: false
    };
  }

  /* MODULE REGISTRY */

  function getDefinition(id) {
    return MODULES.find(
      module => module.id === id
    ) || null;
  }

  function getEngine(id) {
    const definition = getDefinition(id);

    return definition
      ? window[definition.global] || null
      : null;
  }

  function validateModule(id) {
    const definition = getDefinition(id);
    const engine = getEngine(id);

    return Boolean(
      definition &&
      engine &&
      engine.version === definition.version &&
      typeof engine[definition.method] ===
        "function"
    );
  }

  function getModuleStatus() {
    return MODULES.map(module => ({
      id: module.id,
      global: module.global,
      file: module.file,
      expectedVersion: module.version,
      actualVersion:
        getEngine(module.id)?.version || null,
      ready: validateModule(module.id),
      error:
        moduleErrors.get(module.id) || null
    }));
  }

  /* SCRIPT LOADING */

  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script =
        document.createElement("script");

      script.src = url;
      script.async = false;
      script.dataset.wnCareerModule = "true";

      let settled = false;
      let timeout = null;

      function finish(error) {
        if (settled) return;

        settled = true;

        clearTimeout(timeout);

        script.onload = null;
        script.onerror = null;

        if (error) {
          script.remove();
          reject(error);
        } else {
          resolve(true);
        }
      }

      script.onload = () => finish(null);

      script.onerror = () => finish(
        new Error("loadFailed")
      );

      timeout = setTimeout(
        () => finish(
          new Error("loadTimeout")
        ),
        12000
      );

      document.head.appendChild(script);
    });
  }

  async function loadModule(id) {
    const definition = getDefinition(id);

    if (!definition) {
      throw new Error("unknownModule");
    }

    if (validateModule(id)) {
      moduleErrors.delete(id);
      return getEngine(id);
    }

    if (modulePromises.has(id)) {
      return modulePromises.get(id);
    }

    const promise = (async () => {
      try {
        const url = new URL(
          definition.file,
          document.baseURI
        );

        if (url.origin !== location.origin) {
          throw new Error("invalidModuleOrigin");
        }

        url.searchParams.set(
          "v",
          definition.version
        );

        await loadScript(url.href);

        const engine = getEngine(id);

        if (!engine) {
          throw new Error("missingGlobal");
        }

        if (engine.version !== definition.version) {
          throw new Error("invalidModuleVersion");
        }

        if (
          typeof engine[definition.method] !==
          "function"
        ) {
          throw new Error("missingModuleMethod");
        }

        moduleErrors.delete(id);

        return engine;

      } catch (error) {
        const reason =
          error?.message || "loadFailed";

        moduleErrors.set(id, reason);

        console.warn(
          "Worknely Career module:",
          id,
          reason
        );

        emit("worknely:careermoduleerror", {
          id,
          reason,
          file: definition.file
        });

        throw error;
      }
    })();

    modulePromises.set(id, promise);

    try {
      return await promise;
    } finally {
      modulePromises.delete(id);
    }
  }

  /* INTEGRATION DIAGNOSTICS */

  function getState() {
    const modules = getModuleStatus();

    const readyCount = modules.filter(
      module => module.ready
    ).length;

    return {
      version: VERSION,
      initialized,
      loading,
      ready:
        readyCount === MODULES.length,
      readyCount,
      totalModules: MODULES.length,
      activeModule,
      language: getLanguage(),
      supportedLanguages: [...LANGUAGES],
      modules,
      activeSessionCount: activeSessions.size,
      lastOperation:
        lastOperation
          ? { ...lastOperation }
          : null,
      processing: "local",
      externalAI: false,
      persistentCareerStorage: false
    };
  }

  /* AUTOMATIC INITIALIZATION */

  function initialize(options = {}) {
    if (initializationPromise) {
      return initializationPromise;
    }

    if (
      initialized &&
      !options.force
    ) {
      return Promise.resolve(getState());
    }

    loading = true;

    initializationPromise =
      Promise.resolve().then(async () => {
        emit("worknely:careerloading", {
          version: VERSION
        });

        /*
         * Load foundational engines first.
         * Remaining engines are loaded in
         * parallel after their dependencies.
         */

        const groups = [
          ["ats", "skill-gap"],
          ["resume-optimizer"],
          ["career-match"],
          [
            "interview-preparation",
            "cover-letter",
            "career-action-plan"
          ]
        ];

        try {
          for (const group of groups) {
            await Promise.allSettled(
              group.map(id => loadModule(id))
            );
          }
        } finally {
          initialized = true;
          loading = false;
        }

        const state = getState();

        console.info(
          "Worknely Career Intelligence:",
          state.readyCount + "/" +
          state.totalModules,
          "modules available"
        );

        emit(
          "worknely:careersuiteready",
          state
        );

        if (!state.ready) {
          emit(
            "worknely:careerpartialready",
            state
          );
        }

        scheduleDiagnostics();

        return state;

      }).finally(() => {
        initializationPromise = null;
      });

    return initializationPromise;
  }

  function retryInitialization() {
    return initialize({ force: true });
  }

  /* VISIBLE INITIALIZATION DIAGNOSTICS */

  function getRoot() {
    return document.getElementById(
      "wnCareerIntelligence"
    );
  }

  function isLoadingPlaceholder(root) {
    if (!root) return false;

    if (
      root.querySelector(
        "button,input,textarea,select"
      )
    ) {
      return false;
    }

    const value =
      root.textContent.trim();

    if (!value) return true;

    return DICTIONARY.loading.some(
      message =>
        value.toLowerCase().includes(
          message.toLowerCase()
        )
    ) ||
    /loading career intelligence/i.test(value);
  }

  function renderDiagnostics() {
    const root = getRoot();

    if (!root || loading || !initialized) {
      return;
    }

    const existing =
      root.querySelector(
        "[data-wn-career-diagnostics]"
      );

    if (
      !existing &&
      !isLoadingPlaceholder(root)
    ) {
      return;
    }

    const state = getState();

    const panel =
      document.createElement("div");

    panel.dataset.wnCareerDiagnostics =
      "true";

    panel.setAttribute("role", "status");

    panel.style.cssText = [
      "padding:16px",
      "border:1px solid #e3d9ff",
      "border-radius:12px",
      "background:#f5f1ff",
      "color:#20123f",
      "overflow-wrap:anywhere"
    ].join(";");

    const title =
      document.createElement("strong");

    title.textContent =
      state.ready
        ? t("interfaceUnavailable")
        : t("partial");

    panel.appendChild(title);

    const summary =
      document.createElement("p");

    summary.textContent =
      t("modulesReady") + ": " +
      state.readyCount + "/" +
      state.totalModules;

    panel.appendChild(summary);

    const failedModules =
      state.modules.filter(
        module => !module.ready
      );

    if (failedModules.length) {
      const list =
        document.createElement("ul");

      failedModules.forEach(module => {
        const item =
          document.createElement("li");

        item.textContent =
          module.id + ": " +
          (module.error || "unavailable");

        list.appendChild(item);
      });

      panel.appendChild(list);
    }

    const retry =
      document.createElement("button");

    retry.type = "button";
    retry.className = "primary";
    retry.textContent = t("retry");

    retry.addEventListener(
      "click",
      async () => {
        retry.disabled = true;

        summary.textContent = t("loading");

        try {
          await retryInitialization();

          /*
           * Allow the interface to respond
           * to the new suite-ready event.
           */

          scheduleDiagnostics();

        } catch {
          summary.textContent = t("failed");
        } finally {
          retry.disabled = false;
        }
      }
    );

    panel.appendChild(retry);

    if (existing) {
      existing.replaceWith(panel);
    } else {
      root.replaceChildren(panel);
    }
  }

  function scheduleDiagnostics() {
    clearTimeout(diagnosticTimer);

    diagnosticTimer = setTimeout(
      renderDiagnostics,
      1500
    );
  }

  /* PRIVATE SESSION MANAGEMENT */

  function clearSessions() {
    activeSessions.forEach(session => {
      try {
        session?.clear?.();
      } catch {}
    });

    activeSessions.clear();
  }

  function clearContext(reason = "manual") {
    generation++;

    clearSessions();

    lastOperation = null;

    emit("worknely:careercontextcleared", {
      version: VERSION,
      reason
    });

    return {
      ok: true,
      generation
    };
  }

  /* CAREER TOOL NAVIGATION */

  function setActiveModule(id) {
    if (!getDefinition(id)) {
      return {
        ok: false,
        reason: "unknownModule",
        message: t("unknownModule")
      };
    }

    activeModule = id;

    emit("worknely:careermodulechange", {
      id,
      version: VERSION
    });

    return {
      ok: true,
      id
    };
  }

  /* CENTRAL OPERATION ENGINE */

  async function run(id, options = {}) {
    const definition = getDefinition(id);

    const language = normalizeLanguage(
      options.language || getLanguage()
    );

    if (!definition) {
      return {
        ok: false,
        reason: "unknownModule",
        message: t("unknownModule", language)
      };
    }

    const revision = generation;
    const input = getInput(options);

    function staleResult() {
      return {
        ok: false,
        reason: "stale",
        message: t("stale", language)
      };
    }

    try {
      await initialize();

      if (revision !== generation) {
        return staleResult();
      }

      if (!validateModule(id)) {
        return {
          ok: false,
          reason: "moduleUnavailable",
          module: id,
          message: t("partial", language)
        };
      }

      const engine = getEngine(id);

      const result = await Promise.resolve(
        engine[definition.method](input)
      );

      if (revision !== generation) {
        return staleResult();
      }

      lastOperation = {
        module: id,
        ok: Boolean(result?.ok),
        timestamp: new Date().toISOString()
      };

      emit(
        "worknely:careeroperationcomplete",
        {
          version: VERSION,
          module: id,
          ok: Boolean(result?.ok)
        }
      );

      return result || {
        ok: false,
        reason: "emptyResult",
        message: t("failed", language)
      };

    } catch (error) {
      console.warn(
        "Worknely Career operation:",
        id,
        error?.name || "Error"
      );

      return {
        ok: false,
        reason: "operationFailed",
        module: id,
        message: t("failed", language)
      };
    }
  }

  /* COMPREHENSIVE CAREER ASSESSMENT */

  async function analyzeAll(options = {}) {
    const revision = generation;
    const input = getInput(options);

    const ids = [
      "ats",
      "skill-gap",
      "resume-optimizer",
      "career-match"
    ];

    const results = {};

    function staleResult() {
      return {
        ok: false,
        reason: "stale",
        message: t("stale", input.language)
      };
    }

    for (const id of ids) {
      if (revision !== generation) {
        return staleResult();
      }

      if (
        !input.jobDescription &&
        ["skill-gap", "career-match"]
          .includes(id)
      ) {
        results[id] = {
          ok: false,
          skipped: true,
          reason: "missingJob"
        };

        continue;
      }

      results[id] = await run(id, input);

      if (revision !== generation) {
        return staleResult();
      }
    }

    return {
      ok: Boolean(results.ats?.ok),
      version: VERSION,
      language: input.language,
      source: input.source,
      results,
      completedModules:
        Object.values(results)
          .filter(result => result?.ok)
          .length,
      disclaimer:
        t("estimated", input.language)
    };
  }

  /* INTERACTIVE SESSIONS */

  async function createSession(
    id,
    options = {}
  ) {
    if (
      ![
        "interview-preparation",
        "career-action-plan"
      ].includes(id)
    ) {
      return {
        ok: false,
        reason: "unsupportedSession"
      };
    }

    const revision = generation;
    const input = getInput(options);

    try {
      await initialize();

      if (revision !== generation) {
        return {
          ok: false,
          reason: "stale"
        };
      }

      const engine = getEngine(id);

      if (
        !validateModule(id) ||
        typeof engine?.createSession !==
          "function"
      ) {
        return {
          ok: false,
          reason: "sessionUnavailable"
        };
      }

      closeSession(id);

      const session = await Promise.resolve(
        engine.createSession(input)
      );

      if (revision !== generation) {
        session?.clear?.();

        return {
          ok: false,
          reason: "stale"
        };
      }

      if (!session || session.ok === false) {
        return {
          ok: false,
          reason: "sessionFailed"
        };
      }

      activeSessions.set(id, session);

      return {
        ok: true,
        module: id,
        session
      };

    } catch {
      return {
        ok: false,
        reason: "sessionFailed"
      };
    }
  }

  function getSession(id) {
    return activeSessions.get(id) || null;
  }

  function closeSession(id) {
    const session = activeSessions.get(id);

    try {
      session?.clear?.();
    } catch {}

    activeSessions.delete(id);

    return { ok: true };
  }

  /* ENGINE SELF-TESTS */

  async function selfTest() {
    await initialize();

    const checks = [];

    for (const module of MODULES) {
      const engine = getEngine(module.id);

      if (!validateModule(module.id)) {
        checks.push({
          id: module.id,
          passed: false,
          reason: "moduleUnavailable"
        });

        continue;
      }

      if (
        typeof engine.selfTest !== "function"
      ) {
        checks.push({
          id: module.id,
          passed: false,
          reason: "missingSelfTest"
        });

        continue;
      }

      try {
        const result = await Promise.resolve(
          engine.selfTest()
        );

        checks.push({
          id: module.id,
          version: engine.version,
          passed: result?.passed === true,
          details: result?.checks || {}
        });

      } catch {
        checks.push({
          id: module.id,
          passed: false,
          reason: "selfTestFailed"
        });
      }
    }

    const passedCount = checks.filter(
      check => check.passed
    ).length;

    return {
      version: VERSION,
      passed:
        passedCount === MODULES.length,
      passedCount,
      totalChecks: MODULES.length,
      checks
    };
  }

  /* AUTHENTICATION PRIVACY */

  function bindAuthentication(
    client = window.worknelySupabase
  ) {
    if (!client?.auth?.onAuthStateChange) {
      return {
        ok: false,
        reason: "authUnavailable"
      };
    }

    if (boundClient === client) {
      return { ok: true };
    }

    try {
      authSubscription?.unsubscribe?.();

      if (boundClient) {
        clearContext("authBinding");
      }

      boundClient = null;
      authSubscription = null;
      currentOwner = null;
      ownerKnown = false;

      const response =
        client.auth.onAuthStateChange(
          (event, session) => {
            const nextOwner =
              session?.user?.id || null;

            if (
              event === "SIGNED_OUT" ||
              (
                ownerKnown &&
                nextOwner !== currentOwner
              )
            ) {
              clearContext("authChanged");
            }

            currentOwner = nextOwner;
            ownerKnown = true;
          }
        );

      authSubscription =
        response?.data?.subscription || null;

      boundClient = client;

      return { ok: true };

    } catch {
      return {
        ok: false,
        reason: "authBindingFailed"
      };
    }
  }

  /* DOCUMENT CHANGE EVENTS */

  document.addEventListener(
    "input",
    event => {
      const id = event.target?.id;

      if (
        Object.values(FIELDS).includes(id) ||
        id === "resume" ||
        id === "job"
      ) {
        clearContext("inputChanged");
      }
    }
  );

  [
    "worknely:resumechange",
    "worknely:accountresumeloaded",
    "worknely:designcontextcleared"
  ].forEach(eventName => {
    document.addEventListener(
      eventName,
      () => clearContext("documentChanged")
    );
  });

  document.addEventListener(
    "worknely:languagechange",
    () => {
      clearContext("languageChanged");

      if (initialized) {
        scheduleDiagnostics();
      }
    }
  );

  document.addEventListener(
    "worknely:workspacechange",
    event => {
      if (
        event.detail?.view ===
        "career-intelligence"
      ) {
        initialize()
          .then(scheduleDiagnostics)
          .catch(scheduleDiagnostics);

        bindAuthentication();
      }
    }
  );

  window.addEventListener(
    "pagehide",
    () => {
      clearTimeout(diagnosticTimer);
      clearContext("pageHidden");
    }
  );

  /* PUBLIC CAREER SUITE API */

  window.WorknelyCareerController =
    Object.freeze({
      version: VERSION,
      languages: LANGUAGES,
      modules: MODULES,
      getLanguage,
      t,
      initialize,
      retryInitialization,
      loadModule,
      validateModule,
      getModuleStatus,
      getEngine,
      getInput,
      readBuilder,
      readComparison,
      setActiveModule,
      run,
      analyzeAll,
      createSession,
      getSession,
      closeSession,
      clearContext,
      bindAuthentication,
      selfTest,
      getState
    });

  /* AUTOMATIC STARTUP */

  function bootstrap() {
    bindAuthentication();

    initialize()
      .then(scheduleDiagnostics)
      .catch(error => {
        console.warn(
          "Worknely Career initialization:",
          error?.name || "Error"
        );

        scheduleDiagnostics();
      });
  }

  emit(
    "worknely:careercontrollerready",
    {
      version: VERSION,
      totalModules: MODULES.length
    }
  );

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      bootstrap,
      { once: true }
    );
  } else {
    bootstrap();
  }

  window.addEventListener(
    "load",
    bootstrap,
    { once: true }
  );

  window.addEventListener(
    "pageshow",
    bootstrap
  );

  document.addEventListener(
    "worknely:authready",
    () => bindAuthentication()
  );

  console.info(
    "Worknely V" + VERSION +
    " Career Intelligence Controller registered."
  );

})();

/*
 * END WORKNELY V7.18.1.1
 * Automatic Initialization
 * Module Loading Diagnostics
 * International Integration
 * Privacy-First Processing
 */
