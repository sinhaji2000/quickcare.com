const User = require('../model/user') ;
const BlacklistedToken = require("../model/blackListToken");
const jwt = require("jsonwebtoken");
const Appoinment = require("../model/appointment");
const sendEmail = require("../config/node_mailer");
const useragent = require("useragent");
const geoip = require("geoip-lite");
const Doc = require("../model/doc");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");

exports.userSignupController = async (req, res) => {
  try {
    const { name, email, gender, phone, age, password } = req.body;
    const profilePic = req.file ? req.file.path : null; // Safe acce
    console.log(req.file);
    if (!name || !email || !password || !phone || !age) {
      return res.status(400).json({
        message: "All fields are required",
        status: 400,
      });
    }
    const isUserExit = await User.findOne({ email: email });
    if (isUserExit) {
      return res.status(400).json({
        message: "User already exists",
        status: 400,
      });
    }

    const user = await User.create({
      name: name,
      email: email,
      gender: gender,
      phone: phone,
      age: age,
      profilePic: profilePic,
      password: password,
    });

    // console.log(user);
    if (user) {
      // Send email to user
      const message = `Hi ${user.name}, welcome to our service! Your account has been created successfully.`;
      await sendEmail(user.email, "Welcome to Our Service", message);
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

    const agent = useragent.parse(req.headers["user-agent"]);
    const systemInfo = `${agent.os.toString()} - ${agent.toAgent()}`;
    console.log("System Info:", systemInfo);

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const geo = geoip.lookup(ip);

    const locationInfo = geo
      ? `${geo.city}, ${geo.region}, ${geo.country}`
      : "Location unavailable";

    console.log("IP Address:", ip);
    console.log("Location Info:", locationInfo);

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        status: 400,
      });
    }

    const user = await User.findOne({
      email: email,
      password: password,
    }).select("-__v -password");
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
        expiresIn: "10y",
      }
    );
    console.log(token, "token");
    // Send email to user
    const message = `
    Hi ${user.name},
    
    A login to your account was detected:
    
    📍 **Location**: ${locationInfo}
    💻 **System**: ${systemInfo}
    🌐 **IP Address**: ${ip}
    🕒 **Time**: ${new Date().toLocaleString()}
    
    If this wasn't you, please secure your account immediately.
    
    Thanks,
    Your quickcare.com Team
    `;
    await sendEmail(user.email, "Login Notification", message);

    return res.json({ token, user: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      status: 500,
    });
  }
};

exports.profileController = async (req, res) => {
  const appoinments = await Appoinment.find({
    userId: req.user._id,
  }).populate("docId", "-password  -__v ");
  const { password, __v, ...userWithoutPassword } = req.user.toObject(); // Exclude password

  return res.json({ user: userWithoutPassword, appointments: appoinments });
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

exports.getDocDetailsCOntroller = async (req, res) => {
  try {
    const docId = req.params.id;
    console.log(docId);
    const doc = await Doc.findById(docId).select("-password -__v ");
    console.log(doc);
    if (!doc) {
      return res.status(400).json({
        message: "Doctor not found",
        status: 400,
      });
    }
    return res.status(200).json({
      message: "Doctor details fetched successfully",
      data: doc,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      status: 500,
    });
  }
};

exports.searchDocController = async (req, res) => {
  try {
    const { name, specialization, address, page = 1, limit = 3 } = req.query;

    const searchCriteria = [];

    if (name) searchCriteria.push({ name: new RegExp(name, "i") });
    if (specialization)
      searchCriteria.push({ speclization: new RegExp(specialization, "i") });
    if (address) {
      const addressRegex = new RegExp(address, "i");
      const addressOrConditions = [
        { "address.city": addressRegex },
        { "address.locality": addressRegex },
      ];

      if (!isNaN(address)) {
        addressOrConditions.push({ "address.pinCode": Number(address) });
      }

      searchCriteria.push({ $or: addressOrConditions });
    }

    if (searchCriteria.length === 0) {
      return res.status(400).json({
        message: "At least one search field is required",
        status: 400,
      });
    }

    const query = { $or: searchCriteria };

    const total = await Doc.countDocuments(query); // total matches
    const docs = await Doc.find(query)
      .select("-password -__v")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    if (docs.length === 0) {
      return res.status(404).json({
        message: "No doctors found",
        status: 404,
      });
    }

    return res.status(200).json({
      message: "Doctors found successfully",
      data: docs,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      status: 500,
    });
  }
};

