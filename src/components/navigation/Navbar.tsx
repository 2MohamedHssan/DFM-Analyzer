import { useState } from "react";
import { Link, } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/Logo.png" className="w-20 h-20" alt="" />
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4 md:[dir=rtl]:space-x-reverse">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
            >
              {t("nav.home")}
            </Link>
            <SignedIn>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.dashboard")}
              </Link>
              <Link
                to="/upload"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
              >
                {t("nav.upload")}
              </Link>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <SignInButton />
            </SignedOut>

            <LanguageSwitcher />

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
            <UserButton />
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
            <SignedIn>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.dashboard")}
              </Link>
              <Link
                to="/upload"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
              >
                {t("nav.upload")}
              </Link>
            </SignedIn>

            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
