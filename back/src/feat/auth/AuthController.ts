import { Request, Response } from "express";
import { AuthService } from "./AuthServices";
import { API_Response } from "@/types/Response";
import { AppSession } from "@/types/Session";
import { STATUS_CODES } from "@/utils/statusCodes";
const authServices = new AuthService();

export class AuthController {
  static async signIn(req: Request, res: Response) {
    const response = await authServices.signIn(req);
    return res.status(response.code).json(response);
  }

  static async signUp(req: Request, res: Response) {
    const session = req.session as AppSession;
    if (session.user) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        code: STATUS_CODES.BAD_REQUEST,
        error: "You are already signed in",
      });
    }
    const response: API_Response = await authServices.signUp(req);
    return res.status(response.code).json(response);
  }

  static async signOut(req: Request, res: Response) {
    const response: API_Response = await authServices.signOut(req, res);
    return res.status(response.code).json(response);
  }
}
