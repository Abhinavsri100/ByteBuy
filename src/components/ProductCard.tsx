/** @format */

/** @format */
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ToastContainer, toast } from "react-toastify";
import { addToCart } from "../slice/cartSlice";
import { useNavigate } from "react-router-dom";

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
  cat: String;
}

function ProductCard({
  id,
  title,
  description,
  price,
  category,
  image,
  rating,
  cat,
}: Product) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentMode = useAppSelector((state) => state.Mode.mode);
  const [mode, setMode] = useState<String>("");
  function handleProductView() {
    navigate(`/product/${id}`);
  }
  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    dispatch(
      addToCart({
        id,
        title,
        description,
        price,
        category,
        image,
        rating,
        quantity: 1,
      })
    );
    toast("Item Added to the Card");
  }
  return (
    <div
      className={`flex flex-col gap-[1rem] ${
        currentMode === "light" ? "bg-[#F3F4F6]" : "bg-gray-800"
      }`}
    >
      <div className="">
        <ToastContainer />
      </div>
      <div
        className={`flex flex-col h-full  rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 cursor-pointer ${
          currentMode === "light"
            ? "bg-white text-black"
            : "bg-black text-white"
        }`}
      >
        <div
          className={`relative pt-[100%] ${
            currentMode === "light" ? "bg-gray-100" : "bg-gray-950"
          } `}
          onClick={handleProductView}
        >
          <img
            src={image}
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-contain p-4"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col flex-grow p-4">
          <div className="mb-2">
            <span
              className={`px-2 py-1 text-xs font-medium  rounded-full ${
                currentMode === "light"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-gray-800 text-gray-100"
              }`}
            >
              {category}
            </span>
          </div>

          <h3 className="text-lg font-medium  mb-1">
            {title.length > 40 ? title.substring(0, 40) + "..." : title}
          </h3>

          <p className="text-sm text-gray-500 mb-4 flex-grow">
            {description.length > 80
              ? description.substring(0, 80) + "..."
              : description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <div className="text-yellow-500 mr-1">★</div>
              <span className="text-sm text-gray-600">
                {rating.rate} ({rating.count})
              </span>
            </div>
            <div className="text-xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </div>
          </div>

          <button
            className="w-full mt-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
