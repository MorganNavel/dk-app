import { Router } from "express";
import { UserController } from "./UserController";
import { isSignedIn } from "@/utils/middlewares/auth";
import { isAdmin, isTeacher } from "@/utils/middlewares/role";
import { validateUpdateInput } from "./middlewares";
const userRouter = Router();

userRouter.get("/:idUser", UserController.getUserProfile);
userRouter.get(
  "/students",
  isSignedIn,
  isTeacher,
  UserController.getAllStudents
);
userRouter.get("/teachers", UserController.getAllTeachers);
userRouter.get("/me", isSignedIn, UserController.getMe);
userRouter.put(
  "/:idUser",
  validateUpdateInput,
  isSignedIn,
  isAdmin,
  UserController.update
);
userRouter.put("/me", validateUpdateInput, isSignedIn, UserController.updateMe);

userRouter.delete("/:idUser", isSignedIn, isAdmin, UserController.delete);

export default userRouter;
