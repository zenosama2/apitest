//mcq model
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String  },
  explanation: { type: String },
  subject: { type: String, required: true },
  chapter: { type: String },
  paper: { type: Number,default: 1},
  mark: { type: Number, default: 1 },
  negMark: { type: Number, default: 0.25 },
  topic: { type: String },
  questionType: { type: String },
  source: { type: String },
  writer: { type: String },
  year: { type: String },
  unit: { type: String },
  shift: { type: String },
  isValid: { type: Boolean, default: true }
});

const MainSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  meta: { type: String, required: true },
  collectionName: { type: String, required: true },
  isExam: { type: Boolean },
  isPaid: { type: Boolean, default: true },
  containsSelection: { type: Boolean, default: false },
  duration: { type: Number },
  additionalMeta: { type: String },
  questions: [QuestionSchema]
}, { timestamps: true });

export const aMCQ = mongoose.models.aMCQ || mongoose.model('aMCQ', MainSchema);
export const bMCQ = mongoose.models.bMCQ || mongoose.model('bMCQ', MainSchema);
export const cMCQ = mongoose.models.cMCQ || mongoose.model('cMCQ', MainSchema);
export const dMCQ = mongoose.models.dMCQ || mongoose.model('dMCQ', MainSchema);
export const masterMCQ = mongoose.models.masterMCQ || mongoose.model('masterMCQ', MainSchema);
