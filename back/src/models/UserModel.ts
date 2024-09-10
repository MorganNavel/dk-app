import { Model, DataTypes, Optional, Sequelize } from "sequelize";

type UserRole = "student" | "teacher" | "admin";

class User extends Model {
  idUser!: number;
  name!: string;
  firstname!: string;
  email!: string;
  password_hash!: string;
  languages?: string | undefined;
  nationality?: string | undefined;
  description?: string | undefined;
  role!: UserRole;
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
        type: DataTypes.STRING,
        allowNull: true,
      },
      nationality: {
        type: DataTypes.STRING,
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
