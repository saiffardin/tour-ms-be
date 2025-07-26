import jwt from "jsonwebtoken";
import { CustomJwtPayload } from "./types";
import AppError from "@/app/errorHelpers/AppError";

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
