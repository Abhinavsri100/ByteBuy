/** @format */

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import cartSlice from "../slice/cartSlice";
import modeSlice from "../slice/modeSlice";
export const store = configureStore({
  reducer: {
    Users: userSlice,
    Cart: cartSlice,
    Mode: modeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
