import passport from "passport";
import { type Request, type Response, type NextFunction } from "express";

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const redirect = req.query.redirect || "/";

  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: redirect as string,
  })(req, res, next);
};
