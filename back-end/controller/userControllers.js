const User = require('../model/user') ;
const BlacklistedToken = require("../model/blackListToken");
const jwt = require("jsonwebtoken");
const Appoinment = require("../model/appointment");

exports.userSignupController = async (req, res) => {
  try {
    const { name, email, password, phone, age } = req.body;

    if (!name || !email || !password || !phone || !age) {
      return res.status(400).json({
        message: "All fields are required",
        status: 400,
      });
    }
    const isUserExit = await User.findOne({ email: email });
    if (isUserExit.length > 0) {
      return res.status(400).json({
        message: "User already exists",
        status: 400,
      });
    }

    const user = await User.create({
      name: name,
      email: email,
      password: password,
      phone: phone,
      age: age,
    });

    console.log(user);
    if (user) {
      return res.status(201).json({
        message: "User created successfully",
        status: 201,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      status: 500,
    });
  }
};

exports.userSigninController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        status: 400,
      });
    }

    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
        status: 400,
      });
    }

    const token = jwt.sign(
      { _id: user._id }, // <-- user._id here, not user._id on an array
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );
    console.log(token, "token");

    return res.json({ token });
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

exports.updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, age } = req.body;

    if (!name || !email || !password || !phone || !age) {
      return res.status(400).json({
        message: "All fields are required",
        status: 400,
      });
    }
    const user = await User.findByIdAndUpdate(req.user._id, {
      name: name,
      email: email,
      password: password,
      phone: phone,
      age: age,
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        status: 400,
      });
    }
    // const updatedUser = await User.findById(req.user._id) ;
    // if(!updatedUser){
    //     return res.status(400).json({
    //         message : "User not found" ,
    //         status : 400
    //     })
    // }
    return res.status(200).json({
      message: "User updated successfully",
      status: 200,
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      status: 500,
    });
  }
};

exports.signOutController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    // Add token to blacklist
    await BlacklistedToken.create({
      token,
      expiresAt: new Date(decoded.exp * 1000),
    });

    return res.status(200).json({
      message: "User signed out successfully",
      status: 200,
    });
  } catch (err) {
    console.error("Signout error:", err);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};

exports.getAppoinmentsController = async (req, res) => {
  try {
    const appoinments = await Appoinment.find({
      userId: req.user._id,
    }).populate({
      path: "docId",
      select: "-password -__v -_id",
    });
    return res.status(200).json({
      message: "All appointments fetched successfully",
      data: appoinments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      status: 500,
    });
  }
};