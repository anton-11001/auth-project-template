import type { Request, Response } from "express";

import { STATUS_CODES } from "@/config/index.js";

import type { RegisterInput } from "../validation.js";

import { registerUser } from "../services/index.js";
import {
  getRefreshTokenCookieOptions,
  REFRESH_TOKEN_COOKIE_NAME,
} from "./cookie-options.js";

interface RegisterRequest extends Request {
  body: RegisterInput;
}

export const registerController = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const authResponse = await registerUser((request as RegisterRequest).body);

  response.cookie(
    REFRESH_TOKEN_COOKIE_NAME,
    authResponse.refreshToken,
    getRefreshTokenCookieOptions(),
  );

  response.status(STATUS_CODES.CREATED).json({
    accessToken: authResponse.accessToken,
    user: authResponse.user,
  });
};
