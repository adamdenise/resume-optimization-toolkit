
/*
 * WORKNELY V7.18.3.1
 * Professional Analytics Engine
 * Secure Career History Integration
 * WORKNELY — PEOPLE TECHNOLOGY
 */

(function () {
  "use strict";

  const VERSION = "7.18.3.1";
  const HISTORY_LIMIT = 100;

  const TYPES = Object.freeze([
    "ats",
    "skill-gap",
    "resume-optimizer",
    "career-match",
    "interview-preparation",
    "cover-letter",
    "career-action-plan"
  ]);

  let generation = 0;
  let currentOwner = null;
  let authClient = null;
  let authSubscription = null;
  let recoveryMode = false;
  let snapshot = null;
  let loading = false;
  let lastError = null;

  function safeScore(value) {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      !["number", "string"].includes(
        typeof value
      )
    ) {
      return null;
    }

    const number = Number(value);

    return Number.isFinite(number) &&
      number >= 0 &&
      number <= 100
      ? Math.round(number * 100) / 100
      : null;
  }

  function safeCount(value) {
    return Number.isInteger(value) &&
      value >= 0 &&
      value <= 100000
      ? value
      : null;
  }

  function round(value) {
    return Math.round(value * 100) / 100;
  }

  function getClient() {
    const client = window.worknelySupabase;

    if (!client?.auth) {
      throw new Error("AUTH_NOT_READY");
    }

    return client;
  }

  function getStorage() {
    const storage =
      window.WorknelyCareerStorage;

    if (typeof storage?.list !== "function") {
      throw new Error("STORAGE_NOT_READY");
    }

    return storage;
  }

  function normalizeRecord(record) {
    if (
      !record ||
      !TYPES.includes(record.analysis_type)
    ) {
      return null;
    }

    const timestamp = Date.parse(
      record.created_at
    );

    if (!Number.isFinite(timestamp)) {
      return null;
    }

    const result =
      record.result &&
      typeof record.result === "object"
        ? record.result
        : {};

    return {
      type: record.analysis_type,
      score: safeScore(record.score),
      timestamp,
      date: new Date(timestamp).toISOString(),
      engineVersion:
        typeof record.engine_version === "string"
          ? record.engine_version
          : null,
      missingSkills: safeCount(
        result.missingSkillsCount
      ),
      matchedSkills: safeCount(
        result.matchedSkillsCount
      )
    };
  }

  function summarize(records, type) {
    const entries = records.filter(
      record => record.type === type
    );

    const scored = entries.filter(
      record => record.score !== null
    );

    const first = scored[0] || null;

    const latest =
      scored[scored.length - 1] || null;

    const previous =
      scored[scored.length - 2] || null;

    const scores = scored.map(
      record => record.score
    );

    return {
      count: entries.length,
      scoredCount: scored.length,

      latestScore:
        latest?.score ?? null,

      firstScore:
        first?.score ?? null,

      previousScore:
        previous?.score ?? null,

      bestScore: scores.length
        ? Math.max(...scores)
        : null,

      lowestScore: scores.length
        ? Math.min(...scores)
        : null,

      averageScore: scores.length
        ? round(
            scores.reduce(
              (sum, value) => sum + value,
              0
            ) / scores.length
          )
        : null,

      change: scored.length >= 2
        ? round(latest.score - first.score)
        : null,

      recentChange: previous
        ? round(
            latest.score - previous.score
          )
        : null,

      latestDate:
        entries[entries.length - 1]?.date ||
        null,

      series: scored.map(record => ({
        date: record.date,
        score: record.score,
        engineVersion: record.engineVersion
      }))
    };
  }

  function calculate(input = []) {
    const records = (
      Array.isArray(input) ? input : []
    )
      .slice(0, HISTORY_LIMIT)
      .map(normalizeRecord)
      .filter(Boolean)
      .sort(
        (a, b) => a.timestamp - b.timestamp
      );

    const modules = {};

    TYPES.forEach(type => {
      modules[type] = summarize(
        records, type
      );
    });

    const latestSkillGap = records
      .filter(
        record => record.type === "skill-gap"
      )
      .pop();

    return {
      version: VERSION,

      totalAnalyses: records.length,

      historyLimit: HISTORY_LIMIT,

      historyLimitReached:
        records.length >= HISTORY_LIMIT,

      completedModules: TYPES.filter(
        type => modules[type].count > 0
      ).length,

      totalModules: TYPES.length,

      ats: modules.ats,

      careerMatch:
        modules["career-match"],

      skillGap: {
        ...modules["skill-gap"],

        missingSkills:
          latestSkillGap?.missingSkills ??
          null,

        matchedSkills:
          latestSkillGap?.matchedSkills ??
          null
      },

      careerPlan:
        modules["career-action-plan"],

      modules,

      comparisonBasis:
        "saved-score-history",

      generatedAt:
        new Date().toISOString()
    };
  }

  function getState() {
    return {
      version: VERSION,
      authenticated: Boolean(currentOwner),
      loading,
      error: lastError,
      available: Boolean(snapshot),
      historyLimit: HISTORY_LIMIT,
      automaticSaving: false,
      rawResumeStorage: false
    };
  }

  function getSnapshot() {
    return snapshot
      ? JSON.parse(JSON.stringify(snapshot))
      : null;
  }

  function publish() {
    document.dispatchEvent(
      new CustomEvent(
        "worknely:careeranalyticschange",
        {
          detail: {
            version: VERSION,
            available: Boolean(snapshot),
            loading
          }
        }
      )
    );
  }

  function clear() {
    generation++;
    snapshot = null;
    loading = false;
    lastError = null;
    publish();
  }

  function scheduleRefresh() {
    setTimeout(() => {
      refresh();
    }, 0);
  }

  function bindAuthentication() {
    const client =
      window.worknelySupabase;

    if (!client?.auth) return false;

    if (
      authClient === client &&
      authSubscription
    ) {
      return true;
    }

    authSubscription?.unsubscribe();

    authClient = client;
    currentOwner = null;
    recoveryMode = false;

    clear();

    const { data } =
      client.auth.onAuthStateChange(
        (event, session) => {
          const owner =
            session?.user?.id || null;

          const previousRecovery =
            recoveryMode;

          if (event === "PASSWORD_RECOVERY") {
            recoveryMode = true;
          } else if (
            event === "SIGNED_OUT" ||
            event === "USER_UPDATED"
          ) {
            recoveryMode = false;
          }

          const changed =
            owner !== currentOwner ||
            event === "SIGNED_OUT" ||
            event === "PASSWORD_RECOVERY" ||
            previousRecovery !== recoveryMode;

          if (changed) {
            currentOwner = owner;
            clear();
          }

          if (
            owner &&
            !recoveryMode &&
            (
              changed ||
              event === "INITIAL_SESSION"
            )
          ) {
            scheduleRefresh();
          }
        }
      );

    authSubscription =
      data?.subscription || null;

    return Boolean(authSubscription);
  }

  async function refresh() {
    if (!bindAuthentication()) {
      return null;
    }

    if (recoveryMode) {
      clear();
      return null;
    }

    const ticket = ++generation;

    snapshot = null;
    loading = true;
    lastError = null;

    publish();

    try {
      const client = getClient();
      const storage = getStorage();

      const { data, error } =
        await client.auth.getUser();

      if (ticket !== generation) {
        return null;
      }

      const owner = data?.user?.id;

      if (error || !owner) {
        currentOwner = null;
        throw new Error("AUTH_REQUIRED");
      }

      if (
        currentOwner !== owner ||
        recoveryMode
      ) {
        throw new Error("SESSION_CHANGED");
      }

      const records = await storage.list({
        limit: HISTORY_LIMIT
      });

      if (ticket !== generation) {
        return null;
      }

      const verification =
        await client.auth.getUser();

      if (ticket !== generation) {
        return null;
      }

      if (
        verification.error ||
        verification.data?.user?.id !== owner ||
        currentOwner !== owner ||
        recoveryMode
      ) {
        throw new Error("SESSION_CHANGED");
      }

      snapshot = calculate(records);

      return getSnapshot();

    } catch (error) {
      if (ticket === generation) {
        snapshot = null;

        const code = String(
          error?.message || "ANALYTICS_FAILED"
        );

        lastError =
          /^[A-Z0-9_]{1,64}$/.test(code)
            ? code
            : "ANALYTICS_FAILED";
      }

      return null;

    } finally {
      if (ticket === generation) {
        loading = false;
        publish();
      }
    }
  }

  function initialize() {
    bindAuthentication();
  }

  document.addEventListener(
    "worknely:careerhistorychange",
    event => {
      if (
        currentOwner &&
        event.detail?.userId === currentOwner &&
        !recoveryMode
      ) {
        scheduleRefresh();
      }
    }
  );

  document.addEventListener(
    "worknely:workspacechange",
    event => {
      bindAuthentication();

      if (
        event.detail?.view ===
          "career-intelligence" &&
        currentOwner &&
        !recoveryMode &&
        !loading
      ) {
        scheduleRefresh();
      }
    }
  );

  window.addEventListener(
    "pagehide",
    clear
  );

  window.addEventListener(
    "pageshow",
    () => {
      initialize();

      if (
        currentOwner &&
        !recoveryMode
      ) {
        scheduleRefresh();
      }
    }
  );

  window.addEventListener(
    "load",
    initialize,
    { once: true }
  );

  function selfTest() {
    const result = calculate([
      {
        analysis_type: "ats",
        score: 41,
        created_at: "2026-01-01T12:00:00Z"
      },
      {
        analysis_type: "ats",
        score: 65,
        created_at: "2026-01-02T12:00:00Z"
      },
      {
        analysis_type: "ats",
        score: 58,
        created_at: "2026-01-03T12:00:00Z"
      },
      {
        analysis_type: "career-match",
        score: 72,
        created_at: "2026-01-03T13:00:00Z"
      },
      {
        analysis_type: "skill-gap",
        score: 55,
        result: {
          missingSkillsCount: 2,
          matchedSkillsCount: 3
        },
        created_at: "2026-01-03T14:00:00Z"
      }
    ]);

    const empty = calculate([]);

    const checks = {
      totalAnalyses:
        result.totalAnalyses === 5,

      latestATS:
        result.ats.latestScore === 58,

      bestATS:
        result.ats.bestScore === 65,

      atsChange:
        result.ats.change === 17,

      recentChange:
        result.ats.recentChange === -7,

      careerMatch:
        result.careerMatch.latestScore === 72,

      missingSkills:
        result.skillGap.missingSkills === 2,

      completedModules:
        result.completedModules === 3,

      emptyHistory:
        empty.totalAnalyses === 0 &&
        empty.ats.latestScore === null,

      invalidScore:
        safeScore(101) === null &&
        safeScore(-1) === null &&
        safeScore(null) === null
    };

    return {
      version: VERSION,
      passed: Object.values(checks)
        .every(Boolean),
      checks
    };
  }

  window.WorknelyCareerAnalytics =
    Object.freeze({
      version: VERSION,
      calculate,
      refresh,
      clear,
      getState,
      getSnapshot,
      bindAuthentication,
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

  console.info(
    "Worknely V7.18.3.1 Professional Analytics Engine ready."
  );

})();

/*
 * END WORKNELY V7.18.3.1
 * PROFESSIONAL ANALYTICS ENGINE
 */
