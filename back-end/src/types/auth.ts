export interface AuthenticatedUser {
  email: string;
  id: string;
}

export interface AuthTokenPayload {
  email: string;
  sub: string;
}
