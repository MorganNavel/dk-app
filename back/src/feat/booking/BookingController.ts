import { Booking } from "@/models/BookingModel";
import { Lesson } from "@/models/LessonModel";
import { AppSession } from "@/types/Session";
import { STATUS_CODES } from "@/utils/statusCodes";
import { Response, Request } from "express";

export class BookingController {
  static async createBooking(req: Request, res: Response) {
    const { idLesson } = req.params;
    const session = req.session as AppSession;
    const { idUser } = session.user;

    const { startDate, duration, tarif } = req.body;

    try {
      const lesson = await Lesson.findByPk(idLesson);
      if (!lesson) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ code: STATUS_CODES.BAD_REQUEST });
      }
      const booking = await Booking.create({
        startDate,
        duration,
        tarif,
        idUser,
      });
      return res
        .status(STATUS_CODES.CREATED)
        .json({ code: STATUS_CODES.CREATED, data: booking.dataValues });
    } catch (error) {
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ code: STATUS_CODES.INTERNAL_SERVER_ERROR, error });
    }
  }
  static async getAllBookings(req: Request, res: Response) {
    const { idLesson } = req.params;
    try {
      const lesson = await Lesson.findByPk(idLesson, {
        include: [{ model: Booking, as: "bookings" }],
      });
      if (!lesson) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ code: STATUS_CODES.BAD_REQUEST });
      }
      return res
        .status(STATUS_CODES.OK)
        .json({ code: STATUS_CODES.OK, data: lesson.dataValues.bookins });
    } catch (error) {
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ code: STATUS_CODES.INTERNAL_SERVER_ERROR, error });
    }
  }
  static async deleteBooking(req: Request, res: Response) {
    const { idBooking } = req.params;
    try {
      const booking = await Booking.findByPk(idBooking);
      if (!booking) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ code: STATUS_CODES.BAD_REQUEST });
      }
      await booking.destroy();
      return res.status(STATUS_CODES.OK).json({ code: STATUS_CODES.OK });
    } catch (error) {
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ code: STATUS_CODES.INTERNAL_SERVER_ERROR, error });
    }
  }
}
