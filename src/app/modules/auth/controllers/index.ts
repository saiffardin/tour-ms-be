import { logout } from "./logout";
import { resetPassword } from "./reset-password";
import { credentialsLogin } from "./credentials-login";
import { getNewAccessToken } from "./get-new-access-token";

export const AuthControllers = {
  credentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword,
};
