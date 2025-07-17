import { type NextFunction, type Request, type Response } from "express";
import { UserService } from "../services";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";

/*
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserService.getAllUsers();

    res.status(httpStatus.OK).json({
      success: true,
      message: "All Users Retrieved Successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
*/

export const getAllUsers = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserService.getAllUsers();

    res.status(httpStatus.OK).json({
      success: true,
      message: "All Users Retrieved Successfully",
      data: users,
    });
  }
);
