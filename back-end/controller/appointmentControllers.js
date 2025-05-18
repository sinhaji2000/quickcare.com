const Appointment = require("../model/appointment");
const User = require("../model/user");
const Doc = require("../model/doc");

exports.bookApoinmentController = async (req, res) => {
  try {
    const { docId, date } = req.body;
    const userId = req.user._id;

    const doc = await Doc.findById(docId);

    if (!doc.availability) {
      return res.status(400).json({
        message: "Doctor is not available today",
        status: 400,
      });
    }

    const bookingDate = new Date(date);
    const startOfDay = new Date(bookingDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(bookingDate);
    endOfDay.setHours(23, 59, 59, 999);
    const day = bookingDate.toLocaleDateString("en-US", { weekday: "long" });
    if (doc.blockedDays.includes(day)) {
      return res
        .status(400)
        .json({ message: `No appointments allowed on ${day}` });
    }

    const count = await Appointment.countDocuments({
      docId: docId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (count >= doc.dailyLimit) {
      doc.availability = false;
      await doc.save();

      return res
        .status(400)
        .json({ message: "Appointment limit reached for today" });
    }

    const appointment = new Appointment({
      docId: docId,
      userId: userId,
      date: bookingDate,
    });
    await appointment.save();

    return res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
