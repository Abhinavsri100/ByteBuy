/** @format */

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../redux/store";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { clearTheCart } from "../slice/cartSlice";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
}

interface NavbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function Cart({ open, setOpen }: NavbarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cI = useAppSelector((state: RootState) => state.Cart);
  const [cartItem, setCartItem] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCartItem(cI);
    let t = 0;
    for (let i = 0; i < cI.length; i++) {
      t += cI[i].price * cI[i].quantity;
    }
    setTotal(t);
  }, [cI]);
  function handlePayment() {
    dispatch(clearTheCart());
    setOpen(!open);
    navigate("/payment-successful");
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end">
      <div className="w-full md:w-[400px] bg-white shadow-lg h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 text-white px-4 py-3 text-lg font-semibold flex justify-between items-center">
          <span>Cart</span>
          <button
            className="bg-white text-red-600 px-2 py-1 rounded hover:bg-red-100"
            onClick={() => setOpen(!open)}
          >
            Close
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItem.map((c, id) => (
            <div key={id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <CartItem
                id={c.id}
                title={c.title}
                price={c.price}
                description={c.description}
                category={c.category}
                image={c.image}
                rating={c.rating}
                quantity={c.quantity}
              />
            </div>
          ))}
        </div>

        {/* Total and Pay Button */}
        <div className="border-t p-4 bg-gray-50">
          <div className="flex justify-between items-center text-xl font-semibold mb-4">
            <span>Total:</span>
            <span className="text-green-700">${total.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
            onClick={handlePayment}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
