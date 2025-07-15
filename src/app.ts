import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { commonMiddlewares } from "./app/middlewares/commonMiddlewares";
import { router } from "./app/routes";

const app: Application = express();

app.use(commonMiddlewares);

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Tour Management System Backend",
  });
});

export default app;
