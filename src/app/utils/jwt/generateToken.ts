import { CustomJwtPayload } from "./types";
import jwt, { SignOptions } from "jsonwebtoken";

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
