import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: "English",
  reducers: {
    setLanguage(state, action) {
      return action.payload;
    },
  },
});
export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
