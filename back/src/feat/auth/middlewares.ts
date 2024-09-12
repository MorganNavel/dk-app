import { validateBody } from "@/utils/validation";
import { SignUpScheme, SignInScheme } from "./schemes";
import { Request, Response, NextFunction } from "express";
/**
 * Middleware: Validate the sign up input
 * @param req Request
 * @param res Response
 * @param next NextFunction - Go to the next middleware
 */
export function validateSignUpInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  validateBody(SignUpScheme)(req, res, next);
}
/**
 * Middleware: Validate the sign in input
 * @param req Request
 * @param res Response
 * @param next NextFunction - Go to the next middleware
 */
export function validateSignInInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  validateBody(SignInScheme)(req, res, next);
}
