import { Request, Response } from "express";
import { AuthService } from "./AuthServices";
import { API_Response } from "@/types/Response";
import { AppSession } from "@/types/Session";
import { STATUS_CODES } from "@/utils/statusCodes";

export class AuthController {
  /**
   * Sign in a user - create a user session
   */
  static async signIn(req: Request, res: Response) {
    const response = await AuthService.signIn(req);
    return res.status(response.code).json(response);
  }
  /**
   * Sign up a user
   */
  static async signUp(req: Request, res: Response) {
    const session = req.session as AppSession;
    if (session.user) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        code: STATUS_CODES.BAD_REQUEST,
        error: "You are already signed in",
      });
    }
    const response: API_Response = await AuthService.signUp(req);
    return res.status(response.code).json(response);
  }
  /**
   * Sign out a user - destroy user session
   */
  static async signOut(req: Request, res: Response) {
    const response: API_Response = await AuthService.signOut(req, res);
    return res.status(response.code).json(response);
  }
}
