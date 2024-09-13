import { Pricing } from "@/models/PricingModel";
import { User } from "@/models/UserModel";
import { API_Response } from "@/types/Response";
import { STATUS_CODES } from "@/utils/statusCodes";

export class PricingServices {
  static async getPricings(): Promise<API_Response> {
    try {
      const pricings = await Pricing.findAll();
      if (pricings.length === 0) {
        return { code: STATUS_CODES.NOT_FOUND, error: "No pricings found" };
      }
      return { code: STATUS_CODES.OK, data: { pricings } };
    } catch (error) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error as string,
      };
    }
  }
  static async getPricing(idPricing: number): Promise<API_Response> {
    try {
      const pricing = await Pricing.findByPk(idPricing);
      if (!pricing) {
        return { code: STATUS_CODES.NOT_FOUND, error: "Pricing not found" };
      }
      return { code: STATUS_CODES.OK, data: { pricing } };
    } catch (error) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error as string,
      };
    }
  }
  static async createPricing(body: any): Promise<API_Response> {
    const { price, nbLessons, ...pricingValues } = body;

    try {
      const pricing = await Pricing.create({
        price: parseFloat(price),
        nbLessons: parseInt(nbLessons),
        ...pricingValues,
      });
      return {
        code: STATUS_CODES.CREATED,
        data: { pricing },
      };
    } catch (error) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error as string,
      };
    }
  }
  static async buyPricing(
    idUser: number,
    idPricing: number
  ): Promise<API_Response> {
    try {
      const pricing = await Pricing.findByPk(idPricing);
      if (!pricing) {
        return { code: STATUS_CODES.NOT_FOUND, error: "Pricing not found" };
      }
      const user = await User.findByPk(idUser);
      if (!user) {
        return { code: STATUS_CODES.NOT_FOUND, error: "User not found" };
      }
      const nbLessons = user.dataValues.nbLessons + pricing.nbLessons;
      const updatedUser = await user.update({ nbLessons });
      const { password_hash, ...userValues } = updatedUser.dataValues;
      return { code: STATUS_CODES.OK, data: { user: userValues } };
    } catch (error) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error as string,
      };
    }
  }
  static async updatePricing(
    idPricing: number,
    body: any
  ): Promise<API_Response> {
    try {
      const pricing = await Pricing.findByPk(idPricing);
      if (!pricing) {
        return { code: STATUS_CODES.NOT_FOUND, error: "Pricing not found" };
      }
      const updatedPricing = await pricing.update(body);
      return { code: STATUS_CODES.OK, data: { pricing: updatedPricing } };
    } catch (error) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error as string,
      };
    }
  }
  static async deletePricing(idPricing: number): Promise<API_Response> {
    try {
      const pricing = await Pricing.findByPk(idPricing);
      if (!pricing) {
        return { code: STATUS_CODES.NOT_FOUND, error: "Pricing not found" };
      }
      await pricing.destroy();
      return { code: STATUS_CODES.OK };
    } catch (error) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error as string,
      };
    }
  }
}
