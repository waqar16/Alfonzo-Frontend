import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faMoon,
  faSignInAlt,
  faSun,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/reducers/theme-reducer";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const language = useSelector((state) => state.language);
  const theme = useSelector((state) => state.theme);
  const { t, i18n } = useTranslation();

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("phone");
    localStorage.removeItem("username");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("email");
    localStorage.removeItem("profilepic");
    setLogoutModalOpen(false);
    navigate("/login");
  };

  const handleLogoutCancel = () => {
    setLogoutModalOpen(false);
  };
  const dispatch = useDispatch();
  const toggleTheme = () => {
    if (theme == "light") {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }
  };
  return (
    <header className="fixed top-0 inset-x-0 z-40 w-full   bg-background/40 backdrop-blur-lg transition-transform duration-300">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to={"/"} title={t("home")} className="flex items-center">
              <img
                src={theme == "dark" ? "/logo-white.png" : "/logo.png"}
                alt="Logo"
                className="w-40 h-auto"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <div>
              <button
                className="mr-2 flex items-center justify-center p-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none"
                onClick={toggleTheme}
              >
                <FontAwesomeIcon
                  icon={theme == "dark" ? faSun : faMoon}
                  className="text-gray-800 dark:text-white"
                />
              </button>
            </div>
            <button
              onClick={toggleMenu}
              className=" dark:text-white text-gray-900"
            >
              {isMenuOpen ? (
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`absolute top-full left-0 w-full bg-white lg:hidden transition-all duration-300 ease-in-out overflow-auto ${
              isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-6 space-y-6">
              <Link
                to={"/"}
                onClick={closeMenu}
                className="block text-lg font-semibold  dark:text-white text-gray-900 transition hover:text-gray-700"
              >
                {t("home")}
              </Link>
              <Link
                to={"/profile"}
                onClick={closeMenu}
                className="block text-lg font-semibold  dark:text-white text-gray-900 transition hover:text-gray-700"
              >
                {t("profile")}
              </Link>
              <Link
                to={"/faqs"}
                className="block text-lg  dark:text-white text-gray-900 transition hover:text-gray-700"
              >
                {t("faqs")}
              </Link>
              <Link
                to={"/about-us"}
                className="block text-lg  dark:text-white text-gray-900 transition hover:text-gray-700"
              >
                {t("about_us")}
              </Link>
              <Link
                to={"/services"}
                className="block text-lg  dark:text-white text-gray-900 transition hover:text-gray-700"
              >
                {t("services")}
              </Link>
              <Link
                to={"/lawyers"}
                className="block text-lg  dark:text-white text-gray-900 transition hover:text-gray-700"
              >
                {t("lawyers")}
              </Link>
              {localStorage.getItem("token") ? (
                <div className="flex bg-white border border-gray-300 rounded-lg w-full">
                  <ul className="py-2">
                    <li>
                      <NavLink
                        to={"/settings"}
                        className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faCog} className="mr-2" />
                        {t("settings")}
                      </NavLink>
                    </li>
                    <li>
                      <button
                        className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100"
                        onClick={handleLogoutConfirm}
                      >
                        <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                        {t("logout")}
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-4">
                  <Link
                    to={"/login"}
                    className="block text-lg font-semibold  dark:text-white text-gray-900 transition hover:text-gray-700"
                    onClick={closeMenu}
                  >
                    {t("login")}
                  </Link>
                  <Link
                    to={"/signup"}
                    className="mt-4 block text-lg font-semibold  dark:text-white text-gray-900 transition hover:text-gray-700"
                    onClick={closeMenu}
                  >
                    {t("signup")}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-12">
            <Link
              to={"/"}
              className=" text-center block text-md  dark:text-white text-gray-900 transition hover:text-gray-700"
            >
              {t("home")}
            </Link>
            <Link
              to={"/profile"}
              className=" text-center block text-md  dark:text-white text-gray-900 transition hover:text-gray-700"
            >
              {t("profile")}
            </Link>
            <Link
              to={"/faqs"}
              className=" text-center block text-md  dark:text-white text-gray-900 transition hover:text-gray-700"
            >
              {t("faqs")}
            </Link>
            <Link
              to={"/about-us"}
              className=" text-center block text-md  dark:text-white text-gray-900 transition hover:text-gray-700"
            >
              {t("about_us")}
            </Link>
            <Link
              to={"/services"}
              className=" text-center block text-md  dark:text-white text-gray-900 transition hover:text-gray-700"
            >
              {t("services")}
            </Link>
            <Link
              to={"/lawyers"}
              className=" text-center block text-md  dark:text-white text-gray-900 transition hover:text-gray-700"
            >
              {t("lawyers")}
            </Link>
          </div>

          {localStorage.getItem("token") ? (
            <div className="hidden relative  lg:flex flex-row items-center">
              <span className="dark:text-zinc-100">
                {localStorage.getItem("firstname")
                  ? localStorage.getItem("firstname")
                  : "User"}
              </span>
              <button
                className="text-gray-600 hover:text-gray-800 focus:outline-none ml-2"
                onClick={toggleUserMenu}
                onMouseEnter={() => setUserMenuOpen(true)} // Show on hover
                onMouseLeave={() => setUserMenuOpen(false)} // Hide when mouse leaves
              >
                {localStorage.getItem("profilepic") ? (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src={localStorage.getItem("profilepic")}
                      alt="image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <FontAwesomeIcon icon={faUserCircle} size="2x" />
                )}
              </button>
              <div>
                <button
                  className="ml-2 flex items-center justify-center p-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none"
                  onClick={toggleTheme}
                >
                  <FontAwesomeIcon
                    icon={theme == "dark" ? faSun : faMoon}
                    className="text-gray-800 dark:text-white"
                  />
                </button>
              </div>
              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 top-[100%] w-48 bg-white border border-gray-300 rounded-lg shadow-lg"
                  onMouseEnter={() => setUserMenuOpen(true)} // Keep it open while hovering on the menu
                  onMouseLeave={() => setUserMenuOpen(false)} // Hide when leaving the menu area
                >
                  <ul className="py-2">
                    <li>
                      <NavLink
                        to={"/settings"}
                        className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100"
                        onClick={() => console.log("Settings Clicked")}
                      >
                        <FontAwesomeIcon icon={faCog} className="mr-2" />
                        {t("Settings")}
                      </NavLink>
                    </li>
                    <li>
                      <button
                        className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100"
                        onClick={() => {
                          handleLogoutConfirm();
                        }}
                      >
                        <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                        {t("Logout")}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex lg:items-center lg:space-x-10">
              <Link
                to={"/login"}
                className="text-base font-medium  dark:text-white text-gray-900 transition hover:text-gray-700"
              >
                {t("login")}
              </Link>
              <Link
                to={"/signup"}
                className="px-5 py-2 text-base font-semibold text-white bg-gray-900 border border-gray-900 rounded-xl transition hover:text-black hover:bg-white hover: dark:text-white text-gray-900"
              >
                {t("signup")}
              </Link>
            </div>
          )}
          {/* Desktop Actions */}
          {/* {localStorage.getItem("token") ? (
            <div className="hidden relative lg:flex items-center">
              <span>{localStorage.getItem("firstname") || t("user")}</span>
              <button
                onClick={toggleUserMenu}
                className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex lg:items-center lg:space-x-10">
              <Link
                to={"/login"}
                className="text-base font-medium  dark:text-white text-gray-900 transition hover:text-gray-700"
              >
                {t("login")}
              </Link>
              <Link
                to={"/signup"}
                className="px-5 py-2 text-base font-semibold text-white bg-gray-900 border border-gray-900 rounded-xl transition hover:bg-white hover: dark:text-white text-gray-900"
              >
                {t("signup")}
              </Link>
            </div>
          )} */}
        </div>
      </div>
    </header>
  );
};

export default Header;
