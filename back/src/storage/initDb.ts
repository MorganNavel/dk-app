import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import { initUser, User } from "@/models/UserModel";
import { initLesson, Lesson } from "@/models/LessonModel";
import { initPricing, Pricing } from "@/models/PricingModel";
import { Booking, initBooking } from "@/models/BookingModel";

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
initPricing(sequelize);
initUser(sequelize);
initLesson(sequelize);
initBooking(sequelize);

Booking.belongsTo(User, { foreignKey: "idUser" });

Lesson.hasMany(Booking, { as: "bookings", foreignKey: "idLesson" });
Booking.belongsTo(Lesson, { as: "lesson", foreignKey: "idLesson" });

Lesson.belongsTo(User, { foreignKey: "idTeacher" });

async function connectToDb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
}

export { connectToDb, sequelize };
