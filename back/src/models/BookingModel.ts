import { Model, DataTypes, Sequelize } from "sequelize";

class Booking extends Model {
  public idGroup!: number;
  public title!: string;
  public description!: string;
}
function initBooking(sequelize: Sequelize) {
  Booking.init(
    {
      idBooking: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      duration: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      tarif: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      sequelize,
    }
  );
}

export { initBooking, Booking };
