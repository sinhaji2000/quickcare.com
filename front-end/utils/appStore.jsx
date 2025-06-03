// appStore.jsx
import { configureStore } from "@reduxjs/toolkit";
import logedinUser from "./logedinUser"; // this is your slice reducer

const appStore = configureStore({
  reducer: {
    logedinUser: logedinUser, // <--- fix: must be under reducer
  },
});

export default appStore;
