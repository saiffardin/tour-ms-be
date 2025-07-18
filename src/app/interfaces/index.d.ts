import { CustomJwtPayload } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user: CustomJwtPayload;
    }
  }
}
