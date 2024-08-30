import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "./statusCodes";
export function validateFields(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    console.log(req.body);
    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        code: STATUS_CODES.BAD_REQUEST,
        error: error.details[0].message,
      });
    }
    next();
  };
}
