const Appointment = require('../model/appointment') ;
const Doc = require('../model/doc') ;
const User = require('../model/user') ;
const sendEmail = require('../config/node_mailer') ;


const remindUpcomingAppointments = async () => {
  const now = new Date();
  const in3Hours = new Date(now.getTime() + 3 * 60 * 60 * 1000);

  const upcomingAppointments = await Appointment.find({
    date: { $gte: now, $lte: in3Hours },
    reminderSent: false,
  });

  for (const appt of upcomingAppointments) {
    const user = await User.findById(appt.userId);
    const doctor = await Doc.findById(appt.docId);

    const message = `Hi ${user.name}, this is a reminder for your appointment with Dr. ${doctor.name} at ${appt.timeSlot} today.`;

    // Send email
    await sendEmail(user.email, "Appointment Reminder", message);

    // You can add SMS here if you use Twilio

    appt.reminderSent = true;
    await appt.save();
  }
};

module.exports = remindUpcomingAppointments;
