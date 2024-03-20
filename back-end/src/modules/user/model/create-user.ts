import { databasePool } from "@/config/index.js";

import type { CreateUserInput, UserRow } from "../types.js";

import { mapUserRow } from "./map-user-row.js";

type DatabaseUserRow = Parameters<typeof mapUserRow>[0];

export const createUser = async (input: CreateUserInput): Promise<UserRow> => {
  const result = await databasePool.query<DatabaseUserRow>(
    `
      INSERT INTO users (email, username, password_hash)
      VALUES (LOWER($1), $2, $3)
      RETURNING id, email, username, password_hash, created_at, updated_at
    `,
    [input.email, input.username, input.passwordHash],
  );

  if (result.rowCount !== 1) {
    throw new Error("Failed to create user");
  }

  return mapUserRow(result.rows[0]);
};
