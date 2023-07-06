import { configureStore } from "@reduxjs/toolkit";
import bmiSlice from "../modules/bmi";

const store = configureStore({
  reducer: {
    bmiSlice,
  },
});

export default store;
