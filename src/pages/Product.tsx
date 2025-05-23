/** @format */

import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../hooks";
import { addToCart } from "../slice/cartSlice";
import Cart from "../components/Cart";
import { RootState } from "../redux/store";
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
function Product({ open, setOpen }: NavbarProps) {
  const mode = useAppSelector((state: RootState) => state.Mode.mode);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const dispatch = useAppDispatch();
  const handleAddCart = useCallback(() => {
    if (product) {
      dispatch(addToCart(product));
      toast("Item Added to Cart Successfully");
    }
  }, [dispatch, product]);

  useEffect(() => {
    // Simulate fetch with FakeStore API
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data: Product) => {
        setProduct(data);
        console.log(data?.image);
      });
  }, [id]);

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="">
      {open ? (
        <Cart open={open} setOpen={setOpen} />
      ) : (
        <div
          className={`${
            mode === "light" ? "bg-white" : "bg-gray-800"
          } h-[100vh]`}
        >
          <ToastContainer autoClose={150} />
          <div
            className={`max-w-5xl mx-auto p-6    shadow-lg rounded-lg ${
              mode === "light" ? "bg-white" : "bg-black"
            }`}
          >
            <div className="flex flex-col  md:flex-row gap-8">
              <div className=" md:w-1/3 flex flex-row justify-center ">
                <img
                  src={product.image}
                  alt={product.title}
                  className=" h-[15rem] w-[15rem] rounded-lg object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h1
                  className={`text-2xl font-bold ${
                    mode === "light"
                      ? "bg-white text-gray-800"
                      : "bg-black text-white"
                  } `}
                >
                  {product.title}
                </h1>
                <p
                  className={`text-sm  mt-2 ${
                    mode === "light" ? "text-gray-500" : "text-gray-200"
                  }`}
                >
                  {product.category}
                </p>
                <p className="text-xl font-semibold text-green-600 mt-4">
                  ${product.price}
                </p>
                <div className="flex items-center mt-2 text-yellow-500">
                  ⭐ {product.rating.rate} ({product.rating.count} reviews)
                </div>
                <p
                  className={`mt-4 ${
                    mode === "light" ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  {product.description}
                </p>

                {/* Actions */}
                <button
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={handleAddCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
