import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../images/logo/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faSignInAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();
  // Toggle menu visibility
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
    localStorage.removeItem("token"); // Clear the token from localStorage
    localStorage.removeItem("email"); // Clear the token from localStorage
    localStorage.removeItem("username"); // Clear the token from localStorage
    localStorage.removeItem("firstname"); // Clear the token from localStorage
    localStorage.removeItem("lastname"); // Clear the token from localStorage
    setLogoutModalOpen(false); // Close the modal
    navigate("/login");
  };

  const handleLogoutCancel = () => {
    setLogoutModalOpen(false); // Close the modal if user cancels
  };
  console.log(
    'localStorage.getItem("profilepic")',
    localStorage.getItem("profilepic")
  );
  return (
    <header className="fixed top-0 inset-x-0 supports-backdrop-blur:bg-background/90 z-40 w-full bg-background/40 backdrop-blur-lg transition-transform duration-300">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link
              to={"/"}
              title="Home"
              className="flex items-center focus:outline-none"
            >
              <img src="/logo.png" alt="Alfonzo Logo" className="w-40 h-auto" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-900 focus:outline-none"
              onClick={toggleMenu}
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
            className={`absolute top-full left-0 w-full bg-white lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } shadow-md`}
          >
            <div className="p-6 space-y-6">
              <Link
                to={"/"}
                title="Home"
                className="block text-lg font-semibold text-gray-900 transition hover:text-gray-700"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to={"/profile"}
                title="Press"
                className="block text-lg font-semibold text-gray-900 transition hover:text-gray-700"
                onClick={closeMenu}
              >
                Profile
              </Link>
              <Link
                to={"/faqs"}
                title="faqs"
                className="block text-lg text-gray-900 transition hover:text-gray-700"
              >
                FAQs
              </Link>

              <Link
                to={"/about-us"}
                title="about-us"
                className="block text-lg text-gray-900 transition hover:text-gray-700"
              >
                About us
              </Link>

              <Link
                to={"/services"}
                title="Press"
                className="block text-lg text-gray-900 transition hover:text-gray-700"
              >
                Services
              </Link>

              <Link
                to={"/lawyers"}
                title="Press"
                className="block text-lg  text-gray-900 transition hover:text-gray-700"
              >
                Lawyers
              </Link>
              {localStorage.getItem("token") ? (
                <div
                  className="flex  bg-white border border-gray-300 rounded-lg w-full"
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
                        Settings
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
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-4">
                  <Link
                    to={"/login"}
                    title="Login"
                    className="block text-lg font-semibold text-gray-900 transition hover:text-gray-700"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <a
                    href="#"
                    title="See Demo"
                    className="block w-full mt-4 py-2 text-center text-lg font-semibold text-gray-900 bg-transparent border border-gray-900 rounded-xl transition hover:bg-gray-900 hover:text-white"
                    onClick={closeMenu}
                  >
                    Signup
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-12">
            <Link
              to={"/"}
              title="Home"
              className="block text-lg text-gray-900 transition hover:text-gray-700"
            >
              Home
            </Link>
            <Link
              to={"/profile"}
              title="Press"
              className="block text-lg text-gray-900 transition hover:text-gray-700"
            >
              Profile
            </Link>

            <Link
              to={"/news"}
              title="Press"
              className="block text-lg  text-gray-900 transition hover:text-gray-700"
            >
              News
            </Link>
            <Link
              to={"/faqs"}
              title="faqs"
              className="block text-lg text-gray-900 transition hover:text-gray-700"
            >
              FAQs
            </Link>

            <Link
              to={"/about-us"}
              title="about-us"
              className="block text-lg text-gray-900 transition hover:text-gray-700"
            >
              About us
            </Link>

            <Link
              to={"/services"}
              title="Press"
              className="block text-lg text-gray-900 transition hover:text-gray-700"
            >
              Services
            </Link>

            <Link
              to={"/lawyers"}
              title="Press"
              className="block text-lg  text-gray-900 transition hover:text-gray-700"
            >
              Lawyers
            </Link>

            {/* <a href="#" title="Equipments" className="text-base font-medium text-gray-900 transition hover:text-gray-700">Equipments</a>
            <a href="#" title="FAQs" className="text-base font-medium text-gray-900 transition hover:text-gray-700">FAQs</a> */}
          </div>

          {/* Desktop Actions */}
          {localStorage.getItem("token") ? (
            <div className="hidden relative  lg:flex flex-row items-center">
              <span>
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
                        Settings
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
                        Logout
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
                title="Login"
                className="text-base font-medium text-gray-900 transition hover:text-gray-700"
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                title="See Demo"
                className="px-5 py-2 text-base font-semibold text-white bg-gray-900 border border-gray-900 rounded-xl transition hover:bg-white hover:text-gray-900"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
