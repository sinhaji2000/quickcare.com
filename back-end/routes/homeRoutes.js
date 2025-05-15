const express = require('express');

const router = express.Router();
const userRoutes = require("./userRoutes");
const docRoutes = require("./docRoutes");

router.use("/user", userRoutes);
router.use("/doc", docRoutes);

module.exports = router;