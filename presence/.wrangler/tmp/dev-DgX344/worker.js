var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.js
var PresenceRoom = class {
  static {
    __name(this, "PresenceRoom");
  }
  constructor(state) {
    this.state = state;
    this.sessions = /* @__PURE__ */ new Map();
    this.initialized = false;
  }
  async fetch(request) {
    if (!this.initialized) await this.loadSessions();
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return this.withCors(new Response(null, { status: 204 }));
    if (request.method === "GET" && url.pathname.endsWith("/count")) return this.withCors(this.countResponse());
    if (request.method !== "POST") return this.withCors(this.json({ ok: false, error: "Method not allowed" }, 405));
    let payload = {};
    try {
      payload = await request.json();
    } catch (_) {
      return this.withCors(this.json({ ok: false, error: "Invalid JSON body" }, 400));
    }
    const sessionId = String(payload.sessionId || "").trim();
    if (!sessionId) return this.withCors(this.json({ ok: false, error: "sessionId required" }, 400));
    const now = Number(payload.now) || Date.now();
    const isLeave = url.pathname.endsWith("/leave");
    if (isLeave) this.sessions.delete(sessionId);
    else this.sessions.set(sessionId, now);
    await this.cleanupAndPersist(now);
    return this.withCors(this.countResponse());
  }
  async loadSessions() {
    const rows = await this.state.storage.get("sessions") || {};
    this.sessions = new Map(Object.entries(rows));
    this.initialized = true;
    await this.cleanupAndPersist(Date.now());
  }
  async cleanupAndPersist(now) {
    const ttlMs = 35e3;
    for (const [sessionId, lastSeen] of this.sessions.entries()) {
      if (now - Number(lastSeen || 0) > ttlMs) this.sessions.delete(sessionId);
    }
    await this.state.storage.put("sessions", Object.fromEntries(this.sessions));
  }
  countResponse() {
    return this.json({
      ok: true,
      activeCount: this.sessions.size,
      serverTime: Date.now()
    });
  }
  json(data, status) {
    return new Response(JSON.stringify(data), {
      status: status || 200,
      headers: { "content-type": "application/json; charset=utf-8" }
    });
  }
  withCors(response) {
    const headers = new Headers(response.headers);
    headers.set("access-control-allow-origin", "*");
    headers.set("access-control-allow-methods", "GET,POST,OPTIONS");
    headers.set("access-control-allow-headers", "content-type");
    return new Response(response.body, { status: response.status, headers });
  }
};
async function sha256Hex(value) {
  const data = new TextEncoder().encode(String(value || "").trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(hashBuffer);
  return Array.from(bytes).map(function(b) {
    return b.toString(16).padStart(2, "0");
  }).join("");
}
__name(sha256Hex, "sha256Hex");
async function logPresenceEvent(env, payload) {
  if (!env || !env.PRESENCE_DB) return;
  const roomId = String(payload.roomId || "global").trim() || "global";
  const sessionId = String(payload.sessionId || "").trim();
  const eventType = String(payload.eventType || "").trim();
  const eventName = String(payload.eventName || "").trim();
  const eventActive = Number(payload.eventActive == null ? 1 : payload.eventActive) ? 1 : 0;
  const nowIso = new Date(Number(payload.now) || Date.now()).toISOString();
  if (!sessionId || !eventType) return;
  const rawEmail = String(payload.email || "").trim();
  const emailHash = rawEmail ? await sha256Hex(rawEmail) : null;
  try {
    await env.PRESENCE_DB.prepare(
      "INSERT INTO presence_visits (room_id, session_id, email_hash, event_name, event_active, event_type, active_count, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(room_id, session_id) DO UPDATE SET email_hash=excluded.email_hash, event_name=excluded.event_name, event_active=excluded.event_active, event_type=excluded.event_type, active_count=excluded.active_count, created_at=excluded.created_at"
    ).bind(
      roomId,
      sessionId,
      emailHash,
      eventName || null,
      eventActive,
      eventType,
      payload.activeCount == null ? null : Number(payload.activeCount),
      nowIso
    ).run();
  } catch (error) {
    throw error;
  }
}
__name(logPresenceEvent, "logPresenceEvent");
function withCorsJson(payload, status) {
  return new Response(JSON.stringify(payload), {
    status: status || 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*"
    }
  });
}
__name(withCorsJson, "withCorsJson");
async function getEventMeta(env, eventAlias) {
  const alias = String(eventAlias || "").trim().toLowerCase();
  if (!alias) return { event_alias: "", event_name: "", event_active: 1 };
  if (!env || !env.PRESENCE_DB) {
    return { event_alias: alias, event_name: alias.toUpperCase(), event_active: 1 };
  }
  try {
    const row = await env.PRESENCE_DB.prepare("SELECT event_alias, event_name, event_active FROM events_catalog WHERE lower(event_alias)=? LIMIT 1").bind(alias).first();
    if (row) {
      return {
        event_alias: String(row.event_alias || alias).trim().toLowerCase(),
        event_name: String(row.event_name || alias.toUpperCase()).trim(),
        event_active: Number(row.event_active == null ? 1 : row.event_active) ? 1 : 0
      };
    }
  } catch (err) {
    console.warn("events catalog lookup skipped", String(err && err.message || err));
  }
  return { event_alias: alias, event_name: alias.toUpperCase(), event_active: 1 };
}
__name(getEventMeta, "getEventMeta");
async function listEvents(env) {
  if (!env || !env.PRESENCE_DB) return [];
  try {
    const result = await env.PRESENCE_DB.prepare("SELECT event_alias, event_name, event_active FROM events_catalog ORDER BY event_name ASC").all();
    return Array.isArray(result && result.results) ? result.results : [];
  } catch (err) {
    console.warn("events catalog list skipped", String(err && err.message || err));
    return [];
  }
}
__name(listEvents, "listEvents");
var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET,POST,OPTIONS",
          "access-control-allow-headers": "content-type"
        }
      });
    }
    if (url.pathname === "/health") return withCorsJson({ ok: true, service: "hub-sport-lsk-presence" });
    if (url.pathname === "/events" && request.method === "GET") {
      const events = await listEvents(env);
      return withCorsJson({ ok: true, events });
    }
    if (!url.pathname.startsWith("/presence/")) {
      return withCorsJson({ ok: false, error: "Not found" }, 404);
    }
    const isPresenceEvent = request.method === "POST" && (url.pathname.endsWith("/join") || url.pathname.endsWith("/heartbeat") || url.pathname.endsWith("/leave"));
    let body = {};
    if (isPresenceEvent) {
      try {
        body = await request.json();
      } catch (_) {
        body = {};
      }
    }
    const requestEventAlias = String(url.searchParams.get("event") || body.eventAlias || "ipv").trim().toLowerCase();
    const eventMeta = await getEventMeta(env, requestEventAlias);
    if (isPresenceEvent && Number(eventMeta.event_active) === 0) {
      return withCorsJson({
        ok: false,
        blocked: true,
        reason: "event_inactive",
        event_alias: eventMeta.event_alias,
        event_name: eventMeta.event_name,
        event_active: 0
      }, 403);
    }
    const roomId = String(url.searchParams.get("roomId") || body.roomId || "global").trim() || "global";
    const id = env.PRESENCE_ROOM.idFromName(roomId);
    const stub = env.PRESENCE_ROOM.get(id);
    let requestForRoom = request;
    if (isPresenceEvent) {
      requestForRoom = new Request(request.url, {
        method: "POST",
        headers: request.headers,
        body: JSON.stringify(body)
      });
    }
    const response = await stub.fetch(requestForRoom);
    if (isPresenceEvent && env.PRESENCE_DB) {
      let activeCount = null;
      try {
        const parsed = await response.clone().json();
        activeCount = Number(parsed.activeCount);
        if (!Number.isFinite(activeCount)) activeCount = null;
      } catch (_) {
        activeCount = null;
      }
      try {
        await logPresenceEvent(env, {
          roomId,
          sessionId: String(body.sessionId || "").trim(),
          email: String(body.email || "").trim(),
          eventName: String(body.eventName || eventMeta.event_name || "").trim(),
          eventActive: Number(eventMeta.event_active) ? 1 : 0,
          eventType: url.pathname.endsWith("/join") ? "join" : url.pathname.endsWith("/leave") ? "leave" : "heartbeat",
          activeCount,
          now: Number(body.now) || Date.now()
        });
      } catch (err) {
        console.warn("presence log skipped", String(err && err.message || err));
      }
    }
    return response;
  }
};

// ../../../Users/ammi_/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../Users/ammi_/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-pwyk7G/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// ../../../Users/ammi_/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-pwyk7G/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  PresenceRoom,
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=worker.js.map
