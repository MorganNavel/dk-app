import joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateLessonInput:
 *       type: object
 *       example:
 *        title: "My lesson"
 *        description: "This is a lesson"
 *        duration: 50
 *        startDate: "2022-01-01"
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         duration:
 *           type: integer
 *         startDate:
 *           type: string
 */
export const CreateScheme = joi.object({
  title: joi.string().required(),
  description: joi.string(),
  duration: joi.number(),
  startDate: joi.date().greater("now").required(),
});
/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateLessonInput:
 *       type: object
 *       example:
 *        title: "My lesson"
 *        description: "This is a lesson"
 *        duration: 50
 *        startDate: "2022-01-01"
 *        earned: 100
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         duration:
 *           type: integer
 *         startDate:
 *           type: string
 *         earned:
 *           type: integer
 */
export const UpdateScheme = joi.object({
  title: joi.string(),
  description: joi.string(),
  duration: joi.number(),
  startDate: joi.date().greater("now"),
  earned: joi.number(),
});
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateLessonInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "My lesson"
 *         status:
 *           type: string
 *           enum:
 *             - "planned"
 *             - "done"
 *             - "cancelled"
 *           description: "The status of the lesson"
 *           example: "planned"
 *   parameters:
 *     StatusQueryParam:
 *       name: status
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *         enum:
 *           - "planned"
 *           - "done"
 *           - "cancelled"
 *         description: "The status of the lesson"
 *         example: "planned"
 */

export const UpdateStatusScheme = joi.object({
  status: joi.string().valid("planned", "done", "cancelled").required(),
});
