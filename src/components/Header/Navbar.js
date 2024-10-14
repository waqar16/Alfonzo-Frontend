import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceToNow } from "date-fns";

import Loader from "../Loader/Loader";
import {
  faBell,
  faCog,
  faCross,
  faMoon,
  faSignInAlt,
  faSun,
  faUserCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/reducers/theme-reducer";
import style from "./Navbar.module.css";
import {
  fetchNotifications,
  updateNotificationStatus,
} from "../../services/notification-service";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationLoader, setNotificationLoader] = useState(false);
  const [moreNotificationLoader, setMoreNotificationLoader] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [viewNotifications, setViewNotifications] = useState(false);
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
  const [notifications, setNotifications] = useState([
    {
      user: "John Doe",
      message: "Your document has been approved.",
      is_read: false,
      created_at: "2024-10-10 14:35:00",
    },
    {
      user: "Jane Smith",
      message: "You received a new message from your lawyer.",
      is_read: true,
      created_at: "2024-10-09 12:15:00",
    },
    {
      user: "Admin",
      message: "Your account settings have been updated.",
      is_read: true,
      created_at: "2024-10-08 09:45:00",
    },
    {
      user: "Alex Johnson",
      message: "A new document is awaiting your signature.",
      is_read: false,
      created_at: "2024-10-07 08:30:00",
    },
    // Add more notifications as needed
  ]);
  const [nextNotificationPage, setNextNotificationPage] = useState(null);
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
                className="mr-1 flex items-center justify-center p-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none"
                onClick={toggleTheme}
              >
                <FontAwesomeIcon
                  icon={theme == "dark" ? faSun : faMoon}
                  className="text-gray-800 dark:text-white"
                />
              </button>
            </div>
            {localStorage.getItem("token") && (
              <div className="relative flex items-center justify-center ">
                <button
                  onClick={async () => {
                    setViewNotifications(true);
                    setNotificationLoader(true);
                    const response = await fetchNotifications(
                      null,
                      setNotificationLoader
                    );
                    setNotifications(response.data.results);
                    setNextNotificationPage(response.data.next);
                    console.log(response);
                  }}
                  className=" ml-2 py-1 px-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-lg dark:text-white text-gray-800"
                  />
                </button>
                {viewNotifications && (
                  <div className=" top-0 right-0 absolute  dark:bg-slate-900 bg-white rounded-lg shadow-md  ">
                    <div className="flex flex-row items-center justify-between pt-4 px-4 pb-2">
                      <p>Notifications</p>
                      <button
                        onClick={() => setViewNotifications(false)} // Closing notification on click
                        className="focus:outline-none"
                      >
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="text-lg text-black"
                        />
                      </button>
                    </div>
                    <div
                      className={` pb-1 max-h-[300px] overflow-y-auto min-w-[300px]  ${style["custom-scrollbar"]} rounded-b-lg`}
                    >
                      {notificationLoader ? (
                        <div className="flex flex-col items-center w-full py-2">
                          <Loader />
                        </div>
                      ) : notifications.length === 0 ? (
                        <p className="w-full text-center">
                          No notifications available.
                        </p>
                      ) : (
                        <>
                          {notifications
                            .slice() // create a shallow copy to avoid mutating the original array
                            .reverse()
                            .map((notification, index) => (
                              <div
                                key={index}
                                onClick={async () => {
                                  const response =
                                    await updateNotificationStatus(
                                      notification.id
                                    );
                                  console.log(response.status);
                                  if (response.status == 200) {
                                    setNotifications((prevNotifications) =>
                                      prevNotifications.map(
                                        (n) =>
                                          n.id == notification.id
                                            ? { ...n, is_read: true } // Merge the updated data for the matching notification
                                            : n // Keep the other notifications unchanged
                                      )
                                    );
                                  }
                                }}
                                className={` cursor-pointer py-4 w-auto p-2  ${
                                  notification.is_read
                                    ? "bg-white"
                                    : "bg-gray-100"
                                }`}
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex flex-row items-start ">
                                    <div
                                      className="w-8 h-8 rounded-full overflow-hidden flex flex-col items-center
                                 justify-center   "
                                    >
                                      <img
                                        src={localStorage.getItem("profilepic")}
                                        className="w-10 h-10 "
                                      />
                                    </div>
                                    <div className="flex flex-col items-start ml-2 w-full">
                                      <h2 className="text-sm font-bold first-letter:uppercase">
                                        {notification.title}
                                      </h2>
                                      <p className="text-xs line-clamp-2 mt-1">
                                        {notification.message}
                                      </p>
                                      <div className="w-full mt-[2px] flex flex-row items-center justify-between">
                                        <p className="text-xs text-gray-400 ">
                                          {formatDistanceToNow(
                                            new Date(notification.created_at),
                                            { addSuffix: true }
                                          )}
                                        </p>

                                        <p className="text-xs text-end">
                                          {notification.is_read ? "seen" : ""}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  {/* {!notification.is_read && (
                                <button
                                  // onClick={() => markAsRead(index)}
                                  className="text-blue-500 underline"
                                >
                                  Mark as read
                                </button>
                              )} */}
                                </div>
                              </div>
                            ))}{" "}
                          {nextNotificationPage && (
                            <button
                              className="w-full text-center"
                              onClick={async () => {
                                setMoreNotificationLoader(true);
                                const newResponse = await fetchNotifications(
                                  nextNotificationPage,
                                  setMoreNotificationLoader
                                );
                                setNextNotificationPage(newResponse.data.next);
                                setNotifications((prevNotifications) => [
                                  ...prevNotifications,
                                  ...newResponse.data.results,
                                ]);
                              }}
                            >
                              {moreNotificationLoader ? (
                                <Loader />
                              ) : (
                                "Load more"
                              )}
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* <div>
              <NavLink
                className="ml flex items-center justify-center p-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none"
                to={"/notifications"}
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className="text-lg dark:text-white text-gray-800"
                />
              </NavLink>
            </div> */}
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

          <div
            className={`absolute top-full left-0 w-full dark:bg-slate-700 bg-white lg:hidden transition-all duration-300 ease-in-out overflow-auto ${
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
                <div className="dark:border-none flex dark:bg-slate-900 bg-white border border-gray-300 rounded-lg w-full">
                  <ul className="py-2">
                    <li>
                      <NavLink
                        to={"/settings"}
                        className="dark:hover:bg-slate-900 dark:text-white lex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faCog} className="mr-2" />
                        {t("settings")}
                      </NavLink>
                    </li>
                    <li>
                      <button
                        className="dark:hover:bg-slate-900 dark:text-white flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100"
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
                    className="text-lg text-gray-800 dark:text-white"
                  />
                </button>
              </div>
              <div className="relative flex items-center justify-center ">
                <button
                  onClick={async () => {
                    setViewNotifications(true);
                    setNotificationLoader(true);
                    const response = await fetchNotifications(
                      null,
                      setNotificationLoader
                    );
                    setNotifications(response.data.results);
                    setNextNotificationPage(response.data.next);
                    console.log(response);
                  }}
                  className=" ml-2 py-1 px-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-lg dark:text-white text-gray-800"
                  />
                </button>
                {viewNotifications && (
                  <div className=" top-0 right-0 absolute  dark:bg-slate-900 bg-white rounded-lg shadow-md  ">
                    <div className="flex flex-row items-center justify-between pt-4 px-4 pb-2">
                      <p>Notifications</p>
                      <button
                        onClick={() => setViewNotifications(false)} // Closing notification on click
                        className="focus:outline-none"
                      >
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="text-lg text-black"
                        />
                      </button>
                    </div>
                    <div
                      className={` pb-1 max-h-[300px] overflow-y-auto min-w-[300px]  ${style["custom-scrollbar"]} rounded-b-lg`}
                    >
                      {notificationLoader ? (
                        <div className="flex flex-col items-center w-full py-2">
                          <Loader />
                        </div>
                      ) : notifications.length === 0 ? (
                        <p className="w-full text-center">
                          No notifications available.
                        </p>
                      ) : (
                        <>
                          {notifications
                            .slice() // create a shallow copy to avoid mutating the original array
                            .reverse()
                            .map((notification, index) => (
                              <div
                                key={index}
                                onClick={async () => {
                                  const response =
                                    await updateNotificationStatus(
                                      notification.id
                                    );
                                  console.log(response.status);
                                  if (response.status == 200) {
                                    setNotifications((prevNotifications) =>
                                      prevNotifications.map(
                                        (n) =>
                                          n.id == notification.id
                                            ? { ...n, is_read: true } // Merge the updated data for the matching notification
                                            : n // Keep the other notifications unchanged
                                      )
                                    );
                                  }
                                }}
                                className={` cursor-pointer py-4 w-auto p-2  ${
                                  notification.is_read
                                    ? "bg-white"
                                    : "bg-gray-100"
                                }`}
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex flex-row items-start ">
                                    <div
                                      className="w-8 h-8 rounded-full overflow-hidden flex flex-col items-center
                                   justify-center   "
                                    >
                                      <img
                                        src={localStorage.getItem("profilepic")}
                                        className="w-10 h-10 "
                                      />
                                    </div>
                                    <div className="flex flex-col items-start ml-2 w-full">
                                      <h2 className="text-sm font-bold first-letter:uppercase">
                                        {notification.title}
                                      </h2>
                                      <p className="text-xs line-clamp-2 mt-1">
                                        {notification.message}
                                      </p>
                                      <div className="w-full mt-[2px] flex flex-row items-center justify-between">
                                        <p className="text-xs text-gray-400 ">
                                          {formatDistanceToNow(
                                            new Date(notification.created_at),
                                            { addSuffix: true }
                                          )}
                                        </p>

                                        <p className="text-xs text-end">
                                          {notification.is_read ? "seen" : ""}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  {/* {!notification.is_read && (
                                  <button
                                    // onClick={() => markAsRead(index)}
                                    className="text-blue-500 underline"
                                  >
                                    Mark as read
                                  </button>
                                )} */}
                                </div>
                              </div>
                            ))}{" "}
                          {nextNotificationPage && (
                            <button
                              className="w-full text-center"
                              onClick={async () => {
                                setMoreNotificationLoader(true);
                                const newResponse = await fetchNotifications(
                                  nextNotificationPage,
                                  setMoreNotificationLoader
                                );
                                setNextNotificationPage(newResponse.data.next);
                                setNotifications((prevNotifications) => [
                                  ...prevNotifications,
                                  ...newResponse.data.results,
                                ]);
                              }}
                            >
                              {moreNotificationLoader ? (
                                <Loader />
                              ) : (
                                "Load more"
                              )}
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
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
