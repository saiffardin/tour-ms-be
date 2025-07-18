/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserService } from "../services";
import httpCodes from "http-status-codes";
import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { type NextFunction, type Request, type Response } from "express";

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const updateReqBody = req.body;
    const decodedToken = req.user;

    const updatedUser = await UserService.updateUser(
      userId,
      updateReqBody,
      decodedToken
    );

    if (!updatedUser) {
      sendResponse(res, {
        success: true,
        statusCode: httpCodes.NOT_FOUND,
        message: "User not found",
        data: updatedUser,
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: httpCodes.OK,
      message: "User Updated Successfully",
      data: updatedUser,
    });
  }
);

/** Gracefully handled :
 * 1. emon userId jeta valid mongoID pattern a pore na
 * 2. bhul userId (but valid mongoID), will say "user not found"
 *
 */
