import { getNewAccessToken } from "./get-new-access-token";
import { credentialsLogin } from "./credentials-login";
import { resetPassword } from "./reset-password";

export const AuthServices = {
  credentialsLogin,
  getNewAccessToken,
  resetPassword,
};
