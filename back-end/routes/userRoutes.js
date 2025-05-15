const express = require('express');
const router = express.Router();
const userControllers = require('../controller/userControllers') ;
const passport = require('passport') ;



router.post('/signup' , userControllers.userSignupController) ;
router.post('/signin'  ,userControllers.userSigninController);
router.get('/profile' , passport.authenticate('jwt', { session: false }), userControllers.profileController) ;

module.exports = router ;