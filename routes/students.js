const express = require('express');
const router = express.Router();

const studentController =require('../controller/students_controller');

router.post('/add-student', studentController.addStudent);
router.get('/get-student',studentController.getStudents);
router.post('/update-data',studentController.updateData)
module.exports = router;