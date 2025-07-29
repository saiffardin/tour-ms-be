import { Router } from "express";
import { AuthControllers } from "./controllers";
import { checkAuth } from "@/app/middlewares/checkAuth";
import { Role } from "../user/constants/enums";

export const AuthRoutes = Router();

AuthRoutes.post("/login", AuthControllers.credentialsLogin);
AuthRoutes.post("/refresh-token", AuthControllers.getNewAccessToken);
AuthRoutes.post("/logout", AuthControllers.logout);
AuthRoutes.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  AuthControllers.resetPassword
);
