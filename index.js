import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { router } from "./app/routes/web/routes.js";
import cors from "cors";
let app = express();
app.use(cors({
    origin:['http://localhost:8000','http://127.0.0.1:8000'],
    credentials:true
}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:4200");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});
app.use(express.json());
app.get("/health", (req, res) => {
  res.status(200).send("✅ Railway backend is running");
});
app.get("/", (req, res) => {
  res.send("✅ Railway backend is running");
});
app.use("/web/api", router);
const port = process.env.PORT || 8080;
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected to Database");
    app.listen(port, "0.0.0.0", () => {
      console.log("SERVER IS RUNNING", port);
    });
  })
  .catch((err) => {
    console.log("erroe while connecting to server ", err);
  });
