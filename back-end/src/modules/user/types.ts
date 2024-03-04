export interface CreateUserInput {
  email: string;
  passwordHash: string;
  username: string;
}

export interface UserRow {
  createdAt: Date;
  email: string;
  id: string;
  passwordHash: string;
  updatedAt: Date;
  username: string;
}
