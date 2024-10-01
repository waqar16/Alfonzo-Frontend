import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faLock,
  faCog,
  faFile,
  faFileAlt,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const [selected, setSelected] = React.useState("user"); // Default selected value

  const handleToggle = () => {
    setSelected((prev) => (prev === "user" ? "lawyer" : "user"));
  };
  return (
    <section className="min-h-screen flex items-start justify-center py-4 pt-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto grid gap-6">
        <div className="w-full flex flex-row items-center shadow-md justify-end p-12  rounded-lg bg-white">
          <div className="flex items-center space-x-2">
            <span
              className={`text-sm ${
                selected === "user" ? "font-semibold" : ""
              }`}
            >
              User
            </span>
            <div
              className={`relative inline-flex h-5 w-11 cursor-pointer rounded-full transition-colors duration-300 ease-in-out ${
                selected === "user" ? "bg-blue-500" : "bg-gray-400"
              }`}
              onClick={handleToggle}
            >
              <span
                className={`absolute inline-block h-5 w-5 transform bg-white rounded-full shadow transition-transform duration-300 ease-in-out ${
                  selected === "user" ? "translate-x-0" : "translate-x-6"
                }`}
              />
            </div>
            <span
              className={`text-sm ${
                selected === "lawyer" ? "font-semibold" : ""
              }`}
            >
              Lawyer
            </span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faUserEdit}
              className="text-3xl text-gray-600"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">[User Name]</h1>
            <p className="text-gray-600">[User Email]</p>
            <p className="text-gray-600">[User Position]</p>
            <button className="mt-2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-200 flex items-center">
              <FontAwesomeIcon icon={faUserEdit} className="mr-2" />
              <Link to={"/settings"}>Edit Profile</Link>
            </button>
          </div>
        </div>

        {/* Dashboard Header */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, [User]!
          </h1>
          <p className="text-gray-600">
            Here’s a quick overview of your recent activities and updates.
          </p>
        </div>

        {/* Quick Links */}
        {selected == "user" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Link
              to="/templates"
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
            >
              <FontAwesomeIcon
                icon={faFile}
                className="text-3xl text-gray-800"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Templates
                </h3>
                <p className="text-gray-600">
                  Create a new document from Templates.
                </p>
              </div>
            </Link>
            <Link
              to="/verify-document"
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
            >
              <FontAwesomeIcon
                icon={faFileAlt}
                className="text-3xl text-gray-800"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Verify Document
                </h3>
                <p className="text-gray-600">
                  Verify the authenticity of a document.
                </p>
              </div>
            </Link>
            <Link
              to="/your-documents"
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
            >
              <FontAwesomeIcon
                icon={faCog}
                className="text-3xl text-gray-800"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Your Documents
                </h3>
                <p className="text-gray-600">View your Created documents.</p>
              </div>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Link
              to="/templates"
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
            >
              <FontAwesomeIcon
                icon={faFile}
                className="text-3xl text-gray-800"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Templates
                </h3>
                <p className="text-gray-600">
                  Create a new document from Templates.
                </p>
              </div>
            </Link>
            <Link
              to="/verify-document"
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
            >
              <FontAwesomeIcon
                icon={faFileAlt}
                className="text-3xl text-gray-800"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Verify Document
                </h3>
                <p className="text-gray-600">
                  Verify the authenticity of a document.
                </p>
              </div>
            </Link>
            <Link
              to="/your-documents"
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
            >
              <FontAwesomeIcon
                icon={faCog}
                className="text-3xl text-gray-800"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Your Documents
                </h3>
                <p className="text-gray-600">View your Created documents.</p>
              </div>
            </Link>
            <Link
              to="/user-queries"
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
            >
              <FontAwesomeIcon
                icon={faFile}
                className="text-3xl text-gray-800"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  User Queries
                </h3>
                <p className="text-gray-600">
                  See user queries specific to yourself.
                </p>
              </div>
            </Link>
            <Link
              to="/user-requests"
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
            >
              <FontAwesomeIcon
                icon={faFile}
                className="text-3xl text-gray-800"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Requests
                </h3>
                <p className="text-gray-600">
                  See how many user have requested your services.
                </p>
              </div>
            </Link>
          </div>
        )}

        {/* Side Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Notifications Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Notifications
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faBell} className="text-gray-600" />
                <p className="text-gray-800">
                  Document status updated to approved.
                </p>
              </li>
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faBell} className="text-gray-600" />
                <p className="text-gray-800">Payment confirmation received.</p>
              </li>
            </ul>
          </div>

          {/* Summary Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
                <p className="text-gray-800">
                  Pending Actions: Review documents pending your action.
                </p>
              </li>
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
                <p className="text-gray-800">
                  Upcoming Deadlines: Check deadlines for document submissions.
                </p>
              </li>
            </ul>
          </div>

          {/* Preferred Lawyer Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Preferred Lawyer
            </h2>
            <p className="text-gray-600 mb-4">
              Lock a preferred lawyer for all documents. You must confirm your
              selection before finalizing any document.
            </p>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-200 flex items-center">
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Set Preferred Lawyer
            </button>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Settings</h2>
          <ul className="space-y-4">
            <li>
              <Link
                to="/settings"
                className="text-gray-800 hover:text-gray-600 font-medium flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faCog} className="text-gray-600" />
                <span>Account Settings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings/language"
                className="text-gray-800 hover:text-gray-600 font-medium flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faCog} className="text-gray-600" />
                <span>Language Preferences</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings/mfa"
                className="text-gray-800 hover:text-gray-600 font-medium flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faCog} className="text-gray-600" />
                <span>MFA Settings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings/theme"
                className="text-gray-800 hover:text-gray-600 font-medium flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faCog} className="text-gray-600" />
                <span>Theme Preferences</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings/email-notifications"
                className="text-gray-800 hover:text-gray-600 font-medium flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faCog} className="text-gray-600" />
                <span>Email Notifications</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings/delete-account"
                className="text-gray-800 hover:text-gray-600 font-medium flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faCog} className="text-gray-600" />
                <span>Account Deletion</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
