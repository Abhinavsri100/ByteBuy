/** @format */


/** @format */

import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import Cart from "../components/Cart";


const category = [
  "All",
  "men's clothing",
  "jewelery",
  "electronics",
  "women's clothing",
];

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
}

interface NavbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function Home({ open, setOpen }: NavbarProps) {
  const [cat, setCat] = useState("All");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  async function fetchAllProducts() {
    try {
      setLoading(true);
      const response = await axios.get("https://fakestoreapi.com/products");
      setLoading(false);
      const data = response.data;
      let filtered = data;
      if (cat !== "All")
        filtered = data.filter((d: Product) => d?.category === cat);
      setProducts(filtered);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      console.error(errorMessage);
    }
  }

  useEffect(() => {
    fetchAllProducts();
  }, [cat]);

  function changeCategory(e: any) {
    setCat(e.target.innerText);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {open ? (
        <Cart open={open} setOpen={setOpen} />
      ) : (
        <>
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 px-4 py-6">
            {category.map((c, id) => (
              <div
                key={id}
                className={`px-4 py-2 text-sm rounded-full cursor-pointer border transition-all duration-300 ${
                  c === cat
                    ? "bg-white border-black text-black shadow"
                    : "bg-black text-white border-transparent hover:bg-gray-800"
                }`}
                onClick={changeCategory}
              >
                {c}
              </div>
            ))}
          </div>

          {/* Product Grid */}
          <div className="px-6 py-4 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <p className="text-center col-span-full text-gray-500">
                Loading products...
              </p>
            ) : (
              products.map((p) => (
                <ProductCard
                  key={p.id}
                  image={p.image}
                  id={p.id}
                  description={p.description}
                  price={p.price}
                  title={p.title}
                  category={p.category}
                  rating={p.rating}
                  cat={cat}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
