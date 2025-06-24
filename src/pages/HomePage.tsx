import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Image,
  SearchCheck,
  FileText,
  Users,
  Upload,
  BarChart3,
  Download,
} from "lucide-react";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className=" bg-[url(/Hero.jpg)] bg-cover bg-center h-[100vh] w-full py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 animate-scaleIn">
                {t("home.hero.title")}
              </h1>
              <p className="text-xl text-[#4B5563] mb-8 animate-fadeIn">
                {t("home.hero.subtitle")}
              </p>
              <div className="flex flex-col gap-5 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 space-x-reverse">
                <Link
                  to="/upload"
                  className="btn bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  {t("home.hero.cta")}
                </Link>
                <a
                  href="#features"
                  className="btn bg-white hover:bg-opacity-90 text-[#f59e0b] px-6 py-3 rounded-lg text-lg font-medium transition-all"
                >
                  {t("home.hero.features")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("home.features.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <SearchCheck className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {t("home.features.feature1.title")}
              </h3>
              <p className="text-gray-600">
                {t("home.features.feature1.description")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                <Image className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {t("home.features.feature2.title")}
              </h3>
              <p className="text-gray-600">
                {t("home.features.feature2.description")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {t("home.features.feature3.title")}
              </h3>
              <p className="text-gray-600">
                {t("home.features.feature3.description")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {t("home.features.feature4.title")}
              </h3>
              <p className="text-gray-600">
                {t("home.features.feature4.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            {t("home.howItWorks.title")}
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/3 flex flex-col items-center mb-8 md:mb-0">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center">
                {t("home.howItWorks.step1.title")}
              </h3>
              <p className="text-gray-600 text-center max-w-xs">
                {t("home.howItWorks.step1.description")}
              </p>
            </div>

            <div className="w-full md:w-1/3 flex flex-col items-center mb-8 md:mb-0">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center">
                {t("home.howItWorks.step2.title")}
              </h3>
              <p className="text-gray-600 text-center max-w-xs">
                {t("home.howItWorks.step2.description")}
              </p>
            </div>

            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-4">
                <Download className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center">
                {t("home.howItWorks.step3.title")}
              </h3>
              <p className="text-gray-600 text-center max-w-xs">
                {t("home.howItWorks.step3.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{t("home.hero.title")}</h2>
          <p className="text-xl mb-8 text-secondary-100">
            {t("home.hero.subtitle")}
          </p>
          <Link
            to="/upload"
            className="btn bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-all inline-block"
          >
            {t("home.hero.cta")}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
