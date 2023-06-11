import mongoose from "mongoose";

export const schema = new mongoose.Schema({
  description: String,
  owner: String,
  priority: String,
});

export const WorkSpace = mongoose.model("Workspace", schema);
