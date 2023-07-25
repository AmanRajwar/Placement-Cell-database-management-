const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const iconv = require('iconv-lite'); // Import the iconv-lite library

const Student = require('../models/students');
const InterviewResult = require('../models/interview_results');
const Interview = require('../models/interview');

// Define the CSV headers
const csvWriter = createCsvWriter({
  path: 'students_data.csv',
  header: [
    { id: 'studentId', title: 'Student id' },
    { id: 'studentName', title: 'Student name' },
    { id: 'studentCollege', title: 'Student college' },
    { id: 'studentStatus', title: 'Student status' },
    { id: 'dsaFinalScore', title: 'DSA Final Score' },
    { id: 'webDFinalScore', title: 'WebD Final Score' },
    { id: 'reactFinalScore', title: 'React Final Score' },
    { id: 'interviewDate', title: 'Interview date' },
    { id: 'interviewCompany', title: 'Interview company' },
    { id: 'interviewStudentResult', title: 'Interview student result' },
  ],
});



exports.downloadCsv = async (req, res) => {
    try {
      // Fetch all data from the database
      const students = await Student.find()
        .populate({
          path: 'interviewResults',
          model: InterviewResult,
          populate: {
            path: 'interview',
            model: Interview,
          },
        })
        .exec();
  
      // Process the data and create the CSV rows
      const csvRows = [];
      students.forEach((student) => {
        student.interviewResults.forEach((interviewResult) => {
          const interview = interviewResult.interview;
          const csvRow = {
            studentId: student._id,
            studentName: student.name,
            studentCollege: student.college,
            studentStatus: student.status,
            dsaFinalScore: student.course_scores.DSA_Score,
            webDFinalScore: student.course_scores.WebD_Score,
            reactFinalScore: student.course_scores.React_Score,
            interviewDate: interview.date,
            interviewCompany: interview.company,
            interviewStudentResult:iconv.encode(interviewResult.result, 'utf8').toString(), 
          };
          csvRows.push(csvRow);
        });
      });
  
      // Write the data to the CSV file
      csvWriter.writeRecords(csvRows).then(() => {
        // Download the CSV file
        res.download('students_data.csv', (err) => {
          if (err) {
            console.error('Error downloading CSV:', err);
          } else {
            console.log('CSV file has been downloaded successfully.');
          }
        });
      });
    } catch (error) {
      console.error('Error generating CSV:', error);
      res.status(500).send('Error generating CSV');
    }
  };
  
