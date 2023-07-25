const express = require('express');
const router = express.Router();

const interviewController =require('../controller/interview_controller')
router.post('/add',interviewController.addInterview );
router.get('/get-results',interviewController.getResults);
router.post('/allocate',interviewController.allocateStudent)
router.post('/update-result',interviewController.updateResult);
module.exports = router;