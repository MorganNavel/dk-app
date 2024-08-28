import express, { Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";

const authRouter = express.Router();

authRouter.get("/", AuthController.getAuthUser);

export default authRouter;
