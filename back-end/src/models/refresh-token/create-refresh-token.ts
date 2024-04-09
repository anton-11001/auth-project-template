import { databasePool } from "@/config/index.js";

import type { CreateRefreshTokenInput, RefreshTokenRow } from "./types.js";

import { mapRefreshTokenRow } from "./map-refresh-token-row.js";

type DatabaseRefreshTokenRow = Parameters<typeof mapRefreshTokenRow>[0];

export const createRefreshToken = async (
  input: CreateRefreshTokenInput,
): Promise<RefreshTokenRow> => {
  const result = await databasePool.query<DatabaseRefreshTokenRow>(
    `
      INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
      VALUES ($1, $2, $3)
      RETURNING id, user_id, token_hash, expires_at, created_at
    `,
    [input.userId, input.tokenHash, input.expiresAt],
  );

  if (result.rowCount !== 1) {
    throw new Error("Failed to create refresh token");
  }

  return mapRefreshTokenRow(result.rows[0]);
};
