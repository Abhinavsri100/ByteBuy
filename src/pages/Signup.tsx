/** @format */


/** @format */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../schema/userSchema";
import { useAppDispatch } from "../hooks";
import { signup } from "../slice/userSlice";
import { useFormik } from "formik";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function Signup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(signup(values));
      navigate("/login");
    },
  });

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-[90vw] md:w-[65vw] flex flex-col md:flex-row transition-all">
        {/* Left Image */}
        <div className="hidden md:flex items-center justify-center w-1/2 bg-gray-200">
          <img
            src="tshirt2.jpg"
            alt="signup visual"
            className="h-[30rem] object-cover rounded-l-3xl"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 px-10 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Create an Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="First Name"
                autoComplete="off"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.firstName && (
                <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Last Name"
                autoComplete="off"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.lastName && (
                <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                autoComplete="off"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                autoComplete="off"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-900 transition duration-200"
            >
              Signup
            </button>

            <p className="text-sm text-center">
              Already a user?{" "}
              <Link to="/login" className="text-blue-600 underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
