import { createClient } from "npm:@supabase/supabase-js@2";

/**
 * WORKNELY
 * Secure Account Deletion Engine
 * Version: 7.21.4.11.1
 */

const VERSION = "7.21.4.11.1";

const ALLOWED_ORIGIN =
  "https://adamdenise.github.io";

const CONFIRMATION = "DELETE_MY_ACCOUNT";

// Restricted deletion: disposable test account only.
const DELETION_ENABLED = true;
const DRY_RUN_ONLY = true;
const TEST_ACCOUNT_UID = "003e6e99-3d61-4685-ad8e-3b6abe608f74";

const headers = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers":
    "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Vary": "Origin"
};

function respond(
  status: number,
  payload: Record<string, unknown>
) {
  return new Response(
    JSON.stringify({
      version: VERSION,
      ...payload
    }),
    { status, headers }
  );
}

const authOptions = {
  persistSession: false,
  autoRefreshToken: false,
  detectSessionInUrl: false
};

Deno.serve(async (request: Request) => {
  try {
    const origin = request.headers.get("origin");

    if (origin && origin !== ALLOWED_ORIGIN) {
      return respond(403, {
        ok: false,
        code: "ORIGIN_NOT_ALLOWED"
      });
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers
      });
    }

    if (request.method !== "POST") {
      return respond(405, {
        ok: false,
        code: "METHOD_NOT_ALLOWED"
      });
    }

    const authorization =
      request.headers.get("Authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return respond(401, {
        ok: false,
        code: "AUTH_REQUIRED"
      });
    }

    const token = authorization.slice(7).trim();

    if (!token) {
      return respond(401, {
        ok: false,
        code: "AUTH_REQUIRED"
      });
    }

    const url = Deno.env.get("SUPABASE_URL");

    const anonKey =
      Deno.env.get("SUPABASE_ANON_KEY");

    if (!url || !anonKey) {
      return respond(503, {
        ok: false,
        code: "SERVICE_UNAVAILABLE"
      });
    }

    const client = createClient(url, anonKey, {
      auth: authOptions
    });

    const { data, error } =
      await client.auth.getUser(token);

    if (error || !data.user?.id) {
      return respond(401, {
        ok: false,
        code: "INVALID_SESSION"
      });
    }

    const userId = data.user.id;

    const contentType =
      request.headers.get("content-type") || "";

    if (!contentType.toLowerCase().includes(
      "application/json"
    )) {
      return respond(415, {
        ok: false,
        code: "UNSUPPORTED_CONTENT_TYPE"
      });
    }

    let body: Record<string, unknown>;

    try {
      const raw = await request.text();

      if (new TextEncoder().encode(raw).length > 4096) {
        return respond(413, {
          ok: false,
          code: "PAYLOAD_TOO_LARGE"
        });
      }

      const parsed = JSON.parse(raw);

      if (
        !parsed ||
        typeof parsed !== "object" ||
        Array.isArray(parsed)
      ) {
        throw new Error("Invalid payload");
      }

      body = parsed;

    } catch {
      return respond(400, {
        ok: false,
        code: "INVALID_REQUEST"
      });
    }

    const allowedFields = [
      "action",
      "confirmation",
      "dryRun"
    ];

    if (
      Object.keys(body).some(
        key => !allowedFields.includes(key)
      )
    ) {
      return respond(400, {
        ok: false,
        code: "UNEXPECTED_FIELDS"
      });
    }

    if (body.action === "status") {
      return respond(200, {
        ok: true,
        code: "BACKEND_READY",
        authenticated: true,
        dryRunOnly: DRY_RUN_ONLY,
        deletionEnabled: DELETION_ENABLED && userId === TEST_ACCOUNT_UID,
        mode: DELETION_ENABLED && userId === TEST_ACCOUNT_UID
          ? "restricted-test"
          : "security-validation"
      });
    }

    if (body.dryRun !== undefined && typeof body.dryRun !== "boolean") {
      return respond(400, {
        ok: false,
        code: "INVALID_DRY_RUN"
      });
    }

    if (body.action !== "delete-account") {
      return respond(400, {
        ok: false,
        code: "INVALID_ACTION"
      });
    }

    if (body.confirmation !== CONFIRMATION) {
      return respond(400, {
        ok: false,
        code: "CONFIRMATION_REQUIRED"
      });
    }

    if (!DELETION_ENABLED) {
      return respond(503, {
        ok: false,
        code: "DELETION_DISABLED"
      });
    }

    // Deny deletion for every account except the approved test account.
    if (userId !== TEST_ACCOUNT_UID) {
      return respond(403, {
        ok: false,
        code: "TEST_ACCOUNT_ONLY"
      });
    }

    const serviceRoleKey =
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!serviceRoleKey) {
      return respond(503, {
        ok: false,
        code: "SERVICE_UNAVAILABLE"
      });
    }

    // Revalidate identity before irreversible action.
    const verification =
      await client.auth.getUser(token);

    if (
      verification.error ||
      verification.data.user?.id !== userId
    ) {
      return respond(401, {
        ok: false,
        code: "SESSION_CHANGED"
      });
    }

    // Validate authorization without deleting any data.
    if (body.dryRun === true) {
      return respond(200, {
        ok: true,
        code: "DRY_RUN_PASSED",
        authorized: true,
        dryRun: true,
        deleted: false
      });
    }

    // Server-side safety lock for the validation phase.
    if (DRY_RUN_ONLY) {
      return respond(403, {
        ok: false,
        code: "DRY_RUN_ONLY",
        deleted: false
      });
    }

    const admin = createClient(
      url,
      serviceRoleKey,
      { auth: authOptions }
    );

    // Delete only the authenticated user.
    // Never accept a user ID from the request body.
    const { error: deletionError } =
      await admin.auth.admin.deleteUser(
        userId,
        false
      );

    if (deletionError) {
      return respond(500, {
        ok: false,
        code: "ACCOUNT_DELETION_FAILED"
      });
    }

    return respond(200, {
      ok: true,
      code: "ACCOUNT_DELETED",
      deleted: true
    });

  } catch {
    return respond(500, {
      ok: false,
      code: "INTERNAL_ERROR"
    });
  }
});
