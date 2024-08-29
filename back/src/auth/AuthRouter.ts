import express from "express";
import { AuthController } from "./AuthController";

const authRouter = express.Router();

authRouter.get("/", AuthController.signUp);

export default authRouter;
