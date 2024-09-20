import './App.css';
import React from 'react';
import Index from './pages/Home/Index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Authentication/Signup';
import Login from './pages/Authentication/Login';
import Header from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import ActivationEmailSent from './pages/Authentication/Activation';
import HomePage from './pages/UserProfile/HomePage';
import CreateDocumentPage from './pages/Document/CreateDocument';
import VerifyDocumentPage from './pages/Document/VerifyDocument';
import ProfileManagementPage from './pages/UserProfile/ManageProfile';
import ScrollToTop from './utilities/ScrollToTop';
import Paywall from './pages/Payment/Paywall';
import SettingsPage from './pages/Settings/Settings';
import LanguageSettings from './components/Settings/LanguageSettings';
import ThemeSettings from './components/Settings/ThemeSettings';
import NotificationSettings from './components/Settings/NotificationSettings';
import MFASettings from './components/Settings/MfaSettings';
import NewsUpdatesPage from './pages/News/News';
import AdminDashboard from './pages/Admin/Dashboard';
import CreateTemplate from './pages/Admin/AddTemplate';
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <div className="App">
      <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activation-email-sent" element={<ActivationEmailSent />} />
          <Route path="/profile" element={<HomePage />} />
          <Route path="/create-document" element={<CreateDocumentPage />} />
          <Route path="/verify-document" element={<VerifyDocumentPage />} />
          <Route path="/settings/manage-profile" element={<ProfileManagementPage />} />
          <Route path="/paywall" element={<Paywall />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/language" element={<LanguageSettings />}/>
          <Route path="/settings/manage-profile" element={<ProfileManagementPage />} />
          <Route path="/settings/theme" element={<ThemeSettings />}/>
          <Route path="/settings/notifications" element={<NotificationSettings />}/>
          <Route path="/settings/mfa" element={<MFASettings />}/>
          <Route path="/news" element={<NewsUpdatesPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-template" element={<CreateTemplate />} />
          
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
