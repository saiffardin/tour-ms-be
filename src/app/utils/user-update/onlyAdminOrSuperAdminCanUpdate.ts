import { Role } from "@/app/modules/user/constants/enums";
import { CustomJwtPayload } from "../jwt";
import AppError from "@/app/errorHelpers/AppError";
import httpStatus from "http-status-codes";

export const onlyAdminOrSuperAdminCanUpdate = (
  decodedToken: CustomJwtPayload
) => {
  if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized.");
  }
};
