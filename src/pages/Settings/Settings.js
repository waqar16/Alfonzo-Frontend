import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faGlobe,
  faLock,
  faPalette,
  faEnvelope,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-4 pt-18 lg:py-28 px-4 sm:px-6 lg:px-8 dark:bg-black bg-gray-100">
      <h1 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">
        Settings
      </h1>
      <p className="text-lg dark:text-zinc-400 text-gray-600 mb-12 max-w-lg text-center">
        Manage your account settings, preferences, and security options.
      </p>

      <div className="grid grid-cols-1 gap-6 w-full max-w-3xl">
        {/* Account Settings */}
        <div className="dark:bg-slate-900 bg-white shadow-lg rounded-lg p-6">
          <Link
            to="/settings/manage-profile"
            className="flex items-center space-x-4"
          >
            <FontAwesomeIcon
              icon={faCog}
              className="dark:text-white text-gray-600 text-2xl"
            />
            <div>
              <h3 className="dark:text-white text-xl font-bold text-gray-800">
                Account Settings
              </h3>
              <p className="dark:text-zinc-400 text-sm text-gray-600">
                Update your personal information and login credentials.
              </p>
            </div>
          </Link>
        </div>

        {/* Language Preferences */}
        <div className="dark:bg-slate-900 bg-white shadow-lg rounded-lg p-6">
          <Link to="/settings/language" className="flex items-center space-x-4">
            <FontAwesomeIcon
              icon={faGlobe}
              className="dark:text-white text-gray-600 text-2xl"
            />
            <div>
              <h3 className="dark:text-white text-xl font-bold text-gray-800">
                Language Preferences
              </h3>
              <p className="dark:text-zinc-400 text-sm text-gray-600">
                Set your preferred language for the application.
              </p>
            </div>
          </Link>
        </div>

        {/* MFA Settings */}
        <div className="dark:bg-slate-900 bg-white shadow-lg rounded-lg p-6">
          <Link to="/settings/mfa" className="flex items-center space-x-4">
            <FontAwesomeIcon
              icon={faLock}
              className="dark:text-white text-gray-600 text-2xl"
            />
            <div>
              <h3 className="dark:text-white text-xl font-bold text-gray-800">
                MFA Settings
              </h3>
              <p className="dark:text-zinc-400 text-sm text-gray-600">
                Manage multi-factor authentication for added security.
              </p>
            </div>
          </Link>
        </div>

        {/* Theme Preferences */}
        <div className="dark:bg-slate-900 bg-white shadow-lg rounded-lg p-6">
          <Link to="/settings/theme" className="flex items-center space-x-4">
            <FontAwesomeIcon
              icon={faPalette}
              className="dark:text-white text-gray-600 text-2xl"
            />
            <div>
              <h3 className="dark:text-white text-xl font-bold text-gray-800">
                Theme Preferences
              </h3>
              <p className="dark:text-zinc-400 text-sm text-gray-600">
                Customize the appearance of the app, including light and dark
                modes.
              </p>
            </div>
          </Link>
        </div>

        {/* Email Notifications */}
        <div className="dark:bg-slate-900 bg-white shadow-lg rounded-lg p-6">
          <Link
            to="/settings/notifications"
            className="flex items-center space-x-4"
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              className="dark:text-white text-gray-600 text-2xl"
            />
            <div>
              <h3 className="dark:text-white text-xl font-bold text-gray-800">
                Email Notifications
              </h3>
              <p className="dark:text-zinc-400 text-sm text-gray-600">
                Control the types of notifications you receive via email.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
