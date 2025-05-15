const Doc = require("../model/doc");

exports.docSignupController = async (req, res) => {
  try {
    const { name, email, password, phone, age, address } = req.body;

    if (!name || !email || !password || !phone || !age || !address) {
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
