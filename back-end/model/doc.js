const mongoose = require('mongoose') ;

const docSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  speclization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  dailyLimit: {
    type: Number,
    default: 5,
  },
  // how many appointments allowed per day
  blockedDays: {
    type: [String],
    default: ["Monday"],
  },
  address: {
    house_No: {
      type: String,
    },
    locality: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
  },
});

const Doc = mongoose.model('Doc' , docSchema) ;
module.exports = Doc;