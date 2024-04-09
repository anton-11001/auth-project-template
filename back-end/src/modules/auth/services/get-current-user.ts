import { logger, STATUS_CODES } from "@/config/index.js";
import { ApiError } from "@/errors/index.js";
import { findUserById, toUserDto } from "@/modules/user/index.js";

type UserDto = ReturnType<typeof toUserDto>;

export const getCurrentUser = async (userId: string): Promise<UserDto> => {
  const user = await findUserById(userId);

  if (user === null) {
    logger.error(`User with ID ${userId} not found`);

    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Unauthorized");
  }

  return toUserDto(user);
};
