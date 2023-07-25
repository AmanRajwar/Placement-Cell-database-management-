const express = require('express');
const router = express.Router();

const csvController = require('../controller/csv_controller');
const pagesController =require('../controller/pages_controller')

router.get('/add-student',pagesController.addStudentPage);
router.get('/render-interviews',pagesController.renderInterviews);
router.get('/jobs',pagesController.getJobs)
router.get('/download-csv', csvController.downloadCsv);
module.exports = router;