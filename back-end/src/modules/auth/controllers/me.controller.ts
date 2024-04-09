import type { Request, Response } from "express";

import { logger, STATUS_CODES } from "@/config/index.js";

import { getCurrentUser } from "../services/index.js";

export const meController = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const userId = request.user?.id;

  if (!userId) {
    logger.error("Missing user ID in request");

    response.status(STATUS_CODES.UNAUTHORIZED).json({
      message: "Unauthorized",
    });

    return;
  }

  const user = await getCurrentUser(userId);

  response.status(STATUS_CODES.OK).json({
    user,
  });
};
