import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

const NotFoundPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full text-center">
        <FileQuestion className="h-24 w-24 text-gray-400 mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          {t('common.goBack')}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;