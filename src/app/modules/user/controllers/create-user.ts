/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Response, type Request, type NextFunction } from "express";
import httpStatusCodes from "http-status-codes";
import { UserService } from "../services";
import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  }
);
