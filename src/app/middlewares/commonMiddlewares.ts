import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

export const commonMiddlewares = [
  cors(),
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
];
