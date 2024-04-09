import { databasePool } from "@/config/index.js";

export const deleteRefreshTokensByUserId = async (
  userId: string,
): Promise<void> => {
  await databasePool.query(
    `
      DELETE FROM refresh_tokens
      WHERE user_id = $1
    `,
    [userId],
  );
};
