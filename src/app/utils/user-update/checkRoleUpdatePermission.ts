import { CustomJwtPayload } from "../jwt";
import httpStatus from "http-status-codes";
import AppError from "@/app/errorHelpers/AppError";
import { IUser } from "@/app/modules/user/interfaces";
import { Role } from "@/app/modules/user/constants/enums";

export const checkRoleUpdatePermission = (
  payload: Partial<IUser>,
  decodedToken: CustomJwtPayload
) => {
  if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to update Role."
    );
  }

  if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized. Admin can't make someone super-admin."
    );
  }
};
