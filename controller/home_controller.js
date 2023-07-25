
const Student = require('../models/students');


function getFormattedDate(dateString) {
  
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    // Return the formatted date as "Month Year" (e.g., "July 2023")
    return `${month} ${year}`;
  }


module.exports.home = async (req, res) => {
    try {
        const student = await Student.find().sort({ name: 1 }).limit(10);
        if (!student) {
            console.log("Can't find Students");
            return res.redirect('back')
        }
        return res.render('students', {
            title: "Students Database",
            students: student,
            formatDate:getFormattedDate
        })
    } catch (err) {
        console.log('Error in rendering home page', err)
        return res.redirect('/')
    }
}




