import { STATUS_CODES } from "@/config/index.js";
import { ApiError } from "@/errors/index.js";
import { findUserByEmail } from "@/modules/user/index.js";
import { comparePassword } from "@/utils/index.js";

import type { AuthResponse } from "../types.js";
import type { LoginInput } from "../validation.js";

import { createAuthResponse } from "./create-auth-response.js";

const invalidCredentialsError = new ApiError(
  STATUS_CODES.UNAUTHORIZED,
  "Invalid email or password",
);

export const loginUser = async (input: LoginInput): Promise<AuthResponse> => {
  const user = await findUserByEmail(input.email);

  if (user === null) {
    throw invalidCredentialsError;
  }

  const isPasswordValid = await comparePassword(input.password, user.passwordHash);

  if (!isPasswordValid) {
    throw invalidCredentialsError;
  }

  return createAuthResponse(user);
};
