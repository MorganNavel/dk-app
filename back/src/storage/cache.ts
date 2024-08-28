import RedisStore from "connect-redis";
import { createClient } from "redis";
import { getRedisConf } from "../utils/env";

export function initCache() {
  const redisConfig = getRedisConf();

  const redisClient = createClient({
    username: redisConfig.REDIS_USERNAME,
    password: redisConfig.REDIS_PASSWORD,
    socket: {
      host: redisConfig.REDIS_HOST,
      port: redisConfig.REDIS_PORT,
    },
  });

  redisClient
    .connect()
    .then(() => console.log("Connected to cache database"))
    .catch(console.error);

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: "dk-app:",
  });
  return { redisClient, redisStore };
}
