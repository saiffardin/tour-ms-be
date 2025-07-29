import bcryptjs from "bcryptjs";
import { envVars } from "@/app/config";
import httpStatus from "http-status-codes";
import { User } from "../../user/user.model";
import AppError from "@/app/errorHelpers/AppError";
import { type CustomJwtPayload } from "@/app/utils/jwt/types";

export const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: CustomJwtPayload
) => {
  const user = await User.findById(decodedToken.userId);

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found.");
  }

  const isOldPasswordMatch = await bcryptjs.compare(
    oldPassword,
    user.password as string
  );

  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
  }

  user.password = await bcryptjs.hash(
    newPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  user.save();
};
