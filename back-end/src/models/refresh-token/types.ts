export interface CreateRefreshTokenInput {
  expiresAt: Date;
  tokenHash: string;
  userId: string;
}

export interface RefreshTokenRow {
  createdAt: Date;
  expiresAt: Date;
  id: string;
  tokenHash: string;
  userId: string;
}
