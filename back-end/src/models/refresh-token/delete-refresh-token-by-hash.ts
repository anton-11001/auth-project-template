import { databasePool } from "@/config/index.js";

export const deleteRefreshTokenByHash = async (
  tokenHash: string,
): Promise<void> => {
  await databasePool.query(
    `
      DELETE FROM refresh_tokens
      WHERE token_hash = $1
    `,
    [tokenHash],
  );
};
