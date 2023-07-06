const { createSlice } = require("@reduxjs/toolkit");

const initialState = 0;
const bmiSlice = createSlice({
  name: "bmi",
  initialState,
  reducers: {
    bmiCalculator: (state, action) => {
      return (state = action.payload.weight / (action.payload.height / 100) ** 2);
    },
    resetBmi: (state) => {
      return (state = 0);
    },
  },
});

export const { bmiCalculator, resetBmi } = bmiSlice.actions;
export default bmiSlice.reducer;
