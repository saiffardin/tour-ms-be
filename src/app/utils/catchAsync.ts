import { type Response, type Request, type NextFunction } from "express";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const catchAsync = (asyncCB: AsyncHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncCB(req, res, next);
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
};
