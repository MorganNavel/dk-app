import { Pricing } from "@/models/PricingModel";
import { User } from "@/models/UserModel";
import { ApiResponse } from "@/types/Response";
import { apiCall } from "@/utils/apiCall";
import { STATUS_CODES } from "@/utils/statusCodes";

export class PricingServices {
  static async getPricings(): Promise<ApiResponse> {
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
  static async getPricing(idPricing: number): Promise<ApiResponse> {
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
  static async createPricing(body: any): Promise<ApiResponse> {
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
  static async processPayment(
    idUser: number,
    idPricing: number,
    body: Payment
  ): Promise<ApiResponse> {
    try {
      const pricing = await Pricing.findByPk(idPricing);
      if (!pricing) {
        return { code: STATUS_CODES.NOT_FOUND, error: "Pricing not found" };
      }

      const user = await User.findByPk(idUser);
      if (!user) {
        return { code: STATUS_CODES.NOT_FOUND, error: "User not found" };
      }

      const response = await apiCall<Payment, PaymentResponse | PaymentError>({
        url: `${process.env.PAYMENT_API}/hosted_payments`,
        method: "POST",
        body: body,
        options: {
          headers: {
            Authorization: `Bearer ${process.env.PAYMENT_API_KEY}`,
          },
        },
      });

      const nbLessons = user.nbLessons + pricing.nbLessons;
      const updatedUser = await user.update({ nbLessons });
      const { password_hash, ...userValues } = updatedUser.dataValues;
      return {
        code: STATUS_CODES.OK,
        data: { user: userValues, links: (response as PaymentResponse)._links },
      };
    } catch (error: any) {
      if (error instanceof Error) {
        const errorData = JSON.parse(error.message) as PaymentError;
        if (
          errorData.request_id &&
          errorData.error_type === "request_invalid"
        ) {
          return {
            code: STATUS_CODES.UNPROCESSABLE_ENTITY,
            error: errorData,
          };
        }
      }
      // Handle other unexpected errors
      return {
        code: STATUS_CODES.BAD_REQUEST,
      };
    }
  }

  static async updatePricing(
    idPricing: number,
    body: any
  ): Promise<ApiResponse> {
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
  static async deletePricing(idPricing: number): Promise<ApiResponse> {
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
