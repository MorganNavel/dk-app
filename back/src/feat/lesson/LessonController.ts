import { Lesson } from "@/models/LessonModel";
import { AppSession } from "@/types/Session";
import { STATUS_CODES } from "@/utils/statusCodes";
import { Request, Response } from "express";
export class LessonController {
  static async create(req: Request, res: Response) {
    const { title, description, duration, startDate } = req.body;
    const session = req.session as AppSession;
    const idTeacher = session.user;
    try {
      const lesson = await Lesson.create({
        title,
        description,
        duration,
        startDate,
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
    const { idUser } = session.user;
    const { startDate, duration, title, description, url, earned } = req.body;
    const anySelected =
      title || description || url || earned || startDate || duration;
    if (!anySelected)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ code: STATUS_CODES.BAD_REQUEST, error: "No field selected" });
    try {
      const lesson = await Lesson.findByPk(idLesson);
      if (!lesson)
        return res
          .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ code: STATUS_CODES.INTERNAL_SERVER_ERROR });

      console.log(lesson.dataValues.idTeacher, idUser);
      if (lesson.dataValues.idTeacher !== idUser) {
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
  static async getAll(req: Request, res: Response) {
    const { idUser } = (req.session as AppSession).user;
    try {
      const lessons = await Lesson.findAll({ where: { idTeacher: idUser } });
      if (!lessons)
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ code: STATUS_CODES.NOT_FOUND });
      return res
        .status(STATUS_CODES.OK)
        .json({ code: STATUS_CODES.OK, data: lessons });
    } catch (error) {
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ code: STATUS_CODES.INTERNAL_SERVER_ERROR });
    }
  }
  static async getOne(req: Request, res: Response) {
    try {
      const lesson = await LessonController.getLessonWithTeacher(req, res);
      return res
        .status(STATUS_CODES.OK)
        .json({ code: STATUS_CODES.OK, data: lesson });
    } catch (error) {
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ code: STATUS_CODES.INTERNAL_SERVER_ERROR });
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const lesson = await LessonController.getLessonWithTeacher(req, res);
      if (!lesson) return;
      lesson.update({ status: req.query.status });
      return res.json({ code: STATUS_CODES.OK });
    } catch (error) {
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ code: STATUS_CODES.INTERNAL_SERVER_ERROR });
    }
  }

  static async delete(req: Request, res: Response) {
    const { idUser } = (req.session as AppSession).user;
    const idLesson = parseInt(req.params.idLesson);
    try {
      const lesson = await Lesson.findByPk(idLesson);
      if (!lesson)
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ code: STATUS_CODES.NOT_FOUND });
      if (lesson.dataValues.idTeacher !== idUser)
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ code: STATUS_CODES.UNAUTHORIZED });
      lesson.destroy();
      return res.status(STATUS_CODES.OK).json({ code: STATUS_CODES.OK });
    } catch (error) {
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ code: STATUS_CODES.INTERNAL_SERVER_ERROR });
    }
  }

  private static async getLessonWithTeacher(
    req: Request,
    res: Response
  ): Promise<Lesson | undefined> {
    const { idUser } = (req.session as AppSession).user;
    const idLesson = parseInt(req.params.idLesson);
    const lesson = await Lesson.findOne({
      where: { idLesson, idTeacher: idUser },
    });
    if (!lesson) {
      res.status(STATUS_CODES.NOT_FOUND).json({ code: STATUS_CODES.NOT_FOUND });
      return;
    }
    return lesson;
  }
}
