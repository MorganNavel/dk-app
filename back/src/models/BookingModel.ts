import { Model, DataTypes, Sequelize } from "sequelize";
import { Lesson } from "./LessonModel";
import { User } from "./UserModel";

class Booking extends Model {
  public idBooking!: number;
  public lesson!: Lesson;
  public user!: User;
}
function initBooking(sequelize: Sequelize) {
  Booking.init(
    {
      idBooking: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
