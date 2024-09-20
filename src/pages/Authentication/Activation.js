import React from "react";
import { Link } from "react-router-dom";

const ActivationEmailSent = () => {
  return (
    <section className="min-h-screen flex items-start justify-center py-4 pt-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">  
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Activation Email Sent</h1>
          <p className="text-lg text-gray-600 mb-6">
            We've sent an activation email to your inbox. Please check your email to activate your account. If you don’t see the email, check your spam or junk folder.
          </p>
          <p className="text-base text-gray-500 mb-8">
            Didn’t receive the email? <Link to="/resend-email" className="text-gray-700 hover:text-indigo-500 text-indigo-700 font-medium">Request a new activation email here</Link>.
          </p>
          <div className="flex justify-center mt-6">
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivationEmailSent;
