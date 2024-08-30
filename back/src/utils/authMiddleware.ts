import { Request, Response, NextFunction } from "express";
import { AppSession } from "../types/Session";
import { STATUS_CODES } from "./statusCodes";
export function isSignedIn(req: Request, res: Response, next: NextFunction) {
  const session = req.session as AppSession;
  if (!session.user) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      code: STATUS_CODES.UNAUTHORIZED,
      error: "Unauthorized",
    });
  }
  next();
}
