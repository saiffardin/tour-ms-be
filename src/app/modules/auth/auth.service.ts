import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import { IUser } from "../user/interfaces";
import { generateToken } from "@/app/utils/jwt";
// import { envVars } from "@/app/config";
import AppError from "@/app/errorHelpers/AppError";

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

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  /*
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );
  */

  const accessToken = generateToken(
    jwtPayload,
    "envVars.JWT_ACCESS_SECRET",
    "1d"
  );

  return {
    accessToken,
  };
};

//user - login - token (email, role, _id) - booking / payment / booking / payment cancel - token

export const AuthServices = {
  credentialsLogin,
};
