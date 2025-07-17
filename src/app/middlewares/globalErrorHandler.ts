/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { sendResponse } from "../utils/sendResponse";

/**
 * when you pass 4 params
 * node treats that function as GLOBAL ERROR HANDLER
 */
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something Went Wrong!!";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  sendResponse(res, {
    success: false,
    statusCode,
    message,
    data: null,
    error: err,
  });
};
