import { isStudent, isTeacher } from "@/utils/middlewares/role";
import { Router } from "express";
import { BookingController } from "./BookingController";
import { isSignedIn } from "@/utils/middlewares/auth";
import lessonRouter from "../lesson/LessonRouter";

const bookingRouter = Router();

bookingRouter.post(
  "/:idLesson/booking/create",
  isSignedIn,
  isStudent,
  BookingController.createBooking
);
bookingRouter.get(
  "/:idLesson/booking/all",
  isSignedIn,
  BookingController.getAllBookings
);
bookingRouter.get(
  "/booking/all",
  isSignedIn,
  isStudent,
  BookingController.getAllBookingsByStudent
);
bookingRouter.delete(
  "/:idLesson/booking/:idBooking/delete",
  isSignedIn,
  isStudent,
  BookingController.deleteBooking
);

lessonRouter.use("/", bookingRouter);

export default bookingRouter;
