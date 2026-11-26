
/*
 * WORKNELY V7.18.2
 * Secure Career Storage Engine
 * Supabase Cloud Integration
 * Privacy-first Architecture
 */

(function () {
  "use strict";

  const VERSION = "7.18.2";
  const TABLE = "career_analyses";

  const TYPES = new Set([
    "ats",
    "skill-gap",
    "resume-optimizer",
    "career-match",
    "interview-preparation",
    "cover-letter",
    "career-action-plan"
  ]);

  const LANGUAGES = new Set([
    "en", "ro", "it", "de", "fr", "es"
  ]);

  function getClient() {
    const client = window.worknelySupabase;

    if (!client?.auth || !client?.from) {
      throw new Error("AUTH_NOT_READY");
    }

    return client;
  }

  async function getContext() {
    const client = getClient();

    const { data, error } =
      await client.auth.getUser();

    if (error || !data?.user?.id) {
      throw new Error("AUTH_REQUIRED");
    }

    return {
      client,
      userId: data.user.id
    };
  }

  async function verifyOwner(context) {
    const { data, error } =
      await context.client.auth.getUser();

    if (
      error ||
      data?.user?.id !== context.userId
    ) {
      throw new Error("SESSION_CHANGED");
    }
  }

  function getLanguage(value) {
    const language =
      value ||
      window.WorknelyLocalization
        ?.getLanguage() ||
      document.documentElement.lang ||
      "en";

    return LANGUAGES.has(language)
      ? language
      : "en";
  }

  function safeScore(value) {
    if (
      typeof value !== "number" ||
      !Number.isFinite(value) ||
      value < 0 ||
      value > 100
    ) {
      return null;
    }

    return Math.round(value * 100) / 100;
  }

  function safeCount(value) {
    return Number.isInteger(value) &&
      value >= 0 &&
      value <= 100000
      ? value
      : null;
  }

  function safeVersion(value) {
    return typeof value === "string" &&
      /^[a-zA-Z0-9._-]{1,40}$/.test(value)
      ? value
      : null;
  }

  function buildSummary(result = {}) {
    const summary = {};

    const scoreFields = [
      "estimatedATSReadiness",
      "estimatedSkillCoverage",
      "estimatedCareerMatch",
      "estimatedScore",
      "matchScore",
      "coverage"
    ];

    for (const key of scoreFields) {
      const value = safeScore(result[key]);

      if (value !== null) {
        summary[key] = value;
      }
    }

    const countFields = {
      matchedSkills: "matchedSkillsCount",
      missingSkills: "missingSkillsCount",
      matchedKeywords: "matchedKeywordsCount",
      missingKeywords: "missingKeywordsCount",
      questions: "questionCount",
      tasks: "taskCount"
    };

    for (const [source, target] of
      Object.entries(countFields)) {

      if (Array.isArray(result[source])) {
        const count =
          safeCount(result[source].length);

        if (count !== null) {
          summary[target] = count;
        }
      }
    }

    const completed = safeCount(
      result.progress?.completed
    );

    const total = safeCount(
      result.progress?.total
    );

    if (
      completed !== null &&
      total !== null &&
      total > 0 &&
      completed <= total
    ) {
      summary.progress = {
        completed,
        total
      };
    }

    return summary;
  }

  function getScore(result, type) {
    if (type === "career-action-plan") {
      const completed =
        result.progress?.completed;

      const total =
        result.progress?.total;

      if (
        Number.isInteger(completed) &&
        Number.isInteger(total) &&
        total > 0
      ) {
        return safeScore(
          completed / total * 100
        );
      }
    }

    const values = [
      result.estimatedATSReadiness,
      result.estimatedSkillCoverage,
      result.estimatedCareerMatch,
      result.estimatedScore,
      result.matchScore,
      result.coverage
    ];

    for (const value of values) {
      const score = safeScore(value);

      if (score !== null) return score;
    }

    return null;
  }

  function notify(action, userId) {
    document.dispatchEvent(
      new CustomEvent(
        "worknely:careerhistorychange",
        {
          detail: {
            action,
            userId,
            version: VERSION
          }
        }
      )
    );
  }

  async function save(options = {}) {
    if (options.consent !== true) {
      throw new Error("CONSENT_REQUIRED");
    }

    const type = options.type;

    if (!TYPES.has(type)) {
      throw new Error("INVALID_ANALYSIS_TYPE");
    }

    const result = options.result;

    if (
      !result ||
      typeof result !== "object" ||
      Array.isArray(result)
    ) {
      throw new Error("INVALID_RESULT");
    }

    if (result.ok === false) {
      throw new Error("ANALYSIS_FAILED");
    }

    const context = await getContext();

    const payload = {
      user_id: context.userId,
      analysis_type: type,
      language: getLanguage(
        options.language
      ),
      score: getScore(result, type),
      result: buildSummary(result),
      engine_version: safeVersion(
        result.version ||
        options.engineVersion
      )
    };

    if (
      options.includeTargetRole === true &&
      typeof options.targetRole === "string"
    ) {
      payload.target_role =
        options.targetRole
          .trim()
          .slice(0, 200) || null;
    }

    const { data, error } =
      await context.client
        .from(TABLE)
        .insert(payload)
        .select(
          "id,analysis_type,target_role," +
          "language,score,result," +
          "engine_version,created_at"
        )
        .single();

    if (error) {
      throw new Error("SAVE_FAILED");
    }

    await verifyOwner(context);

    notify("saved", context.userId);

    return data;
  }

  async function list(options = {}) {
    const context = await getContext();

    const requestedLimit =
      Number(options.limit);

    const limit =
      Number.isFinite(requestedLimit)
        ? Math.min(
            100,
            Math.max(
              1,
              Math.floor(requestedLimit)
            )
          )
        : 30;

    let query = context.client
      .from(TABLE)
      .select(
        "id,analysis_type,target_role," +
        "language,score,result," +
        "engine_version,created_at"
      )
      .eq("user_id", context.userId)
      .order("created_at", {
        ascending: false
      })
      .limit(limit);

    if (options.type) {
      if (!TYPES.has(options.type)) {
        throw new Error(
          "INVALID_ANALYSIS_TYPE"
        );
      }

      query = query.eq(
        "analysis_type",
        options.type
      );
    }

    const { data, error } = await query;

    if (error) {
      throw new Error("HISTORY_LOAD_FAILED");
    }

    await verifyOwner(context);

    return Array.isArray(data)
      ? data
      : [];
  }

  async function remove(id) {
    if (
      typeof id !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
    ) {
      throw new Error("INVALID_ID");
    }

    const context = await getContext();

    const { data, error } =
      await context.client
        .from(TABLE)
        .delete()
        .eq("id", id)
        .eq("user_id", context.userId)
        .select("id")
        .maybeSingle();

    if (error) {
      throw new Error("DELETE_FAILED");
    }

    await verifyOwner(context);

    if (!data) {
      throw new Error("NOT_FOUND");
    }

    notify("deleted", context.userId);

    return true;
  }

  async function getStatus() {
    try {
      await getContext();

      return {
        version: VERSION,
        authenticated: true,
        cloudStorage: true,
        databaseVerified: false,
        automaticSaving: false,
        rawResumeStorage: false
      };

    } catch {
      return {
        version: VERSION,
        authenticated: false,
        cloudStorage: false,
        databaseVerified: false,
        automaticSaving: false,
        rawResumeStorage: false
      };
    }
  }

  window.WorknelyCareerStorage =
    Object.freeze({
      version: VERSION,
      save,
      list,
      remove,
      getStatus
    });

  console.info(
    "Worknely V7.18.2 Career Storage Engine ready."
  );

})();

/*
 * END WORKNELY V7.18.2
 * SECURE CAREER STORAGE ENGINE
 * WORKNELY — PEOPLE TECHNOLOGY
 */
