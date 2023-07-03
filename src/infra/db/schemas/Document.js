import mongoose from "mongoose";

export const schema = new mongoose.Schema({
  description: { type: String, required: true },
  owner: { type: String, required: true },
  url: { type: String, required: true },
  customerId: { type: String, required: true }, 
  title: { type: String, required: true },
});

export const Document = mongoose.model("Document", schema);
