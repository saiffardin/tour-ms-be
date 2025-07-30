import "../config/passport";
import passport from "passport";
import expressSession from "express-session";

export const passportMiddlewares = [
  expressSession({
    secret: "Your Secret",
    resave: false,
    saveUninitialized: false,
  }),

  passport.initialize(),
  passport.session(),
];
