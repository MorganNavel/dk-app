import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const ENV = process.env.NODE_ENV || "development";

interface Config {
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

async function getConfig(): Promise<Config | undefined> {
  if (ENV === "production") {
    const response = await fetch("/etc/envs/dk-app/config.json");
    const config = await response.json();
    if (!config) return undefined;
    return config as Config;
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

export async function connectToDb() {
  try {
    const config: Config | undefined = await getConfig();
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

    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log("Connected to database");
    return sequelize;
  } catch (error) {
    console.error(error);
  }
}
