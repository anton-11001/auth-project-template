import * as jwt from "jsonwebtoken";

import type { AuthTokenPayload } from "@/types/index.js";

import { env } from "@/config/index.js";

export const createRefreshToken = (payload: AuthTokenPayload): string =>
  jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
