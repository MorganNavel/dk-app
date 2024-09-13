import { validateBody } from "@/utils/validation";
import { UpdateScheme } from "./schemes";
import { NextFunction, Request, Response } from "express";

export function validateUpdateInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  validateBody(UpdateScheme)(req, res, next);
}
