import passport from "passport";
import { Router } from "express";
import { AuthControllers } from "./controllers";

export const GoogleAuthRoutes = Router();

GoogleAuthRoutes.get("/", AuthControllers.googleAuth);

// api/v1/auth/google/callback?state=/booking
GoogleAuthRoutes.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/failedLogin" }),
  AuthControllers.googleCallbackController
);
