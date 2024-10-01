import "./App.css";
import React, { useEffect } from "react";
import Index from "./pages/Home/Index";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Signup from "./pages/Authentication/Signup";
import Login from "./pages/Authentication/Login";
import Header from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import ActivationEmailSent from "./pages/Authentication/Activation";
import HomePage from "./pages/UserProfile/HomePage";
import CreateDocumentPage from "./pages/Document/CreateDocument";
import VerifyDocumentPage from "./pages/Document/VerifyDocument";
import ProfileManagementPage from "./pages/UserProfile/ManageProfile";
import ScrollToTop from "./utilities/ScrollToTop";
import Paywall from "./pages/Payment/Paywall";
import SettingsPage from "./pages/Settings/Settings";
import LanguageSettings from "./components/Settings/LanguageSettings";
import ThemeSettings from "./components/Settings/ThemeSettings";
import NotificationSettings from "./components/Settings/NotificationSettings";
import MFASettings from "./components/Settings/MfaSettings";
import NewsUpdatesPage from "./pages/News/News";
import AdminDashboard from "./pages/Admin/Dashboard";
import CreateTemplate from "./pages/Admin/AddTemplate";
import DefaultLayout from "./layout/DefaultLayout";
import ECommerce from "./pages/Dashboard/ECommerce";
import PageTitle from "./components/PageTitle";
import Tables from "./components/Tables";
import Profile from "./components/Profile";
import Templates from "./pages/Templates/Templates";
import EditTemplate from "./pages/Edit-Template/Edit-Template";
import SelectLawyer from "./pages/SelectLawyer/SelectLawyer";
import FinalizeTemplate from "./pages/FinalizeTemplate/FinalizeTemplate"; 
import Faqs from "./pages/Faqs/Faqs";
import AOS from 'aos'
import AboutUs from "./pages/About-us/AboutUs";
function App() {
  useEffect(()=>{
    AOS.init()
  },[])
  return (
    <Router>
      <ScrollToTop />
      <Content />
    </Router>
  );
}

function Content() {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/manage-users");

  return (
    <>
      {!isAdminRoute && <Header />}
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/activation-email-sent"
            element={<ActivationEmailSent />}
          />
          <Route path="/profile" element={<HomePage />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/edit-template" element={<EditTemplate />} />
          <Route path="/user-queries" element={<UserQueries />} />
          <Route path="/user-requests" element={<UserRequests />} />
          <Route
            path="/templates/finalize-template"
            element={<FinalizeTemplate />}
          />
          <Route path="/templates/lawyer" element={<SelectLawyer />} />
          <Route path="/verify-document" element={<VerifyDocumentPage />} />
          <Route path="/create-document" element={<CreateDocumentPage />} />
          <Route path="/your-documents" element={<UserDocument />} />
          <Route
            path="/settings/manage-profile"
            element={<ProfileManagementPage />}
          />
          <Route path="/paywall" element={<Paywall />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/language" element={<LanguageSettings />} />
          <Route
            path="/settings/manage-profile"
            element={<ProfileManagementPage />}
          />
          <Route path="/settings/theme" element={<ThemeSettings />} />
          <Route
            path="/settings/notifications"
            element={<NotificationSettings />}
          />
          <Route path="/settings/mfa" element={<MFASettings />} />
          <Route path="/news" element={<NewsUpdatesPage />} />
          <Route
            path="/admin"
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <ECommerce />
                </DefaultLayout>
              </>
            }
          />
          <Route
            path="/manage-users"
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Tables />
                </DefaultLayout>
              </>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Profile />
                </DefaultLayout>
              </>
            }
          />
          <Route
            path="/admin/add-template"
            element={
              <DefaultLayout>
                <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <CreateTemplate />
              </DefaultLayout>
            }
          />

          <Route path="/faqs" element={<Faqs />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
