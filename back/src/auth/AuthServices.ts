import { API_Response } from "../types/Response";
import { Request } from "express";
import { User } from "../storage/initDb";
import { STATUT_CODES } from "../utils/statusCode";

export class AuthService {
  static instance: AuthService;
  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }
    AuthService.instance = this;
  }
  async signup(req: Request): Promise<API_Response> {
    const {
      email,
      password,
      confirmPassword,
      nationality,
      languages,
      firstname,
      name,
      description,
    } = req.body;

    if (!email || !password || !confirmPassword) {
      return { code: STATUT_CODES.BAD_REQUEST, error: "Missing fields" };
    }

    if (password !== confirmPassword) {
      return {
        code: STATUT_CODES.BAD_REQUEST,
        error: "Passwords don't match",
      };
    }

    User.create({
      email,
      password,
      firstname,
      name,
      nationality,
      languages,
      description,
    });

    return { code: STATUT_CODES.CREATED, data: { email, password } };
  }
}
