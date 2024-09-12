import { Booking } from "@/models/BookingModel";
import { Lesson } from "@/models/LessonModel";
import { API_Response } from "@/types/Response";
import { STATUS_CODES } from "@/utils/statusCodes";
import { Op } from "sequelize";

export class BookingServices {
  /**
   * Create a booking for a lesson
   * @param idUser User identification number
   * @param idLesson Lesson identification number
   * @returns API_Response : { code: number, data?: any, error?: string }
   */
  static async createBooking(
    idUser: number,
    idLesson: number
  ): Promise<API_Response> {
    try {
      const lesson = await Lesson.findByPk(idLesson, {
        include: [{ model: Booking, as: "bookings" }],
      });
      if (!lesson) {
        return { code: STATUS_CODES.NOT_FOUND };
      }
      const bookings = lesson.dataValues.bookings;

      if (bookings.length >= lesson.dataValues.groupSize) {
        return {
          code: STATUS_CODES.INTERNAL_SERVER_ERROR,
          error: "Lesson full",
        };
      }

      const booking = await Booking.create({
        startDate: lesson.dataValues.startDate,
        duration: lesson.dataValues.duration,
        tarif: 0,
        idUser,
        idLesson,
      });
      return { code: STATUS_CODES.CREATED, data: booking.dataValues };
    } catch (error) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error as string,
      };
    }
  }
  /**
   * Get all bookings for a lesson
   * @param idUser User identification number
   * @param role User's role (teacher, student or admin)
   * @param idLesson Lesson identification number
   * @returns API_Response : { code: number, data?: any, error?: string }
   */
  static async getAllBookings(
    idUser: number,
    role: string,
    idLesson: number
  ): Promise<API_Response> {
    return this.getAllBookingsByLesson(idUser, idLesson, role);
  }
  /**
   * Get all the bookings for a lesson
   * @param idUser User identification number
   * @param idLesson Lesson identification number
   * @returns API_Response : { code: number, data?: any, error?: string }
   */
  private static async getAllBookingsTeacher(
    idUser: number,
    idLesson: number
  ): Promise<API_Response> {
    try {
      const lesson = await Lesson.findOne({
        where: {
          idLesson,
          idTeacher: idUser,
          startDate: {
            [Op.gte]: Date.now(),
          },
        },
        include: [{ model: Booking, as: "bookings" }],
      });
      if (!lesson) {
        return { code: STATUS_CODES.BAD_REQUEST };
      }
      console.log(lesson.dataValues);
      let bookings = lesson.dataValues.bookings.map(
        (booking: Booking) => booking.dataValues
      );
      return { code: STATUS_CODES.OK, data: bookings };
    } catch (error) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error as string,
      };
    }
  }
  /**
   * Get all the bookings for a lesson
   * @param idUser User identification number
   * @param idLesson Lesson identification number
   * @param role User's role (teacher, student or admin)
   * @returns API_Response : { code: number, data?: any, error?: string }
   */
  static async getAllBookingsByLesson(
    idUser: number,
    idLesson: number,
    role: string
  ): Promise<API_Response> {
    switch (role) {
      case "teacher":
        const response = await this.getAllBookingsTeacher(idUser, idLesson);
        return response;
      case "student":
        const bookings = await Booking.findAll({
          where: {
            idUser,
            idLesson,
            startDate: {
              [Op.gte]: Date.now(),
            },
          },
        });
        return { code: STATUS_CODES.OK, data: bookings };
      default:
        return { code: STATUS_CODES.BAD_REQUEST };
    }
  }

  /**
   * Get all the bookings
   * @param idUser User identification number
   * @returns API_Response : { code: number, data?: any, error?: string }
   */
  static async getAllBookingsByStudent(idUser: number): Promise<API_Response> {
    try {
      const bookingsFetched = await Booking.findAll({
        include: { model: Lesson, as: "lesson" },
        where: {
          idUser: idUser,
        },
      });

      let bookings = bookingsFetched.filter(
        (booking: Booking) => booking.dataValues.lesson.startDate <= new Date()
      );
      let bookingsFinal = bookings.map((booking: Booking) => {
        let lesson = booking.dataValues.lesson;
        lesson["earned"] = undefined;
        lesson["url"] = undefined;
        return { ...booking.dataValues, lesson };
      });
      return { code: STATUS_CODES.OK, data: bookingsFinal };
    } catch (error) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error as string,
      };
    }
  }
  /**
   * Delete a booking - only the student who booked the lesson can delete it
   * @param idUser User identification number
   * @param idLesson User identification number
   * @param idBooking Booking identification number
   * @returns API_Response : { code: number, data?: any, error?: string }
   */
  static async deleteBooking(
    idUser: number,
    idLesson: number,
    idBooking: number
  ): Promise<API_Response> {
    try {
      const booking = await Booking.findByPk(idBooking);
      if (!booking) {
        return { code: STATUS_CODES.BAD_REQUEST };
      }
      const isUnauthorized =
        booking.dataValues.idUser !== idUser ||
        booking.dataValues.idLesson !== idLesson;
      if (isUnauthorized) {
        return { code: STATUS_CODES.UNAUTHORIZED };
      }
      await booking.destroy();
      return { code: STATUS_CODES.OK };
    } catch (error) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error as string,
      };
    }
  }
}
