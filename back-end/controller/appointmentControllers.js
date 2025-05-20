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
    const existingBooking = await Appointment.findOne({
      docId,
      userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });
    if (existingBooking) {
      return res.status(400).json({
        message: "You already have an appointment with this doctor today.",
      });
    }
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
      // doc.availability = false;
      // await doc.save();

      return res
        .status(400)
        .json({ message: "Appointment limit reached for today" });
    }

    // Parse doctor's time range
    const [startHour, startMin] = doc.startHour.split(":").map(Number);
    const [endHour, endMin] = doc.endHour.split(":").map(Number);
    const timePerUser = doc.timePerUser;

    const docStart = new Date(date);
    docStart.setHours(startHour, startMin, 0, 0);

    const slotStart = new Date(docStart);
    slotStart.setMinutes(slotStart.getMinutes() + count * timePerUser);

    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + timePerUser);

    // Check if the slot is within working hours
    const docEnd = new Date(date);
    docEnd.setHours(endHour, endMin, 0, 0);

    if (slotEnd > docEnd) {
      return res.status(400).json({ message: "No available time slots" });
    }

    const formattedSlot = `${slotStart.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${slotEnd.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    const appointment = new Appointment({
      docId: docId,
      userId: userId,
      date: bookingDate,
      timeSlot: formattedSlot,
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
