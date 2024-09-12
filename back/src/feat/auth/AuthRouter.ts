import { Router } from "express";
import { AuthController } from "./AuthController";
import { validateSignUpInput, validateSignInInput } from "./middlewares";
import { isSignedIn } from "@/utils/middlewares/auth";

const authRouter = Router();

authRouter.post("/signup", validateSignUpInput, AuthController.signUp);
authRouter.post("/signin", validateSignInInput, AuthController.signIn);
authRouter.post("/signout", isSignedIn, AuthController.signOut);

export default authRouter;
