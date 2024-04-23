import { STATUS_CODES } from "@/config/index.js";
import { ApiError } from "@/errors/index.js";
import {
  createUser,
  findUserByEmail,
  findUserByUsername,
} from "@/modules/user/index.js";
import { hashPassword } from "@/utils/index.js";

import type { AuthResponse } from "../types.js";
import type { RegisterInput } from "../validation.js";

import { createAuthResponse } from "./create-auth-response.js";

export const registerUser = async (
  input: RegisterInput,
): Promise<AuthResponse> => {
  const email = input.email.toLowerCase();

  const existingEmailUser = await findUserByEmail(email);

  if (existingEmailUser !== null) {
    throw new ApiError(STATUS_CODES.CONFLICT, "Email is already used");
  }

  const existingUsernameUser = await findUserByUsername(input.username);

  if (existingUsernameUser !== null) {
    throw new ApiError(STATUS_CODES.CONFLICT, "Username is already used");
  }

  const passwordHash = await hashPassword(input.password);

  const user = await createUser({
    email,
    passwordHash,
    username: input.username,
  });

  return createAuthResponse(user);
};
