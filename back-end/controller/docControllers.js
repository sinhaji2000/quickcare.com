const Doc = require("../model/doc");
const jwt = require("jsonwebtoken");
const appoinments = require("../model/appointment");

exports.docSignupController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      age,
      speclization,
      experience,
      dailyLimit,
      startHour,
      endHour,
      timePerUser,
      address,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !age ||
      !speclization ||
      !experience ||
      !dailyLimit ||
      !startHour ||
      !endHour ||
      !timePerUser ||
      !address
    ) {
      return res.status(400).json({
        message: "All fields are required",
        status: 400,
      });
    }

    const { house_No, locality, city, pinCode } = address;
    if (!house_No || !locality || !city || !pinCode) {
      return res.status(400).json({
        message: "All address fields are required",
        status: 400,
      });
    }
    const doc = await Doc.create({
      name,
      email,
      password,
      phone,
      age,
      speclization,
      experience,
      dailyLimit,
      startHour,
      endHour,
      timePerUser,
      address: {
        house_No,
        locality,
        city,
        pinCode,
      },
    });
    if (!doc) {
      return res.status(400).json({
        message: "Doc not created",
        status: 400,
      });
    }
    return res.status(201).json({
      message: "Doc created successfully",
      status: 201,
      doc,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      status: 500,
    });
  }
};

exports.docSigninController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        status: 400,
      });
    }

    const doc = await Doc.findOne({ email: email, password: password });
    if (!doc) {
      return res.status(400).json({
        message: "Invalid credentials",
        status: 400,
      });
    }
    const token = jwt.sign(
      { _id: doc._id }, // <-- user._id here, not user._id on an array
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "10y",
      }
    );
    console.log(token, "token");
    return res.status(200).json({
      message: "Doc signed in successfully",
      status: 200,
      doc,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      status: 500,
    });
  }
};

exports.profileController = async (req, res) => {
  return res.json({ user: req.user });
};

exports.getAppoinmentsController = async (req, res) => {
  try {
    const docId = req.user._id;
    const appoinmentsList = await appoinments.find({ docId: docId }).populate({
      path: "userId",
      select: "-password -__v -_id",
    });
    if (!appoinmentsList) {
      return res.status(400).json({
        message: "No appoinments found",
        status: 400,
      });
    }
    return res.status(200).json({
      message: "Appoinments fetched successfully",
      status: 200,
      appoinmentsList,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      status: 500,
    });
  }
};

