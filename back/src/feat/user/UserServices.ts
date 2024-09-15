import { User } from "@/models/UserModel";
import { API_Response } from "@/types/Response";
import { StringToArray } from "@/utils/helpers";
import { STATUS_CODES } from "@/utils/statusCodes";
import bcrypt from "bcrypt";

export class UserServices {
  static async getAllStudents(): Promise<API_Response> {
    /*
     TODO: - Get all students from a teacher and filter them depending on teacher input
    */
    return {
      code: STATUS_CODES.NOT_IMPLEMENTED,
    };
  }
  static async getAllTeachers(): Promise<API_Response> {
    try {
      const teachers = await User.findAll({ where: { role: "teacher" } });
      const teachersWithoutPassword = teachers.map((teacher) => {
        const { password_hash, email, ...teacherWithoutPassword } =
          teacher.dataValues;
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

  static async getUserProfileById(id: number): Promise<API_Response> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return { code: STATUS_CODES.NOT_FOUND, error: "User not found" };
      }
      const {
        password_hash,
        email,
        nationality,
        languages,
        links,
        ...userWithoutPassword
      } = user.dataValues;
      return {
        code: STATUS_CODES.OK,
        data: {
          user: {
            ...userWithoutPassword,
            nationality: StringToArray(nationality),
            languages: StringToArray(languages),
            links: JSON.parse(links),
          },
        },
      };
    } catch (error: any) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }

  static async getUserProfile(email: string): Promise<API_Response> {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return { code: STATUS_CODES.NOT_FOUND, error: "User not found" };
      }
      const {
        password_hash,
        languages,
        nationality,
        nbLessons,
        ...userProfile
      } = user.dataValues;

      return {
        code: STATUS_CODES.OK,
        data: {
          ...userProfile,
          languages: StringToArray(languages),
          nationality: StringToArray(nationality),
        },
      };
    } catch (error: any) {
      return {
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: error.errors[0].message,
      };
    }
  }

  static async update(
    fields: { [key: string]: any },
    id: number
  ): Promise<API_Response> {
    const { password, confirmPassword, ...fieldsWithoutPassword } = fields;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return {
          code: STATUS_CODES.NOT_FOUND,
          error: "Email or Password incorrect",
        };
      }
      const { passwordHash } = user.dataValues.password_hash;
      const isMatch = await bcrypt.compare(password, passwordHash);
      if (!isMatch) {
        return {
          code: STATUS_CODES.BAD_REQUEST,
          error: "Email or Password incorrect",
        };
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

  static async delete(id: number): Promise<API_Response> {
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
