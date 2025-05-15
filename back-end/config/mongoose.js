const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(
  process.env.MONGO_DB_STRING
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to the database"));
db.once("open", () => {
  console.log("Successfully connected to the database");
});

module.exports = db;