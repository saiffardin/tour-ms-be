import { envVars } from "@/app/config";
import httpStatus from "http-status-codes";
import { CustomJwtPayload } from "../jwt/types";
import AppError from "@/app/errorHelpers/AppError";
import { generateToken, verifyToken } from "../jwt";
import { User } from "@/app/modules/user/user.model";
import { IUser } from "@/app/modules/user/interfaces";
import { IsActive } from "@/app/modules/user/constants/enums";

const validateUserForTokenRenewal = async (user: IUser) => {
  const { isActive, isDeleted } = user;

  if (isActive === IsActive.BLOCKED || isActive === IsActive.INACTIVE) {
    throw new AppError(httpStatus.BAD_REQUEST, `User is ${isActive}`);
  }

  if (isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }
};

// createNewAccessTokenWithRefreshToken
export const renewAccessToken = async (refreshToken: string) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as CustomJwtPayload;

  const user = await User.findOne({ email: verifiedRefreshToken.email });

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
  }

  await validateUserForTokenRenewal(user);

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  return accessToken;
};
