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
          <Route path="/manage-profile" element={<ProfileManagementPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
