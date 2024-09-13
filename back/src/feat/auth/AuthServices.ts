import { API_Response } from "@/types/Response";
import { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/statusCodes";
import bcrypt from "bcrypt";
import { AppSession } from "@/types/Session";
import { User } from "@/models/UserModel";
import { ArrayToString } from "@/utils/helpers";

export class AuthService {
  /**
   * Create a new user
   * @param req Request - Body: contains all the user's information
   * @returns API_Response : { code: number, data?: any, error?: string }
   */
  static async signUp(req: Request): Promise<API_Response> {
    const {
      email,
      password,
      confirmPassword,
      nationality,
      languages,
      firstname,
      name,
      links,
      description,
    } = req.body;

    if (password !== confirmPassword) {
      return {
        code: STATUS_CODES.BAD_REQUEST,
        error: "Passwords don't match",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({
        email,
        firstname,
        name,
        password_hash: hashedPassword,
        nationality: ArrayToString(nationality),
        languages: ArrayToString(languages),
        description,
        links,
      });
      const { password_hash, ...userWithoutPassword } = user.dataValues;
      return { code: STATUS_CODES.CREATED, data: userWithoutPassword };
    } catch (error: any) {
      return {
        code: STATUS_CODES.BAD_REQUEST,
        error: error,
      };
    }
  }

  /**
   * Sign in a user - create a user session
   * @param req Request - Body: contains the user's email and password
   * @returns
   */
  static async signIn(req: Request): Promise<API_Response> {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        return {
          code: STATUS_CODES.BAD_REQUEST,
          error: "Email or password is incorrect",
        };
      }
      const { password_hash, ...userWithoutPassword } = user.dataValues;
      const isMatch = await bcrypt.compare(password, password_hash);
      if (!isMatch) {
        return {
          code: STATUS_CODES.BAD_REQUEST,
          error: "Email or password is incorrect",
        };
      }
      const session = req.session as AppSession;
      session.user = userWithoutPassword;
      return { code: STATUS_CODES.OK, data: userWithoutPassword };
    } catch (error: any) {
      return {
        code: STATUS_CODES.BAD_REQUEST,
        error: error,
      };
    }
  }
  /**
   *
   * @param req Request - Session: contains the user's session
   * @param res Response
   * @returns API_Response : { code: number, data?: any, error?: string }
   */
  static async signOut(req: Request, res: Response): Promise<API_Response> {
    const session = req.session as AppSession;

    session.destroy((err) => {
      if (!err) res.clearCookie("sid");
    });
    if ((req.session as AppSession)?.user) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: "Error while signing out",
      };
    }
    return {
      code: STATUS_CODES.OK,
    };
  }
}
