import { createClient } from "npm:@supabase/supabase-js@2";

/**
 * WORKNELY
 * Secure Account Deletion Engine
 * Version: 7.21.4.9.3
 * Restricted Test Mode
 */

const VERSION = "7.21.4.9.3";

const ALLOWED_ORIGIN =
  "https://adamdenise.github.io";

const CONFIRMATION = "DELETE_MY_ACCOUNT";

// Global deletion remains disabled.
const DELETION_ENABLED = false;

// Temporary restricted testing.
const TEST_MODE_ENABLED = true;

const TEST_USER_ID =
  "003e6e99-3d61-4685-ad8e-3b6abe608f74";

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

function deletionAllowed(userId: string): boolean {
  if (TEST_MODE_ENABLED) {
    return userId === TEST_USER_ID;
  }

  return DELETION_ENABLED;
}

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
      "confirmation"
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
        deletionEnabled: deletionAllowed(userId),
        testMode: TEST_MODE_ENABLED,
        testAccountEligible:
          TEST_MODE_ENABLED &&
          userId === TEST_USER_ID,
        mode: TEST_MODE_ENABLED
          ? "restricted-test"
          : DELETION_ENABLED
            ? "account-deletion"
            : "security-validation"
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

    // Restricted test account protection.
    if (
      TEST_MODE_ENABLED &&
      userId !== TEST_USER_ID
    ) {
      return respond(403, {
        ok: false,
        code: "TEST_ACCOUNT_NOT_ALLOWED"
      });
    }

    if (!deletionAllowed(userId)) {
      return respond(503, {
        ok: false,
        code: "DELETION_DISABLED"
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

    // Final server-side eligibility check.
    if (!deletionAllowed(
      verification.data.user.id
    )) {
      return respond(403, {
        ok: false,
        code: "DELETION_NOT_ALLOWED"
      });
    }

    const admin = createClient(
      url,
      serviceRoleKey,
      { auth: authOptions }
    );

    // Never accept a user ID from the request body.
    // Delete only the verified authenticated user.
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
