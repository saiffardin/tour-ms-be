/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Response } from "express";
import { envVars } from "../config";

interface TMeta {
  total: number;
}

interface TResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: TMeta;
  error?: any;
}

const getError = (error: any) => {
  if (!error) return {};

  return {
    error: error,
    stack: envVars.NODE_ENV === "development" ? error?.stack : null,
  };
};

export const sendResponse = <T>(res: Response, resJSON: TResponse<T>) => {
  res.status(resJSON.statusCode).json({
    success: resJSON.success,
    message: resJSON.message,
    meta: resJSON.meta,
    data: resJSON.data,
    ...getError(resJSON.error),
  });
};
