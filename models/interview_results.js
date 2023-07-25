
const mongoose = require('mongoose');

const interviewResultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true,
  },
  result: {
    type: String,
    enum: ['PASS', 'FAIL', 'On Hold', 'Didn’t Attempt'],
    default: 'Didn’t Attempt',
  },
});

const InterviewResult = mongoose.model('InterviewResult', interviewResultSchema);
module.exports = InterviewResult;


