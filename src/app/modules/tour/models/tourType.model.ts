import { model, Schema } from "mongoose";
import { ITourType } from "../tour.interface";

const tourTypeSchema = new Schema<ITourType>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const TourType = model<ITourType>("TourType", tourTypeSchema);
