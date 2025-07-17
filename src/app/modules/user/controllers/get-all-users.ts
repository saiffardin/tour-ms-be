/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextFunction, type Request, type Response } from "express";
import { UserService } from "../services";
import httpStatus from "http-status-codes";
import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { data, meta } = await UserService.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Users Retrieved Successfully",
      data,
      meta,
    });
  }
);
