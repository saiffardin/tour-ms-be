import { User } from "@/app/modules/user/user.model";
import bcryptjs from "bcryptjs";
import { type VerifyFunction } from "passport-local";

export const localVerify: VerifyFunction = async (email, password, done) => {
  try {
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      return done("User does not exist");
    }

    const isGoogleAuthenticated = isUserExist.auths.some(
      (providerObjects) => providerObjects.provider == "google"
    );

    if (isGoogleAuthenticated && !isUserExist.password) {
      return done(null, false, {
        message:
          "You have authenticated through Google. So if you want to login with credentials, then at first login with google and set a password for your Gmail and then you can login with email and password.",
      });
    }

    const isPasswordMatched = await bcryptjs.compare(
      password as string,
      isUserExist.password as string
    );

    if (!isPasswordMatched) {
      return done(null, false, { message: "Password does not match" });
    }

    return done(null, isUserExist);
  } catch (error) {
    console.error(error);
    done(error);
  }
};
