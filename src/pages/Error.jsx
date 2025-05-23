/** @format */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotHuman = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-100 to-pink-200 px-4">
      <div className="text-center bg-white p-10 rounded-2xl shadow-2xl max-w-md animate-fadeIn">
        <svg
          className="w-20 h-20 text-red-500 mx-auto mb-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.636-1.14 1.05-2l-6.928-10c-.528-.762-1.572-.762-2.1 0l-6.928 10c-.586.86-.004 2 1.05 2z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Human Verification Failed
        </h1>
        <p className="text-gray-600">
          We couldn't verify you're human. Redirecting you to home...
        </p>
      </div>
    </div>
  );
};

export default NotHuman;
