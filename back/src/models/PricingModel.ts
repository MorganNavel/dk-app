import { Model, DataTypes, Sequelize } from "sequelize";

class Pricing extends Model {
  public idPricing!: number;
  public currency!: string;
  public price!: string;
  public nbLessons!: number;
}
function initPricing(sequelize: Sequelize) {
  Pricing.init(
    {
      idPricing: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      nbLessons: {
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
