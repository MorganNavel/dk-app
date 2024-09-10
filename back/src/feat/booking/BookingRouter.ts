import { isStudent } from "@/utils/middlewares/role";
import { Router } from "express";
import { BookingController } from "./BookingController";
import { isSignedIn } from "@/utils/middlewares/auth";

const bookingRouter = Router();

bookingRouter.post(
  "/lesson/:idLesson/create",
  isSignedIn,
  isStudent,
  BookingController.createBooking
);
bookingRouter.get(
  "/lesson/:idLesson/all",
  isSignedIn,
  isStudent,
  BookingController.getAllBookings
);
bookingRouter.delete("/:idBooking/delete", BookingController.deleteBooking);

export default bookingRouter;
