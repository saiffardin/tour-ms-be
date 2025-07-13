import cors from "cors";
import express from "express";

export const commonMiddlewares = [
  cors(),
  express.json(),
  express.urlencoded({ extended: true }),
];
