import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import { initUser, User } from "@/models/UserModel";
import { initLesson, Lesson } from "@/models/LessonModel";
import { initPricing, Pricing } from "@/models/PricingModel";
import { Booking, initBooking } from "@/models/BookingModel";
import bcrypt from "bcrypt";
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
    // console.log(`SQL: ${sql} (${timing}ms)`);
  },
});
initPricing(sequelize);
initUser(sequelize);
initLesson(sequelize);
initBooking(sequelize);

Booking.belongsTo(User, { as: "user", foreignKey: "idUser" });

Lesson.hasMany(Booking, { as: "bookings", foreignKey: "idLesson" });
Booking.belongsTo(Lesson, { as: "lesson", foreignKey: "idLesson" });

Lesson.belongsTo(User, { foreignKey: "idTeacher", as: "teacher" });

async function connectToDb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    const password = await bcrypt.hash("password", 10);
    const t = await User.create({
      firstname: "Danbee",
      name: "Park",
      email: "danbee.korean@gmail.com",
      languages: "fr,en,ko,jp",
      password_hash: password,
      role: "teacher",
    });
    const s = await User.create({
      firstname: "Morgan",
      name: "Navel",
      email: "navelmorgan34@gmail.com",
      languages: "fr,en",
      password_hash: password,
      role: "student",
    });
    const l = await Lesson.create({
      title: "Korean lesson",
      description: "Learn Korean with me",
      startDate: new Date(),
      idTeacher: t.idUser,
    });
    const pricing = await Pricing.create({
      price: 10,
      currency: "USD",
      nbLessons: 4,
    });

    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
}

export { connectToDb, sequelize };
