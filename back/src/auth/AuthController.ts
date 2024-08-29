import { Request, Response } from "express";
import { AuthService } from "./authServices";
const authServices = new AuthService();

export class AuthController {
  static getAuthUser(req: Request, res: Response) {
    res.send("Hello World");
  }
  static signIn(req: Request, res: Response) {}

  static async signUp(req: Request, res: Response) {
    return authServices.signup(req).then((response) => {
      res.status(response.code).send(response);
    });
  }
}
