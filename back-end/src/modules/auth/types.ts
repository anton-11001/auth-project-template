import type { UserDto } from "@/modules/user/index.js";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}
