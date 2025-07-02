import mongoose from "mongoose";

let userFormSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quality: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  price:{
    type:String,
    required:true
  },
  feedback:{
    type:String,
    required:true
  },
});
export const formModel = mongoose.model("formData", userFormSchema);
