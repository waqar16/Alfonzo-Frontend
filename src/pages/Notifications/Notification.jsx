import React, { useState } from "react";

const Notifications = () => {
  // Sample notification data
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

  // Mark notification as read
  const markAsRead = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].is_read = true;
    setNotifications(updatedNotifications);
  };

  return (
    <div className="container mx-auto p-4  py-24">
      <h1 className="text-2xl font-bold mb-4 text-center w-full ">
        Notifications
      </h1>
      
    </div>
  );
};

export default Notifications;
