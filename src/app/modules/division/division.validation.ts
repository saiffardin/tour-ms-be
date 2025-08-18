import { z } from "zod";

export const createDivisionZodSchema = z.object({
  name: z.string().min(1),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
});

export const updateDivisionZodSchema = z.object({
  name: z.string().min(1).optional(),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
});
