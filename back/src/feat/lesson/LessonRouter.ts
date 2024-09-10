import { Router } from "express";
import { LessonController } from "./LessonController";
import { isSignedIn } from "@/utils/middlewares/authMiddleware";
import { isTeacher } from "@/utils/middlewares/roleMiddlewares";

const lessonRouter = Router();

lessonRouter.post(
  "/create",
  isSignedIn,
  isTeacher,
  LessonController.createLesson
);

export default lessonRouter;
