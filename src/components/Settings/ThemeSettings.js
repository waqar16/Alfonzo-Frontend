import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/reducers/theme-reducer";

const themes = [
  { name: "Light", value: "light" },
  { name: "Dark", value: "dark" },
];

const ThemeSettings = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const [selectedTheme, setSelectedTheme] = useState(theme || "light");
  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
    dispatch(setTheme(event.target.value));
  };

  return (
    <div className={`w-full  dark:bg-black  bg-white pt-40 pb-28`}>
      <div
        className={`p-6 dark:bg-slate-900 max-w-2xl mx-auto shadow-md rounded-lg `}
      >
        <h2 className={`text-2xl font-bold mb-4 dark:text-white text-gray-800`}>
          Theme Settings
        </h2>
        <p
          className={`${
            theme == "dark" ? "text-gray-200" : "text-gray-600"
          } mb-6`}
        >
          Select your preferred theme from the options below. The changes will
          take effect immediately.
        </p>
        <div className={`flex flex-col space-y-4`}>
          <label
            htmlFor="theme"
            className={`text-lg font-medium   dark:text-white t`}
          >
            Choose Theme:
          </label>
          <select
            id="theme"
            value={theme}
            onChange={handleThemeChange}
            className={`p-3 border dark:bg-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300`}
          >
            {themes.map((theme) => (
              <option key={theme.value} value={theme.value}>
                {theme.name}
              </option>
            ))}
          </select>
          <p className={`dark:text-white text-gray-500 mt-2`}>
            Current Theme:{" "}
            <span className={`font-semibold capitalize`}>{theme}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
