import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { router } from "./app/routes/web/routes.js";
import cors from "cors";
let app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("✅ Railway backend is running");
});
app.use("/web/api", router);
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected to Database");
    app.listen(process.env.PORT || 5000, () => {
      console.log("SERVER IS RUNNING",process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("erroe while connecting to server ", err);
  });
