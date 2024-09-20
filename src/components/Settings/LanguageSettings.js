import React, { useState } from 'react';

const LanguageSettings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg mt-24 mb-28">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Language Settings</h2>
      <p className="text-gray-600 mb-6">
        Choose your preferred language from the dropdown below. Changes will take effect immediately.
      </p>
      <div className="flex flex-col space-y-4">
        <label htmlFor="language" className="text-lg font-medium text-gray-700">
          Select Language:
        </label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>

          {/* Add more languages as needed */}
        </select>
        <p className="text-gray-500 mt-2">Current Language: <span className="font-semibold">{selectedLanguage}</span></p>
      </div>
    </div>
  );
};

export default LanguageSettings;
