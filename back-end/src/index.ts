import express from "express";

import { connectDatabase } from "@/config/database.js";

const app = express();

const PORT = process.env.PORT ?? "8000";

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.warn(`Server is running on port ${PORT}`);
  });
};

await startServer();
