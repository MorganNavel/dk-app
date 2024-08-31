import express from "express";
import authRouter from "./feat/auth/AuthRouter";
import { connectToDb } from "./storage/initDb";
import morgan from "morgan";
import { displayApiAddresses } from "./utils/displayAddresses";
import session from "express-session";
import { initCache } from "./storage/cache";
import { getRedisConf } from "./utils/env";
import videoRouter from "./feat/video/VideoRouter";
import userRouter from "./feat/user/UserRouter";

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
    cookie: {
      secure: false, // true si vous utilisez HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 10, // Millisecondes
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const apiV1Router = express.Router();
app.use("/api/v1", apiV1Router);

apiV1Router.use("/auth", authRouter);
apiV1Router.use("/video", videoRouter);
apiV1Router.use("/user", userRouter);

app.listen(3001, () => {
  displayApiAddresses();
  console.log("Press CTRL-C to stop\n");
});

export { redisClient };
