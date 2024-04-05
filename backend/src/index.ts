import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

mongoose
  .connect(process.env.MONGODB_CONNECTION as string)
  .then(() => {
    console.log(
      "App connected to Database PRODUCTION: ",
      process.env.PRODUCTION
    );
    app.listen(3000, () => {
      console.log("server running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
