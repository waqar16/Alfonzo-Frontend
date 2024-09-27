import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation
import Language from "../../images/language.svg";
import { FaCheckCircle } from "react-icons/fa";

const Header = () => {
  const { t, i18n } = useTranslation(); // Destructure t and i18n
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English"); // Default language

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language === "English" ? "en" : "es"); // Change language
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white shadow-md py-4 md:py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              to={"/"}
              title="Home"
              className="flex items-center rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              <h1 className="text-2xl font-bold text-gray-900">
                {t("header.logo")}
              </h1>
            </Link>
          </div>
          {/* ... other code remains the same ... */}

          <div className="hidden lg:flex lg:items-center lg:space-x-10">
            <Link
              to={"/login"}
              title={t("header.login")}
              className="text-base font-medium text-gray-900 transition hover:text-gray-700"
            >
              {t("header.login")}
            </Link>
            <Link
              to={"/create-document"}
              title={t("header.seeDemo")}
              className="px-5 py-2 text-base font-semibold text-gray-900 border border-gray-900 rounded-xl transition hover:bg-gray-900 hover:text-white"
            >
              {t("header.seeDemo")}
            </Link>
            <div>
              <button
                onClick={toggleDropdown}
                className="text-white py-2 rounded-md focus:outline-none"
              >
                <Language className={"w-6 h-auto "} />
              </button>
            </div>

            {isOpen && (
              <div className="absolute top-15 right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li
                    className={`w-full px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer flex flex-row items-center justify-between`}
                    onClick={() => handleLanguageSelect("English")}
                  >
                    <span>English</span>
                    {selectedLanguage === "English" && (
                      <FaCheckCircle className="ml-4 text-[#00A8E8]" />
                    )}
                  </li>
                  <li
                    className={`w-full px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer flex flex-row items-center justify-between`}
                    onClick={() => handleLanguageSelect("Español")}
                  >
                    <span>Español</span>
                    {selectedLanguage === "Español" && (
                      <FaCheckCircle className="ml-4 text-[#00A8E8]" />
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
