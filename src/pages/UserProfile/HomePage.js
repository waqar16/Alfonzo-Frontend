import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../../components/Loader/Loader";
import {
  faSearch,
  faBell,
  faLock,
  faCog,
  faFile,
  faFileAlt,
  faUserEdit,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { fetchUserBasicDetails } from "../../services/user-services";

const HomePage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState("user"); // Default selected value
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const handleToggle = () => {
    setSelected((prev) => (prev === "user" ? "lawyer" : "user"));
  };
  useEffect(() => {
    const fetchdetails = async () => {
      setLoading(true);
      const details = await fetchUserBasicDetails(setLoading);
      if (details.status != 200) {
        navigate("/login");
      } else {
        localStorage.setItem("email", details.data.email);
        localStorage.setItem("username", details.data.username);
        localStorage.setItem("firstname", details.data.first_name);
        localStorage.setItem("lastname", details.data.last_name);
        localStorage.setItem("phone", details.data.phone);
        localStorage.setItem("mfamethod", details.data.mfa_method);

        setUser(details.data);
        console.log(details);
      }
    };
    fetchdetails();
  }, []);
  return (
    <section className="dark:bg-slate-700 min-h-screen flex items-start justify-center pb-4 pt-24 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="  max-w-7xl mx-auto grid gap-6">
        {/* Profile Section */}
        <div className="dark:bg-black bg-white p-6 rounded-lg shadow-md border dark:border-zinc-400 flex items-center space-x-4 mb-6">
          {user ? (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <img
                className="w-full h-full  object-cover"
                src={localStorage.getItem("profilepic")}
                alt="user image"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUserEdit}
                className="text-3xl text-gray-600"
              />
            </div>
          )}
          {loading ? (
            <Loader />
          ) : (
            <div>
              <h1 className="text-2xl font-bold dark:text-white text-gray-900">
                {`Welcome, ${user?.first_name} ${user?.last_name}`}
              </h1>
              <p className="dark:text-gray-3 text-gray-600">{`@ ${user?.username}`}</p>
              {/* <p className="dark:text-white text-gray-600">{user.first_name}</p> */}
              <button className="mt-2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-200 flex items-center">
                <FontAwesomeIcon icon={faUserEdit} className="mr-2" />
                <Link to={"/settings"}>Edit Profile</Link>
              </button>
            </div>
          )}
        </div>

        {user && !loading && user.role != "LAWYER" ? (
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Link
              to="/templates"
              className="dark:bg-black bg-white p-6 rounded-lg shadow-md border dark:border-zinc-400 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
            >
              <FontAwesomeIcon
                icon={faFile}
                className="text-3xl dark:text-white text-gray-800"
              />
              <div>
                <h3 className="text-lg font-semibold dark:text-white text-gray-900">
                  Templates
                </h3>
                <p className=" dark:text-zinc-400 text-gray-600">
                  Create a new document from Templates.
                </p>
              </div>
            </Link>
            <Link
              to="/verify-document"
              className="dark:bg-black bg-white p-6 rounded-lg shadow-md border dark:border-zinc-400 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
            >
              <FontAwesomeIcon
                icon={faFileAlt}
                className="text-3xl dark:text-white text-gray-800"
              />
              <div>
                <h3 className="text-lg font-semibold dark:text-white text-gray-900">
                  Verify Document
                </h3>
                <p className=" dark:text-zinc-400 text-gray-600">
                  Verify the authenticity of a document.
                </p>
              </div>
            </Link>
            <Link
              to="/your-documents"
              className="dark:bg-black bg-white p-6 rounded-lg shadow-md border dark:border-zinc-400 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
            >
              <FontAwesomeIcon
                icon={faCog}
                className="text-3xl dark:text-white text-gray-800"
              />
              <div>
                <h3 className="dark:text-white text-lg font-semibold text-gray-900">
                  Your Documents
                </h3>
                <p className="text-zinc-400">View your Created documents.</p>
              </div>
            </Link>
            <Link
              to="/ask-a-lawyer"
              className="dark:bg-black bg-white p-6 rounded-lg shadow-md border dark:border-zinc-400 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
            >
              <FontAwesomeIcon
                icon={faCommentDots}
                className="text-3xl dark:text-white text-gray-800"
              />
              <div>
                <h3 className="dark:text-white text-lg font-semibold text-gray-900">
                  Ask a lawyer
                </h3>
                <p className="text-zinc-400">
                  Ask Your selected lawyer a question
                </p>
              </div>
            </Link>
          </div>
        ) : (
          user &&
          !loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <Link
                to="/templates"
                className="dark:bg-black bg-white p-6 rounded-lg shadow-md border dark:border-zinc-400 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
              >
                <FontAwesomeIcon
                  icon={faFile}
                  className="text-3xl dark:text-white text-gray-800"
                />
                <div>
                  <h3 className="text-lg font-semibold dark:text-white text-gray-900">
                    Templates
                  </h3>
                  <p className="dark:text-zinc-400 text-gray-600">
                    Create a new document from Templates.
                  </p>
                </div>
              </Link>
              <Link
                to="/verify-document"
                className="dark:bg-black bg-white p-6 rounded-lg shadow-md border dark:border-zinc-400 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
              >
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="text-3xl dark:text-white text-gray-800"
                />
                <div>
                  <h3 className="dark:text-white text-lg font-semibold text-gray-900">
                    Verify Document
                  </h3>
                  <p className=" dark:text-zinc-400 text-gray-600">
                    Verify the authenticity of a document.
                  </p>
                </div>
              </Link>
              <Link
                to="/your-documents"
                className="dark:bg-black bg-white p-6 rounded-lg shadow-md border dark:border-zinc-400 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
              >
                <FontAwesomeIcon
                  icon={faCog}
                  className="text-3xl dark:text-white text-gray-800"
                />
                <div>
                  <h3 className="dark:text-white text-lg font-semibold text-gray-900">
                    Your Documents
                  </h3>
                  <p className="dark:text-zinc-400 text-gray-600">
                    View your Created documents.
                  </p>
                </div>
              </Link>
              <Link
                to="/user-queries"
                className="dark:bg-black bg-white p-6 rounded-lg shadow-md border dark:border-zinc-400 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
              >
                <FontAwesomeIcon
                  icon={faFile}
                  className="text-3xl dark:text-white text-gray-800"
                />
                <div>
                  <h3 className="dark:text-white text-lg font-semibold text-gray-900">
                    User Queries
                  </h3>
                  <p className="dark:text-zinc-400 text-gray-600">
                    See user queries specific to yourself.
                  </p>
                </div>
              </Link>
              <Link
                to="/user-requests"
                className="dark:bg-black bg-white p-6 rounded-lg shadow-md border dark:border-zinc-400 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200"
              >
                <FontAwesomeIcon
                  icon={faFile}
                  className="text-3xl dark:text-white text-gray-800"
                />
                <div>
                  <h3 className="dark:text-white text-lg font-semibold text-gray-900">
                    Requests
                  </h3>
                  <p className="dark:text-zinc-400 text-gray-600">
                    See how many user have requested your services.
                  </p>
                </div>
              </Link>
            </div>
          )
        )}

        {/* Side Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Notifications Section */}
          <div className="dark:bg-black bg-white p-6 rounded-lg shadow-md border dark:border-zinc-400">
            <h2 className="dark:text-white file:text-xl font-bold text-gray-900 mb-4">
              Notifications
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faBell}
                  className="dark:text-white text-gray-600"
                />
                <p className="dark:text-zinc-400 text-gray-800">
                  Document status updated to approved.
                </p>
              </li>
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faBell}
                  className="dark:text-white text-gray-600"
                />
                <p className="dark:text-zinc-400 text-gray-800">
                  Payment confirmation received.
                </p>
              </li>
            </ul>
          </div>

          {/* Summary Section */}
          <div className="dark:bg-black bg-white p-6 rounded-lg shadow-md border dark:border-zinc-400">
            <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-4">
              Summary
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="dark:text-white text-gray-600"
                />
                <p className="dark:text-zinc-400 text-gray-800">
                  Pending Actions: Review documents pending your action.
                </p>
              </li>
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="dark:text-white text-gray-600"
                />
                <p className="dark:text-zinc-400 text-gray-800">
                  Upcoming Deadlines: Check deadlines for document submissions.
                </p>
              </li>
            </ul>
          </div>

          {/* Preferred Lawyer Section */}
          <div className="dark:bg-black bg-white p-6 rounded-lg shadow-md border dark:border-zinc-400">
            <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-4">
              Preferred Lawyer
            </h2>
            <p className="dark:text-zinc-400 text-gray-600 mb-4">
              Lock a preferred lawyer for all documents. You must confirm your
              selection before finalizing any document.
            </p>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-200 flex items-center">
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Set Preferred Lawyer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
