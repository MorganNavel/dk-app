import { Model, Sequelize } from "sequelize";
class User extends Model {}
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
