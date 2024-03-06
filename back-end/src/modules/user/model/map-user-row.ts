import type { UserRow } from "../types.js";

export interface DatabaseUserRow {
  created_at: Date;
  email: string;
  id: string;
  password_hash: string;
  updated_at: Date;
  username: string;
}

export const mapUserRow = (row: DatabaseUserRow): UserRow => ({
  createdAt: row.created_at,
  email: row.email,
  id: row.id,
  passwordHash: row.password_hash,
  updatedAt: row.updated_at,
  username: row.username,
});
