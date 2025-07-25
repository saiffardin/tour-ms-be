import { createUserSVC } from "./create-user.svc";
import { getAllUsersSVC } from "./get-all-users.svc";
import { updateUserSVC } from "./update-user.svc";

export const UserService = {
  createUser: createUserSVC,
  getAllUsers: getAllUsersSVC,
  updateUser: updateUserSVC,
};
