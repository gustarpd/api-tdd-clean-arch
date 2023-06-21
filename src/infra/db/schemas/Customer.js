import mongoose from "mongoose";

export const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    cpfCnpj:{ type: String, required: true }    ,
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    profession: { type: String, required: true },
    nationality: { type: String, required: true },
    observations: { type: String, required: true },
  },
);

export const Customer = mongoose.model("Customer", schema);
