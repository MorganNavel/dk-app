import express from "express";
import userRouter from "./routes/User";
import { connectToDb } from "./db/initDb";
import morgan from "morgan";
import { displayApiAddresses } from "./utils/displayAddresses";

const app = express();

connectToDb();
app.use(morgan("dev"));

app.use("/user", userRouter);

app.listen(3001, () => {
  displayApiAddresses();
  console.log("Press CTRL-C to stop\n");
});
