 

const mongoose = require('mongoose');

const courseScoresSchema = new mongoose.Schema({
  DSA_Score: {
    type: Number,
    default: 0,
  },
  WebD_Score: {
    type: Number,
    default: 0,
  },
  React_Score: {
    type: Number,
    default: 0,
  },
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: Date,
    required: true,
  },
  college: {
    type: String,
  },
  status: {
    type: String,
    enum: ['placed', 'not_placed'],
    default: 'not_placed',
  },
  course_scores: {
    type: courseScoresSchema,
    default: {},
  },
  interviewResults: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InterviewResult',
    },
  ],
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;


