import { Model, DataTypes, Sequelize } from "sequelize";

class Group extends Model {
  public idGroup!: number;
  public title!: string;
  public description!: string;
}
function initGroup(sequelize: Sequelize) {
  Group.init(
    {
      idGroup: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      sequelize,
    }
  );
}

export { initGroup, Group };
