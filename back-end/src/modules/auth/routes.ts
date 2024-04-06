import { Router } from "express";

import { authMiddleware, validate } from "@/middlewares/index.js";
import { asyncHandler } from "@/utils/index.js";

import {
  loginController,
  logoutController,
  meController,
  refreshController,
  registerController,
} from "./controllers/index.js";
import {
  loginSchema,
  logoutSchema,
  refreshSchema,
  registerSchema,
} from "./validation.js";

export const authRouter = Router();

authRouter.post(
  "/register",
  validate(registerSchema),
  asyncHandler(registerController),
);

authRouter.post("/login", validate(loginSchema), asyncHandler(loginController));

authRouter.post(
  "/refresh",
  validate(refreshSchema),
  asyncHandler(refreshController),
);

authRouter.post(
  "/logout",
  validate(logoutSchema),
  asyncHandler(logoutController),
);

authRouter.get("/me", authMiddleware, asyncHandler(meController));
