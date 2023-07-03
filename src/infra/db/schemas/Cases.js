import mongoose from "mongoose";

export const schema = new mongoose.Schema({
  title: { type: String, required: true },
  customer: String,
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
  documents: [{ type: mongoose.Types.ObjectId, ref: 'Document' }],
});

export const Case = mongoose.model("Case", schema);
