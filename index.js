import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { router } from "./app/routes/web/routes.js";
import cors from "cors";

let app = express();
app.use(cors());
app.use(express.json());
app.use("/web/api", router);
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected to Database");
    app.listen(process.env.PORT_NUMBER || 5000, () => {
      console.log("SERVER IS RUNNING");
    });
  })
  .catch((err) => {
    console.log("erroe while connecting to server ", err);
  });
