import { validateFields } from "../../utils/validation";
import { SignUpScheme, SignInScheme } from "../schemes/authValidators";
import { Request, Response, NextFunction } from "express";

export function validateSignUpInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  validateFields(SignUpScheme)(req, res, next);
}

export function validateSignInInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  validateFields(SignInScheme)(req, res, next);
}
