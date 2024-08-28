import dotenv from "dotenv";
dotenv.config();
interface Env {
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  NODE_ENV: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  SECRET_KEY: string;
  REDIS_PASSWORD: string;
  REDIS_USERNAME: string;
}
interface RedisEnv {
  REDIS_HOST: string;
  REDIS_PORT: number;
  SECRET_KEY: string;
  REDIS_PASSWORD: string;
  REDIS_USERNAME: string;
}

export function getEnvConf(): Env {
  const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    NODE_ENV,
    REDIS_HOST,
    REDIS_PORT,
    SECRET_KEY,
    REDIS_PASSWORD,
    REDIS_USERNAME,
  } = process.env;
  if (
    !DB_HOST ||
    !DB_PORT ||
    !DB_USERNAME ||
    !DB_PASSWORD ||
    !DB_NAME ||
    !NODE_ENV ||
    !REDIS_HOST ||
    !REDIS_PORT ||
    !SECRET_KEY ||
    !REDIS_PASSWORD ||
    !REDIS_USERNAME
  ) {
    throw new Error("Some environment variables are missing");
  }
  return {
    DB_HOST,
    DB_PORT: parseInt(DB_PORT),
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    NODE_ENV,
    REDIS_HOST,
    REDIS_PORT: parseInt(REDIS_PORT),
    SECRET_KEY,
    REDIS_PASSWORD,
    REDIS_USERNAME,
  };
}
export function getRedisConf(): RedisEnv {
  const { REDIS_HOST, REDIS_PORT, SECRET_KEY, REDIS_PASSWORD, REDIS_USERNAME } =
    process.env;
  if (
    !REDIS_HOST ||
    !REDIS_PORT ||
    !SECRET_KEY ||
    !REDIS_PASSWORD ||
    !REDIS_USERNAME
  ) {
    throw new Error("Some Redis environment variables are missing");
  }
  return {
    REDIS_HOST,
    REDIS_PORT: parseInt(REDIS_PORT),
    SECRET_KEY,
    REDIS_PASSWORD,
    REDIS_USERNAME,
  };
}
