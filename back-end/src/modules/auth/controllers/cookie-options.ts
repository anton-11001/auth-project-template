import type { CookieOptions } from "express";

import { env } from "@/config/index.js";
import { parseDurationMs } from "@/utils/index.js";

export const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  maxAge: parseDurationMs(env.JWT_REFRESH_EXPIRES_IN),
  sameSite: "lax",
  secure: env.NODE_ENV === "production",
});
