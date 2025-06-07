const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  docId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doc",
    required: true,
  },
  date: {
    type: String, // or Date if preferred, but string like "2025-06-03" is easy to query
    required: true,
  },
  timeSlot: {
    type: String, // e.g., "10:00 - 10:15"
    required: true,
  },
  booked: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

slotSchema.index({ docId: 1, date: 1, timeSlot: 1 }, { unique: true }); // Prevent duplicate slots

module.exports = mongoose.model("Slot", slotSchema);
