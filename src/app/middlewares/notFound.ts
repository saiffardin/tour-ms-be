import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../utils/sendResponse";

const notFound = (req: Request, res: Response) => {
  sendResponse(res, {
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: "Route Not Found",
    data: null,
  });
};

export default notFound;
