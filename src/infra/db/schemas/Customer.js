import mongoose from "mongoose";

export const schema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    address: String,
    cpfCnpj: String,
    dateOfBirth: String,
    gender: String,
    maritalStatus: String,
    profession: String,
    nationality: String,
    observations: String,
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

export const Customer = mongoose.model("Customer", schema);
