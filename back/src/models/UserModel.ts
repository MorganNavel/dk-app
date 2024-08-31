import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { sequelize } from "../storage/initDb";

type UserRole = "student" | "teacher" | "admin";

interface UserAttributes {
  idUser: number;
  name: string;
  firstname: string;
  email: string;
  password_hash: string;
  languages?: string;
  nationality?: string;
  description?: string;
  role: UserRole;
}

interface UserCreationAttributes extends Optional<UserAttributes, "idUser"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public idUser!: number;
  public name!: string;
  public firstname!: string;
  public email!: string;
  public password_hash!: string;
  public languages?: string;
  public nationality?: string;
  public description?: string;
  public role!: UserRole;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
