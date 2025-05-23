/** @format */
/** @format */

import React, { useEffect, useState } from "react";
import { Light, LightMode, ShoppingCart } from "@mui/icons-material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../slice/userSlice";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { clearTheCart } from "../slice/cartSlice";
import { setDark, setLight } from "../slice/modeSlice";
interface NavbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
function Navbar({ open, setOpen }: NavbarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<String>("");
  const currentUser = useAppSelector((state: RootState) => state.Users);
  const currentMode = useAppSelector((state: RootState) => state.Mode.mode);
  function handleCart() {
    setOpen(!open);
  }
  useEffect(() => {
    if (!currentUser.isAuthenticated) navigate("/login");
    dispatch(setLight({ mode: "light" }));
  }, [currentUser.isAuthenticated]);

  function handleLogout() {
    dispatch(clearTheCart());
    dispatch(logout());
  }
  function handleClick() {
    navigate("/home");
  }
  function handleModeChange() {
    console.log("first");
    if (currentMode == "light") {
      dispatch(setDark({ mode: "dark" }));
    } else dispatch(setLight({ mode: "light" }));
  }
  return (
    <div className="bg-black px-6 py-4 text-white flex items-center justify-between shadow-md animate-fadeIn">
      <div
        className="text-2xl font-semibold tracking-wide cursor-pointer"
        onClick={handleClick}
      >
        ByteBuy
      </div>
      {currentUser.isAuthenticated && (
        <div className="flex items-center gap-4">
          <div
            className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow-sm uppercase cursor-pointer"
            onClick={handleClick}
          >
            {currentUser?.userDetails?.firstName?.slice(0, 2) || "US"}
          </div>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md transition-all duration-200"
          >
            Logout
          </button>
          <div className="cursor-pointer" onClick={handleCart}>
            <ShoppingCart />
          </div>
          <div className="cursor-pointer" onClick={handleModeChange}>
            {currentMode === "light" ? <DarkModeIcon /> : <LightMode />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
