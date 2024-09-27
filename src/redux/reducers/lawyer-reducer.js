import { createSlice } from "@reduxjs/toolkit";

const lawyerSlice = createSlice({
  name: "lawyer",
  initialState: [],
  reducers: {
    setLawyer(state, action) {
      return action.payload;
    },
  },
});
export const { setLawyer } = lawyerSlice.actions;
export default lawyerSlice.reducer;
