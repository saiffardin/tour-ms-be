import bcryptjs from "bcryptjs";
import { envVars } from "@/app/config";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import { IUser } from "../user/interfaces";
import { generateToken } from "@/app/utils/jwt";
import AppError from "@/app/errorHelpers/AppError";
import { CustomJwtPayload } from "@/app/utils/jwt/types";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist");
  }

  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
  }

  const jwtPayload: CustomJwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userInfo } = isUserExist.toObject();

  return {
    accessToken,
    refreshToken,
    user: userInfo,
  };
};

//user - login - token (email, role, _id) - booking / payment / booking / payment cancel - token

export const AuthServices = {
  credentialsLogin,
};
