import type { Handle } from "@sveltejs/kit";
import type { Store } from "iron-store";
import ironStore from "iron-store";
import cookie from "cookie";
import type { ParseCookiesLocals } from "./parseCookies";

export type Session = Pick<Store, "get" | "set" | "unset" | "clear">;
export type SessionLocals = {
  session: Session;
};

const password = import.meta.env.DEV
  ? "1234".repeat(8)
  : process.env.SESSION_PASSWORD;

if (!password) {
  console.error("SESSION_PASSWORD environment variable is not set");
  process.exit(1);
}

/**
 * Prepares a session with iron-store at request.locals.session
 *
 * ! Depends on parseCookies hook. To use it with this hook:
 * ```
 * // hooks.ts
 * import { sequence } from "@sveltejs/kit/hooks";
 * import { parseCookies } from "./parseCookies";
 * import { session } from "./session";
 *
 * export const handle = sequence(parseCookies, session);
 * ```
 *
 * Make sure to add SessionLocals exported from this modules to
 * your Locals type. e.g. `type Locals = { someLocal: string } & SessionLocals`
 */
export const session: Handle<SessionLocals & ParseCookiesLocals> = async ({
  request,
  resolve,
}) => {
  const sessionId = request.locals.cookies.session_id || undefined;

  const store = await ironStore({
    password,
    sealed: sessionId,
  });

  let hasChanged = false;

  const markAsChanged =
    (func) =>
    (...args) => {
      hasChanged = true;
      return func(...args);
    };

  request.locals.session = {
    get: store.get,
    clear: markAsChanged(store.clear),
    set: markAsChanged(store.set),
    unset: markAsChanged(store.unset),
  };

  const response = await resolve(request);
  if (!sessionId || hasChanged) {
    const currentSetCookie = response.headers["set-cookie"] || [];
    const sessionCookie = cookie.serialize("session_id", await store.seal(), {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      secure: import.meta.env.PROD,
    });
    if (typeof currentSetCookie === "string") {
      response.headers["set-cookie"] = [sessionCookie, currentSetCookie];
    } else {
      response.headers["set-cookie"] = [sessionCookie, ...currentSetCookie];
    }
  }
  return response;
};
