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
    await sequelize.sync({ force: true });

    const teacher = await User.create({
      name: "Park",
      firstname: "Danbee",
      email: "ilovelanguages@naver.com",
      password_hash: bcrypt.hashSync("26122002", 10),
      role: "teacher",
      languages: "French;English;Korean",
      nationality: "Korean",
      description: "I am a language lover",
    });
    const pricing = await Pricing.create({
      price: 10,
      currency: "USD",
      nbLessons: 4,
    });
    const user = await User.create({
      name: "Navel",
      firstname: "Morgan",
      email: "morgan.navel@example.com",
      password_hash: bcrypt.hashSync("26122002", 10),
      role: "student",
      languages: "French;English",
      nationality: "French",
      description: "I am a language lover",
    });
    const lesson = await Lesson.create({
      title: "French for beginners",
      description: "Learn French from scratch",
      startDate: new Date(),
      duration: 60,
      idTeacher: teacher.dataValues.idUser,
    });

    await Booking.create({
      idUser: user.dataValues.idUser,
      idLesson: lesson.dataValues.idLesson,
      startDate: new Date(),
      duration: 60,
      tarif: 10,
    });

    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
}

export { connectToDb, sequelize };
