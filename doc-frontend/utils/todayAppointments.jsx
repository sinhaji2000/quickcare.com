import { createSlice } from "@reduxjs/toolkit";

const todayAppointmentsSlice = createSlice({
  name: "todayAppointments",
  initialState: {
    appointments: [],
  },
  reducers: {
    setTodayAppointments: (state, action) => {
      state.appointments = action.payload;
    },
  },
});

export const { setTodayAppointments } = todayAppointmentsSlice.actions;

export default todayAppointmentsSlice.reducer;
