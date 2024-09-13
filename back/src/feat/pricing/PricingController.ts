import { AppSession } from "@/types/Session";
import { PricingServices } from "./PricingServices";
import { Request, Response } from "express";

export class PricingController {
  static async getAll(req: Request, res: Response) {
    const response = await PricingServices.getPricings();
    return res.status(response.code).json(response);
  }
  static async getOne(req: Request, res: Response) {
    const idPricing = parseInt(req.params.idPricing);
    const response = await PricingServices.getPricing(idPricing);
    return res.status(response.code).json(response);
  }
  static async create(req: Request, res: Response) {
    const response = await PricingServices.createPricing(req.body);
    return res.status(response.code).json(response);
  }
  static async buy(req: Request, res: Response) {
    const { idUser } = (req.session as AppSession).user;
    const idPricing = parseInt(req.params.idPricing);
    const response = await PricingServices.buyPricing(idUser, idPricing);
    return res.status(response.code).json(response);
  }
  static async update(req: Request, res: Response) {
    const idPricing = parseInt(req.params.idPricing);
    const response = await PricingServices.updatePricing(idPricing, req.body);
    return res.status(response.code).json(response);
  }
  static async delete(req: Request, res: Response) {
    const idPricing = parseInt(req.params.idPricing);
    const response = await PricingServices.deletePricing(idPricing);
    return res.status(response.code).json(response);
  }
}
