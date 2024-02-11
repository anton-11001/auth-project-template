import type { JwtPayload } from "jsonwebtoken";

import type { AuthTokenPayload } from "@/types/index.js";

import * as jwt from "jsonwebtoken";

import { env } from "@/config/index.js";

export const verifyRefreshToken = (token: string): AuthTokenPayload =>
  jwt.verify(token, env.JWT_REFRESH_SECRET) as AuthTokenPayload;
