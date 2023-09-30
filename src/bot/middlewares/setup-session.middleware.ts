import { Middleware, session } from "grammy";

import { MyContext } from "../types";

export function getSessionKey(ctx: any) {
  return ctx.chat?.id.toString();
}

export const middleware = (): Middleware<MyContext> =>
session({
    initial: () => ({}),
    getSessionKey,
});