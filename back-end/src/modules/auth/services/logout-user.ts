import { deleteRefreshTokenByHash } from "@/models/index.js";
import { hashToken } from "@/utils/index.js";

export const logoutUser = async (refreshToken: string): Promise<void> => {
  await deleteRefreshTokenByHash(hashToken(refreshToken));
};
