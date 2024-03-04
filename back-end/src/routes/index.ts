import { Router } from "express";

import { authRouter } from "@/modules/index.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
