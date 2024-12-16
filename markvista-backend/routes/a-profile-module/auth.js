import { Router } from "express";

import {
  signup,
  login,
  forgotPassword,
  resetPassword,
} from "../../controller/a-profile-module/authController.js";

const authRouter = Router();
// Authentication Routes
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.patch("/reset-password/:token", resetPassword);

export default authRouter;
