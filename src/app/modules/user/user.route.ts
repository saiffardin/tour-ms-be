import { Router } from "express";
import { UserControllers } from "./controllers";
import { createUserZodSchema } from "./validations";
import { validateRequest } from "@/app/middlewares/validateRequest";

export const UserRoutes = Router();

UserRoutes.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);

UserRoutes.get("/all-users", UserControllers.getAllUsers);
