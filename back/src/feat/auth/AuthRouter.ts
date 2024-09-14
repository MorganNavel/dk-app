import { Router } from "express";
import { AuthController } from "./AuthController";
import { validateSignUpInput, validateSignInInput } from "./middlewares";
import { isSignedIn } from "@/utils/middlewares/auth";

const authRouter = Router();

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpInput'
 *     responses:
 *       '201':
 *         $ref: '#/components/responses/201'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '500':
 *         $ref: '#/components/responses/500'
 */
authRouter.post("/signup", validateSignUpInput, AuthController.signUp);

/**
 * @openapi
 * /auth/signin:
 *   post:
 *     summary: Sign in an existing user
 *     description: Sign in an existing user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInInput'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/200'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '500':
 *         $ref: '#/components/responses/500'
 */
authRouter.post("/signin", validateSignInInput, AuthController.signIn);

/**
 * @openapi
 * /auth/signout:
 *   post:
 *     summary: Sign out the current user
 *     description: Sign out the current user
 *     tags:
 *       - Auth
 *     responses:
 *       '200':
 *         description: Successfully signed out
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
authRouter.post("/signout", isSignedIn, AuthController.signOut);

export default authRouter;
