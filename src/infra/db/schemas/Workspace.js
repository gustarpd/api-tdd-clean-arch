import mongoose from "mongoose";

export const schema = new mongoose.Schema({
  description: { type: String, required: true },
  owner: String,
  priority: String,
});

export const WorkSpace = mongoose.model("Workspace", schema);
