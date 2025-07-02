import express from "express";
import { readData,insertData,deleteData,updatedata } from "../../controllers/web-controllers/userEnquiryController.js";
export let router=express.Router();
router.get("/read-data",readData)
router.post("/insert-data", insertData);
router.delete("/delete-data/:id", deleteData);
router.put("/update-data/:id", updatedata);