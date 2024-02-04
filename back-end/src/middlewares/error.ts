import type { NextFunction, Request, Response } from "express";

import { ZodError } from "zod";

import { logger } from "@/config/logger.js";
import { ApiError } from "@/errors/index.js";

import { STATUS_CODES } from "@/config/status-codes.js";

export const errorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction,
): void => {
  if (response.headersSent) {
    logger.error(
      {
        err: error,
        method: request.method,
        path: request.originalUrl,
      },
      "Error occurred after response headers were sent",
    );

    return;
  }

  if (error instanceof ZodError) {
    response.status(STATUS_CODES.BAD_REQUEST).json({
      errors: error.issues,
      message: "Validation error",
    });

    return;
  }

  if (error instanceof ApiError) {
    const logLevel = error.isOperational ? "warn" : "error";

    logger[logLevel](
      {
        err: error,
        method: request.method,
        path: request.originalUrl,
        statusCode: error.statusCode,
      },
      "API error",
    );

    response.status(error.statusCode).json({
      message: error.message,
    });

    return;
  }

  logger.error(
    {
      err: error,
      method: request.method,
      path: request.originalUrl,
    },
    "Unexpected error",
  );

  response.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
  });
};
