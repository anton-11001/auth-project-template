import bcrypt from "bcrypt";

export const comparePassword = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => bcrypt.compare(password, passwordHash);
