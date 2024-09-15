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
/**
 * @openapi
 * /lesson:
 *   post:
 *     summary: Create a new lesson
 *     description: Create a new lesson
 *     tags:
 *       - Lesson
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLessonInput'
 *     responses:
 *       '201':
 *         $ref: '#/components/responses/201'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '404':
 *         $ref: '#/components/responses/404'
 *       '500':
 *         $ref: '#/components/responses/500'
 */
lessonRouter.post(
  "/",
  isSignedIn,
  isTeacher,
  validateCreateInput,
  LessonController.create
);
/**
 * @openapi
 * /lesson/{idLesson}:
 *   patch:
 *     summary: Update a lesson
 *     description: Update a lesson
 *     tags:
 *       - Lesson
 *     parameters:
 *      - $ref: '#/components/parameters/idLessonType'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateLessonInput'
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
lessonRouter.patch(
  "/:idLesson",
  isSignedIn,
  isTeacher,
  validateUpdateInput,
  LessonController.update
);
/**
 * @openapi
 * /lesson/{idLesson}/status:
 *   patch:
 *     summary: Update a lesson
 *     description: Update a lesson
 *     tags:
 *       - Lesson
 *     parameters:
 *      - $ref: '#/components/parameters/idLessonType'
 *      - $ref: '#/components/parameters/UpdateStatusInput'
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
lessonRouter.patch(
  "/:idLesson/status",
  isSignedIn,
  isTeacher,
  validateUpdateStatusInput,
  LessonController.updateStatus
);
/**
 * @openapi
 * /lesson/all:
 *   get:
 *     summary: Get all lessons
 *     description: Get all lessons
 *     tags:
 *       - Lesson
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
lessonRouter.get("/all", LessonController.getAll);
/**
 * @openapi
 * /lesson/{idLesson}:
 *   get:
 *     summary: Get a lesson
 *     description: Get a lesson
 *     tags:
 *       - Lesson
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
lessonRouter.get("/:idLesson", isSignedIn, isTeacher, LessonController.getOne);
/**
 * @openapi
 * /lesson/{idLesson}:
 *   delete:
 *     summary: Delete a lesson
 *     description: Delete a lesson
 *     tags:
 *       - Lesson
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
lessonRouter.delete(
  "/:idLesson",
  isSignedIn,
  isTeacher,
  LessonController.delete
);

export default lessonRouter;
