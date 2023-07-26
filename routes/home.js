const express = require('express');
const passport =require('passport')
const router = express.Router();

const homeController =require('../controller/home_controller')
router.get('/',passport.checkAuthentication,homeController.home );
router.use('/page',require('./pages'))

module.exports = router;