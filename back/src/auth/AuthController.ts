import { Request, Response } from "express";
import { AuthService } from "./authServices";

export class AuthController {
  authServices = new AuthService();

  static getAuthUser(req: Request, res: Response) {
    res.send("Hello World");
  }
  static signIn(req: Request, res: Response) {}

  static signUp(req: Request, res: Response) {}
}
