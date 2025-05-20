const express = require('express');

const router = express.Router();
const userRoutes = require("./userRoutes");
const docRoutes = require("./docRoutes");
const Doc = require("../model/doc");

router.get("/", async (req, res) => {
  try {
    const doc = await Doc.find().select("-password  -_id -__v");
    return res.status(200).json({
      message: "Welcome to the home page",
      status: 200,
      doc,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Error",
      status: 500,
    });
  }
});
router.use("/user", userRoutes);
router.use("/doc", docRoutes);

module.exports = router;