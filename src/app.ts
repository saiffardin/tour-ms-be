import express, { type Application } from "express";
import { commonMiddlewares } from "./app/middlewares/commonMiddlewares";

const app: Application = express();

app.use(commonMiddlewares);

export default app;
