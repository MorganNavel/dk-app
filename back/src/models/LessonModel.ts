import { Model, DataTypes, Sequelize } from "sequelize";
class Lesson extends Model {
  public idLesson!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public url!: string;
  public typeLesson!: string;
  public startDateTime!: Date;
  public endDateTime!: Date;
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
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start: {
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
      typeLesson: {
        type: DataTypes.ENUM("single", "group"),
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

export { initLesson, Lesson };
