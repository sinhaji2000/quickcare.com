// appStore.jsx
import { configureStore } from "@reduxjs/toolkit";
import todayAppointments from './todayAppointments'
const appStore = configureStore({
  reducer: {
    todayAppointments: todayAppointments, // <--- fix: must be under reducer
  },
});

export default appStore;
