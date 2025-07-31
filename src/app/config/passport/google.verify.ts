import { Role } from "@/app/modules/user/constants/enums";
import { User } from "@/app/modules/user/user.model";
import { type VerifyCallback, type Profile } from "passport-google-oauth20";

export const googleVerify = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) => {
  try {
    const email = profile.emails?.[0].value;

    if (!email) {
      return done(null, false, { message: "No email found" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name: profile.displayName,
        picture: profile.photos?.[0].value,
        role: Role.USER,
        isVerified: true,
        auths: [
          {
            provider: "google",
            providerId: profile.id,
          },
        ],
      });
    }

    return done(null, user);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Google Strategy Error", error);
    return done(error);
  }
};
