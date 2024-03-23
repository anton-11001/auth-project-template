import type { UserRow } from "./types.js";

export interface UserDto {
  email: string;
  id: string;
  username: string;
}

export const toUserDto = (user: UserRow): UserDto => ({
  email: user.email,
  id: user.id,
  username: user.username,
});
