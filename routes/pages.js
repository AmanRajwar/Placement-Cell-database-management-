const express = require('express');
const passport = require('passport')
const router = express.Router();

const csvController = require('../controller/csv_controller');
const pagesController =require('../controller/pages_controller')

router.get('/add-student', passport.checkAuthentication,pagesController.addStudentPage);
router.get('/render-interviews',passport.checkAuthentication,pagesController.renderInterviews);
router.get('/jobs',passport.checkAuthentication,pagesController.getJobs)
router.get('/download-csv',passport.checkAuthentication, csvController.downloadCsv);
module.exports = router;