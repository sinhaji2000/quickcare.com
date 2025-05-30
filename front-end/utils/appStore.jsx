import { configureStore } from "@reduxjs/toolkit";
import todatAppointmentReducer from './todayAppointmentSlice';


const appStore = configureStore({
    todayAppointments : todatAppointmentReducer,
})

export default appStore ;