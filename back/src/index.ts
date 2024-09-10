import express from "express";
import authRouter from "./feat/auth/AuthRouter";
import { connectToDb } from "./storage/initDb";
import morgan from "morgan";
import { displayApiAddresses } from "./utils/displayAddresses";
import session from "express-session";
import { initCache } from "./storage/cache";
import { getRedisConf } from "./utils/env";
import userRouter from "./feat/user/UserRouter";
import cors from "cors";
import bookingRouter from "./feat/booking/BookingRouter";
import pricingRouter from "./feat/pricing/PricingRouter";
import lessonRouter from "./feat/lesson/LessonRouter";

const app = express();

const allowedOrigins = ["http://192.168.1.27:3000", "http://localhost:3000"];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (allowedOrigins.indexOf(origin ?? "") !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

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
apiV1Router.use("/user", userRouter);
apiV1Router.use("/booking", bookingRouter);
apiV1Router.use("/pricing", pricingRouter);
apiV1Router.use("/lesson", lessonRouter);
app.listen(3001, () => {
  displayApiAddresses();
  console.log("Press CTRL-C to stop\n");
});

export { redisClient };
