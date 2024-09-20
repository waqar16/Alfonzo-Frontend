import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faUserCircle, faLock, faBell, faUserEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Sample function to simulate fetching user data
const fetchUserData = () => ({
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePicture: null,
  notifications: true,
  language: 'English',
  theme: 'light',
  mfaEnabled: false,
  sharingLinks: true,
  password: '',
});

const ProfileManagementPage = () => {
  const [profile, setProfile] = useState(fetchUserData());
  const [editing, setEditing] = useState(false);
  const [newProfile, setNewProfile] = useState({ ...profile });
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [notifications, setNotifications] = useState(profile.notifications);
  const [language, setLanguage] = useState(profile.language);
  const [theme, setTheme] = useState(profile.theme);
  const [mfaEnabled, setMfaEnabled] = useState(profile.mfaEnabled);
  const [sharingLinks, setSharingLinks] = useState(profile.sharingLinks);

  const handleEditClick = () => setEditing(true);
  const handleSaveClick = () => {
    setProfile({ ...newProfile, notifications, language, theme, mfaEnabled, sharingLinks });
    setEditing(false);
  };

  const handlePasswordChange = () => {
    // Logic to handle password change
    console.log('Password changed:', newPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = () => {
    setNotifications((prev) => !prev);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleMfaToggle = () => {
    setMfaEnabled((prev) => !prev);
  };

  const handleSharingLinksToggle = () => {
    setSharingLinks((prev) => !prev);
  };

  const handleAccountDeletion = () => {
    // Logic to handle account deletion
    console.log('Account deletion initiated');
  };

  return (
    <section className="min-h-screen flex items-start justify-center py-4 pt-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">  
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Management</h1>

        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            {profile.profilePicture ? (
              <img src={profile.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <FontAwesomeIcon icon={faUserCircle} className="text-4xl text-gray-500" />
            )}
          </div>
          <div className="ml-4">
            {editing ? (
              <button
                onClick={handleSaveClick}
                className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500 transition-all duration-200"
              >
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                Save
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Edit
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={newProfile.name}
              onChange={handleChange}
              disabled={!editing}
              className="form-input w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={newProfile.email}
              onChange={handleChange}
              disabled={!editing}
              className="form-input w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
          <label className="block text-gray-700 font-semibold mb-2">Current Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 mb-4"
          />
          <label className="block text-gray-700 font-semibold mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-input w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 mb-4"
          />
          <button
            onClick={handlePasswordChange}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 transition-all duration-200"
          >
            <FontAwesomeIcon icon={faLock} className="mr-2" />
            Change Password
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Settings</h2>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={notifications}
              onChange={handleNotificationToggle}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Receive notifications</span>
          </label>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Language Preferences</h2>
          <select
            value={language}
            onChange={handleLanguageChange}
            disabled={!editing}
            className="form-select w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            {/* Add more languages as needed */}
          </select>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Theme Selection</h2>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="light"
              checked={theme === 'light'}
              onChange={handleThemeChange}
              disabled={!editing}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Light Theme</span>
          </label>
          <br />
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="dark"
              checked={theme === 'dark'}
              onChange={handleThemeChange}
              disabled={!editing}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Dark Theme</span>
          </label>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Multi-Factor Authentication</h2>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={mfaEnabled}
              onChange={handleMfaToggle}
              disabled={!editing}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Enable MFA</span>
          </label>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sharing Links</h2>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={sharingLinks}
              onChange={handleSharingLinksToggle}
              disabled={!editing}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Enable sharing links for benefits</span>
          </label>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Email Notification Preferences</h2>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={notifications}
              onChange={handleNotificationToggle}
              disabled={!editing}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Receive email notifications</span>
          </label>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Management</h2>
          <button
            onClick={handleAccountDeletion}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 transition-all duration-200"
          >
            <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileManagementPage;
