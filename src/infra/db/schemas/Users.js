import mongoose from "mongoose";

export const schema = new mongoose.Schema({
  name: String,
  email: String,
  age: String,
  state: String,
  password: String,
});

export const User = mongoose.model("Users", schema);
