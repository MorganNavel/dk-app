import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import { initUser, User } from "@/models/UserModel";
import { initLesson, Lesson } from "@/models/LessonModel";
import { initVideo, Video } from "@/models/VideoModel";
// import bcrypt from "bcrypt";

dotenv.config();
const ENV = process.env.NODE_ENV || "development";

interface Config {
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

function getConfig(): Config | undefined {
  if (ENV === "production") {
    try {
      const configFile = readFileSync("/etc/envs/dk-app/config.json", "utf-8");
      return JSON.parse(configFile) as Config;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  if (ENV === "development") {
    return {
      DB_HOST: process.env.DB_HOST || "",
      DB_PORT: parseInt(process.env.DB_PORT || "0"),
      DB_USERNAME: process.env.DB_USERNAME || "",
      DB_PASSWORD: process.env.DB_PASSWORD || "",
      DB_NAME: process.env.DB_NAME || "",
    };
  }

  return undefined;
}
const config: Config | undefined = getConfig();
if (!config) {
  throw new Error("No config found");
}

const sequelize = new Sequelize({
  dialect: "mysql",
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  host: config.DB_HOST,
  port: config.DB_PORT,
  logging(sql, timing) {
    console.log(`SQL: ${sql} (${timing}ms)`);
  },
});
initUser(sequelize);
initLesson(sequelize);
initVideo(sequelize);
User.hasMany(Lesson, { foreignKey: "idLesson", as: "lessons" });
Lesson.belongsTo(User, { foreignKey: "idTeacher", as: "teacher" });
Video.belongsTo(User, { foreignKey: "idTeacher", as: "teacher" });
async function connectToDb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    // await User.create({
    //   name: "Park",
    //   firstname: "Danbee",
    //   email: "ilovelanguages@naver.com",
    //   password_hash: bcrypt.hashSync("26122002", 10),
    //   role: "teacher",
    //   languages: "French;English;Korean",
    //   nationality: "Korean",
    //   description: "I am a language lover",
    // });

    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
}

export { connectToDb, sequelize };
