const express = require('express');
const port = 3001 ;
const homeRotes = require('./routes/homeRoutes') ;
const db = require("./config/mongoose");
const passport = require("passport");
require("dotenv").config();
const app = express();
const cors = require("cors");
const http = require("http");
const path = require("path");

const server = http.createServer(app);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend address
    credentials: true, // if you're using cookies or HTTP auth
  })
);

require("./config/socket")(server);

const cron = require("node-cron");
const remindUpcomingAppointments = require("./cron/remainderJob");
// Every 30 minutes
cron.schedule("*/60 * * * *", async () => {
  console.log("Running reminder job...");
  //   await remindUpcomingAppointments();
});
require("./config/passport"); // ← just require it
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRotes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});