const express = require('express') ;
const router = express.Router()
const docController = require("../controller/docControllers");

router.post("/signup", docController.docSignupController);

module.exports = router;