import React, { useState } from "react";
import { verifyMfa } from "../../services/authentication-services";
import { Toaster } from "react-hot-toast";
import { notify } from "../../utilities/toast";
import { useNavigate } from "react-router-dom";

const VerifyMfa = () => {
  const [otp, setOtp] = useState(Array(6).fill("")); // Initialize an array for 6 digits
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only numbers and a maximum of 1 character
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value; // Update the specific index
      setOtp(newOtp);

      // Move to the next input if the current one is filled
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Join the OTP array into a single string
    const otpString = otp.join("");

    // Basic validation for OTP length
    if (otpString.length !== 6) {
      setError("Please enter a complete 6-digit OTP.");
      return;
    }
    const response = await verifyMfa({
      email: localStorage.getItem("email"),
      mfa_code: otpString,
    });
    console.log(response);
    notify(
      response.error ? response.error?.error : "MFA code verified",
      response.error ? "error" : "success"
    );
    if (response.status == 200) {
      localStorage.setItem("token", response.data.access);
      navigate("/profile");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white py-8 p-2 sm:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">
          Enter Your MFA Code
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex sm:space-x-2 flex-col items-center"
        >
          <label>Sent to your email {localStorage.getItem("email")}</label>
          <div className="flex flex-row items-center mt-2 w-full">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                id={`otp-${index}`}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="ml-1 w-10 sm:w-12 h-10 sm:h-12 text-center border border-gray-300 bg-gray-50 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                maxLength={1} // Limit input to 1 character
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 mt-4"
          >
            Verify Code
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default VerifyMfa;
