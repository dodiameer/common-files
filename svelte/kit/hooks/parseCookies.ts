import type { Handle } from "@sveltejs/kit";
import cookie from "cookie";

export type ParseCookiesLocals = {
  cookies: Record<string, string>;
};

/**
 * Parses request cookies into request.locals.cookies
 *
 * Make sure to add ParseCookiesLocals exported from this modules to
 * your Locals type. e.g. `type Locals = { someLocal: string } & ParseCookiesLocals`
 */
export const parseCookies: Handle<ParseCookiesLocals> = async ({
  request,
  resolve,
}) => {
  const cookies = cookie.parse(request.headers.cookie || "");
  request.locals.cookies = cookies;
  return resolve(request);
};
