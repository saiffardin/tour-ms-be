import { Router } from "express";
import { AuthControllers } from "./auth.controller";

export const AuthRoutes = Router();

AuthRoutes.post("/login", AuthControllers.credentialsLogin);
