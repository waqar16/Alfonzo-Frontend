import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSave,
  faUserCircle,
  faLock,
  faUserEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Toaster } from "react-hot-toast";
import { notify } from "../../utilities/toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { changePassword, changeUsername } from "../../services/user-services";

// Sample function to simulate fetching user data
const fetchUserData = () => ({
  name: "John Doe",
  email: "john.doe@example.com",
  profilePicture: null,
  notifications: true,
  language: "English",
  theme: "light",
  mfaEnabled: false,
  sharingLinks: true,
  password: "",
});

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const ProfileManagementPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(fetchUserData());
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [newProfile, setNewProfile] = useState({ ...profile });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState(""); // New state for username
  const [notifications, setNotifications] = useState();
  const [language, setLanguage] = useState(profile.language);
  const [theme, setTheme] = useState(profile.theme);
  const [mfaEnabled, setMfaEnabled] = useState(profile.mfaEnabled);
  const [sharingLinks, setSharingLinks] = useState(profile.sharingLinks);
  const handlePasswordChange = async () => {
    setLoading(true);
    const response = await changePassword(
      { current_password: password, new_password: newPassword },
      setLoading
    );
    if (response.status == 401) {
      navigate("/login");
    } else if (response.status == 200) {
      notify(response.data.success, "success");
      setIsPasswordModalOpen(false);
    } else {
      notify(response.error, "error");
    }
    console.log("response", response);
  };

  const handleEditClick = () => setEditing(true);

  const handleUsernameChange = async () => {
    setLoading(true);
    const response = await changeUsername(
      { username: newUsername }, // Update with the new username
      setLoading
    );
    if (response.status === 401) {
      navigate("/login");
    } else if (response.status === 200) {
      setUsername(newUsername);
      localStorage.setItem("username", newUsername);
      notify(response.data.message, "success");

      setIsUsernameModalOpen(false);
    } else {
      notify(response.error, "error");
    }
  };
  const handleDeleteAccount = async () => {
    setLoading(true);
    // const response = await deleteAccount(); // Assuming you have this function in services
    // if (response.status === 200) {
    //   notify("Account deleted successfully", "success");
    //   navigate("/login"); // Redirect after account deletion
    // } else {
    //   notify(response.error, "error");
    // }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({ ...prev, [name]: value }));
  };

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false); // New state for username modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // New state for delete modal
  const [newProfilePicture, setNewProfilePicture] = useState(
    localStorage.getItem("profilepic")
  ); // Store the new uploaded image

  const handleSaveClick = () => {
    // Save the new profile picture URL and stop editing
    setProfile((prevProfile) => ({
      ...prevProfile,
      profilePicture: newProfilePicture || prevProfile.profilePicture,
    }));
    setEditing(false);
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert the uploaded image to a temporary URL for previewing
      const imageUrl = URL.createObjectURL(file);

      setNewProfilePicture(imageUrl);
      localStorage.setItem("profilepic", imageUrl);
      notify("User Image Updated Succesfully", "success");
    }
  };

  return (
    <section className="min-h-screen flex items-start justify-center py-4 pt-16 lg:py-24 px-4 sm:px-6 lg:px-8 dark:bg-slate-700 bg-gray-100">
      <div className="w-11/12 md:w-16/12 mx-auto dark:bg-black bg-white p-6 rounded-lg shadow-md border dark:border-zinc-700 border-gray-200">
        <h1 className="text-2xl font-bold dark:text-white text-gray-900 mb-4">
          Profile Management
        </h1>

        <div className="flex items-center mb-6 relative">
          <div className="relative w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center  overflow-hidden">
            {newProfilePicture ? (
              <img
                src={newProfilePicture}
                alt="Profile"
                className="w-full h-full object-cover  "
              />
            ) : (
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-4xl dark:text-white text-gray-500"
              />
            )}
          </div>
          <div className="absolute bottom-0 left-20">
            <label htmlFor="uploadProfilePicture" className="cursor-pointer">
              <div className="  text-white rounded-lg  transition-all bg-black-2 w-8 h-8 flex flex-col items-center justify-center">
                <FontAwesomeIcon icon={faEdit} />
              </div>
            </label>
            <input
              id="uploadProfilePicture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureUpload}
            />
          </div>{" "}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="col-span-2">
            <label className="block dark:text-white text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={`${localStorage.getItem(
                "firstname"
              )} ${localStorage.getItem("lastname")}`}
              onChange={handleChange}
              disabled={!editing}
              className="form-input w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
            />
          </div>
          <div className="col-span-2">
            <label className="block dark:text-white text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={localStorage.getItem("email")}
              onChange={handleChange}
              disabled={!editing}
              className="form-input w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
            />
          </div>
          <div className="col-span-2">
            <div className="flex lex-col items-center mb-2">
              <label className="dark:text-white block text-gray-700 font-semibold ">
                Username
              </label>
              <button
                onClick={() => setIsUsernameModalOpen(true)} // Open the username modal
              >
                <FontAwesomeIcon icon={faEdit} className="ml-2" />
              </button>
            </div>
            <input
              type="username"
              name="username"
              value={username}
              onChange={handleChange}
              disabled={!editing}
              className="form-input w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
            />
          </div>
        </div>

        <div className="flex flex-col items-start w-full">
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="w-[200px] my-2 bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200"
          >
            <FontAwesomeIcon icon={faLock} className="mr-2 " />
            Change Password
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="w-[200px] my-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 transition-all duration-200"
          >
            <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
            Delete Account
          </button>
        </div>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Confirm Account Deletion
          </h2>
          <p className="mb-4 text-gray-600">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>
          <div className="flex justify-between">
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 transition-all duration-200"
            >
              {loading ? <Loader color={"white"} /> : "Confirm"}
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-gray-300 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={isUsernameModalOpen}
          onClose={() => setIsUsernameModalOpen(false)}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Change Username
          </h2>
          <label className="block text-gray-700 font-semibold mb-2">
            New Username
          </label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="form-input w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 mb-4"
          />
          <button
            onClick={
              newUsername
                ? handleUsernameChange
                : () => notify("Enter a Username", "error")
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-500 transition-all duration-200 w-[200px]"
          >
            {loading ? (
              <Loader color={"white"} />
            ) : (
              <>
                <FontAwesomeIcon icon={faUserEdit} className="mr-2" />
                Change Username
              </>
            )}
          </button>
        </Modal>

        {/* Password Modal */}
        <Modal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Change Password
          </h2>
          <label className="block text-gray-700 font-semibold mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 mb-4"
          />
          <label className="block text-gray-700 font-semibold mb-2">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-input w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 mb-4"
          />
          <button
            onClick={
              password && newPassword
                ? handlePasswordChange
                : () => notify("Enter Both Fields", "error")
            }
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 transition-all duration-200 w-[200px]"
          >
            {loading ? (
              <Loader color={"white"} />
            ) : (
              <>
                <FontAwesomeIcon icon={faLock} className="mr-2" />
                Change Password
              </>
            )}
          </button>
        </Modal>
        <Toaster />
      </div>
    </section>
  );
};
export default ProfileManagementPage;
