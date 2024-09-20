import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar z-50 text-black w-64 h-full p-4">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => handleNavigation('/settings/language')}
            className={`w-full text-left p-2 rounded hover:bg-gray-600 ${location.pathname === '/settings/language' ? 'bg-gray-700' : ''}`}
          >
            Language
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation('/settings/mfa')}
            className={`w-full text-left p-2 rounded hover:bg-gray-600 ${location.pathname === '/settings/mfa' ? 'bg-gray-700' : ''}`}
          >
            MFA
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation('/settings/theme')}
            className={`w-full text-left p-2 rounded hover:bg-gray-600 ${location.pathname === '/settings/theme' ? 'bg-gray-700' : ''}`}
          >
            Theme
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation('/settings/notifications')}
            className={`w-full text-left p-2 rounded hover:bg-gray-600 ${location.pathname === '/settings/notifications' ? 'bg-gray-700' : ''}`}
          >
            Notifications
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation('/settings/delete')}
            className={`w-full text-left p-2 rounded hover:bg-gray-600 ${location.pathname === '/settings/delete' ? 'bg-gray-700' : ''}`}
          >
            Delete Account
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
