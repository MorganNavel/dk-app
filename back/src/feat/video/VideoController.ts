import { Request, Response } from "express";
import { VideoServices } from "./VideoServices";
const videoServices = new VideoServices();

export class VideoController {
  static async getAllVideos(req: Request, res: Response) {
    const { limit, offset } = req.query;
    const response = await videoServices.getVideos(
      parseInt(limit as string),
      parseInt(offset as string)
    );
    return res.status(response.code).json(response);
  }
  static async getVideoById(req: Request, res: Response) {
    const { idVideo } = req.params;
    const response = await videoServices.getVideoById(parseInt(idVideo));
    return res.status(response.code).json(response);
  }
  static async createVideo(req: Request, res: Response) {
    const response = await videoServices.createVideo(req);
    return res.status(response.code).json(response);
  }
  static async deleteVideo(req: Request, res: Response) {
    const { idVideo } = req.params;
    const response = await videoServices.deleteVideo(parseInt(idVideo));
    return res.status(response.code).json(response);
  }
}
