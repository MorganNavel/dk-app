import { Router } from "express";
import { UserController } from "./UserController";
import { isSignedIn } from "@/utils/middlewares/auth";
import { isAdmin, isTeacher } from "@/utils/middlewares/role";
import { validateUpdateInput } from "./middlewares";
const userRouter = Router();
/**
 * @openapi
 * /user/{idUser}:
 *   get:
 *     summary: Get a user
 *     description: Get a user
 *     tags:
 *       - User
 *     parameters:
 *      - $ref: '#/components/parameters/idUserType'
 *     responses:
 *      '201':
 *        $ref: '#/components/responses/200'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '401':
 *        $ref: '#/components/responses/401'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
 *
 */
userRouter.get("/:idUser", UserController.getUserProfile);
/**
 * @openapi
 * /user/students:
 *  get:
 *   summary: Get all students of a teacher
 *   description: Get all students of a teacher
 *   tags:
 *    - User
 *   responses:
 *    '200':
 *      $ref: '#/components/responses/200'
 *    '400':
 *      $ref: '#/components/responses/400'
 *    '401':
 *      $ref: '#/components/responses/401'
 *    '404':
 *      $ref: '#/components/responses/404'
 *    '500':
 *      $ref: '#/components/responses/500'
 *
 */
userRouter.get(
  "/students",
  isSignedIn,
  isTeacher,
  UserController.getAllStudents
);
/**
 * @openapi
 * /user/teachers:
 *  get:
 *   summary: Get all teachers
 *   description: Get all teachers
 *   tags:
 *    - User
 *   responses:
 *    '200':
 *      $ref: '#/components/responses/200'
 *    '400':
 *      $ref: '#/components/responses/400'
 *    '401':
 *      $ref: '#/components/responses/401'
 *    '404':
 *      $ref: '#/components/responses/404'
 *    '500':
 *      $ref: '#/components/responses/500'
 *
 */
userRouter.get("/teachers", UserController.getAllTeachers);
/**
 * @openapi
 * /user/me:
 *  get:
 *   summary: Get my profile
 *   description: Get my profile
 *   tags:
 *    - User
 *   responses:
 *    '200':
 *      $ref: '#/components/responses/200'
 *    '400':
 *      $ref: '#/components/responses/400'
 *    '401':
 *      $ref: '#/components/responses/401'
 *    '404':
 *      $ref: '#/components/responses/404'
 *    '500':
 *      $ref: '#/components/responses/500'
 *
 */
userRouter.get("/me", isSignedIn, UserController.getMe);
/**
 * @openapi
 * /user/{idUser}:
 *   patch:
 *     summary: Delete a user
 *     description: Delete a user
 *     tags:
 *       - User
 *     parameters:
 *      - $ref: '#/components/parameters/idUserType'
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '401':
 *        $ref: '#/components/responses/401'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
 *
 */
userRouter.patch(
  "/:idUser",
  validateUpdateInput,
  isSignedIn,
  isAdmin,
  UserController.update
);
/**
 * @openapi
 * /user/{idUser}:
 *   patch:
 *     summary: Delete a user
 *     description: Delete a user
 *     tags:
 *       - User
 *     parameters:
 *      - $ref: '#/components/parameters/idUserType'
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '401':
 *        $ref: '#/components/responses/401'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
 *
 */
userRouter.patch(
  "/me",
  validateUpdateInput,
  isSignedIn,
  UserController.updateMe
);
/**
 * @openapi
 * /user/{idUser}:
 *   delete:
 *     summary: Update my profile
 *     description: Update my profile
 *     tags:
 *       - User
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
userRouter.delete("/:idUser", isSignedIn, isAdmin, UserController.delete);

export default userRouter;
