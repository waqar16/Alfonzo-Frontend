import React, { useState } from "react";

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
    <div className="pt-24 pb-16 w-full mx-auto dark:bg-black bg-white flex flex-col items-center">
      <div className=" p-6 max-w-2xl   shadow-md rounded-lg ">
        <h2 className="text-2xl dark:text-white font-bold mb-4 text-gray-800">
          Notification Settings
        </h2>
        <p className="dark:text-zinc-400 text-gray-600 mb-6">
          Manage your notification preferences. You can choose to receive
          notifications via email, SMS, or push notifications.
        </p>
        <div className="space-y-6">
          {/* Email Notifications */}
          <div className="flex items-center justify-between border-b border-gray-300 pb-4">
            <span className="text-lg font-medium dark:text-zinc-300 text-gray-700">
              Email Notifications
            </span>
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.email}
                onChange={handleToggleChange("email")}
                id="email-toggle"
                className="sr-only"
              />
              <label
                htmlFor="email-toggle"
                className={`flex items-center cursor-pointer`}
              >
                <div
                  className={`w-12 h-6 rounded-full shadow-inner transition-colors ${
                    notificationSettings.email ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                    notificationSettings.email
                      ? "translate-x-6"
                      : "translate-x-0"
                  }`}
                ></div>
              </label>
              <span className="ml-4 text-sm dark:text-zinc-200 text-gray-600">
                {notificationSettings.email ? "On" : "Off"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
