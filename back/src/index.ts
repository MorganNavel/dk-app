import express from "express";
import authRouter from "./auth/AuthRouter";
import { connectToDb } from "./storage/initDb";
import morgan from "morgan";
import { displayApiAddresses } from "./utils/displayAddresses";
import session from "express-session";
import { initCache } from "./storage/cache";
import { getRedisConf } from "./utils/env";

const app = express();

connectToDb();
const { redisClient, redisStore } = initCache();
const redisConfig = getRedisConf();

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: redisConfig.SECRET_KEY,
  })
);

app.use(morgan("dev"));

app.use("/auth", authRouter);

app.listen(3001, () => {
  displayApiAddresses();
  console.log("Press CTRL-C to stop\n");
});
