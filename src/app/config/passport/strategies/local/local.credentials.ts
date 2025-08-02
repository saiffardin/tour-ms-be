import { type IStrategyOptions } from "passport-local";

export const localCredentials: IStrategyOptions = {
  usernameField: "email",
  passwordField: "password",
};
