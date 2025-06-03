const express = require('express');

const router = express.Router();
const userRoutes = require("./userRoutes");
const docRoutes = require("./docRoutes");
const Doc = require("../model/doc");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const doctors = await Doc.find().skip(skip).limit(limit);
    const totalDoctors = await Doc.countDocuments();

    return res.status(200).json({
      message: "Doctors fetched successfully",
      status: 200,
      data: doctors,
      totalPages: Math.ceil(totalDoctors / limit),
      currentPage: page,
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