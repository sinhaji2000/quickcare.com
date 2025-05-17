const express = require('express') ;
const router = express.Router()
const docController = require("../controller/docControllers");
const passport = require("passport");

router.post("/signup", docController.docSignupController);
router.post("/signin", docController.docSigninController);
router.get(
  "/profile",
  passport.authenticate("doc-jwt", { session: false }),
  docController.profileController
);

router.get(
  "/appoinments",
  passport.authenticate("doc-jwt", { session: false }),
  docController.getAppoinmentsController
);


module.exports = router;
