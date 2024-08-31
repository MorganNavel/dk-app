import { AppSession } from "@/types/Session";
import { Request, Response, NextFunction } from "express";
function isTeacher(req: Request, res: Response, next: NextFunction) {
  const session = req.session as AppSession;
  if (session.user.role !== "teacher") {
    return res.status(401).json({
      code: 401,
      error: "Unauthorized",
    });
  }
}

function isStudent(req: Request, res: Response, next: NextFunction) {
  const session = req.session as AppSession;
  if (session.user.role !== "student") {
    return res.status(401).json({
      code: 401,
      error: "Unauthorized",
    });
  }
}

function isAdmin(req: Request, res: Response, next: NextFunction) {
  const session = req.session as AppSession;
  if (session.user.role !== "admin") {
    return res.status(401).json({
      code: 401,
      error: "Unauthorized",
    });
  }
}

export { isTeacher, isStudent, isAdmin };
