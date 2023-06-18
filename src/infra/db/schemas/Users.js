import mongoose from "mongoose";

export const schema = new mongoose.Schema(
  {
    name: String,
    email: String,
    age: String,
    state: String,
    password: String,
    accessToken: String,
  },
  {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const User = mongoose.model("Users", schema);
