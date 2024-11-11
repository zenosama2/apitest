//usermodel
import mongoose from 'mongoose';

const resultStatsSchema = new mongoose.Schema({
  wrong: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'MCQ' },
    userAnswer: { type: String }
  }],
  skipped: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MCQ' }],
}, { _id: false });

const userStatsSchema = new mongoose.Schema({
  role: { type: String, default: 'User', enum: ['User', 'Admin', 'Moderator'] },
  permissions: {
    canBookmarkFormulas: { type: Boolean, default: false },
    canBookmarkQuestions: { type: Boolean, default: false },
    canSeeWrongQuestions: { type: Boolean, default: false },
    canSeeSkippedQuestions: { type: Boolean, default: false },
  },
  enrolledCourses: [{ type: String }],
  membershipType: [{ type: String }], // Array of membership types
  expiry: { type: Date },
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  avatar: { type: String, enum: ['avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5', 'avatar6'] ,default:'avatar1'},
  fullName: { type: String },
  collegeName: { type: String },
  group: { type: String, enum: ['Science', 'Arts', 'Business Studies'] },
  hscBatch: { type: String, enum: ['2022', '2023', '2024'] },
  isNewUser: { type: Boolean, default: true },
  bookmarkedFormulas: [{
    formulaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Formula' },
    bookmarkedAt: { type: Date, default: Date.now }
  }],
  bookmarkedQuestions: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'MCQ' },
    bookmarkedAt: { type: Date, default: Date.now }
  }],
  resultStats: resultStatsSchema,
  examHistory: [{
    collectionId:{type:String},
    examName: { type: String },
    totalMarks: { type: Number },
    marks: {
      obtained: { type: Number },
      correct: { type: Number },
      wrong: { type: Number },
      skipped: { type: Number },
    },
    timeTaken: { type: Number },
    questions: [{
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'MCQ' },
      userAnswer: { type: String },
      correctAnswer: { type: String },
    }],
    takenAt: { type: Date, default: Date.now },
  }],
  userStats: userStatsSchema
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
