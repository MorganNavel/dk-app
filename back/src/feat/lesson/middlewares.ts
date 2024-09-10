import { validateBody, validateQuery } from "@/utils/validation";
import { CreateScheme, UpdateScheme, UpdateStatusScheme } from "./schemes";
import { Request, Response, NextFunction } from "express";

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
export function validateUpdateStatusInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  validateQuery(UpdateStatusScheme)(req, res, next);
}
