import { isStudent, isTeacher } from "@/utils/middlewares/role";
import { Router } from "express";
import { BookingController } from "./BookingController";
import { isSignedIn } from "@/utils/middlewares/auth";
import lessonRouter from "../lesson/LessonRouter";

const bookingRouter = Router();
/**
 * @openapi
 * /lesson/{idLesson}/booking:
 *   post:
 *     summary: Create a new booking
 *     description: Create a new booking
 *     tags:
 *       - Booking
 *     parameters:
 *      - $ref: '#/components/parameters/idLessonType'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/200'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '404':
 *         $ref: '#/components/responses/404'
 *       '500':
 *         $ref: '#/components/responses/500'
 */
bookingRouter.post(
  "/:idLesson/booking",
  isSignedIn,
  isStudent,
  BookingController.createBooking
);
/**
 * @openapi
 * /lesson/{idLesson}/booking/all:
 *   get:
 *     summary: Create a new booking
 *     description: Create a new booking
 *     tags:
 *       - Booking
 *     parameters:
 *      - $ref: '#/components/parameters/idLessonType'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/200'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '404':
 *         $ref: '#/components/responses/404'
 *       '500':
 *         $ref: '#/components/responses/500'
 */
bookingRouter.get(
  "/:idLesson/booking/all",
  isSignedIn,
  BookingController.getAllBookings
);
/**
 * @openapi
 * /booking/all:
 *   get:
 *     summary: Create a new booking
 *     description: Create a new booking
 *     tags:
 *       - Booking
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/200'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '404':
 *         $ref: '#/components/responses/404'
 *       '500':
 *         $ref: '#/components/responses/500'
 */
bookingRouter.get(
  "/booking/all",
  isSignedIn,
  isStudent,
  BookingController.getAllBookingsByStudent
);
/**
 * @openapi
 * /lesson/{idLesson}/booking/{idBooking}:
 *   delete:
 *     summary: Delete a booking
 *     description: Delete a booking
 *     tags:
 *       - Booking
 *     parameters:
 *      - $ref: '#/components/parameters/idLessonType'
 *      - $ref: '#/components/parameters/idBookingType'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/200'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '404':
 *         $ref: '#/components/responses/404'
 *       '500':
 *         $ref: '#/components/responses/500'
 */
bookingRouter.delete(
  "/:idLesson/booking/:idBooking",
  isSignedIn,
  isStudent,
  BookingController.deleteBooking
);

lessonRouter.use("/", bookingRouter);

export default bookingRouter;
