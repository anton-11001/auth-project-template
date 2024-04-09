import type { Request, Response } from "express";

import { STATUS_CODES } from "@/config/index.js";

import type { LoginInput } from "../validation.js";

import { loginUser } from "../services/index.js";
import {
  getRefreshTokenCookieOptions,
  REFRESH_TOKEN_COOKIE_NAME,
} from "./cookie-options.js";

interface LoginRequest extends Request {
  body: LoginInput;
}

export const loginController = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const authResponse = await loginUser((request as LoginRequest).body);

  response.cookie(
    REFRESH_TOKEN_COOKIE_NAME,
    authResponse.refreshToken,
    getRefreshTokenCookieOptions(),
  );

  response.status(STATUS_CODES.OK).json({
    accessToken: authResponse.accessToken,
    user: authResponse.user,
  });
};
