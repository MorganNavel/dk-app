import { Booking } from "@/models/BookingModel";
import { Lesson } from "@/models/LessonModel";
import { User } from "@/models/UserModel";
import { ApiResponse } from "@/types/Response";
import { UserSession } from "@/types/Session";
import { STATUS_CODES } from "@/utils/statusCodes";
import { Op } from "sequelize";
export class LessonServices {
  /**
   * Get all lessons (future only)
   * @param idTeacher Teacher identification number (Teacher is a User)
   * @returns ApiResponse : { code: number, data?: any, error?: string }
   */
  static async getAll(idTeacher?: number): Promise<ApiResponse> {
    let query: any = {
      include: [
        { model: User, as: "teacher" },
        { model: Booking, as: "bookings" },
      ],
      where: {
        startDate: {
          [Op.gte]: Date.now(),
        },
      },
    };
    if (idTeacher) query.where["idTeacher"] = idTeacher;

    try {
      const lessons = await Lesson.findAll(query);
      if (!lessons) return { code: STATUS_CODES.NOT_FOUND };
      const lessonsClean = lessons.map((l: Lesson) => {
        const { url, earned, bookings, ...lesson } = l.dataValues;
        const { password_hash, nbLessons, links, ...teacher } =
          lesson.teacher.dataValues;
        lesson.teacher = teacher as User;
        lesson.nbParticipants = bookings.length;
        return lesson;
      });
      return { code: STATUS_CODES.OK, data: lessonsClean };
    } catch (error) {
      console.error(error);
      return { code: STATUS_CODES.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * Get a lesson from a teacher (future only)
   * @param idTeacher Teacher identification number (Teacher is a User)
   * @param idLesson Lesson identification number
   * @returns ApiResponse : { code: number, data?: any, error?: string }
   */
  static async getOne(
    idTeacher: number,
    idLesson: number
  ): Promise<ApiResponse> {
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
   * Delete multiple lessons
   * @param idLessons Array of lesson identification number
   * @param idTeacher Teacher identification number (Teacher is a User)
   * @returns ApiResponse : { code: number, data?: any, error?: string }
   */
  static async deleteLessons(
    idLessons: number[],
    teacher: UserSession
  ): Promise<ApiResponse> {
    try {
      // Récupérer les leçons appartenant au professeur
      const lessons = await Lesson.findAll({
        where: {
          idLesson: idLessons,
          idTeacher: teacher.idUser,
        },
      });

      // Vérifier si toutes les leçons existent et appartiennent au professeur
      if (lessons.length !== idLessons.length) {
        return { code: STATUS_CODES.NOT_FOUND };
      }

      // Suppression des leçons
      await Lesson.destroy({ where: { idLesson: idLessons } });

      return { code: STATUS_CODES.OK };
    } catch (error) {
      return { code: STATUS_CODES.INTERNAL_SERVER_ERROR };
    }
  }

  /**
   * Bulk update lessons
   * @param idTeacher Teacher identification number (Teacher is a User)
   * @param idLessons Array of Lesson identification numbers
   * @param body Request body, fields to update
   * @returns ApiResponse : { code: number, data?: any, error?: string }
   */
  static async updateLessons(
    teacher: UserSession,
    idLessons: number[],
    body: any
  ): Promise<ApiResponse> {
    try {
      // Validation : Vérifier que idLessons est un tableau non vide
      if (
        !Array.isArray(idLessons) ||
        idLessons.length === 0 ||
        idLessons.some((id) => typeof id !== "number")
      ) {
        return { code: STATUS_CODES.BAD_REQUEST };
      }

      // Récupérer les leçons à mettre à jour
      const lessons = await Lesson.findAll({
        where: { idLesson: idLessons },
      });

      if (lessons.length !== idLessons.length) {
        return { code: STATUS_CODES.NOT_FOUND };
      }

      const filteredBody = Object.fromEntries(
        Object.entries(body).filter(([_, value]) => value !== undefined)
      );

      if (Object.keys(filteredBody).length === 0) {
        return {
          code: STATUS_CODES.BAD_REQUEST,
          error: "No valid fields to update",
        };
      }

      if (filteredBody.startDate) {
        filteredBody.startDate = new Date(filteredBody.startDate as string);
      }

      await Lesson.update(filteredBody, {
        where: { idLesson: idLessons },
      });

      return { code: STATUS_CODES.OK };
    } catch (error) {
      console.error(error);
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
      };
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
  ): Promise<any> {
    const lesson = await Lesson.findByPk(idLesson, {
      include: [
        { model: User, as: "teacher" },
        { model: Booking, as: "bookings" },
      ],
    });

    if (!lesson) return;
    if (lesson.dataValues.idTeacher !== idTeacher) return;
    const { url, earned, bookings, ...cleanLesson } = lesson.dataValues;
    const { password_hash, nbLessons, links, ...teacher } =
      cleanLesson.teacher.dataValues;
    cleanLesson.teacher = teacher as User;
    cleanLesson.nbParticipants = bookings.length;

    return cleanLesson;
  }
}
