import express, { Request, Response } from "express";
import userRouter from "./routes/User";

const app = express();

app.use("/user", userRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
