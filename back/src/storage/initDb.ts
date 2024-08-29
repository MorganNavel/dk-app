import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import { UserModel } from "../models/UserModel";
import { readFileSync } from "fs";

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

const User = UserModel(sequelize, DataTypes);

async function connectToDb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log("Connected to database");
    return { sequelize, User };
  } catch (error) {
    console.error(error);
  }
}

export { connectToDb, User };
