import React, { useState } from 'react';

const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleToggleChange = (type) => () => {
    setNotificationSettings((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg mt-24 mb-28">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Notification Settings</h2>
      <p className="text-gray-600 mb-6">
        Manage your notification preferences. You can choose to receive notifications via email, SMS, or push notifications.
      </p>
      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-4">
          <span className="text-lg font-medium text-gray-700">Email Notifications</span>
          <div className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationSettings.email}
              onChange={handleToggleChange('email')}
              id="email-toggle"
              className="sr-only"
            />
            <label
              htmlFor="email-toggle"
              className={`flex items-center cursor-pointer`}>
              <div
                className={`w-12 h-6 rounded-full shadow-inner transition-colors ${
                  notificationSettings.email ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              ></div>
              <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                  notificationSettings.email ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </label>
            <span className="ml-4 text-sm text-gray-600">{notificationSettings.email ? 'On' : 'Off'}</span>
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-4">
          <span className="text-lg font-medium text-gray-700">SMS Notifications</span>
          <div className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationSettings.sms}
              onChange={handleToggleChange('sms')}
              id="sms-toggle"
              className="sr-only"
            />
            <label
              htmlFor="sms-toggle"
              className={`flex items-center cursor-pointer`}>
              <div
                className={`w-12 h-6 rounded-full shadow-inner transition-colors ${
                  notificationSettings.sms ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              ></div>
              <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                  notificationSettings.sms ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </label>
            <span className="ml-4 text-sm text-gray-600">{notificationSettings.sms ? 'On' : 'Off'}</span>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-4">
          <span className="text-lg font-medium text-gray-700">Push Notifications</span>
          <div className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationSettings.push}
              onChange={handleToggleChange('push')}
              id="push-toggle"
              className="sr-only"
            />
            <label
              htmlFor="push-toggle"
              className={`flex items-center cursor-pointer`}>
              <div
                className={`w-12 h-6 rounded-full shadow-inner transition-colors ${
                  notificationSettings.push ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              ></div>
              <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                  notificationSettings.push ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </label>
            <span className="ml-4 text-sm text-gray-600">{notificationSettings.push ? 'On' : 'Off'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
