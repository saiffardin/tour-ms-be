import AppError from "@/app/errorHelpers/AppError";
import { IAuthProvider, IUser } from "../interfaces";
import { User } from "../user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
// import { envVars } from "@/app/config";

export const createUserSVC = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    10
    // Number(envVars.BCRYPT_SALT_ROUND)
  );

  // const isPasswordMatched = await bcryptjs.compare(
  //   password as string,
  //   hashedPassword
  // );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });

  return user;
};
