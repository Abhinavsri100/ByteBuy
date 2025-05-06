/** @format */

import React, { useState } from "react";
import { useAppDispatch } from "../hooks";
import { addToCart, removeFromCart } from "../slice/cartSlice";

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

function CartItem(item: Product) {
  const [quant, setQuant] = useState(0);
  const dispatch = useAppDispatch();

  const increaseQuantity = () => {
    dispatch(addToCart(item));
    setQuant(item.quantity);
  };

  const decreaseQuantity = () => {
    dispatch(removeFromCart(item));
    setQuant(item.quantity);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border">
      {/* Image */}
      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col items-start md:items-start">
        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{item.category}</p>
        <p className="text-md font-bold text-green-600 mt-2">${item.price}</p>
        <div className="text-yellow-500 text-sm mt-1">
          ⭐ {item.rating.rate} ({item.rating.count})
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={decreaseQuantity}
          className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          -
        </button>
        <span className="px-3 py-1 border rounded text-sm">
          {item.quantity}
        </span>
        <button
          onClick={increaseQuantity}
          className="px-2 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default CartItem;
