const express = require('express');
const router = express.Router();
const userControllers = require('../controller/userControllers') ;
const appointmentControllers = require("../controller/appointmentControllers");
const passport = require("passport");

router.post("/signup", userControllers.userSignupController);
router.post("/signin", userControllers.userSigninController);
router.get(
  "/profile",
  passport.authenticate("user-jwt", { session: false }),
  userControllers.profileController
);
router.post(
  "/update-profile",
  passport.authenticate("user-jwt", { session: false }),
  userControllers.updateProfileController
);

router.post(
  "/book-appointment",
  passport.authenticate("user-jwt", { session: false }),
  appointmentControllers.bookApoinmentController
);

module.exports = router ;