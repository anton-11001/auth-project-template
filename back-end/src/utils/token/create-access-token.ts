import * as jwt from "jsonwebtoken";

import type { AuthTokenPayload } from "@/types/index.js";

import { env } from "@/config/index.js";

export const createAccessToken = (payload: AuthTokenPayload): string =>
  jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
