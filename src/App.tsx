import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Layout = lazy(() => (import("./components/Layout")));
const LoadingSpinner = lazy(() => import("./components/ui/LoadingSpinner"));
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
const HomePage = lazy(() => import("./pages/HomePage"));
// import LoginPage from "./pages/auth/LoginPage";
// import RegisterPage from "./pages/auth/RegisterPage";
// import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
// import ProfilePage from "./pages/ProfilePage";
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const UploadPage = lazy(() => import("./pages/UploadPage"));
const AnalysisResultsPage = lazy(() => import("./pages/AnalysisResultsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))
import { AuthProvider } from "./contexts/AuthContext";
const SingInPage = lazy(() => import("./pages/auth/SingInPage"))
const SingUpPage = lazy(() => import("./pages/auth/SingUpPage"))



const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

function App() {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

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
          {/* <Route path="login" element={<LoginPage />} /> */}
          {/* <Route path="register" element={<RegisterPage />} /> */}
          {/* <Route path="forgot-password" element={<ForgotPasswordPage />} /> */}
          <Route path="/login" element={<SingInPage />} />
          <Route path="/register" element={<SingUpPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
            <Route path="analysis/:id" element={<ProtectedRoute><AnalysisResultsPage /></ProtectedRoute>} />
            {/* <Route path="profile" element={<ProfilePage />} /> */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
