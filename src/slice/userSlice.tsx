/** @format */


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  firstName: string;
  lastName?: string;
  email: string;
  password?: string;
}

interface UserAuthState {
  isAuthenticated: boolean;
  userDetails: UserState | null;
}
const parsedUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser") || "{}")
  : null;
const initialState: UserAuthState = {
  isAuthenticated: parsedUser?.isAuthenticated || false,
  userDetails: parsedUser?.userDetails || null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<UserState>) => {
      const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const newListOfUsers = [...allUsers, action.payload];
      localStorage.setItem("users", JSON.stringify(newListOfUsers));
    },
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const users: UserState[] = JSON.parse(
        localStorage.getItem("users") || "[]"
      );
      const existingUser = users.find(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      if (existingUser) {
        state.isAuthenticated = true;
        state.userDetails = {
          email: existingUser.email,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          password: existingUser.password,
        };
        localStorage.setItem("currentUser", JSON.stringify(state));
      } else {
        alert("Invalid credentials");
      }
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.userDetails = null;
      localStorage.removeItem("cart");
      localStorage.removeItem("currentUser");
    },
  },
});

export const { signup, login, logout } = userSlice.actions;
export default userSlice.reducer;
