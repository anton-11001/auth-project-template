import pino from "pino";

import { env } from "./env.js";

const isDevelopment = env.NODE_ENV !== "production";

export const logger = pino({
  level: env.LOG_LEVEL ?? (isDevelopment ? "debug" : "info"),
  transport: isDevelopment
    ? {
        options: {
          colorize: true,
          ignore: "pid,hostname",
          translateTime: "SYS:standard",
        },
        target: "pino-pretty",
      }
    : undefined,
});
