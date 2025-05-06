/** @format */

/** @format */
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../redux/store";
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
  }
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 cursor-pointer ">
      <div
        className="relative pt-[100%] bg-gray-100"
        onClick={handleProductView}
      >
        <img
          src={image}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-contain p-4"
        />
      </div>

      <div className="flex flex-col flex-grow p-4">
        <div className="mb-2">
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            {category}
          </span>
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-1">
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
  );
}

export default ProductCard;
