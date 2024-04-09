import type { RefreshTokenRow } from "./types.js";

export interface DatabaseRefreshTokenRow {
  created_at: Date;
  expires_at: Date;
  id: string;
  token_hash: string;
  user_id: string;
}

export const mapRefreshTokenRow = (
  row: DatabaseRefreshTokenRow,
): RefreshTokenRow => ({
  createdAt: row.created_at,
  expiresAt: row.expires_at,
  id: row.id,
  tokenHash: row.token_hash,
  userId: row.user_id,
});
