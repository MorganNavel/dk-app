import { Router } from "express";
import { PricingController } from "./PricingController";
import { isStudent, isTeacher } from "@/utils/middlewares/role";
import { isSignedIn } from "@/utils/middlewares/auth";
import { validateCreateInput, validateUpdateInput } from "./middlewares";

const pricingRouter = Router();

pricingRouter.get("/all", PricingController.getAll);
pricingRouter.get("/:idPricing", PricingController.getOne);
pricingRouter.post(
  "/",
  isSignedIn,
  isTeacher,
  validateCreateInput,
  PricingController.create
);
pricingRouter.post(
  "/:idPricing/buy",
  isSignedIn,
  isStudent,
  PricingController.buy
);
pricingRouter.patch(
  "/:idPricing",
  isSignedIn,
  isTeacher,
  validateUpdateInput,
  PricingController.update
);
pricingRouter.delete(
  "/:idPricing",
  isSignedIn,
  isTeacher,
  PricingController.delete
);

export default pricingRouter;
