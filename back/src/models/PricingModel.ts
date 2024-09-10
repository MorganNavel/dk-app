import { Model, DataTypes, Sequelize } from "sequelize";

class Pricing extends Model {
  public idPricing!: number;
  public type!: string;
  public price!: string;
  public nbMaxLesson!: number;
}
function initPricing(sequelize: Sequelize) {
  Pricing.init(
    {
      idPricing: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      nbMaxLesson: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      sequelize,
    }
  );
}

export { initPricing, Pricing };
