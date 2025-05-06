/** @format */
/** @format */

import React, { useEffect } from "react";
import { ShoppingCart } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../slice/userSlice";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { clearTheCart } from "../slice/cartSlice";
interface NavbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
function Navbar({ open, setOpen }: NavbarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state: RootState) => state.Users);
  function handleCart() {
    setOpen(!open);
  }
  useEffect(() => {
    if (!currentUser.isAuthenticated) navigate("/login");
  }, [currentUser.isAuthenticated]);

  function handleLogout() {
    dispatch(clearTheCart());
    dispatch(logout());
  }
  function handleClick() {
    navigate("/home");
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
        </div>
      )}
    </div>
  );
}

export default Navbar;
