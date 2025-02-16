import { Booking } from "@/models/BookingModel";
import { Lesson } from "@/models/LessonModel";
import { User } from "@/models/UserModel";
import { ApiResponse } from "@/types/Response";
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
      console.log("lesson", lesson);
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
   * @returns ApiResponse : { code: number, data?: any, error?: string }
   */
  static async deleteLesson(
    idLesson: number,
    idTeacher: number
  ): Promise<ApiResponse> {
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
   * @returns ApiResponse : { code: number, data?: any, error?: string }
   */
  static async updateLesson(
    idTeacher: number,
    idLesson: number,
    body: any
  ): Promise<ApiResponse> {
    try {
      const lesson = await Lesson.findByPk(idLesson);
      if (!lesson) return { code: STATUS_CODES.INTERNAL_SERVER_ERROR };

      if (lesson.dataValues.idTeacher !== idTeacher) {
        return { code: STATUS_CODES.UNAUTHORIZED };
      }
      const filteredBody = Object.fromEntries(
        Object.entries(body).filter(([_, value]) => value !== undefined)
      );

      if (Object.keys(filteredBody).length > 0) {
        if (filteredBody.startDate) {
          filteredBody.startDate = new Date(filteredBody.startDate as string);
        }

        await lesson.update(filteredBody);
      }
      return { code: STATUS_CODES.OK };
    } catch (error) {
      console.error(error);
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error as string,
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
