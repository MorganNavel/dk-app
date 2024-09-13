import { Model, DataTypes, Sequelize } from "sequelize";
import { Json } from "sequelize/types/utils";

type UserRole = "student" | "teacher" | "admin";

class User extends Model {
  idUser!: number;
  name!: string;
  firstname!: string;
  email!: string;
  password_hash!: string;
  languages?: string;
  nationality?: string;
  links?: Json;
  description?: string;
  role!: UserRole;
  nbLesson?: number;
}

function initUser(sequelize: Sequelize) {
  User.init(
    {
      idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(390),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          },
        },
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      languages: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      nationality: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("student", "teacher", "admin"),
        defaultValue: "student",
        allowNull: false,
      },
      nbLessons: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      links: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {},
      },
    },
    {
      sequelize,
      timestamps: true,
      createdAt: true,
      updatedAt: false,
    }
  );
}

export { initUser, User, UserRole };
