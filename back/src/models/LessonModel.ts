import { Model, DataTypes, Sequelize } from "sequelize";
class Lesson extends Model {
  public idLesson!: number;
  public title!: string;
  public description!: string;
  public url!: string;
  public startDate!: Date;
  public duration!: number;
  public earned!: number;
  public status!: string;
  public groupSize!: number;
}
function initLesson(sequelize: Sequelize) {
  Lesson.init(
    {
      idLesson: {
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
      url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Duration in minutes",
        validate: {
          min: 30,
        },
        defaultValue: 50,
      },
      earned: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM("planned", "done", "cancelled"),
        allowNull: false,
        defaultValue: "planned",
      },
      groupSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      sequelize,
    }
  );
}

export { initLesson, Lesson };
