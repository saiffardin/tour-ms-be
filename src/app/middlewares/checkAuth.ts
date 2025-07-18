import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config";
import { RoleType } from "../modules/user/constants/enums";

export const checkAuth =
  (...authRoles: RoleType[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerToken = req.headers.authorization;
      const verifiedToken = verifyToken(bearerToken, envVars.JWT_ACCESS_SECRET);

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to view this route!!!");
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      console.error("jwt error", error);
      next(error);
    }
  };
