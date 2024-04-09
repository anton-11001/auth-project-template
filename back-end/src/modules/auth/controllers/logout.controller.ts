import type { Request, Response } from "express";

import { STATUS_CODES } from "@/config/index.js";

import { logoutUser } from "../services/index.js";
import {
  getRefreshTokenCookieOptions,
  REFRESH_TOKEN_COOKIE_NAME,
} from "./cookie-options.js";
import { getRefreshTokenFromRequest } from "./get-refresh-token-from-request.js";

export const logoutController = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const refreshToken = getRefreshTokenFromRequest(request);

  await logoutUser(refreshToken);

  response.clearCookie(
    REFRESH_TOKEN_COOKIE_NAME,
    getRefreshTokenCookieOptions(),
  );

  response.status(STATUS_CODES.OK).json({
    message: "Logged out",
  });
};
