import { Router } from "express";
import { UserController } from "./UserController";
import { isSignedIn } from "@/utils/middlewares/authMiddleware";
import { isAdmin, isTeacher } from "@/utils/middlewares/roleMiddlewares";
const userRouter = Router();

userRouter.get("/:idUser/profile", isSignedIn, UserController.getUserProfile);
userRouter.get(
  "/students/all",
  isSignedIn,
  isTeacher,
  UserController.getAllStudents
);
userRouter.put("/:idUser", isSignedIn, isAdmin, UserController.update);
userRouter.put("/me", isSignedIn, UserController.updateMe);

userRouter.delete("/:idUser", isSignedIn, isAdmin, UserController.delete);

export default userRouter;
