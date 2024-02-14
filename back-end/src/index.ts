import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { connectDatabase, env, initializeDatabase, logger } from "@/config/index.js";
import { errorMiddleware, loggerMiddleware } from "@/middlewares/index.js";
import { apiRouter } from "@/routes/index.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(helmet());

app.use(
  cors({
    credentials: true,
    origin: env.CLIENT_URL,
  }),
);

app.use(loggerMiddleware);
app.use("/api", apiRouter);

const startServer = async (): Promise<void> => {
  await connectDatabase();
  await initializeDatabase();

  app.listen(env.PORT, () => {
    logger.info({ port: env.PORT }, "Server is running");
  });
};

app.use(errorMiddleware);

await startServer();
