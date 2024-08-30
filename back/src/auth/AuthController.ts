import { Request, Response } from "express";
import { AuthService } from "./authServices";
import { API_Response } from "../types/Response";
const authServices = new AuthService();

export class AuthController {
  static async signIn(req: Request, res: Response) {
    const response = await authServices.signIn(req);
    return res.status(response.code).json(response);
  }

  static async signUp(req: Request, res: Response) {
    const response: API_Response = await authServices.signUp(req);
    return res.status(response.code).json(response);
  }

  static async signOut(req: Request, res: Response) {
    const response: API_Response = await authServices.signOut(req, res);
    return res.status(response.code).json(response);
  }
}
