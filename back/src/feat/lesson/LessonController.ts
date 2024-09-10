import { Lesson } from "@/models/LessonModel";
import { STATUS_CODES } from "@/utils/statusCodes";
import { Request, Response } from "express";
export class LessonController {
  static async createLesson(req: Request, res: Response) {
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
}
