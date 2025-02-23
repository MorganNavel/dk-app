import { Lesson } from "@/models/LessonModel";
import { AppSession } from "@/types/Session";
import { STATUS_CODES } from "@/utils/statusCodes";
import { Request, Response } from "express";
import { LessonServices } from "./LessonServices";
import { hasPermission } from "@/utils/middlewares/permissions";
export class LessonController {
  /**
   * Create a new lesson
   */
  static async create(req: Request, res: Response) {
    const { title, description, duration, startDate } = req.body;
    const { user } = req.session as AppSession;
    const { idUser } = user;
    if (!hasPermission(user, "lessons", "create")) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ code: STATUS_CODES.UNAUTHORIZED });
    }

    try {
      const lesson = await Lesson.create({
        title,
        description,
        duration,
        startDate: new Date(startDate),
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
  /**
   * Update a lesson with the given fields in the body
   */
  static async update(req: Request, res: Response) {
    const session = req.session as AppSession;
    const idLesson = parseInt(req.params.idLesson);
    const { user } = session;
    const { startDate, duration, title, description, url, earned } = req.body;
    const anySelected =
      title || description || url || earned || startDate || duration;
    if (!anySelected)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ code: STATUS_CODES.BAD_REQUEST, error: "No field selected" });
    const response = await LessonServices.updateLessons(user, [idLesson], {
      startDate,
      duration,
      title,
      description,
      url,
      earned,
    });
    return res.status(response.code).json(response);
  }
  /**
   * Get all lessons depending on the user's role
   */
  static async getAll(req: Request, res: Response) {
    const user = (req.session as AppSession).user;

    const idTeacher = user && user.role === "teacher" ? user.idUser : undefined;

    const response = await LessonServices.getAll(idTeacher);
    return res.status(response.code).json(response);
  }
  /**
   * Get the lesson with the given id
   */
  static async getOne(req: Request, res: Response) {
    const { user } = req.session as AppSession;
    if (!hasPermission(user, "lessons", "read")) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ code: STATUS_CODES.UNAUTHORIZED });
    }

    const idLesson = parseInt(req.params.idLesson);
    const response = await LessonServices.getOne(user.idUser, idLesson);
    return res.status(response.code).json(response);
  }
  /**
   * Update the status of the lesson (planned, done, cancelled)
   */
  static async updateStatus(req: Request, res: Response) {
    const { user } = req.session as AppSession;
    const idLesson = parseInt(req.params.idLesson);
    const { status } = req.body;
    if (!status)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ code: STATUS_CODES.BAD_REQUEST, error: "No status selected" });
    const response = await LessonServices.updateLessons(user, [idLesson], {
      status,
    });
    return res.status(response.code).json(response);
  }
  /**
   * Update the status of the lesson (planned, done, cancelled)
   */
  static async updateStatusBulk(req: Request, res: Response) {
    const { user } = req.session as AppSession;
    const { idLessons, status } = req.body;
    if (!Array.isArray(idLessons) || idLessons.length == 0) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ code: STATUS_CODES.BAD_REQUEST, error: "Invalid lesson IDs" });
    }
    if (!status)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ code: STATUS_CODES.BAD_REQUEST, error: "No status selected" });
    const response = await LessonServices.updateLessons(user, idLessons, {
      status,
    });
    return res.status(response.code).json(response);
  }

  /**
   * Delete a single lesson
   */
  static async deleteOne(req: Request, res: Response) {
    try {
      const { user } = req.session as AppSession;
      const idLesson = parseInt(req.params.idLesson, 10);

      if (Number.isNaN(idLesson)) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ code: STATUS_CODES.BAD_REQUEST, error: "Invalid lesson ID" });
      }

      const response = await LessonServices.deleteLessons([idLesson], user);
      return res.status(response.code).json(response);
    } catch (error) {
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: "An error occurred",
      });
    }
  }

  /**
   * Delete multiple lessons
   */
  static async deleteBulk(req: Request, res: Response) {
    try {
      const { user } = req.session as AppSession;
      const { idLessons } = req.body;

      if (!Array.isArray(idLessons) || idLessons.length === 0) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          code: STATUS_CODES.BAD_REQUEST,
          error: "Invalid lesson IDs",
        });
      }

      const response = await LessonServices.deleteLessons(idLessons, user);
      return res.status(response.code).json(response);
    } catch (error) {
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: "An error occurred",
      });
    }
  }
}
