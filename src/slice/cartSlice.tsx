/** @format */


/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const cartItem: Product[] = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || "[]")
  : [];

const initialState: Product[] = cartItem;

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const index = state.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state[index].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action: PayloadAction<Product>) => {
      const index = state.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1;
        } else {
          state.splice(index, 1);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearTheCart: (state) => {
      state.length = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearTheCart } = cartSlice.actions;
export default cartSlice.reducer;
