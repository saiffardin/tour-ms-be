import { Router } from "express";
import { Role } from "./constants/enums";
import { UserControllers } from "./controllers";
import { checkAuth } from "@/app/middlewares/checkAuth";
import { validateRequest } from "@/app/middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./validations";

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

UserRoutes.patch(
  "/:userId",
  checkAuth(...Object.values(Role)),
  validateRequest(updateUserZodSchema),
  UserControllers.updateUser
);
