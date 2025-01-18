import { ApiResponse } from "@/types/Response";
import { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/statusCodes";
import bcrypt from "bcrypt";
import { AppSession } from "@/types/Session";
import { User } from "@/models/UserModel";
import { ArrayToString, StringToArray } from "@/utils/helpers";

export class AuthService {
  /**
   * Create a new user
   * @param req Request - Body: contains all the user's information
   * @returns ApiResponse : { code: number, data?: any, error?: string }
   */
  static async signUp(req: Request): Promise<ApiResponse> {
    const {
      email,
      password,
      nationality,
      languages,
      firstname,
      name,
      links,
      description,
    } = req.body;

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
      return {
        code: STATUS_CODES.CREATED,
        data: { ...userWithoutPassword, languages, nationality },
      };
    } catch (error: any) {
      console.log(error);
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }

  /**
   * Sign in a user - create a user session
   * @param req Request - Body: contains the user's email and password
   * @returns
   */
  static async signIn(req: Request): Promise<ApiResponse> {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        return {
          code: STATUS_CODES.BAD_REQUEST,
          error: "Email or password incorrect",
        };
      }
      const { password_hash, nationality, languages, ...userWithoutPassword } =
        user.dataValues;
      const isMatch = await bcrypt.compare(password, password_hash);
      if (!isMatch) {
        return {
          code: STATUS_CODES.BAD_REQUEST,
          error: "Email or password incorrect",
        };
      }
      userWithoutPassword.languages = StringToArray(languages);
      userWithoutPassword.nationality = StringToArray(nationality);
      const session = req.session as AppSession;
      session.user = userWithoutPassword;
      console.log(req.session);
      return { code: STATUS_CODES.OK, data: userWithoutPassword };
    } catch (error: any) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }
  /**
   *
   * @param req Request - Session: contains the user's session
   * @param res Response
   * @returns ApiResponse : { code: number, data?: any, error?: string }
   */
  static async signOut(req: Request, res: Response): Promise<ApiResponse> {
    const session = req.session as AppSession;
    try {
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
    } catch (error: any) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }
}
