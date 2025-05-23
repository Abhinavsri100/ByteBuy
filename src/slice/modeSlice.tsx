/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface M {
  mode: String;
}
const initialState: M = {
  mode: localStorage.getItem("mod")
    ? JSON.parse(localStorage.getItem("mod") || "")
    : "",
};
const modeSlice = createSlice({
  name: "Mode",
  initialState,
  reducers: {
    setLight: (state, action: PayloadAction<M>) => {
      state.mode = "light";
      localStorage.setItem("mode", "light");
    },
    setDark: (state, action: PayloadAction<M>) => {
      state.mode = "dark";
      localStorage.setItem("mode", "dark");
    },
  },
});
export const { setLight, setDark } = modeSlice.actions;
export default modeSlice.reducer;
