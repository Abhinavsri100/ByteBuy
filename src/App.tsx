/** @format */

import React, { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useAppSelector } from "./hooks";
import { RootState } from "./redux/store";
import Product from "./pages/Product";
import Payment from "./pages/Payment";

function App() {
  const [open, setOpen] = useState(false);
  const userData = useAppSelector(
    (state: RootState) => state.Users.userDetails
  );
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.Users.isAuthenticated
  );
  return (
    <div className="App">
      <Navbar open={open} setOpen={setOpen} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment-successful" element={<Payment />} />
        <Route path="/home" element={<Home open={open} setOpen={setOpen} />} />
        <Route
          path="/product/:id"
          element={<Product open={open} setOpen={setOpen} />}
        />
      </Routes>
    </div>
  );
}

export default App;
