import { Request, Response, NextFunction } from "express";
import { STATUT_CODES } from "./codeStatus";
export function validateFields(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(STATUT_CODES.BAD_REQUEST).json({
        code: STATUT_CODES.BAD_REQUEST,
        error: error.details[0].message,
      });
    }
    next();
  };
}
