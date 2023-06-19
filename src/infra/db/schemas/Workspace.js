import mongoose from "mongoose";

export const schema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    owner: String,
    priority: String,
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

export const WorkSpace = mongoose.model("Workspace", schema);
