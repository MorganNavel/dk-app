import { isStudent, isTeacher } from "@/utils/middlewares/role";
import { Router } from "express";
import { BookingController } from "./BookingController";
import { isSignedIn } from "@/utils/middlewares/auth";
import lessonRouter from "../lesson/LessonRouter";

const bookingRouter = Router();
/**
 * A student can book a lesson
 */
bookingRouter.post(
  "/:idLesson/booking/create",
  isSignedIn,
  isStudent,
  BookingController.createBooking
);
/**
 * A teacher can see all bookings for his lesson
 * A student can see all bookings for a lesson
 */
bookingRouter.get(
  "/:idLesson/booking/all",
  isSignedIn,
  BookingController.getAllBookings
);
/**
 * A student can see all his current bookings (future only and for any lessons)
 */
bookingRouter.get(
  "/booking/all",
  isSignedIn,
  isStudent,
  BookingController.getAllBookingsByStudent
);
/**
 * A student can delete (cancel) a booking
 */
bookingRouter.delete(
  "/:idLesson/booking/:idBooking/delete",
  isSignedIn,
  isStudent,
  BookingController.deleteBooking
);

lessonRouter.use("/", bookingRouter);

export default bookingRouter;
