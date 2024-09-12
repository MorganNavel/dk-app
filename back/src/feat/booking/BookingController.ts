import { Booking } from "@/models/BookingModel";
import { AppSession } from "@/types/Session";
import { STATUS_CODES } from "@/utils/statusCodes";
import { Response, Request } from "express";
import { BookingServices } from "./BookingServices";

export class BookingController {
  static async createBooking(req: Request, res: Response) {
    const idLesson = parseInt(req.params.idLesson);
    const session = req.session as AppSession;
    const { idUser } = session.user;
    const response = await BookingServices.createBooking(idUser!, idLesson);
    return res.status(response.code).json(response);
  }

  static async getAllBookings(req: Request, res: Response) {
    const idLesson = parseInt(req.params.idLesson);
    const { idUser, role } = (req.session as AppSession).user;
    if (!idLesson)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ code: STATUS_CODES.BAD_REQUEST });
    const response = await BookingServices.getAllBookingsByLesson(
      idUser,
      idLesson,
      role
    );
    return res.status(response.code).json(response);
  }
  static async getAllBookingsByStudent(req: Request, res: Response) {
    const { idUser } = (req.session as AppSession).user;
    const response = await BookingServices.getAllBookingsByStudent(idUser);
    return res.status(response.code).json(response);
  }
  static async deleteBooking(req: Request, res: Response) {
    const { idBooking, idLesson } = req.params;
    const { idUser } = (req.session as AppSession).user;
    try {
      const booking = await Booking.findByPk(parseInt(idBooking));
      if (!booking) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ code: STATUS_CODES.BAD_REQUEST });
      }
      const isUnauthorized =
        booking.dataValues.idUser !== idUser ||
        booking.dataValues.idLesson !== parseInt(idLesson);
      if (isUnauthorized) {
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ code: STATUS_CODES.UNAUTHORIZED });
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
