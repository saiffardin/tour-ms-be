import { Router } from "express";
import { UserControllers } from "./controllers";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./validations";

export const UserRoutes = Router();

UserRoutes.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);

UserRoutes.get("/all-users", UserControllers.getAllUsers);
