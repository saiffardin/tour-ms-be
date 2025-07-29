import { envVars } from "../config";
import { verifyToken } from "../utils/jwt";
import AppError from "../errorHelpers/AppError";
import { NextFunction, Request, Response } from "express";
import { RoleType } from "../modules/user/constants/enums";

export const checkAuth =
  (...authRoles: RoleType[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerToken = req.headers.authorization;

      const accessToken = bearerToken?.split(" ")[1];

      const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET);

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
