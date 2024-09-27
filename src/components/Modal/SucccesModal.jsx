import React from "react";
import { NavLink } from "react-router-dom";

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Document Successfully Generated!
        </h1>
        <p className="text-lg text-gray-800 mb-1">
          Your document has been successfully generated and sent to your email.
        </p>
        <p className="text-lg text-gray-800 mb-1">
          A copy has also been sent to your lawyer's email for review.
        </p>
        <p className="text-lg text-gray-800 mb-4">
          Please wait for the document verification from your lawyer.
        </p>

        <div className="flex flex-col items-center w-full">
          <NavLink
            type="button"
            to={"/"}
            className={`mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700`}
            onClick={onClose} // Close modal on click
          >
            Go Back
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
