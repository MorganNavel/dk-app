import { Model, DataTypes, Sequelize } from "sequelize";
class Video extends Model {
  public idVideo!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public videoUrl!: string;
  public thumbnailUrl!: string;
  public creators!: string;
  public views!: number;
  public likes!: number;
}

function initVideo(sequelize: Sequelize) {
  Video.init(
    {
      idVideo: {
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
      thumbnailUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creators: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      sequelize,
    }
  );
}

export { initVideo, Video };
