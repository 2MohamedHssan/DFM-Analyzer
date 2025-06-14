import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // const isRtl = i18n.language === 'ar';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/public/Logo.png" className="w-20 h-20" alt="" />
            </Link>
          </div>
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4 md:[dir=rtl]:space-x-reverse">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
            >
              {t("nav.home")}
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  {t("nav.dashboard")}
                </Link>
                <Link
                  to="/upload"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  {t("nav.upload")}
                </Link>
              </>
            ) : null}
            <LanguageSwitcher />
            {isAuthenticated ? (
              <div className="relative ml-3">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 focus:outline-none"
                >
                  <span className="me-1">{user?.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 [dir=rtl]:left-0 [dir=rtl]:right-auto mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="w-4 h-4 me-2" />
                      {t("nav.profile")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 me-2" />
                      {t("nav.logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 [dir=rtl]:space-x-reverse">
                <Link to="/login" className="btn btn-primary">
                  {t("nav.login")}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <LanguageSwitcher compact />
            <button
              onClick={toggleMenu}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.dashboard")}
                </Link>
                <Link
                  to="/upload"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.upload")}
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.profile")}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                >
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.register")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
