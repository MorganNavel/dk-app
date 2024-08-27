import express, { Request, Response } from "express";
import { UserController } from "../controllers/UserController";

const userRouter = express.Router();

userRouter.get("/", UserController.getUser);

export default userRouter;
