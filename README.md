# ByteBuy 🛒

ByteBuy is a modern and responsive e-commerce frontend application built with React, TypeScript, Redux, Formik, and Material UI. It simulates a user-friendly online shopping experience using the [Fake Store API](https://fakestoreapi.com/).

## 🚀 Features

- 🔐 User Authentication (Signup/Login)
- 🛍️ Product Listing with Category Filtering
- 🛒 Add/Remove Items from Cart with Quantity Management
- 💳 Responsive Checkout Flow with Payment Confirmation
- 💾 Local Storage Integration to Persist Cart State
- 📱 Fully Responsive UI using TailwindCSS

## 🛠️ Tech Stack

- React + TypeScript
- Redux Toolkit
- Formik + Yup
- Tailwind CSS + Material UI
- React Router DOM
- Axios
- Fake Store API

## 🧑‍💻 Installation

```bash
git clone https://github.com/Abhinavsri100/ByteBuy.git
cd ByteBuy
npm install
npm start

src/
├── components/
│   ├── Cart.tsx
│   ├── CartItem.tsx
│   ├── Navbar.tsx
│   └── ProductCard.tsx
├── pages/
│   ├── Home.tsx
│   └── PaymentSuccess.tsx
├── redux/
│   ├── store.ts
│   └── slice/
│       ├── cartSlice.ts
│       └── userSlice.ts
