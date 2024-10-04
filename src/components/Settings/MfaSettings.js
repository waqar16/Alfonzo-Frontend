import React, { useState } from "react";

const SMSAuth = ({ isEnabled, isSetup, onToggle, handleSetupSMSClick }) => (
  <div className="border-b border-gray-300 pb-4 mb-4">
    <h3 className="text-lg font-semibold text-gray-700">SMS Authentication</h3>
    <p className="text-gray-600 mb-4">
      Receive a code via SMS for additional security. Ensure your phone number
      is up-to-date.
    </p>
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">
        {isEnabled ? (isSetup ? "Enabled" : "Setup Required") : "Disabled"}
      </span>
      <div className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={onToggle}
          id="sms-toggle"
          className="sr-only"
        />
        <label
          htmlFor="sms-toggle"
          className="flex items-center cursor-pointer"
        >
          <div
            className={`w-12 h-6 rounded-full shadow-inner transition-colors ${
              isEnabled ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
              isEnabled ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </label>
      </div>
    </div>
    {!isSetup && isEnabled && (
      <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-md">
        <p className="text-sm">
          SMS authentication is enabled but not yet set up. Please follow the
          instructions to complete the setup.
        </p>
        <button
          onClick={handleSetupSMSClick} // Trigger modal open
          className="text-blue-500 hover:underline"
        >
          Setup SMS Authentication
        </button>
      </div>
    )}
  </div>
);

// Email Authentication Component
const EmailAuth = ({ isEnabled, isSetup, onToggle }) => (
  <div className="border-b border-gray-300 pb-4 mb-4">
    <h3 className="text-lg font-semibold text-gray-700">
      Email Authentication
    </h3>
    <p className="text-gray-600 mb-4">
      Receive a code via email for additional security. Make sure your email
      address is verified.
    </p>
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">
        {isEnabled ? "Enabled" : "Disabled"}
      </span>
      <div className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={onToggle}
          id="email-toggle"
          className="sr-only"
        />
        <label
          htmlFor="email-toggle"
          className="flex items-center cursor-pointer"
        >
          <div
            className={`w-12 h-6 rounded-full shadow-inner transition-colors ${
              isEnabled ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
              isEnabled ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </label>
      </div>
    </div>
  </div>
);

// Authenticator App Authentication Component
const AuthenticatorAppAuth = ({ isEnabled, isSetup, onToggle }) => (
  <div className="border-b border-gray-300 pb-4 mb-4">
    <h3 className="text-lg font-semibold text-gray-700">Authenticator App</h3>
    <p className="text-gray-600 mb-4">
      Use an authenticator app to generate codes for additional security. Ensure
      you have the app installed and configured.
    </p>
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">
        {isEnabled ? (isSetup ? "Enabled" : "Setup Required") : "Disabled"}
      </span>
      <div className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={onToggle}
          id="auth-app-toggle"
          className="sr-only"
        />
        <label
          htmlFor="auth-app-toggle"
          className="flex items-center cursor-pointer"
        >
          <div
            className={`w-12 h-6 rounded-full shadow-inner transition-colors ${
              isEnabled ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
              isEnabled ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </label>
      </div>
    </div>
    {!isSetup && isEnabled && (
      <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-md">
        <p className="text-sm">
          Authenticator app is enabled but not yet set up. Please follow the
          instructions to complete the setup.
        </p>
        <a
          href="/settings/auth-app-setup"
          className="text-blue-500 hover:underline"
        >
          Setup Authenticator App
        </a>
      </div>
    )}
  </div>
);

const PhoneNumberModal = ({ isOpen, onClose, onConfirm }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Setup SMS Authentication</h2>
        <p className="text-gray-600 mb-4">
          Please enter your phone number to complete SMS authentication setup:
        </p>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => onConfirm(phoneNumber)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Main MFASettings Component

const MFASettings = () => {
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [authAppEnabled, setAuthAppEnabled] = useState(true);

  const [smsSetup, setSmsSetup] = useState(false); // Track if SMS is set up
  const [emailSetup, setEmailSetup] = useState(false); // Track if Email is set up
  const [authAppSetup, setAuthAppSetup] = useState(false); // Track if Authenticator App is set up

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

  // Function to handle SMS setup link click
  const handleSetupSMSClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  // Function to confirm phone number
  const handleConfirmPhoneNumber = (phoneNumber) => {
    console.log("Phone Number:", phoneNumber); // Handle phone number submission logic
    setSmsSetup(true); // Mark SMS as setup
    setIsModalOpen(false); // Close the modal
  };
  const handleToggleSMS = () => {
    setSmsEnabled(true);
    setEmailEnabled(false);
    setAuthAppEnabled(false);
  };

  const handleToggleEmail = () => {
    setEmailEnabled(true);
    setSmsEnabled(false);
    setAuthAppEnabled(false);
  };

  const handleToggleAuthApp = () => {
    setAuthAppEnabled(true);
    setSmsEnabled(false);
    setEmailEnabled(false);
  };
  return (
    <div className="relative p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg mt-24 mb-28">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Multi-Factor Authentication Settings
      </h2>
      <p className="text-gray-600 mb-6">
        Enhance your account security by enabling multi-factor authentication
        (MFA). Choose the methods that best suit your needs.
      </p>

      <SMSAuth
        isEnabled={smsEnabled}
        isSetup={smsSetup}
        onToggle={handleToggleSMS}
        handleSetupSMSClick={handleSetupSMSClick}
      />
      <EmailAuth
        isEnabled={emailEnabled}
        isSetup={emailSetup}
        onToggle={handleToggleEmail}
      />
      <AuthenticatorAppAuth
        isEnabled={authAppEnabled}
        isSetup={authAppSetup}
        onToggle={handleToggleAuthApp}
      />

      {/* Phone number modal */}
      <PhoneNumberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPhoneNumber}
      />
    </div>
  );
};

export default MFASettings;
