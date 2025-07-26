import { generateToken } from "../jwt";
import { envVars } from "@/app/config";
import httpCodes from "http-status-codes";
import { CustomJwtPayload } from "../jwt/types";
import AppError from "@/app/errorHelpers/AppError";
import { IUser } from "@/app/modules/user/interfaces";

export const createUserTokens = (user: Partial<IUser>) => {
  if (!user._id || !user.email || !user.role) {
    throw new AppError(httpCodes.BAD_REQUEST, "Missing User Info.");
  }

  const jwtPayload: CustomJwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};
