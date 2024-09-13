import { validateBody } from "@/utils/validation";
import { NextFunction, Request, Response } from "express";
import { CreateScheme, UpdateScheme } from "./schemes";

export function validateCreateInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  validateBody(CreateScheme)(req, res, next);
}
export function validateUpdateInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  validateBody(UpdateScheme)(req, res, next);
}
