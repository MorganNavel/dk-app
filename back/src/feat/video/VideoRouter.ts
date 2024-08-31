import { Router } from "express";
import { VideoController } from "./VideoController";
const videoRouter = Router();

videoRouter.get("/all", VideoController.getAllVideos);

videoRouter.get("/:idVideo", VideoController.getVideoById);

videoRouter.post("/", VideoController.createVideo);
videoRouter.delete("/:idVideo", VideoController.deleteVideo);
export default videoRouter;
