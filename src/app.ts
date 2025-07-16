import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { commonMiddlewares } from "./app/middlewares/commonMiddlewares";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

app.use(commonMiddlewares);

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Tour Management System Backend",
  });
});

/**
 * when you pass 4 params
 * node treats that function as GLOBAL ERROR HANDLER
 */
app.use(globalErrorHandler);

app.use(notFound);

export default app;
