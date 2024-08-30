import { Video } from "../models/VideoModel";
import { API_Response } from "../types/Response";
import { STATUS_CODES } from "../utils/statusCodes";
import { Request } from "express";

export class VideoServices {
  static instance: VideoServices;
  constructor() {
    if (VideoServices.instance) {
      return VideoServices.instance;
    }
    VideoServices.instance = this;
  }

  async getVideos(limit: number, offset: number): Promise<API_Response> {
    try {
      const videos = await Video.findAll({
        limit: limit,
        offset: offset,
      });
      return {
        code: STATUS_CODES.OK,
        data: videos.map((video) => video.dataValues),
      };
    } catch (error: any) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }

  async getVideoById(id: number): Promise<API_Response> {
    try {
      const video = await Video.findByPk(id);
      return {
        code: STATUS_CODES.OK,
        data: video?.dataValues,
      };
    } catch (error: any) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }

  async createVideo(req: Request): Promise<API_Response> {
    try {
      const { title, description, url, thumbnailUrl, creators, price } =
        req.body;

      const newVideo = await Video.create({
        title,
        description,
        url,
        thumbnailUrl,
        creators,
        price,
      });
      return {
        code: STATUS_CODES.CREATED,
        data: newVideo.dataValues,
      };
    } catch (error: any) {
      return {
        code: STATUS_CODES.BAD_REQUEST,
        error: error.errors[0].message,
      };
    }
  }

  async deleteVideo(id: number): Promise<API_Response> {
    try {
      const video = await Video.findByPk(id);
      if (!video) {
        return {
          code: STATUS_CODES.NOT_FOUND,
          error: "Video not found",
        };
      }
      await video.destroy();
      return {
        code: STATUS_CODES.OK,
      };
    } catch (error: any) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error.errors[0].message,
      };
    }
  }
}
