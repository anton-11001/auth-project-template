import { env } from "@/config/index.js";
import { createRefreshToken as createRefreshTokenRecord } from "@/models/index.js";
import { toUserDto } from "@/modules/user/index.js";
import {
  createAccessToken,
  createRefreshToken,
  hashToken,
  parseDurationMs,
} from "@/utils/index.js";

import type { AuthResponse } from "../types.js";

type UserRow = Parameters<typeof toUserDto>[0];

export const createAuthResponse = async (
  user: UserRow,
): Promise<AuthResponse> => {
  const payload = {
    email: user.email,
    sub: user.id,
  };
  const accessToken = createAccessToken(payload);

  const refreshToken = createRefreshToken(payload);

  const refreshTokenExpiresAt = new Date(
    Date.now() + parseDurationMs(env.JWT_REFRESH_EXPIRES_IN),
  );

  await createRefreshTokenRecord({
    expiresAt: refreshTokenExpiresAt,
    tokenHash: hashToken(refreshToken),
    userId: user.id,
  });

  return {
    accessToken,
    refreshToken,
    user: toUserDto(user),
  };
};
