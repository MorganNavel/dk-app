import { Lesson } from "@/models/LessonModel";
import { AppSession } from "@/types/Session";
import { STATUS_CODES } from "@/utils/statusCodes";
import { Request, Response } from "express";
import { LessonServices } from "./LessonServices";
export class LessonController {
  static async create(req: Request, res: Response) {
    const { title, description, duration, startDate } = req.body;
    const { idUser } = (req.session as AppSession).user;

    try {
      const lesson = await Lesson.create({
        title,
        description,
        duration,
        startDate,
        idTeacher: idUser,
      });
      /* TODO: 
        - Create an URL for the lesson (Google Meet, Zoom, etc.)      
      */
      return res
        .status(STATUS_CODES.CREATED)
        .json({ code: STATUS_CODES.CREATED, data: lesson.dataValues });
    } catch (error) {
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ code: STATUS_CODES.INTERNAL_SERVER_ERROR, error });
    }
  }
  static async update(req: Request, res: Response) {
    const session = req.session as AppSession;
    const idLesson = parseInt(req.params.idLesson);
    const { idUser } = session.user;
    const { startDate, duration, title, description, url, earned } = req.body;
    const anySelected =
      title || description || url || earned || startDate || duration;
    if (!anySelected)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ code: STATUS_CODES.BAD_REQUEST, error: "No field selected" });
    const response = await LessonServices.updateLesson(idUser!, idLesson, {
      startDate,
      duration,
      title,
      description,
      url,
      earned,
    });
    return res.status(response.code).json(response);
  }
  static async getAll(req: Request, res: Response) {
    const { idUser, role } = (req.session as AppSession).user;
    if (idUser && role !== "teacher") {
      const response = await LessonServices.getAllFromTeacher(idUser);
      return res.status(response.code).json(response);
    }
    const response = await LessonServices.getAll();
    return res.status(response.code).json(response);
  }
  static async getOne(req: Request, res: Response) {
    const { idUser } = (req.session as AppSession).user;
    const idLesson = parseInt(req.params.idLesson);
    const response = await LessonServices.getOne(idUser!, idLesson);
    return res.status(response.code).json(response);
  }

  static async updateStatus(req: Request, res: Response) {
    const { idUser } = (req.session as AppSession).user;
    const idLesson = parseInt(req.params.idLesson);
    const { status } = req.query;
    if (!status)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ code: STATUS_CODES.BAD_REQUEST, error: "No status selected" });
    const response = await LessonServices.updateLesson(idUser!, idLesson, {
      status,
    });
    return res.status(response.code).json(response);
  }

  static async delete(req: Request, res: Response) {
    const { idUser } = (req.session as AppSession).user;
    const idLesson = parseInt(req.params.idLesson);
    const response = await LessonServices.deleteLesson(idLesson, idUser!);
    return res.status(response.code).json(response);
  }
}
