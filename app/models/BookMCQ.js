import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  chapterCode:{type:String,required:true},      // this will be the params to fetch data
  subject:{type:String,required:true},
  info:[{
    chapterName:{type:String,required:true},
    topicName:{type:String},
    paper:{type:String},
    questionType:{type:String, required:true},  // Book,Board,Medical or Varsity?
    writersName:{type:String},                  // If this is a book's mcq
    university:{type:String},                   // If this is an university mcq
    year:{type:String},                         // the year this question is from
    shift:{type:String}                         // if it has any shift
  }],
  question: { type: String, required: true },
  options: [{ type: String, required: true }],  // Array of 4 or 5 options
  answer: { type: String, required: true },   // Correct answer
  explanation: { type: String },                // Explanation for the answer
  isValid: { type: Boolean, default: true },
});

export const BookMCQ = mongoose.models.BookMCQ || mongoose.model('BookMCQ', QuestionSchema);
