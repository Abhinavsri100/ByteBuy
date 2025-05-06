/** @format */

// /** @format */

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../hooks";
// import { useFormik } from "formik";
// import { login } from "../slice/userSlice";
// import { loginSchema } from "../schema/userSchema";
// import { RootState } from "../redux/store";
// const initialValues = {
//   email: "",
//   password: "",
// };
// function Login() {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const isAuthenticated = useAppSelector(
//     (state: RootState) => state.Users.isAuthenticated
//   );
//   useEffect(() => {
//     if (isAuthenticated) navigate("/home");
//   }, [isAuthenticated, navigate]);
//   const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
//     initialValues,
//     validationSchema: loginSchema,
//     onSubmit: (values) => {
//       console.log(values);
//       dispatch(login(values));
//     },
//   });
//   return (
//     <div className="h-[100vh] flex flex-row gap-[5rem] justify-center  items-center bg-gray-100 ">
//       <div className="shadow-2xl pt-[2rem] md:w-fit w-[80vw] bg-white">
//         <div>
//           <h1 className="text-2xl font-bold">Login</h1>
//         </div>

//         <div className="border-1 border-black flex flex-row gap-[8rem] justify-center  items-center   md:p-[5rem] p-[2rem] w-full">
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col gap-[3rem] md:p-[1.5rem] md:py-[3rem] md:w-[50%] w-[100%]  "
//           >
//             <div className="flex flex-col justify-center">
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 value={values.email}
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 autoComplete="off"
//                 placeholder="Email"
//                 className="p-[0.7rem] border-b  w-[60%] md:w-[100%]  rounded-xl"
//               />
//               <p className="flex flex-row justify-start text-sm text-red-600">
//                 {errors.email}
//               </p>
//             </div>
//             <div className="flex flex-col justify-center">
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 value={values.password}
//                 autoComplete="off"
//                 placeholder="password"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 className="p-[0.7rem] border-b w-[60%] md:w-[100%]  rounded-xl"
//               />
//               <p className="flex flex-row justify-start text-sm text-red-600">
//                 {errors.password}
//               </p>
//             </div>
//             <div className="">
//               <button
//                 type="submit"
//                 className="p-[1rem] bg-black text-white rounded-2xl w-[60%] md:w-[100%] "
//               >
//                 Login
//               </button>
//             </div>

//             <div>
//               New user?{" "}
//               <Link className=" cursor-pointer underline" to={"/signup"}>
//                 register
//               </Link>
//             </div>
//           </form>
//           <div className="md:block hidden">
//             <img
//               src="tshirt.jpg"
//               alt=""
//               className="h-[20rem] md:block hidden"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
/** @format */

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useFormik } from "formik";
import { login } from "../slice/userSlice";
import { loginSchema } from "../schema/userSchema";
import { RootState } from "../redux/store";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.Users.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden animate-fadeIn w-full max-w-5xl">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Welcome Back
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Email"
                  className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Password"
                  className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-md"
              >
                Login
              </button>
              <p className="text-center text-gray-600">
                New user?{" "}
                <Link
                  className="text-black underline hover:text-gray-800"
                  to="/signup"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>

          {/* Right Side - Image */}
          <div className="hidden md:block md:w-1/2 bg-gray-100">
            <img
              src="tshirt.jpg"
              alt="T-shirt"
              className="object-cover w-full h-full animate-slideInRight"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
