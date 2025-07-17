import { type Response, type Request, type NextFunction } from "express";
import httpStatusCodes from "http-status-codes";
import { UserService } from "../services";
import { catchAsync } from "../../../utils/catchAsync";

/*
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // throw new Error("Fake eror")
    // throw new AppError(httpStatus.BAD_REQUEST, "fake error")
    // createUserFunction(req, res)

    const user = await UserService.createUser(req.body);

    res.status(httpStatusCodes.CREATED).json({
      message: "User Created Successfully",
      user,
    });
  } catch (err: any) {
    console.error(err);
    next(err);
  }
};
*/

export const createUser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body);

    res.status(httpStatusCodes.CREATED).json({
      message: "User Created Successfully",
      user,
    });
  }
);
