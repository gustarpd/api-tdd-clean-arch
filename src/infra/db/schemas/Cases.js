import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  description: { type: String },
  owner: { type: String },
  url: { type: String },
  title: { type: String  }
});

export const schema = new mongoose.Schema({
  title: { type: String, required: true },
  customer: String,
  customerId: String,
  action_type: String,
  awarded_amount: Number,
  involved_parties: [
    {
      name: String,
    },
  ],
  status: String,
  owner: { type: String, required: true },
  protocol: String,
  casedata: String,
  event: [
    {
      title: String,
      owner: String,
      start_date: { type: Date, required: true },
      end_date: { type: Date, required: true },
      createdAt: Date,
    },
  ],
  documents: [documentSchema],
});

export const Case = mongoose.model("Case", schema);
