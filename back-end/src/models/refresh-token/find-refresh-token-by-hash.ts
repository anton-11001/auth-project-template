import { databasePool } from "@/config/index.js";

import type { RefreshTokenRow } from "./types.js";

import { mapRefreshTokenRow } from "./map-refresh-token-row.js";

type DatabaseRefreshTokenRow = Parameters<typeof mapRefreshTokenRow>[0];

export const findRefreshTokenByHash = async (
  tokenHash: string,
): Promise<null | RefreshTokenRow> => {
  const result = await databasePool.query<DatabaseRefreshTokenRow>(
    `
      SELECT id, user_id, token_hash, expires_at, created_at
      FROM refresh_tokens
      WHERE token_hash = $1
      LIMIT 1
    `,
    [tokenHash],
  );

  return result.rowCount === 0
    ? null
    : mapRefreshTokenRow(result.rows[0]);
};
