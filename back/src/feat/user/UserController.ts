import { Request, Response } from "express";
import { UserServices } from "./UserServices";
import { AppSession } from "@/types/Session";
import { STATUS_CODES } from "@/utils/statusCodes";
import { UserRole } from "@/models/UserModel";

const userServices = new UserServices();
export class UserController {
  public static async getAllStudents(req: Request, res: Response) {
    const response = await userServices.getAllStudents();
    return res.status(response.code).json(response);
  }

  public static async getAllTeachers(req: Request, res: Response) {
    /*
     TODO: - Filter teachers depending on user input
    */
    const response = await userServices.getAllTeachers();
    return res.status(response.code).json(response);
  }

  public static async getUserProfile(req: Request, res: Response) {
    if (!req.params.idUser) {
      const { email } = req.query;
      const response = await userServices.getUserProfile(email as string);
      return res.status(response.code).json(response);
    }
    const id = parseInt(req.params.id);
    const response = await userServices.getUserProfileById(id);
    return res.status(response.code).json(response);
  }
  public static async getMe(req: Request, res: Response) {
    const session = req.session as AppSession;
    return res
      .status(STATUS_CODES.OK)
      .json({ code: STATUS_CODES.OK, data: session.user });
  }

  public static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const response = await userServices.update(req.body, id);
    return res.status(response.code).json(response);
  }
  public static async updateMe(req: Request, res: Response) {
    const session = req.session as AppSession;
    const response = await userServices.update(req.body, session.user.idUser!!);
    return res.status(response.code).json(response);
  }

  public static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const response = await userServices.delete(id);
    return res.status(response.code).json(response);
  }
}
