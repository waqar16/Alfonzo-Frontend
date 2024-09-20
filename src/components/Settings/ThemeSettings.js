import React, { useState } from 'react';

const themes = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
];

const ThemeSettings = () => {
  const [selectedTheme, setSelectedTheme] = useState('light');

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg mt-24 mb-28">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Theme Settings</h2>
      <p className="text-gray-600 mb-6">
        Select your preferred theme from the options below. The changes will take effect immediately.
      </p>
      <div className="flex flex-col space-y-4">
        <label htmlFor="theme" className="text-lg font-medium text-gray-700">
          Choose Theme:
        </label>
        <select
          id="theme"
          value={selectedTheme}
          onChange={handleThemeChange}
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
        >
          {themes.map((theme) => (
            <option key={theme.value} value={theme.value}>
              {theme.name}
            </option>
          ))}
        </select>
        <p className="text-gray-500 mt-2">Current Theme: <span className="font-semibold capitalize">{selectedTheme}</span></p>
      </div>
    </div>
  );
};

export default ThemeSettings;
