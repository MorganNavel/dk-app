import { validateBody } from "@/utils/validation";
import { CreateScheme, DeleteBulkScheme, UpdateScheme, UpdateStatusBulkScheme, UpdateStatusScheme } from "./schemes";
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
  validateBody(UpdateStatusScheme)(req, res, next);
}
export function validateUpdateStatusBulkInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  validateBody(UpdateStatusBulkScheme)(req, res, next);
}

export function validateDeleteBulk(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.body);
  validateBody(DeleteBulkScheme)(req, res, next);
}
