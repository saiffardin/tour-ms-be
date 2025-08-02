import { type NextFunction, type Request, type Response } from "express";
import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import httpStatus from "http-status-codes";
import { setAuthCookie } from "@/app/utils/setCookie";
import passport from "passport";
import AppError from "@/app/errorHelpers/AppError";
import { createUserTokens } from "@/app/utils/user-tokens";

export const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const loginInfo = await AuthServices.credentialsLogin(req.body);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    passport.authenticate("local", async (err: any, user: any, info: any) => {
      if (err) {
        // ❌❌❌❌❌
        // throw new AppError(401, "Some error")
        // next(err)
        // return new AppError(401, err)

        // ✅✅✅✅
        // return next(err)
        // console.log("from err");
        return next(new AppError(401, err));
      }

      if (!user) {
        // console.log("from !user");
        // return new AppError(401, info.message)
        return next(new AppError(401, info.message));
      }

      const userTokens = await createUserTokens(user);

      // delete user.toObject().password

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...rest } = user.toObject();

      setAuthCookie(res, userTokens);

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully.",
        data: {
          accessToken: userTokens.accessToken,
          refreshToken: userTokens.refreshToken,
          user: rest,
        },
      });
    })(req, res, next);
  }
);
