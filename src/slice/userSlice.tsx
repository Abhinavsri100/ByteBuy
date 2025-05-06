/** @format */

// /** @format */

// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// // import type { RootState } from "../redux/store";
// interface userState {
//   firstName: String;
//   lastName?: String;
//   email: String;
//   password?: String;
// }
// interface userAuthState {
//   isAuthenticated: boolean;
//   userDetails: userState | null;
// }
// const initialState = {
//   isAuthenticated: false,
//   userDetails: null,
// };
// const userSlice = createSlice({
//   name: "User",
//   initialState,
//   reducers: {
//     signup: (state, action: PayloadAction<userState>) => {
//       const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
//       console.log(allUsers);
//       const newListOfUsers = [...allUsers, action.payload];

//       localStorage.setItem("users", JSON.stringify(newListOfUsers));
//     },
//     login: (
//       state,
//       action: PayloadAction<{ email: string; password: string }>
//     ) => {
//       const users: userState[] = JSON.parse(
//         localStorage.getItem("users") || "[]"
//       );
//       const existingUser = users.find(
//         (user) =>
//           user?.email === action.payload.email &&
//           user?.password === action.payload.password
//       );
//       if (existingUser) {
//         state.isAuthenticated = true;
//         state.userDetails = {
//           email: existingUser.email,
//           firstName: existingUser.firstName,
//           lastName: existingUser.lastName,
//         };
//         localStorage.setItem("currentUser", JSON.stringify(state));
//       } else {
//         alert("Invalid credentials");
//       }
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.userDetails = null;
//       localStorage.removeItem("currentUser");
//     },
//   },
// });
// export const { signup, login, logout } = userSlice.actions;
// export default userSlice.reducer;
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
    setUser: (state, action: PayloadAction<UserState>) => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "");
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users?.find(
        (user: UserState) =>
          user.email === currentUser?.email &&
          user.password === currentUser.password
      );
      state.isAuthenticated = true;
      state.userDetails = existingUser;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userDetails = null;
      localStorage.removeItem("cart");
      localStorage.removeItem("currentUser");
    },
  },
});

export const { signup, login, logout, setUser } = userSlice.actions;
export default userSlice.reducer;
