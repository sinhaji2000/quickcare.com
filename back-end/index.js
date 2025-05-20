const express = require('express');
const port = 3001 ;
const homeRotes = require('./routes/homeRoutes') ;
const db = require("./config/mongoose");
const passport = require("passport");
require("dotenv").config();
const app = express();

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


app.listen(port , () =>{
    console.log(`Server is running on port ${port}`) ;
})