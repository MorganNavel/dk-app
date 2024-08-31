import { API_Response } from "@/types/Response";
import { User } from "@/storage/initDb";
import { STATUS_CODES } from "@/utils/statusCodes";

export class UserServices {
  instance: UserServices | null = null;
  constructor() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = this;
  }

  public async getAll(): Promise<API_Response> {
    try {
      const users = await User.findAll();
      return { code: STATUS_CODES.OK, data: users };
    } catch (error: any) {
      return { code: STATUS_CODES.BAD_REQUEST, error: error.errors[0].message };
    }
  }

  public async getUserProfileById(id: number): Promise<API_Response> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return { code: STATUS_CODES.NOT_FOUND, error: "User not found" };
      }
      const { password_hash, ...userWithoutPassword } = user.dataValues;
      return { code: STATUS_CODES.OK, data: userWithoutPassword };
    } catch (error: any) {
      return { code: STATUS_CODES.BAD_REQUEST, error: error.errors[0].message };
    }
  }

  public async getUserProfile(email: string): Promise<API_Response> {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return { code: STATUS_CODES.NOT_FOUND, error: "User not found" };
      }
      const { password_hash, ...userWithoutPassword } = user.dataValues;
      return { code: STATUS_CODES.OK, data: userWithoutPassword };
    } catch (error: any) {
      return { code: STATUS_CODES.BAD_REQUEST, error: error.errors[0].message };
    }
  }

  public async update(fields: object, id: number): Promise<API_Response> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return { code: STATUS_CODES.NOT_FOUND, error: "User not found" };
      }
      const updatedUser = await user.update(fields);
      const { password_hash, ...userWithoutPassword } = updatedUser.dataValues;

      return { code: STATUS_CODES.OK, data: userWithoutPassword };
    } catch (error: any) {
      return { code: STATUS_CODES.BAD_REQUEST, error: error.errors[0].message };
    }
  }

  public async delete(id: number): Promise<API_Response> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return { code: STATUS_CODES.NOT_FOUND, error: "User not found" };
      }
      await user.destroy();
      return { code: STATUS_CODES.OK };
    } catch (error: any) {
      return { code: STATUS_CODES.BAD_REQUEST, error: error.errors[0].message };
    }
  }
}
