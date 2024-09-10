import { Router } from "express";
import { LessonController } from "./LessonController";
import { isSignedIn } from "@/utils/middlewares/auth";
import { isTeacher } from "@/utils/middlewares/role";
import {
  validateCreateInput,
  validateUpdateInput,
  validateUpdateStatusInput,
} from "./middlewares";

const lessonRouter = Router();

lessonRouter.post(
  "/create",
  isSignedIn,
  isTeacher,
  validateCreateInput,
  LessonController.create
);

lessonRouter.patch(
  "/:idLesson",
  isSignedIn,
  isTeacher,
  validateUpdateInput,
  LessonController.update
);
lessonRouter.patch(
  "/:idLesson/status",
  isSignedIn,
  isTeacher,
  validateUpdateStatusInput,
  LessonController.updateStatus
);
lessonRouter.get("/all", isSignedIn, isTeacher, LessonController.getAll);
lessonRouter.get("/:idLesson", isSignedIn, isTeacher, LessonController.getOne);

lessonRouter.delete(
  "/:idLesson/delete",
  isSignedIn,
  isTeacher,
  LessonController.delete
);

export default lessonRouter;
