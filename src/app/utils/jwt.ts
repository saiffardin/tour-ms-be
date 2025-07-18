import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import { RoleType } from "../modules/user/constants/enums";
import { Types } from "mongoose";
import AppError from "../errorHelpers/AppError";

export interface CustomJwtPayload extends JwtPayload {
  userId: Types.ObjectId;
  email: string;
  role: RoleType;
}

export const generateToken = (
  payload: CustomJwtPayload,
  secret: string,
  expiresIn: string
) => {
  const options = {
    expiresIn,
  } as SignOptions;

  const token = jwt.sign(payload, secret, options);

  return token;
};

export const verifyToken = (
  bearerToken: string | undefined,
  secret: string
) => {
  if (!bearerToken) {
    throw new AppError(403, "No JWT Received");
  }

  const accessToken = bearerToken?.split(" ")[1];

  const verifiedToken = jwt.verify(accessToken, secret) as CustomJwtPayload;

  return verifiedToken;
};
