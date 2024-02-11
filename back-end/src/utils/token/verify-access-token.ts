import * as jwt from "jsonwebtoken";

import type { AuthTokenPayload } from "@/types/index.js";

import { env } from "@/config/index.js";

export const verifyAccessToken = (token: string): AuthTokenPayload =>
  jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthTokenPayload;
