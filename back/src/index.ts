import express from "express";
import authRouter from "./feat/auth/AuthRouter";
import { connectToDb } from "./storage/initDb";
import morgan from "morgan";
import {
  displayApiAddresses,
  getNetworkAddresses,
} from "./utils/displayAddresses";
import session from "express-session";
import { initCache } from "./storage/cache";
import { getRedisConf } from "./utils/env";
import userRouter from "./feat/user/UserRouter";
import cors from "cors";
import bookingRouter from "./feat/booking/BookingRouter";
import pricingRouter from "./feat/pricing/PricingRouter";
import lessonRouter from "./feat/lesson/LessonRouter";
import swagger from "./utils/swagger";
import dotenv from "dotenv";
import cron from "node-cron";
import { approachingLessons } from "./utils/helpers";
dotenv.config();
const app = express();
const PORT = parseInt(process.env.API_PORT ?? "3001");
const APP_PORT = parseInt(process.env.APP_PORT ?? "3000");

const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
  credentials: true,
};

app.use(cors(corsOptions));

connectToDb();
approachingLessons();
// cron.schedule("*/2 * * * *", approachingLessons)

const { redisClient, redisStore } = initCache();
const redisConfig = getRedisConf();

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: redisConfig.SECRET_KEY,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 10,
      sameSite: "lax",
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const apiV1Router = express.Router();
app.use("/api/v1", apiV1Router);

apiV1Router.use("/auth", authRouter);
apiV1Router.use("/user", userRouter);
apiV1Router.use("/", bookingRouter);
apiV1Router.use("/pricing", pricingRouter);
apiV1Router.use("/lesson", lessonRouter);
app.listen(PORT, () => {
  const addresses = getNetworkAddresses();
  displayApiAddresses(addresses);
  console.log("Press CTRL-C to stop\n");
  swagger(app, addresses, PORT);
});

export { redisClient };
