import httpStatus from "http-status-codes";
import AppError from "@/app/errorHelpers/AppError";
import { catchAsync } from "@/app/utils/catchAsync";
import { type Request, type Response, type NextFunction } from "express";
import { createUserTokens } from "@/app/utils/user-tokens";
import { setAuthCookie } from "@/app/utils/setCookie";
import { envVars } from "@/app/config";

export const googleCallbackController = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    let redirectTo = req.query.state ? (req.query.state as string) : "";

    if (redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1);
    }

    // /booking => booking
    // "/" => ""
    const user = req.user;

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
    }

    const tokenInfo = createUserTokens(user);

    setAuthCookie(res, tokenInfo);

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
  }
);
