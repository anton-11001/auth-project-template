import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { connectDatabase, logger, PORT } from "@/config/index.js";
import { errorMiddleware, loggerMiddleware } from "@/middlewares/index.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(helmet());

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);

app.use(loggerMiddleware);
app.use(errorMiddleware);

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(PORT, () => {
    logger.info({ port: PORT }, "Server is running");
  });
};

await startServer();
