import express from "express";

import { connectDatabase } from "@/config/database.js";
import { PORT } from "@/config/index.js";

const app = express();

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.warn(`Server is running on port ${PORT}`);
  });
};

await startServer();
