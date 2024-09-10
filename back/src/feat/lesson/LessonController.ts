import { Lesson } from "@/models/LessonModel";
import { AppSession } from "@/types/Session";
import { STATUS_CODES } from "@/utils/statusCodes";
import { Request, Response } from "express";
export class LessonController {
  static async create(req: Request, res: Response) {
    const { title, description, price, duration, idTeacher } = req.body;
    try {
      const lesson = await Lesson.create({
        title,
        description,
        price,
        duration,
        idTeacher,
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
    const idUser = session.user;
    const { startDate, duration } = req.body;
    try {
      const lesson = await Lesson.findByPk(idLesson);
      if (!lesson)
        return res
          .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ code: STATUS_CODES.INTERNAL_SERVER_ERROR });

      if (lesson?.dataValues.idTeacher !== idUser) {
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ code: STATUS_CODES.UNAUTHORIZED });
      }
      await lesson.update({ startDate, duration });
      return res.status(STATUS_CODES.OK).json({ code: STATUS_CODES.OK });
    } catch (error) {
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ code: STATUS_CODES.INTERNAL_SERVER_ERROR });
    }
  }
}
