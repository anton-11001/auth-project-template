import type { NextFunction, Request, Response } from "express";

import { STATUS_CODES } from "@/config/index.js";
import { ApiError } from "@/errors/index.js";
import { verifyAccessToken } from "@/utils/index.js";

import { logger } from "@/config/index.js";

export const authMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  const authorizationHeader = request.header("Authorization");

  if (authorizationHeader === undefined) {
    logger.error(
      "Missing access token. Authorization header is not present in the request.",
    );

    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Unauthorized");
  }

  const parts = authorizationHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer" || parts[1].length === 0) {
    logger.error(
      "Invalid access token format. Expected format: 'Bearer <token>'.",
    );

    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Unauthorized");
  }

  const payload = verifyAccessToken(parts[1]);

  if (!payload) {
    logger.error(
      "Invalid access token. Token verification failed, possibly due to expiration or tampering.",
    );

    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Unauthorized");
  }

  const isEmailInPayload =
    "email" in payload && typeof payload.email === "string";

  const isSubInPayload = "sub" in payload && typeof payload.sub === "string";

  if (!isEmailInPayload || !isSubInPayload) {
    logger.error(
      "Invalid access token payload. Expected properties 'email' and 'sub' are missing.",
    );

    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Unauthorized");
  }

  request.user = {
    email: payload.email,
    id: payload.sub,
  };

  next();
};
