//formula model
import mongoose from "mongoose";

const FormulaSchema = new mongoose.Schema(
  {
    chapterName: { type: String },
    content: { type: String, required: true },
    subject: { type: String, required: true },
  },
  { timestamps: true }
);

const MainSchema = new mongoose.Schema(
  {
    collectionName: { type: String, required: true },
    formulas: [FormulaSchema],
  },
  { timestamps: true }
);

export const formula =  mongoose.models.formula || mongoose.model("formula", MainSchema);
