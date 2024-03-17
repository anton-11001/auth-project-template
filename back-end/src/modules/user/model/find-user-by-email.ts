import { databasePool } from "@/config/index.js";

import type { UserRow } from "../types.js";

import { mapUserRow } from "./map-user-row.js";

type DatabaseUserRow = Parameters<typeof mapUserRow>[0];

export const findUserByEmail = async (email: string): Promise<null | UserRow> => {
  const result = await databasePool.query<DatabaseUserRow>(
    `
      SELECT id, email, username, password_hash, created_at, updated_at
      FROM users
      WHERE LOWER(email) = LOWER($1)
      LIMIT 1
    `,
    [email],
  );

  return result.rowCount === 0
    ? null
    : mapUserRow(result.rows[0]);
};
