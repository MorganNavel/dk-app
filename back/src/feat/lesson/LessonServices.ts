import { Lesson } from "@/models/LessonModel";
import { API_Response } from "@/types/Response";
import { AppSession } from "@/types/Session";
import { STATUS_CODES } from "@/utils/statusCodes";
import { Request, Response } from "express";
import { Op } from "sequelize";
export class LessonServices {
  /**
   * Get all lessons from a teacher (future only)
   * @param idTeacher Teacher identification number (Teacher is a User)
   * @returns API_Response : { code: number, data?: any, error?: string }
   */
  static async getAllFromTeacher(idTeacher: number): Promise<API_Response> {
    try {
      const lessons = await Lesson.findAll({
        where: {
          idTeacher,
          startDate: {
            [Op.gte]: new Date(),
          },
        },
      });
      if (!lessons) return { code: STATUS_CODES.NOT_FOUND };
      return { code: STATUS_CODES.OK, data: lessons };
    } catch (error) {
      return { code: STATUS_CODES.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * Get all lessons (future only)
   * @returns API_Response : { code: number, data?: any, error?: string }
   */
  static async getAll() {
    try {
      const lessons = await Lesson.findAll({
        where: {
          startDate: {
            [Op.gte]: new Date(),
          },
        },
      });
      if (!lessons) return { code: STATUS_CODES.NOT_FOUND };
      return { code: STATUS_CODES.OK, data: lessons };
    } catch (error) {
      return { code: STATUS_CODES.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * Get a lesson from a teacher (future only)
   * @param idTeacher Teacher identification number (Teacher is a User)
   * @param idLesson Lesson identification number
   * @returns API_Response : { code: number, data?: any, error?: string }
   */
  static async getOne(
    idTeacher: number,
    idLesson: number
  ): Promise<API_Response> {
    try {
      const lesson = await LessonServices.getLessonWithTeacher(
        idTeacher,
        idLesson
      );
      if (!lesson) return { code: STATUS_CODES.NOT_FOUND };
      return { code: STATUS_CODES.OK, data: lesson };
    } catch (error) {
      return { code: STATUS_CODES.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * Delete a lesson
   * @param idLesson Lesson identification number
   * @param idTeacher Teacher identification number (Teacher is a User)
   * @returns API_Response : { code: number, data?: any, error?: string }
   */
  static async deleteLesson(
    idLesson: number,
    idTeacher: number
  ): Promise<API_Response> {
    try {
      const lesson = await Lesson.findByPk(idLesson);
      if (!lesson) return { code: STATUS_CODES.NOT_FOUND };
      if (lesson.dataValues.idTeacher !== idTeacher)
        return { code: STATUS_CODES.UNAUTHORIZED };
      lesson.destroy();
      return { code: STATUS_CODES.OK };
    } catch (error) {
      return { code: STATUS_CODES.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * Update fields of the given lesson
   * @param idTeacher Teacher identification number (Teacher is a User)
   * @param idLesson Lesson identification number
   * @param body Request body, fields to update
   * @returns API_Response : { code: number, data?: any, error?: string }
   */
  static async updateLesson(
    idTeacher: number,
    idLesson: number,
    body: any
  ): Promise<API_Response> {
    try {
      const lesson = await Lesson.findByPk(idLesson);
      if (!lesson) return { code: STATUS_CODES.INTERNAL_SERVER_ERROR };

      if (lesson.dataValues.idTeacher !== idTeacher) {
        return { code: STATUS_CODES.UNAUTHORIZED };
      }
      await lesson.update(body);
      return { code: STATUS_CODES.OK };
    } catch (error) {
      return { code: STATUS_CODES.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * Get a lesson from a teacher (future only)
   * @param idTeacher Teacher identification number (Teacher is a User)
   * @param idLesson Lesson identification number
   * @returns Lesson | undefined
   */
  private static async getLessonWithTeacher(
    idTeacher: number,
    idLesson: number
  ): Promise<Lesson | undefined> {
    const lesson = await Lesson.findOne({
      where: {
        idLesson,
        idTeacher,
        startDate: { [Op.gte]: new Date() },
      },
    });
    if (!lesson) {
      return;
    }
    return lesson.dataValues;
  }
}
