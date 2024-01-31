import type { NextFunction, Request, Response } from "express";

import { logger } from "@/config/logger.js";

export const loggerMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const startTime = performance.now();

  response.on("finish", () => {
    const durationMilliseconds = Math.round(performance.now() - startTime);

    logger.info(
      {
        durationMilliseconds,
        method: request.method,
        path: request.originalUrl,
        statusCode: response.statusCode,
      },
      "HTTP request completed",
    );
  });

  next();
};
