import { Model, DataTypes, Sequelize } from "sequelize";
class Lesson extends Model {
  public idLesson!: number;
  public title!: string;
  public description!: string;
  public url!: string;
  public startDate!: Date;
  public duration!: number;
  public earned!: number;
  public idTeacher!: number;
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
        type: DataTypes.STRING,
        allowNull: false,
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
