// import mongoose from "mongoose";
import {
  TErrorSources,
  TGenericErrorResponse,
} from "@/app/interfaces/error.types";
import { type Error } from "mongoose";

// type errType = mongoose.Error.ValidationError;
type errType = Error.ValidationError;

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handlerValidationError = (err: errType): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [];

  const errors = Object.values(err.errors);

  errors.forEach((errorObject: any) =>
    errorSources.push({
      path: errorObject.path,
      message: errorObject.message,
    })
  );

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};
