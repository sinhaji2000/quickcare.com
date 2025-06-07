const express = require('express');
const router = express.Router();
const userControllers = require('../controller/userControllers') ;
const appointmentControllers = require("../controller/appointmentControllers");
const passport = require("passport");
const upload = require("../config/multer");

router.post(
  "/signup",
  upload.single("profilePic"),
  userControllers.userSignupController
);
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

router.post("/signout", userControllers.signOutController);

router.get(
  "/get-appointments",
  passport.authenticate("user-jwt", { session: false }),
  userControllers.getAppoinmentsController
);

router.get("/get-doc-details/:id", userControllers.getDocDetailsCOntroller);
router.get("/search-doctors", userControllers.searchDocController);

module.exports = router ;