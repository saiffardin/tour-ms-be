import { Router } from "express";
import { Role } from "../user/constants/enums";
import { AuthControllers } from "./controllers";
import { GoogleAuthRoutes } from "./google.route";
import { checkAuth } from "@/app/middlewares/checkAuth";

export const AuthRoutes = Router();

AuthRoutes.use("/google", GoogleAuthRoutes);

AuthRoutes.post("/login", AuthControllers.credentialsLogin);
AuthRoutes.post("/refresh-token", AuthControllers.getNewAccessToken);
AuthRoutes.post("/logout", AuthControllers.logout);

AuthRoutes.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  AuthControllers.resetPassword
);
