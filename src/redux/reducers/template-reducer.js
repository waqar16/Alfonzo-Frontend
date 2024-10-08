import { createSlice } from "@reduxjs/toolkit";

const templateSlice = createSlice({
  name: "template",
  initialState: {},
  reducers: {
    setTemplate(state, action) {
      return action.payload;
    },
    // removeTemplate(state, action) {
    //   return {};
    // },
  },
});
export const { setTemplate, removeTemplate } = templateSlice.actions;
export default templateSlice.reducer;
