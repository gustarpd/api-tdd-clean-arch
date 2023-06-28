import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    titulo: String,
    valor_causa: Number,
    valor_condenacao: Number,
    data_criada: Date,
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

export const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    customer: String,
    action_type: String,
    awarded_amount: String,
    involved_parties: [String],
    status: String,
    owner: { type: String, required: true },
    protocol: String,
    casedata: String,
    history: [EventSchema],
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

export const Case = mongoose.model("Case", schema);
