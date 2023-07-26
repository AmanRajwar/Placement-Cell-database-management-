const express = require('express');
const router = express.Router();
const usersController = require('../controller/users_controller')

router.get('/',usersController.login );
router.use('/users',require('./user'));
router.use('/interview', require('./interview'))/*  this route is used to create, and get INTERVIEWS  */
router.use('/students', require('./students'));/*  this route is used to create, update, and get students  */
router.use('/home',require('./home'));/*  renders the home page for students  */
module.exports = router;