import { logout } from "./logout";
import { resetPassword } from "./reset-password";
import { credentialsLogin } from "./credentials-login";
import { getNewAccessToken } from "./get-new-access-token";
import { googleCallbackController } from "./passport/google-callback-controller";
import { googleAuth } from "./passport/google-auth";

export const AuthControllers = {
  credentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword,
  googleCallbackController,
  googleAuth,
};
