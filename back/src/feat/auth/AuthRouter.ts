import { Router } from "express";
import { AuthController } from "./AuthController";
import {
  validateSignUpInput,
  validateSignInInput,
} from "./middlewares/authValidation";
import { isSignedIn } from "@/utils/middlewares/authMiddleware";

const authRouter = Router();

authRouter.post("/signup", validateSignUpInput, AuthController.signUp);
authRouter.post("/signin", validateSignInInput, AuthController.signIn);
authRouter.get("/signout", isSignedIn, AuthController.signOut);

export default authRouter;
