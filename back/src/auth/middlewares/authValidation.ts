import { validateFields } from "../../utils/validation";
import { SignUpScheme } from "../schemes/authValidators";
import { Request, Response, NextFunction } from "express";

function validateSignUpInput(req: Request, res: Response, next: NextFunction) {
  validateFields(SignUpScheme)(req, res, next);

  return next();
}
