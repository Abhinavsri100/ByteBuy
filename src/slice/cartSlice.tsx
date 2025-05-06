/** @format */

// /** @format */

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   url: string;
//   rating: {
//     rate: number;
//     count: number;
//   };
//   quantity: number;
// }
// const cartItem: Product[] = localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart") || "[]")
//   : [];
// const initialState: Product[] = cartItem;
// const cartSlice = createSlice({
//   name: "Cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<Product>) => {
//       const exsitingProducts = JSON.parse(localStorage.getItem("cart") || "[]");
//       const newProduct = action.payload;
//       if (exsitingProducts.length === 0) {
//         state.push(newProduct);
//         localStorage.setItem("cart", JSON.stringify([newProduct]));
//       } else {
//         const oldProduct = exsitingProducts?.filter(
//           (p: Product) => p.id === newProduct.id
//         );
//         if (oldProduct.length !== 0) {
//           oldProduct[0].quantity += 1;
//           const newList = exsitingProducts.filter(
//             (p: Product) => p.id !== newProduct.id
//           );
//           newList.push(oldProduct[0]);
//         } else {
//           exsitingProducts.push(newProduct);
//         }
//         state.push(exsitingProducts);
//         localStorage.setItem("cart", JSON.stringify(exsitingProducts));
//       }
//     },
//     removeFromCart: (state, action: PayloadAction<Product>) => {
//       const exsitingProducts = JSON.parse(localStorage.getItem("cart") || "[]");
//       const oldProduct = exsitingProducts.filter(
//         (p: Product) => action.payload.id === p.id
//       );
//       const newProductList = exsitingProducts.filter(
//         (p: Product) => action.payload.id !== p.id
//       );

//       if (oldProduct[0].quantity > 1) {
//         oldProduct[0].quantity -= 1;
//         newProductList.push(oldProduct[0]);
//       }

//       localStorage.setItem("cart", JSON.stringify(newProductList));
//     },
//     clearTheCart: (state) => {
//       state = [];
//       localStorage.removeItem("cart");
//     },
//   },
// });
// export const { addToCart, removeFromCart, clearTheCart } = cartSlice.actions;
// export default cartSlice.reducer;
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
