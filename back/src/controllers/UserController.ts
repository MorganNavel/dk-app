import { Request, Response } from "express";

export class UserController {
  static getUser(req: Request, res: Response) {
    res.send("Hello World");
  }
}
