import { type StrategyOptions } from "passport-google-oauth20";
import { envVars } from "../env";

export const googleCredentials: StrategyOptions = {
  clientID: envVars.GOOGLE_CLIENT_ID,
  clientSecret: envVars.GOOGLE_CLIENT_SECRET,
  callbackURL: envVars.GOOGLE_CALLBACK_URL,
};
