import { createUserSVC } from "./create-user.svc";
import { getAllUsersSVC } from "./get-all-users.svc";

export const UserService = {
  createUser: createUserSVC,
  getAllUsers: getAllUsersSVC,
};
