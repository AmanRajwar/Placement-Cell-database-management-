const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>working fine</h1>')
})

// router.use('/jobs', require('./jobs'))/*  this route is used when any event happens in jobs page  */
router.use('/interview', require('./interview'))/*  this route is used to create, and get INTERVIEWS  */
router.use('/students', require('./students'));/*  this route is used to create, update, and get students  */
router.use('/home',require('./home'));/*  renders the home page for students  */
module.exports = router;