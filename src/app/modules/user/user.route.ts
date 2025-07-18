import { Router } from "express";
import { UserControllers } from "./controllers";
import { createUserZodSchema } from "./validations";
import { validateRequest } from "@/app/middlewares/validateRequest";
import { checkAuth } from "@/app/middlewares/checkAuth";
import { Role } from "./constants/enums";

export const UserRoutes = Router();

UserRoutes.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);

UserRoutes.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  UserControllers.getAllUsers
);
