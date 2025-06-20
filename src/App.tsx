import { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Components
import Layout from "./components/Layout";
import LoadingSpinner from "./components/ui/LoadingSpinner";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import UploadPage from "./pages/UploadPage";
import AnalysisResultsPage from "./pages/AnalysisResultsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

// Providers
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const location = useLocation();
  const { i18n } = useTranslation();

  // Update document direction based on language
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  // Add page transition effect
  useEffect(() => {
    const main = document.querySelector("main");
    if (main) {
      main.classList.add("page-transition", "page-enter");
      setTimeout(() => {
        main.classList.add("page-enter-active");
      }, 10);
    }

    return () => {
      if (main) {
        main.classList.remove("page-enter-active");
      }
    };
  }, [location.pathname]);

  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="analysis/:id" element={<AnalysisResultsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
