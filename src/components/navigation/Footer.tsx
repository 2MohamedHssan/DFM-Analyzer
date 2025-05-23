import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Globe, Mail, Github, Twitter } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-primary-400" />
              <span className="ms-2 text-xl font-bold">{t("app.name")}</span>
            </div>
            <p className="mt-2 text-sm text-gray-400">{t("app.tagline")}</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              {t("nav.home")}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-400 hover:text-white transition-colors"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/upload"
                  className="text-base text-gray-400 hover:text-white transition-colors"
                >
                  {t("nav.upload")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              {t("footer.about")}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-base text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-base text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-base text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-base text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              {t("footer.contact")}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="mailto:mohamed4hassan99@gmail.com"
                  className="text-base text-gray-400 hover:text-white transition-colors flex items-center flex-wrap"
                >
                  <Mail className="h-5 w-5 me-2" />
                  <p>Support@DFM.com</p>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/2MohamedHssan"
                  className="text-base text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <Github className="h-5 w-5 me-2" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <Twitter className="h-5 w-5 me-2" />
                  <span>Twitter</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
