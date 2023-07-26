const Interview = require('../models/interview');
const Student = require('../models/students');
const InterviewResult = require('../models/interview_results');




module.exports.addInterview = async (req, res) => {
  console.log(req.body);
  const { company, date } = req.body;
  try {
    const existingInterview = await Interview.findOne({ company, date });

    if (existingInterview) {
      return res.status(201).json({ message: "Already scheduled" });
    }

    const interview = await Interview.create({
      company,
      date,
    });

    return res.status(200).json(interview);
  } catch (error) {
    console.log("Error in scheduling an interview --->", error);
    return res.status(500).json({ message: "Can't schedule interview" });
  }
};



module.exports.allocateStudent = async (req, res) => {
  try {
    const studentExists = await Student.findById(req.body.studentId);
    if (!studentExists) {
      console.log("Invalid student id");
      return res.status(400).json({ message: "Invalid student id" });
    }

    const interviewExists = await Interview.findById(req.body.interviewId);
    if (!interviewExists) {
      console.log("Invalid interview id");
      return res.status(400).json({ message: "Invalid interview id" });
    }

    const interviewResult = await InterviewResult.create({
      student: req.body.studentId,
      interview: req.body.interviewId,
    });

    studentExists.interviewResults.push(interviewResult._id);
    interviewExists.interviewResults.push(interviewResult._id);

    await studentExists.save();
    await interviewExists.save();
    return res.status(200).json({ message: "Student scheduled for interview successfully" });
  } catch (error) {
    console.log("Failed to allocate student to an interview--->", error);
    return res.status(500).json({ message: "Failed to allocate student" });
  }
};



module.exports.getResults = async (req, res) => {
  try {
    const { interviewId } = req.query;
    const interview = await Interview.findById(interviewId)
      .populate({
        path: 'interviewResults',
        populate: {
          path: 'student',
          model: 'Student',
        },
        select: '-interview', // Exclude the interview field from interviewResults
      })
      .lean();
    if (!interview) {
      return res.status(201).json({ message: "Cant find interview" });
    }

    return res.status(200).json(interview.interviewResults);
  } catch (error) {
    console.log('Error fetching interview results:', error);
    return res.status(500).json({ message: 'Failed to fetch interview results' });
  }
};





module.exports.updateResult = async (req, res) => {
  const { studentId, status, interviewId } = req.body;

  
  try {
    const updateResult = await InterviewResult.findOneAndUpdate(
      {
        student: studentId,
        interview: interviewId
      },
      {
        $set: { result: status }
      },
      { new: true }
    );

    if (!updateResult) {
      console.log("Unsuccessful - Interview result not found.");
      return res.status(404).json({ message: "Interview result not found." });
    }
    console.log('Successful - Interview result updated:', updateResult);
    return res.status(200).json({ message: "Interview result updated successfully." });
  } catch (error) {
    console.log("Error in updating the result", error);
    return res.status(500).json({ message: "Error updating interview result." });
  }
}







