import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { router } from "./app/routes/web/routes.js";
import cors from "cors";
let app = express();
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});

app.use(cors({
    origin:['http://localhost:8000','http://localhost:4200','http://127.0.0.1:8000', 'https://crud-app-8852.netlify.app'],
    credentials: true
}));
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
