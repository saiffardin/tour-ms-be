/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Response, type Request, type NextFunction } from "express";
// import { User } from "../user.model";
import httpStatusCodes from "http-status-codes";
import { UserService } from "../user.service";

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
