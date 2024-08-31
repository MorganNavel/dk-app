import { Router } from "express";
import { VideoController } from "./VideoController";
import { isSignedIn } from "@/utils/middlewares/authMiddleware";
import { isStudent } from "@/utils/middlewares/roleMiddlewares";
const videoRouter = Router();

videoRouter.get("/all", isSignedIn, isStudent, VideoController.getAllVideos);

videoRouter.get("/:idVideo", VideoController.getVideoById);

videoRouter.post("/", VideoController.createVideo);
videoRouter.delete("/:idVideo", VideoController.deleteVideo);
export default videoRouter;
