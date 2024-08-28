import { Request, Response } from "express";

export class AuthController {
  static getAuthUser(req: Request, res: Response) {
    res.send("Hello World");
  }
}
