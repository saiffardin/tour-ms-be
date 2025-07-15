import { Router } from "express";
import { createUser } from "./controllers";

export const UserRoutes = Router();

UserRoutes.post("/register", createUser);
