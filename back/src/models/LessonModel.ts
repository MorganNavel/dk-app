import { Model, DataTypes, Sequelize } from "sequelize";
class Lesson extends Model {
  public idLesson!: number;
  public title!: string;
  public description!: string;
  public url!: string;
  public startDate!: Date;
  public duration!: number;
  public idTeacher!: number;
  public globalPrice!: number;
}
function initLesson(sequelize: Sequelize) {
  Lesson.init(
    {
      idLesson: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      globalPrice: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: "Price gain for the teacher on the lesson",
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
      students: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "List of students",
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
