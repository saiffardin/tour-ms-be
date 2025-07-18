import bcryptjs from "bcryptjs";
import { User } from "../user.model";
import { IUser } from "../interfaces";
import { envVars } from "@/app/config";
import { CustomJwtPayload } from "@/app/utils/jwt";
import {
  checkRoleUpdatePermission,
  onlyAdminOrSuperAdminCanUpdate,
} from "@/app/utils/user-update";

export const updateUserSVC = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: CustomJwtPayload
) => {
  /**
   * email - can not update
   * name, phone, password address
   * password - re hashing
   * only admin super-admin - role, isDeleted...
   *
   * promoting to superadmin - superadmin
   */

  if (payload.role) {
    checkRoleUpdatePermission(payload, decodedToken);
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    onlyAdminOrSuperAdminCanUpdate(decodedToken);
  }

  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      envVars.BCRYPT_SALT_ROUND
    );
  }

  const filter = { _id: userId };

  const updatedUser = await User.findOneAndUpdate(filter, payload, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

/*
 * 1. ekjon "user" nijer role ke admin, super-admin, guide banate parbe na
 * 2. postman diye ekjon user, onno user er info update korte parbe na
 * 3. admin ba super-admin ki onno der shob info update korte parbe ?
 */
