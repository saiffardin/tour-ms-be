import httpStatus from "http-status-codes";
import { CustomJwtPayload } from "../jwt/types";
import AppError from "@/app/errorHelpers/AppError";
import { Role } from "@/app/modules/user/constants/enums";

export const onlyAdminOrSuperAdminCanUpdate = (
  decodedToken: CustomJwtPayload
) => {
  if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized.");
  }
};
