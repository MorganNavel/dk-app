import { Router } from "express";
import { GroupController } from "./GroupController";
import { isSignedIn } from "@/utils/middlewares/authMiddleware";
import { isAdmin, isTeacher } from "@/utils/middlewares/roleMiddlewares";
const groupRouter = Router();

groupRouter.get("/:idUser/profile", isSignedIn);
groupRouter.get("/students", isSignedIn, isTeacher);
groupRouter.get("/teachers");
groupRouter.get("/me", isSignedIn);
groupRouter.put("/:idUser", isSignedIn);
groupRouter.put("/me", isSignedIn);

groupRouter.delete("/:idUser", isSignedIn, isAdmin);

export default groupRouter;
