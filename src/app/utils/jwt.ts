import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import { RoleType } from "../modules/user/constants/enums";
import { Types } from "mongoose";

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

export const verifyToken = (token: string, secret: string) => {
  const verifiedToken = jwt.verify(token, secret) as CustomJwtPayload;

  return verifiedToken;
};
