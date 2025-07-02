import { formModel } from "../../models/form.model.js";
import { ObjectId } from 'mongodb';


// get-api
export let readData = async (req, res) => {
  try {
    let myModelData = await formModel.find();
    res.send({ status: 1, message: "data read successfully", myModelData });
  } catch (error) {
    console.log("error while reading data from backend", error);
    res.send({
      status: 0,
      message: "error while reading data from backend",
      error,
    });
  }
};

/*
    'productName',
    'productCategory',
    'productQuality',
    'productPurchasedDate',
    'productPrice',
    'productFeedback',
*/
// post api
export let insertData = async (req, res) => {
  try {
    let { name, category, quality, date, price, feedback } = req.body;
    let myModel = new formModel({
      name,
      category,
      quality,
      date,
      price,
      feedback,
    });
    let myData = await myModel.save();
    res.send({ status: 1, msg: "data post", myData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving form", error: err.message });
  }
};

// delete-api
export let deleteData = async (req, res) => {
  try {
    let { id } = req.params;
    let myData = await formModel.deleteOne({ _id: id });
    let myObj = {
      status: 1,
      message: "deleted successfuly",
      myData,
    };
    res.send(myObj);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error saving form", error: error.message });
  }
};

// put-api
export let updatedata = async (req, res) => {
  try {
    let id = req.params;
    let { name, category, quality, date, price, feedback } = req.body;
    let obj = {
      name,
      category,
      quality,
      date,
      price,
      feedback,
    };
    let myUpdateVal = await formModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: obj }
    );
    let myresObj = {
      status: 1,
      msg: "updated successfully",
      myUpdateVal,
    };
    res.send(myresObj);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error saving form", error: error.message });
  }
};
