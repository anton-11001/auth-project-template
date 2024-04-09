import type { Request } from "express";

import { logger, STATUS_CODES } from "@/config/index.js";
import { ApiError } from "@/errors/index.js";

import { REFRESH_TOKEN_COOKIE_NAME } from "./cookie-options.js";

interface RequestWithRefreshTokenBody extends Request {
  body: {
    refreshToken?: string;
  };
  cookies: Partial<Record<string, string>>;
}

export const getRefreshTokenFromRequest = (request: Request): string => {
  const typedRequest = request as RequestWithRefreshTokenBody;

  const refreshToken =
    typedRequest.cookies[REFRESH_TOKEN_COOKIE_NAME] ??
    typedRequest.body.refreshToken;

  if (refreshToken === undefined || refreshToken.length === 0) {
    logger.error("No refresh token found in request");

    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Unauthorized");
  }

  return refreshToken;
};
