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
import AOS from "aos";
import AboutUs from "./pages/About-us/AboutUs";
import UserQueries from "./pages/UserQueries/UserQueries";
import UserRequests from "./pages/UserRequests/UserRequests";
import UserDocument from "./pages/UserDocument/UserDocument";
import VerifyMfa from "./pages/VerifyMfa/VerifyMfa";
import { AuthProvider } from "./utilities/AuthProvider";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import { useSelector } from "react-redux";
import Services from "./components/Services/Services";
import Lawyers from "./pages/Lawyers/Lawyers";
import AskALawyer from "./pages/Ask-a-Lawyer/AskALawyer";
import LinkedinLogin from "./pages/LinkedinLogin/LinkedinLogin";
import Notifications from "./pages/Notifications/Notification";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <Content />
      </AuthProvider>
    </Router>
  );
}

function Content() {
  const theme = useSelector((state) => state.theme);
  useEffect(() => {
    // Toggle the 'dark' class on the <html> element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/manage-users");

  return (
    <>
      {!isAdminRoute && <Header />}
      <div className={`App ${theme == "dark" ? "bg-black" : "bg-white"}`}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-mfa" element={<VerifyMfa />} />
          <Route
            path="/activation-email-sent"
            element={<ActivationEmailSent />}
          />
          <Route element={<PrivateRoutes userRole={"user"} multiple={true} />}>
            <Route path="/profile" element={<HomePage />} />
          </Route>
          <Route element={<PrivateRoutes userRole={"user"} multiple={true} />}>
            <Route path="/templates" element={<Templates />} />
          </Route>

          <Route element={<PrivateRoutes userRole={"user"} multiple={true} />}>
            <Route path="/templates/edit-template" element={<EditTemplate />} />
          </Route>
          <Route element={<PrivateRoutes userRole={"lawyer"} />}>
            <Route path="/user-queries" element={<UserQueries />} />
          </Route>

          <Route element={<PrivateRoutes userRole={"lawyer"} />}>
            <Route path="/user-requests" element={<UserRequests />} />
          </Route>
          <Route element={<PrivateRoutes userRole={"user"} multiple={true} />}>
            <Route
              path="/templates/finalize-template"
              element={<FinalizeTemplate />}
            />
          </Route>
          <Route element={<PrivateRoutes userRole={"user"} multiple={true} />}>
            <Route path="/templates/lawyer" element={<SelectLawyer />} />
          </Route>
          <Route path="/linkedin-login" element={<LinkedinLogin />} />

          <Route element={<PrivateRoutes userRole={"user"} multiple={true} />}>
            <Route path="/verify-document" element={<VerifyDocumentPage />} />
          </Route>
          <Route element={<PrivateRoutes userRole={"user"} multiple={true} />}>
            <Route path="/create-document" element={<CreateDocumentPage />} />
          </Route>

          <Route element={<PrivateRoutes userRole={"user"} multiple={true} />}>
            <Route path="/your-documents" element={<UserDocument />} />
          </Route>

          <Route element={<PrivateRoutes userRole={"user"} />}>
            <Route path="/ask-a-lawyer" element={<AskALawyer />} />
          </Route>
          <Route
            element={<PrivateRoutes userRole={"user"} multiple={"true"} />}
          >
            <Route path="/notifications" element={<Notifications />} />
          </Route>
          <Route
            path="/settings/manage-profile"
            element={<ProfileManagementPage />}
          />
          <Route path="/paywall" element={<Paywall />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/language" element={<LanguageSettings />} />
          <Route path="/settings/theme" element={<ThemeSettings />} />
          <Route
            path="/settings/notifications"
            element={<NotificationSettings />}
          />
          <Route path="/settings/mfa" element={<MFASettings />} />
          <Route path="/news" element={<NewsUpdatesPage />} />
          <Route element={<PrivateRoutes userRole={"admin"} />}>
            <Route
              path="/admin"
              element={
                <DefaultLayout>
                  <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <ECommerce />
                </DefaultLayout>
              }
            />
          </Route>
          <Route element={<PrivateRoutes userRole={"admin"} />}>
            <Route
              path="/manage-users"
              element={
                <DefaultLayout>
                  <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Tables />
                </DefaultLayout>
              }
            />
          </Route>
          <Route element={<PrivateRoutes userRole={"admin"} />}>
            <Route
              path="/admin/profile"
              element={
                <DefaultLayout>
                  <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Profile />
                </DefaultLayout>
              }
            />
          </Route>

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
          <Route path="/services" element={<Services />} />
          <Route element={<PrivateRoutes userRole={"user"} multiple={true} />}>
            <Route path="/lawyers" element={<Lawyers />} />
          </Route>
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
