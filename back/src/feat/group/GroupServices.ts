import { User, UserRole } from "@/models/UserModel";
import { API_Response } from "@/types/Response";
import { STATUS_CODES } from "@/utils/statusCodes";

export class UserServices {
  instance: UserServices | null = null;
  constructor() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = this;
  }

  public async getAllStudents(): Promise<API_Response> {
    /*
     TODO: - Get all students from a teacher and filter them depending on teacher input
    */
    return {
      code: STATUS_CODES.NOT_IMPLEMENTED,
    };
  }
  public async getAllTeachers(): Promise<API_Response> {
    try {
      const teachers = await User.findAll({ where: { role: "teacher" } });
      const teachersWithoutPassword = teachers.map((teacher) => {
        const { password_hash, ...teacherWithoutPassword } = teacher.dataValues;
        return teacherWithoutPassword;
      });
      return { code: STATUS_CODES.OK, data: teachersWithoutPassword };
    } catch (error: any) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error.errors[0].message,
      };
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
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }

  public async getUserProfile(email: string): Promise<API_Response> {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return { code: STATUS_CODES.NOT_FOUND, error: "User not found" };
      }
      const { password_hash, languages, nationality, ...userProfile } =
        user.dataValues;

      return {
        code: STATUS_CODES.OK,
        data: {
          ...userProfile,
          languages: languages ? languages.split(";") : null,
          nationality: nationality ? nationality.split(";") : null,
        },
      };
    } catch (error: any) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error.errors[0].message,
      };
    }
  }

  public async update(
    fields: { [key: string]: any },
    id: number
  ): Promise<API_Response> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return { code: STATUS_CODES.NOT_FOUND, error: "User not found" };
      }

      if (fields["role"])
        return { code: STATUS_CODES.UNAUTHORIZED, error: "Unauthorized" };
      const updatedUser = await user.update(fields);
      const { password_hash, role, ...userWithoutPassword } =
        updatedUser.dataValues;

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
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error.errors[0].message,
      };
    }
  }
}
