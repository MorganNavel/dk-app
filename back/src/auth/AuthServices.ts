import { API_Response } from "../types/Response";
import { Response, Request } from "express";
import { STATUT_CODES } from "../utils/codeStatus";
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
    return { code: STATUT_CODES.CREATED, data: { email, password } };
  }
}
