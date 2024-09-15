import { Router } from "express";
import { PricingController } from "./PricingController";
import { isStudent, isTeacher } from "@/utils/middlewares/role";
import { isSignedIn } from "@/utils/middlewares/auth";
import { validateCreateInput, validateUpdateInput } from "./middlewares";

const pricingRouter = Router();
/**
 * @openapi
 * /pricing/all:
 *   get:
 *     summary: Get all pricings
 *     description: Get all pricings
 *     tags:
 *       - Pricing
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
pricingRouter.get("/all", PricingController.getAll);
/**
 * @openapi
 * /pricing/{idPricing}:
 *   get:
 *     summary: Get a pricing
 *     description: Get a pricing
 *     tags:
 *       - Pricing
 *     parameters:
 *      - $ref: '#/components/parameters/idPricingType'
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
pricingRouter.get("/:idPricing", PricingController.getOne);
/**
 * @openapi
 * /pricing:
 *   post:
 *     summary: Create a pricing
 *     description: Create a pricing
 *     tags:
 *       - Pricing
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePricingInput'
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
pricingRouter.post(
  "/",
  isSignedIn,
  isTeacher,
  validateCreateInput,
  PricingController.create
);
/**
 * @openapi
 * /lesson/{idLesson}/buy:
 *   post:
 *     summary: Update a lesson
 *     description: Update a lesson
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
pricingRouter.post(
  "/:idPricing/buy",
  isSignedIn,
  isStudent,
  PricingController.buy
);
/**
 * @openapi
 * /pricing/{idPricing}:
 *   patch:
 *     summary: Update a pricing
 *     description: Update a pricing
 *     tags:
 *       - Pricing
 *     parameters:
 *      - $ref: '#/components/parameters/idPricingType'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePricingInput'
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
pricingRouter.patch(
  "/:idPricing",
  isSignedIn,
  isTeacher,
  validateUpdateInput,
  PricingController.update
);
/**
 * @openapi
 * /pricing/{idPricing}:
 *   delete:
 *     summary: Delete a pricing
 *     description: Delete a pricing
 *     tags:
 *       - Pricing
 *     parameters:
 *      - $ref: '#/components/parameters/idPricingType'
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
pricingRouter.delete(
  "/:idPricing",
  isSignedIn,
  isTeacher,
  PricingController.delete
);

export default pricingRouter;
