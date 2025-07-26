import { Types } from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import { RoleType } from "@/app/modules/user/constants/enums";

export interface CustomJwtPayload extends JwtPayload {
  userId: Types.ObjectId;
  email: string;
  role: RoleType;
}
