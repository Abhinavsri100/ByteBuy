/** @format */


/** @format */

import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useFormik } from "formik";
import { login } from "../slice/userSlice";
import { loginSchema } from "../schema/userSchema";
import { RootState } from "../redux/store";
import axios from "axios";
import { setLight } from "../slice/modeSlice";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const dispatch = useAppDispatch();
  const [captcha, setCaptcha] = useState<string>("");
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.Users.isAuthenticated
  );
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, []);
  useEffect(() => {
    if (isAuthenticated) navigate("/home");
    else navigate("/login");
  }, [isAuthenticated, navigate]);

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      if (captcha) {
        dispatch(login(values));
        dispatch(setLight({ mode: "light" }));
      } else {
        navigate("/error");
      }
    },
  });
  async function handleRecaptcha(value: String | null) {
    console.log(value);
    setCaptcha(`${value}`);
    if (!value) navigate("/error");
  }

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
                className={`bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-md ${
                  !captcha ? "cursor-not-allowed opacity-50" : ""
                }`}
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
              <ReCAPTCHA
                sitekey="6LdMQTIrAAAAAG4RLCsc40VSxWecojNEPNCovoFW"
                onChange={handleRecaptcha}
              />
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
// 6LcaPjIrAAAAAJTImeuV-AS8CjDeSiEVMSTeHyHO