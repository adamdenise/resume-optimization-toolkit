
/**
 * WORKNELY
 * Privacy Preferences Storage Engine
 * Version: 7.21.5.3
 *
 * Owner-scoped privacy preferences.
 * Optional consent defaults to false.
 * No privileged credentials.
 * No automatic consent activation.
 * No persistent browser storage.
 */

(function () {
  "use strict";

  const VERSION = "7.21.5.3";
  const TABLE = "privacy_preferences";
  const CONSENT_VERSION = "1.0";

  const FIELDS = Object.freeze([
    "analytics_consent",
    "personalization_consent",
    "marketing_consent"
  ]);

  const COLUMNS = [
    "user_id",
    "analytics_consent",
    "personalization_consent",
    "marketing_consent",
    "consent_version",
    "created_at",
    "updated_at"
  ].join(",");

  const DEFAULTS = Object.freeze({
    analytics_consent: false,
    personalization_consent: false,
    marketing_consent: false,
    consent_version: CONSENT_VERSION
  });

  const UUID_PATTERN =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  const EVENT_NAME =
    "worknely:privacypreferenceschange";

  let activeOperation = false;
  let generation = 0;

  // 01. Safe errors

  function failure(code) {
    const error = new Error(code);
    error.code = code;
    return error;
  }

  function safeError(error) {
    const allowed = [
      "AUTH_UNAVAILABLE",
      "SIGN_IN_REQUIRED",
      "INVALID_IDENTITY",
      "INVALID_SESSION",
      "SESSION_CHANGED",
      "OPERATION_CANCELLED",
      "OPERATION_IN_PROGRESS",
      "INVALID_PREFERENCES",
      "INVALID_CONSENT_VALUE",
      "INVALID_CONSENT_VERSION",
      "EXPECTED_USER_REQUIRED",
      "OWNER_MISMATCH",
      "INVALID_DATABASE_RESPONSE",
      "LOAD_FAILED",
      "SAVE_FAILED",
      "SAVE_CONFLICT"
    ];

    const code = allowed.includes(error?.code)
      ? error.code
      : "UNEXPECTED_ERROR";

    return Object.freeze({
      ok: false,
      code,
      version: VERSION
    });
  }

  // 02. Existing Supabase client

  function getClient() {
    const client = window.worknelySupabase;

    if (
      !client ||
      !client.auth ||
      typeof client.auth.getUser !== "function" ||
      typeof client.auth.getSession !== "function" ||
      typeof client.from !== "function"
    ) {
      throw failure("AUTH_UNAVAILABLE");
    }

    return client;
  }

  // 03. Verified authentication

  async function verifyIdentity(client) {
    const identity = await client.auth.getUser();

    if (identity.error || !identity.data?.user) {
      throw failure("SIGN_IN_REQUIRED");
    }

    const uid = identity.data.user.id;

    if (
      typeof uid !== "string" ||
      !UUID_PATTERN.test(uid)
    ) {
      throw failure("INVALID_IDENTITY");
    }

    const sessionResult =
      await client.auth.getSession();

    const session =
      sessionResult.data?.session;

    if (
      sessionResult.error ||
      !session?.access_token ||
      session.user?.id !== uid
    ) {
      throw failure("INVALID_SESSION");
    }

    return uid;
  }

  // 04. Session continuity

  async function assertIdentity(
    client,
    expectedUid,
    operationGeneration
  ) {
    if (generation !== operationGeneration) {
      throw failure("OPERATION_CANCELLED");
    }

    const currentUid =
      await verifyIdentity(client);

    if (currentUid !== expectedUid) {
      throw failure("SESSION_CHANGED");
    }

    if (generation !== operationGeneration) {
      throw failure("OPERATION_CANCELLED");
    }

    return currentUid;
  }

  // 05. Strict input validation

  function validatePreferences(input) {
    if (
      !input ||
      typeof input !== "object" ||
      Array.isArray(input)
    ) {
      throw failure("INVALID_PREFERENCES");
    }

    const allowed = [
      ...FIELDS,
      "consent_version"
    ];

    for (const key of Object.keys(input)) {
      if (!allowed.includes(key)) {
        throw failure("INVALID_PREFERENCES");
      }
    }

    const result = {};

    for (const field of FIELDS) {
      if (
        !Object.prototype.hasOwnProperty.call(
          input,
          field
        ) ||
        typeof input[field] !== "boolean"
      ) {
        throw failure("INVALID_CONSENT_VALUE");
      }

      result[field] = input[field];
    }

    const consentVersion =
      input.consent_version === undefined
        ? CONSENT_VERSION
        : input.consent_version;

    if (
      typeof consentVersion !== "string" ||
      consentVersion !== CONSENT_VERSION
    ) {
      throw failure("INVALID_CONSENT_VERSION");
    }

    result.consent_version = consentVersion;

    return Object.freeze(result);
  }

  // 06. Safe database response

  function normalizeRow(row, expectedUid) {
    if (
      !row ||
      typeof row !== "object" ||
      row.user_id !== expectedUid
    ) {
      throw failure("OWNER_MISMATCH");
    }

    for (const field of FIELDS) {
      if (typeof row[field] !== "boolean") {
        throw failure(
          "INVALID_DATABASE_RESPONSE"
        );
      }
    }

    if (
      typeof row.consent_version !== "string" ||
      row.consent_version.length < 1 ||
      row.consent_version.length > 32
    ) {
      throw failure(
        "INVALID_DATABASE_RESPONSE"
      );
    }

    for (const field of [
      "created_at",
      "updated_at"
    ]) {
      if (
        typeof row[field] !== "string" ||
        !Number.isFinite(
          Date.parse(row[field])
        )
      ) {
        throw failure(
          "INVALID_DATABASE_RESPONSE"
        );
      }
    }

    return Object.freeze({
      user_id: expectedUid,
      analytics_consent:
        row.analytics_consent,
      personalization_consent:
        row.personalization_consent,
      marketing_consent:
        row.marketing_consent,
      consent_version:
        row.consent_version,
      created_at: row.created_at,
      updated_at: row.updated_at
    });
  }

  // 07. Privacy-safe defaults

  function getDefaults() {
    return Object.freeze({
      ...DEFAULTS
    });
  }

  function emptyPreferences(uid) {
    return Object.freeze({
      user_id: uid,
      ...DEFAULTS,
      created_at: null,
      updated_at: null
    });
  }

  // 08. Owner-scoped database read

  async function readRow(client, uid) {
    const response = await client
      .from(TABLE)
      .select(COLUMNS)
      .eq("user_id", uid)
      .maybeSingle();

    if (response.error) {
      throw failure("LOAD_FAILED");
    }

    if (response.data === null) {
      return null;
    }

    return normalizeRow(
      response.data,
      uid
    );
  }

  // 09. Operation protection

  async function execute(operation) {
    if (activeOperation) {
      return safeError(
        failure("OPERATION_IN_PROGRESS")
      );
    }

    activeOperation = true;

    const operationGeneration =
      generation;

    try {
      const client = getClient();

      const uid =
        await verifyIdentity(client);

      if (
        generation !== operationGeneration
      ) {
        throw failure(
          "OPERATION_CANCELLED"
        );
      }

      return await operation(
        client,
        uid,
        operationGeneration
      );

    } catch (error) {
      return safeError(error);

    } finally {
      activeOperation = false;
    }
  }

  // 10. Load preferences
  // Read-only. Never creates a database row.

  async function load(expectedUserId) {
    return execute(
      async (client, uid, token) => {

        if (
          expectedUserId !== undefined &&
          expectedUserId !== uid
        ) {
          throw failure("OWNER_MISMATCH");
        }

        const row =
          await readRow(client, uid);

        await assertIdentity(
          client,
          uid,
          token
        );

        return Object.freeze({
          ok: true,
          version: VERSION,
          exists: row !== null,
          preferences:
            row || emptyPreferences(uid)
        });
      }
    );
  }

  // 11. Safe change notification
  // No user ID or consent data in events.

  function notifyChange() {
    try {
      window.dispatchEvent(
        new CustomEvent(EVENT_NAME, {
          detail: Object.freeze({
            version: VERSION,
            changed: true
          })
        })
      );
    } catch {
      // Notification must not affect storage.
    }
  }

  // 12. Save preferences
  //
  // INSERT and UPDATE are intentionally separate.
  // UPDATE never includes user_id or timestamps.
  // This respects existing column permissions.

  async function save(
    input,
    expectedUserId
  ) {
    let values;

    try {
      if (
        typeof expectedUserId !== "string" ||
        !UUID_PATTERN.test(expectedUserId)
      ) {
        throw failure(
          "EXPECTED_USER_REQUIRED"
        );
      }

      values =
        validatePreferences(input);

    } catch (error) {
      return safeError(error);
    }

    return execute(
      async (client, uid, token) => {

        if (uid !== expectedUserId) {
          throw failure("OWNER_MISMATCH");
        }

        const existing =
          await readRow(client, uid);

        await assertIdentity(
          client,
          uid,
          token
        );

        let response;

        if (existing) {

          // Optimistic concurrency protection.
          // Prevent overwriting a newer update.

          response = await client
            .from(TABLE)
            .update({
              analytics_consent:
                values.analytics_consent,
              personalization_consent:
                values.personalization_consent,
              marketing_consent:
                values.marketing_consent,
              consent_version:
                values.consent_version
            })
            .eq("user_id", uid)
            .eq(
              "updated_at",
              existing.updated_at
            )
            .select(COLUMNS)
            .maybeSingle();

        } else {

          // Owner is derived from verified auth.
          // Timestamps are database-managed.

          response = await client
            .from(TABLE)
            .insert({
              user_id: uid,
              analytics_consent:
                values.analytics_consent,
              personalization_consent:
                values.personalization_consent,
              marketing_consent:
                values.marketing_consent,
              consent_version:
                values.consent_version
            })
            .select(COLUMNS)
            .single();
        }

        if (response.error) {
          if (
            response.error.code === "23505"
          ) {
            throw failure("SAVE_CONFLICT");
          }

          throw failure("SAVE_FAILED");
        }

        if (!response.data) {
          throw failure("SAVE_CONFLICT");
        }

        const saved = normalizeRow(
          response.data,
          uid
        );

        await assertIdentity(
          client,
          uid,
          token
        );

        notifyChange();

        return Object.freeze({
          ok: true,
          version: VERSION,
          created: existing === null,
          preferences: saved
        });
      }
    );
  }

  // 13. Withdraw optional consent

  async function withdrawAll(
    expectedUserId
  ) {
    return save(
      {
        analytics_consent: false,
        personalization_consent: false,
        marketing_consent: false,
        consent_version: CONSENT_VERSION
      },
      expectedUserId
    );
  }

  // 14. Session invalidation
  // No preferences are cached by this engine.
  // Invalidates results of pending operations.

  function clear() {
    generation += 1;

    return Object.freeze({
      ok: true,
      version: VERSION,
      cleared: true
    });
  }

  // 15. Read-only engine status

  function getState() {
    return Object.freeze({
      version: VERSION,
      consentVersion: CONSENT_VERSION,
      busy: activeOperation,
      persistentCache: false,
      automaticConsent: false,
      automaticInsert: false
    });
  }

  // 16. Non-destructive local self-test

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
        Object.freeze({
          name,
          passed
        })
      );
    }

    function rejects(callback, code) {
      try {
        callback();
        return false;
      } catch (error) {
        return error.code === code;
      }
    }

    test(
      "Optional consent defaults disabled",
      () => FIELDS.every(
        field => DEFAULTS[field] === false
      )
    );

    test(
      "Valid boolean preferences",
      () => {
        const result =
          validatePreferences(DEFAULTS);

        return FIELDS.every(
          field =>
            typeof result[field] === "boolean"
        );
      }
    );

    test(
      "Invalid boolean rejected",
      () => rejects(
        () => validatePreferences({
          ...DEFAULTS,
          analytics_consent: "true"
        }),
        "INVALID_CONSENT_VALUE"
      )
    );

    test(
      "Missing consent rejected",
      () => rejects(
        () => validatePreferences({
          analytics_consent: false
        }),
        "INVALID_CONSENT_VALUE"
      )
    );

    test(
      "Owner injection rejected",
      () => rejects(
        () => validatePreferences({
          ...DEFAULTS,
          user_id: "invalid"
        }),
        "INVALID_PREFERENCES"
      )
    );

    test(
      "Timestamp injection rejected",
      () => rejects(
        () => validatePreferences({
          ...DEFAULTS,
          updated_at: "invalid"
        }),
        "INVALID_PREFERENCES"
      )
    );

    test(
      "Unknown field rejected",
      () => rejects(
        () => validatePreferences({
          ...DEFAULTS,
          unknown: true
        }),
        "INVALID_PREFERENCES"
      )
    );

    test(
      "Invalid consent version rejected",
      () => rejects(
        () => validatePreferences({
          ...DEFAULTS,
          consent_version: ""
        }),
        "INVALID_CONSENT_VERSION"
      )
    );

    test(
      "Unsupported consent version rejected",
      () => rejects(
        () => validatePreferences({
          ...DEFAULTS,
          consent_version: "999.0"
        }),
        "INVALID_CONSENT_VERSION"
      )
    );

    test(
      "Cross-owner response rejected",
      () => rejects(
        () => normalizeRow(
          { user_id: "another-owner" },
          "expected-owner"
        ),
        "OWNER_MISMATCH"
      )
    );

    test(
      "Immutable defaults",
      () => Object.isFrozen(
        getDefaults()
      )
    );

    test(
      "No persistent preference cache",
      () =>
        getState().persistentCache === false
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

  // 17. Public engine API

  if (
    window.WorknelyPrivacyPreferences
  ) {
    return;
  }

  window.WorknelyPrivacyPreferences =
    Object.freeze({
      version: VERSION,
      consentVersion: CONSENT_VERSION,
      getDefaults,
      load,
      save,
      withdrawAll,
      clear,
      getState,
      selfTest
    });

})();
