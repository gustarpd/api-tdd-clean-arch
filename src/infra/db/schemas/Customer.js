import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  description: { type: String },
  owner: { type: String },
  url: { type: String },
  title: { type: String  }
});

export const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  cpfCnpj: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  profession: { type: String, required: true },
  nationality: { type: String, required: true },
  observations: { type: String, required: true },
  documents: [documentSchema]
});

export const Customer = mongoose.model("Customer", customerSchema);
