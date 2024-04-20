import type { Request, Response } from "express";

import { STATUS_CODES } from "@/config/index.js";

import { refreshAccessToken } from "../services/index.js";
import { getRefreshTokenFromRequest } from "./get-refresh-token-from-request.js";

export const refreshController = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const refreshToken = getRefreshTokenFromRequest(request);

  const accessToken = await refreshAccessToken(refreshToken);

  response.status(STATUS_CODES.OK).json({
    accessToken,
  });
};
