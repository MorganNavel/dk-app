import { validateBody } from "@/utils/validation";
import { SignUpScheme, SignInScheme } from "./schemes";
import { Request, Response, NextFunction } from "express";

export function validateSignUpInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  validateBody(SignUpScheme)(req, res, next);
}

export function validateSignInInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  validateBody(SignInScheme)(req, res, next);
}
