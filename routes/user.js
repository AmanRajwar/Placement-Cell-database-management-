const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersController = require('../controller/users_controller');

router.post('/signup', usersController.signup);
router.post('/signin', passport.authenticate('local', { failureRedirect: '/' }), usersController.signin);
router.get('/sign-out',usersController.destroySession);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
 router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}), usersController.signin);

module.exports = router;