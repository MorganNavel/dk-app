import { Router } from "express";
import { UserController } from "./UserController";
import { isSignedIn } from "@/utils/middlewares/auth";
import { isAdmin, isTeacher } from "@/utils/middlewares/role";
const userRouter = Router();

userRouter.get("/:idUser/profile", isSignedIn, UserController.getUserProfile);
userRouter.get(
  "/students",
  isSignedIn,
  isTeacher,
  UserController.getAllStudents
);
userRouter.get("/teachers", UserController.getAllTeachers);
userRouter.get("/me", isSignedIn, UserController.getMe);
userRouter.put("/:idUser", isSignedIn, isAdmin, UserController.update);
userRouter.put("/me", isSignedIn, UserController.updateMe);

userRouter.delete("/:idUser", isSignedIn, isAdmin, UserController.delete);

export default userRouter;
