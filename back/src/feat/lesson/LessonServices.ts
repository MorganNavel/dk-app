import { Lesson } from "@/models/LessonModel";
import { API_Response } from "@/types/Response";
import { AppSession } from "@/types/Session";
import { STATUS_CODES } from "@/utils/statusCodes";
import { Request, Response } from "express";
import { Op } from "sequelize";
export class LessonServices {
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
  static async getOne(idUser: number, idLesson: number): Promise<API_Response> {
    try {
      const lesson = await LessonServices.getLessonWithTeacher(
        idUser,
        idLesson
      );
      if (!lesson) return { code: STATUS_CODES.NOT_FOUND };
      return { code: STATUS_CODES.OK, data: lesson };
    } catch (error) {
      return { code: STATUS_CODES.INTERNAL_SERVER_ERROR };
    }
  }
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
  static async updateLesson(
    idUser: number,
    idLesson: number,
    body: any
  ): Promise<API_Response> {
    try {
      const lesson = await Lesson.findByPk(idLesson);
      if (!lesson) return { code: STATUS_CODES.INTERNAL_SERVER_ERROR };

      if (lesson.dataValues.idTeacher !== idUser) {
        return { code: STATUS_CODES.UNAUTHORIZED };
      }
      await lesson.update(body);
      return { code: STATUS_CODES.OK };
    } catch (error) {
      return { code: STATUS_CODES.INTERNAL_SERVER_ERROR };
    }
  }
  private static async getLessonWithTeacher(
    idUser: number,
    idLesson: number
  ): Promise<Lesson | undefined> {
    const lesson = await Lesson.findOne({
      where: { idLesson, idTeacher: idUser },
    });
    if (!lesson) {
      return;
    }
    return lesson.dataValues;
  }
}
