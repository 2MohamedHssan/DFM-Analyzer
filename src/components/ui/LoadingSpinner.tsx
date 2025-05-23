import { useTranslation } from 'react-i18next';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  message?: string;
}

const LoadingSpinner = ({ 
  size = 'medium',
  fullScreen = false,
  message
}: LoadingSpinnerProps) => {
  const { t } = useTranslation();
  
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-2',
    large: 'w-12 h-12 border-3',
  };
  
  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeClasses[size]} rounded-full border-primary-500 border-t-transparent animate-spin`}></div>
      {message && <p className="mt-3 text-gray-600">{message}</p>}
      {!message && fullScreen && <p className="mt-3 text-gray-600">{t('common.loading')}</p>}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

export default LoadingSpinner;