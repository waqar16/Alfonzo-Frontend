import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { notify } from "../../utilities/toast";
import { Toaster } from "react-hot-toast";
import { resendVerificationLink } from "../../services/authentication-services";
import Loader from "../../components/Loader/Loader";

const LinkedinLogin = () => {
  const location = useLocation();
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const access = queryParams.get("access");
  const email = queryParams.get("email") || "dasd";
  console.log(access);
  localStorage.setItem("token", access);
  console.log(access);
  return (
    <section className="min-h-screen flex items-start justify-center py-4 pt-24 lg:pt-24 lg:pb-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Confirm Login?
          </h1>
          <p className="text-lg text-gray-600 mb-6">{email}</p>

          <div className="flex justify-center mt-6">
            <Link
              to="/profile"
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300"
            >
              Confirm
            </Link>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default LinkedinLogin;
