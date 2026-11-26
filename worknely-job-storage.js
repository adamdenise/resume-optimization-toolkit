
/**
 * WORKNELY
 * Job Application Storage Engine
 * Version: 7.19.2
 *
 * Secure cloud storage for job applications.
 * Copyright Worknely.
 */

(function () {
  "use strict";

  const VERSION = "7.19.2";
  const TABLE = "job_applications";

  const STATUSES = Object.freeze([
    "saved",
    "applied",
    "screening",
    "interview",
    "assessment",
    "offer",
    "accepted",
    "rejected",
    "withdrawn"
  ]);

  const FIELDS = [
    "id",
    "user_id",
    "company",
    "job_title",
    "location",
    "job_url",
    "employment_type",
    "work_mode",
    "status",
    "applied_at",
    "interview_at",
    "follow_up_at",
    "notes",
    "created_at",
    "updated_at"
  ].join(",");

  const UUID_PATTERN =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  let authClient = null;
  let authSubscription = null;
  let currentOwner = null;
  let recoveryMode = false;
  let authEpoch = 0;

  /* =========================
     ERROR MANAGEMENT
  ========================= */

  function fail(code) {
    const error = new Error(code);
    error.code = code;
    throw error;
  }

  function safeError(error) {
    const code = String(
      error?.code || "JOB_STORAGE_ERROR"
    );

    return /^[A-Z0-9_]{1,64}$/.test(code)
      ? code
      : "JOB_STORAGE_ERROR";
  }

  /* =========================
     AUTHENTICATION
  ========================= */

  function getClient() {
    const client = window.worknelySupabase;

    if (
      !client ||
      typeof client.from !== "function" ||
      typeof client.auth?.getUser !== "function"
    ) {
      fail("SUPABASE_UNAVAILABLE");
    }

    return client;
  }

  function notify(action, owner = null) {
    document.dispatchEvent(
      new CustomEvent("worknely:jobapplicationschange", {
        detail: {
          action,
          userId: owner,
          version: VERSION
        }
      })
    );
  }

  function bindAuthentication() {
    const client = window.worknelySupabase;

    if (!client?.auth?.onAuthStateChange) {
      return false;
    }

    if (client === authClient && authSubscription) {
      return true;
    }

    authSubscription?.unsubscribe?.();

    authClient = client;
    currentOwner = null;
    recoveryMode = false;
    authEpoch += 1;

    const response = client.auth.onAuthStateChange(
      function (event, session) {
        if (client !== authClient) return;

        const owner = session?.user?.id || null;
        const previousOwner = currentOwner;

        if (event === "PASSWORD_RECOVERY") {
          recoveryMode = true;
          authEpoch += 1;
        }

        if (event === "SIGNED_OUT") {
          recoveryMode = false;
          authEpoch += 1;
        }

        if (owner !== previousOwner) {
          authEpoch += 1;
        }

        currentOwner = owner;

        if (
          owner !== previousOwner ||
          event === "SIGNED_OUT" ||
          event === "PASSWORD_RECOVERY"
        ) {
          notify("auth-change", owner);
        }
      }
    );

    authSubscription =
      response?.data?.subscription || null;

    return Boolean(authSubscription);
  }

  async function getContext(expectedUserId) {
    const client = getClient();

    bindAuthentication();

    if (recoveryMode) {
      fail("RECOVERY_MODE_ACTIVE");
    }

    const epoch = authEpoch;

    const { data, error } =
      await client.auth.getUser();

    if (error || !data?.user?.id) {
      fail("AUTHENTICATION_REQUIRED");
    }

    const userId = data.user.id;

    if (
      expectedUserId &&
      userId !== expectedUserId
    ) {
      fail("ACCOUNT_CHANGED");
    }

    if (
      epoch !== authEpoch ||
      recoveryMode ||
      client !== authClient
    ) {
      fail("ACCOUNT_CHANGED");
    }

    if (
      currentOwner &&
      currentOwner !== userId
    ) {
      fail("ACCOUNT_CHANGED");
    }

    return {
      client,
      userId,
      epoch
    };
  }

  async function verifyOwner(context) {
    if (
      context.epoch !== authEpoch ||
      recoveryMode ||
      context.client !== authClient
    ) {
      fail("ACCOUNT_CHANGED");
    }

    const { data, error } =
      await context.client.auth.getUser();

    if (
      error ||
      data?.user?.id !== context.userId ||
      context.epoch !== authEpoch ||
      recoveryMode ||
      context.client !== authClient
    ) {
      fail("ACCOUNT_CHANGED");
    }

    return true;
  }

  /* =========================
     VALIDATION
  ========================= */

  function validateId(value) {
    const id = String(value || "").trim();

    if (!UUID_PATTERN.test(id)) {
      fail("INVALID_APPLICATION_ID");
    }

    return id;
  }

  function validateOwner(value) {
    const id = String(value || "").trim();

    if (!UUID_PATTERN.test(id)) {
      fail("EXPECTED_USER_REQUIRED");
    }

    return id;
  }

  function cleanText(
    value,
    maxLength,
    required = false
  ) {
    if (value == null) {
      if (required) {
        fail("REQUIRED_FIELD_MISSING");
      }

      return null;
    }

    if (typeof value !== "string") {
      fail("INVALID_TEXT_VALUE");
    }

    const text = value.trim();

    if (!text) {
      if (required) {
        fail("REQUIRED_FIELD_MISSING");
      }

      return null;
    }

    if (text.length > maxLength) {
      fail("TEXT_LIMIT_EXCEEDED");
    }

    return text;
  }

  function validateStatus(value) {
    if (!STATUSES.includes(value)) {
      fail("INVALID_APPLICATION_STATUS");
    }

    return value;
  }

  function validateUrl(value) {
    const text = cleanText(value, 2048);

    if (!text) return null;

    let url;

    try {
      url = new URL(text);
    } catch {
      fail("INVALID_JOB_URL");
    }

    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password
    ) {
      fail("INVALID_JOB_URL");
    }

    if (url.href.length > 2048) {
      fail("TEXT_LIMIT_EXCEEDED");
    }

    return url.href;
  }

  function validateDate(value) {
    if (value == null || value === "") {
      return null;
    }

    if (
      typeof value !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
      fail("INVALID_DATE");
    }

    const date = new Date(
      value + "T00:00:00.000Z"
    );

    if (
      !Number.isFinite(date.getTime()) ||
      date.toISOString().slice(0, 10) !== value
    ) {
      fail("INVALID_DATE");
    }

    return value;
  }

  function validateDateTime(value) {
    if (value == null || value === "") {
      return null;
    }

    if (
      typeof value !== "string" ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)
    ) {
      fail("INVALID_DATETIME");
    }

    validateDate(value.slice(0, 10));

    const date = new Date(value);

    if (!Number.isFinite(date.getTime())) {
      fail("INVALID_DATETIME");
    }

    return date.toISOString();
  }

  function hasField(object, key) {
    return Object.prototype.hasOwnProperty.call(
      object,
      key
    );
  }

  function buildPayload(input, partial = false) {
    if (
      !input ||
      typeof input !== "object" ||
      Array.isArray(input)
    ) {
      fail("INVALID_APPLICATION_DATA");
    }

    const payload = {};

    const validators = {
      company: value =>
        cleanText(value, 200, true),

      job_title: value =>
        cleanText(value, 200, true),

      location: value =>
        cleanText(value, 250),

      job_url: validateUrl,

      employment_type: value =>
        cleanText(value, 100),

      work_mode: value =>
        cleanText(value, 100),

      status: validateStatus,

      applied_at: validateDate,

      interview_at: validateDateTime,

      follow_up_at: validateDateTime,

      notes: value =>
        cleanText(value, 10000)
    };

    Object.keys(validators).forEach(function (key) {
      if (hasField(input, key)) {
        payload[key] = validators[key](input[key]);
      }
    });

    if (!partial) {
      if (!payload.company || !payload.job_title) {
        fail("REQUIRED_FIELD_MISSING");
      }

      if (!payload.status) {
        payload.status = "saved";
      }
    }

    if (
      partial &&
      Object.keys(payload).length === 0
    ) {
      fail("NO_VALID_FIELDS");
    }

    return payload;
  }

  /* =========================
     CREATE APPLICATION
  ========================= */

  async function create(input, options = {}) {
    const expectedUserId =
      validateOwner(options.expectedUserId);

    const payload = buildPayload(input);

    const context =
      await getContext(expectedUserId);

    await verifyOwner(context);

    const { data, error } = await context.client
      .from(TABLE)
      .insert({
        ...payload,
        user_id: context.userId
      })
      .select(FIELDS)
      .single();

    if (error) {
      fail(safeError(error));
    }

    if (
      !data?.id ||
      data.user_id !== context.userId
    ) {
      fail("APPLICATION_CREATE_FAILED");
    }

    await verifyOwner(context);

    notify("create", context.userId);

    return data;
  }

  /* =========================
     LIST APPLICATIONS
  ========================= */

  async function list(options = {}) {
    const context = await getContext(
      options.expectedUserId
    );

    const requestedLimit = Number(
      options.limit ?? 50
    );

    const limit = Number.isFinite(requestedLimit)
      ? Math.min(
          100,
          Math.max(1, Math.floor(requestedLimit))
        )
      : 50;

    const requestedOffset = Number(
      options.offset ?? 0
    );

    const offset = Number.isFinite(requestedOffset)
      ? Math.min(
          100000,
          Math.max(0, Math.floor(requestedOffset))
        )
      : 0;

    let query = context.client
      .from(TABLE)
      .select(FIELDS)
      .eq("user_id", context.userId);

    if (options.status) {
      query = query.eq(
        "status",
        validateStatus(options.status)
      );
    }

    const { data, error } = await query
      .order("created_at", {
        ascending: false
      })
      .order("id", {
        ascending: false
      })
      .range(offset, offset + limit - 1);

    if (error) {
      fail(safeError(error));
    }

    await verifyOwner(context);

    const records = Array.isArray(data)
      ? data
      : [];

    if (
      records.some(
        record => record.user_id !== context.userId
      )
    ) {
      fail("OWNERSHIP_VALIDATION_FAILED");
    }

    return records;
  }

  /* =========================
     GET SINGLE APPLICATION
  ========================= */

  async function get(id, options = {}) {
    const applicationId = validateId(id);

    const context = await getContext(
      options.expectedUserId
    );

    const { data, error } = await context.client
      .from(TABLE)
      .select(FIELDS)
      .eq("id", applicationId)
      .eq("user_id", context.userId)
      .maybeSingle();

    if (error) {
      fail(safeError(error));
    }

    await verifyOwner(context);

    if (
      data &&
      data.user_id !== context.userId
    ) {
      fail("OWNERSHIP_VALIDATION_FAILED");
    }

    return data || null;
  }

  /* =========================
     UPDATE APPLICATION
  ========================= */

  async function update(
    id,
    changes,
    options = {}
  ) {
    const applicationId = validateId(id);

    const expectedUserId =
      validateOwner(options.expectedUserId);

    const payload = buildPayload(
      changes,
      true
    );

    const context =
      await getContext(expectedUserId);

    await verifyOwner(context);

    const { data, error } = await context.client
      .from(TABLE)
      .update(payload)
      .eq("id", applicationId)
      .eq("user_id", context.userId)
      .select(FIELDS)
      .maybeSingle();

    if (error) {
      fail(safeError(error));
    }

    if (
      !data?.id ||
      data.user_id !== context.userId
    ) {
      fail("APPLICATION_NOT_FOUND");
    }

    await verifyOwner(context);

    notify("update", context.userId);

    return data;
  }

  /* =========================
     UPDATE APPLICATION STATUS
  ========================= */

  async function updateStatus(
    id,
    status,
    options = {}
  ) {
    return update(
      id,
      {
        status: validateStatus(status)
      },
      options
    );
  }

  /* =========================
     DELETE APPLICATION
  ========================= */

  async function remove(id, options = {}) {
    const applicationId = validateId(id);

    const expectedUserId =
      validateOwner(options.expectedUserId);

    const context =
      await getContext(expectedUserId);

    await verifyOwner(context);

    const { data, error } = await context.client
      .from(TABLE)
      .delete()
      .eq("id", applicationId)
      .eq("user_id", context.userId)
      .select("id,user_id")
      .maybeSingle();

    if (error) {
      fail(safeError(error));
    }

    if (
      !data?.id ||
      data.user_id !== context.userId
    ) {
      fail("APPLICATION_NOT_FOUND");
    }

    await verifyOwner(context);

    notify("delete", context.userId);

    return {
      ok: true,
      id: data.id
    };
  }

  /* =========================
     APPLICATION STATISTICS
  ========================= */

  async function getStatistics(options = {}) {
    const context = await getContext(
      options.expectedUserId
    );

    const counts = await Promise.all(
      STATUSES.map(async function (status) {
        const { count, error } =
          await context.client
            .from(TABLE)
            .select("id", {
              count: "exact",
              head: true
            })
            .eq("user_id", context.userId)
            .eq("status", status);

        if (error) {
          fail(safeError(error));
        }

        if (
          !Number.isSafeInteger(count) ||
          count < 0
        ) {
          fail("INVALID_STATISTICS");
        }

        return [status, count];
      })
    );

    await verifyOwner(context);

    const byStatus = Object.fromEntries(counts);

    const total = counts.reduce(
      (sum, item) => sum + item[1],
      0
    );

    return {
      total,
      byStatus,

      active:
        byStatus.applied +
        byStatus.screening +
        byStatus.interview +
        byStatus.assessment +
        byStatus.offer,

      interviews: byStatus.interview,

      offers: byStatus.offer,

      accepted: byStatus.accepted,

      rejected: byStatus.rejected,

      generatedAt: new Date().toISOString()
    };
  }

  /* =========================
     UPCOMING INTERVIEWS
  ========================= */

  async function getUpcomingInterviews(
    options = {}
  ) {
    const context = await getContext(
      options.expectedUserId
    );

    const requestedLimit = Number(
      options.limit ?? 20
    );

    const limit = Number.isFinite(requestedLimit)
      ? Math.min(
          100,
          Math.max(1, Math.floor(requestedLimit))
        )
      : 20;

    const { data, error } = await context.client
      .from(TABLE)
      .select(FIELDS)
      .eq("user_id", context.userId)
      .in("status", [
        "applied",
        "screening",
        "interview",
        "assessment",
        "offer"
      ])
      .gte(
        "interview_at",
        new Date().toISOString()
      )
      .order("interview_at", {
        ascending: true
      })
      .limit(limit);

    if (error) {
      fail(safeError(error));
    }

    await verifyOwner(context);

    const records = Array.isArray(data)
      ? data
      : [];

    if (
      records.some(
        record => record.user_id !== context.userId
      )
    ) {
      fail("OWNERSHIP_VALIDATION_FAILED");
    }

    return records;
  }

  /* =========================
     STORAGE STATUS
  ========================= */

  function getStatus() {
    return {
      version: VERSION,
      table: TABLE,

      available: Boolean(
        window.worknelySupabase?.from &&
        window.worknelySupabase?.auth
      ),

      authenticated: Boolean(currentOwner),

      recoveryMode,

      databaseVerified: false,

      automaticSaving: false,

      localDataStorage: false,

      supportedStatuses: [...STATUSES]
    };
  }

  /* =========================
     READ-ONLY CONNECTION TEST
  ========================= */

  async function testConnection() {
    try {
      const context = await getContext();

      const { error } = await context.client
        .from(TABLE)
        .select("id")
        .eq("user_id", context.userId)
        .limit(1);

      if (error) {
        fail(safeError(error));
      }

      await verifyOwner(context);

      return {
        ok: true,
        version: VERSION,
        authenticated: true,
        databaseReadable: true,
        securityAuditComplete: false
      };

    } catch (error) {
      return {
        ok: false,
        version: VERSION,
        error: safeError(error)
      };
    }
  }

  /* =========================
     INITIALIZATION
  ========================= */

  function initialize() {
    bindAuthentication();
  }

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

  window.addEventListener(
    "pageshow",
    initialize
  );

  document.addEventListener(
    "worknely:workspacechange",
    initialize
  );

  window.addEventListener(
    "pagehide",
    function () {
      authEpoch += 1;
    }
  );

  /* =========================
     PUBLIC API
  ========================= */

  window.WorknelyJobStorage = Object.freeze({
    version: VERSION,
    statuses: STATUSES,

    create,
    list,
    get,
    update,
    updateStatus,
    remove,

    getStatistics,
    getUpcomingInterviews,

    getStatus,
    testConnection,
    bindAuthentication
  });

  document.dispatchEvent(
    new CustomEvent(
      "worknely:jobstorageready",
      {
        detail: {
          version: VERSION
        }
      }
    )
  );

})();
