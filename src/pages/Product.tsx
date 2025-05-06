/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";


import { useAppDispatch } from "../hooks";
import { addToCart } from "../slice/cartSlice";
import Cart from "../components/Cart";
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
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const dispatch = useAppDispatch();
  function handleAddCart() {
    if (product) dispatch(addToCart(product));
  }
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
    <>
      {open ? (
        <Cart open={open} setOpen={setOpen} />
      ) : (
        <div className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:flex-shrink-0  md:w-1/3 flex flex-row justify-center ">
              <img
                src={product.image}
                alt={product.title}
                className=" h-[15rem] w-[15rem] rounded-lg object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">
                {product.title}
              </h1>
              <p className="text-sm text-gray-500 mt-2">{product.category}</p>
              <p className="text-xl font-semibold text-green-600 mt-4">
                ${product.price}
              </p>
              <div className="flex items-center mt-2 text-yellow-500">
                ⭐ {product.rating.rate} ({product.rating.count} reviews)
              </div>
              <p className="text-gray-700 mt-4">{product.description}</p>

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
      )}
    </>
  );
}

export default Product;
