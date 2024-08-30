import { Model, Sequelize } from "sequelize";
class User extends Model {
  public idUser!: number;
  public name!: string;
  public firstname!: string;
  public email!: string;
  public password_hash!: string;
  public languages!: string;
}
function UserModel(sequelize: Sequelize, DataTypes: any) {
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
        type: DataTypes.STRING,
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
      },
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: false,
      sequelize,
    }
  );

  return User;
}
export { UserModel, User };
