import { z } from "zod";

const DEFAULT_ENVS = {
  JWT_ACCESS_EXPIRES_IN: "15m",
  JWT_REFRESH_EXPIRES_IN: "7d",
  NODE_ENV_ENUM: ["development", "production", "test"] as const,
  PORT: "8000",
};

const envSchema = z.object({
  CLIENT_URL: z.string().url().optional(),
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_EXPIRES_IN: z.string().default(DEFAULT_ENVS.JWT_ACCESS_EXPIRES_IN),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_EXPIRES_IN: z
    .string()
    .default(DEFAULT_ENVS.JWT_REFRESH_EXPIRES_IN),
  JWT_REFRESH_SECRET: z.string().min(32),
  LOG_LEVEL: z.string().optional(),
  NODE_ENV: z
    .enum(DEFAULT_ENVS.NODE_ENV_ENUM)
    .default(DEFAULT_ENVS.NODE_ENV_ENUM[0]),
  PORT: z.string().default(DEFAULT_ENVS.PORT),
});

export const env = envSchema.parse(process.env);
