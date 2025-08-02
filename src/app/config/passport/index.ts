import passport from "passport";
import { User } from "../../modules/user/user.model";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import {
  googleCredentials,
  googleVerify,
  localCredentials,
  localVerify,
} from "./strategies";

passport.use(new GoogleStrategy(googleCredentials, googleVerify));

passport.use(new LocalStrategy(localCredentials, localVerify));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    done(error);
  }
});
