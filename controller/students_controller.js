const Student = require('../models/students');




module.exports.addStudent = async (req, res) => {

  console.log(req.body)
  try {
    const { name, batch, college, status, DSA_Score, WebD_Score, React_Score } = req.body;

    // Check if a student with the same combination of identifiers already exists
    const existingStudent = await Student.findOne({
      name,
      batch,
      college,
      status,
      "course_scores.DSA_Score": DSA_Score,
      "course_scores.WebD_Score": WebD_Score,
      "course_scores.React_Score": React_Score
    });

    if (existingStudent) {
      // return res.status(409).json({ message: 'Student with same details already exists' });
      return res.redirect('back')
    }

    // If the student does not exist, create a new one
    const createdStudent = await Student.create({
      name,
      batch,
      college,
      status,
      course_scores: {
        DSA_Score,
        WebD_Score,
        React_Score
      }
    });
    return res.redirect('back')
  } catch (err) {
    console.log("Error in adding student --->", err);
    // return res.status(500).json({ message: "Can't create student" });
    return res.redirect('back');
  }
}


module.exports.getStudents = async (req, res) => {
  try {
    const batchSize = 10;
    let offset = parseInt(req.query.offset) || 0;

    const students = await Student.find().sort({ name: 1 }).skip(offset).limit(batchSize);
    return res.status(200).json(students);
  } catch (err) {
    console.log("Error in fetching students --->", err);
    return res.status(500).json({ message: "Can't fetch student" });
  }
}


module.exports.updateData = async (req, res) => {
  try {
    console.log(req.body);
    const { studentId, status } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(studentId, {
      $set: {
        status: status
      }
    })

    if(!updatedStudent){
      return res.status(404).json({message:'Student not found'})
    }
    return res.status(200).json(updatedStudent);
  } catch (error) {
    console.log("Error in updating student --->", error);
    return res.status(500).json({ message: "Can't update student" });
  }
}


// module.exports.addStudent =async(req,res)=>{

// }



