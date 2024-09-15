import joi from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     CreatePricingInput:
 *       type: object
 *       required:
 *        - currency
 *        - price
 *        - nbLessons
 *       example:
 *        currency: "USD"
 *        price: 19.99
 *        nbLessons: 4
 *       properties:
 *         currency:
 *           type: string
 *         price:
 *           type: integer
 *         nbLessons:
 *           type: integer
 */
export const CreateScheme = joi.object({
  currency: joi.string().required(),
  price: joi.number().required(),
  nbLessons: joi.number().min(1).default(1).required(),
});
/**
 * @openapi
 * components:
 *   schemas:
 *     UpdatePricingInput:
 *       type: object
 *       example:
 *        currency: "USD"
 *        price: 19.99
 *        nbLessons: 4
 *       properties:
 *         currency:
 *           type: string
 *         price:
 *           type: integer
 *         nbLessons:
 *           type: integer
 */
export const UpdateScheme = joi.object({
  currency: joi.string(),
  price: joi.number(),
  nbLessons: joi.number().min(1),
});
