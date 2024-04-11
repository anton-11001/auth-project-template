import { logger, STATUS_CODES } from "@/config/index.js";
import { ApiError } from "@/errors/index.js";
import { findRefreshTokenByHash } from "@/models/index.js";
import { findUserById } from "@/modules/user/index.js";
import {
  createAccessToken,
  hashToken,
  verifyRefreshToken,
} from "@/utils/index.js";

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<string> => {
  const payload = verifyRefreshToken(refreshToken);
  const tokenHash = hashToken(refreshToken);
  const tokenRecord = await findRefreshTokenByHash(tokenHash);

  if (tokenRecord === null || tokenRecord.expiresAt.getTime() <= Date.now()) {
    logger.error("Invalid or expired refresh token");

    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Unauthorized");
  }

  const user = await findUserById(payload.sub);

  if (!user) {
    logger.error("User not found for the given refresh token");

    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Unauthorized");
  }

  return createAccessToken({
    email: user.email,
    sub: user.id,
  });
};
