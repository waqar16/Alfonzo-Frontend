import React from "react";
import { setLanguage } from "../../redux/reducers/language-reducer";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const LanguageSettings = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(); // Access translation function and i18n instance

  const language = useSelector((state) => state.language);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    dispatch(setLanguage(selectedLanguage));
    i18n.changeLanguage(selectedLanguage === "English" ? "en" : "es"); // Update i18next language
  };

  return (
    <div className="mx-auto h-screen flex flex-col items-center justify-center">
      <div className="max-w-2xl p-6 dark:bg-slate-900 bg-white shadow-md  rounded-lg">
        <h2 className="dark:text-white text-2xl font-bold mb-4 text-gray-800">
          {t("language_settings.title")}
        </h2>
        <p className="dark:text-zinc-400 text-gray-600 mb-6">
          {t("language_settings.description")}
        </p>
        <div className="flex flex-col space-y-4">
          <label
            htmlFor="language"
            className="dark:text-zinc-200 text-lg font-medium text-gray-700"
          >
            {t("language_settings.select_language")}
          </label>
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
          </select>
          <p className="text-gray-500 mt-2">
            {t("language_settings.current_language")}{" "}
            <span className="font-semibold">{language}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;
