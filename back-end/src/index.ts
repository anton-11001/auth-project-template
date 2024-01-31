import express from "express";

import { connectDatabase, logger, PORT } from "@/config/index.js";
import { loggerMiddleware } from "@/middlewares/index.js";

const app = express();

app.use(loggerMiddleware);

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(PORT, () => {
    logger.info({ port: PORT }, "Server is running");
  });
};

await startServer();
