import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  compact?: boolean;
}

const LanguageSwitcher = ({ compact = false }: LanguageSwitcherProps) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = i18n.language;
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    setIsOpen(false);
    
    // Store the language preference
    localStorage.setItem('i18nextLng', lang);
  };
  
  return (
    <div className="relative">
      <button 
        className={`flex items-center ${compact ? 'p-2' : 'px-3 py-2'} rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 focus:outline-none`}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <Globe className={`${compact ? 'h-5 w-5' : 'h-4 w-4 me-1'}`} />
        {!compact && (
          <span className="me-1">{t('common.language')}</span>
        )}
      </button>
      
      {isOpen && (
        <div className="origin-top-right absolute right-0 [dir=rtl]:left-0 [dir=rtl]:right-auto mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className={`flex items-center w-full text-left px-4 py-2 text-sm ${currentLanguage === 'en' ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => changeLanguage('en')}
              role="menuitem"
            >
              <span className="flex-1">English</span>
              {currentLanguage === 'en' && (
                <span className="ms-2 text-primary-600">✓</span>
              )}
            </button>
            <button
              className={`flex items-center w-full text-left px-4 py-2 text-sm ${currentLanguage === 'ar' ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => changeLanguage('ar')}
              role="menuitem"
            >
              <span className="flex-1">العربية</span>
              {currentLanguage === 'ar' && (
                <span className="ms-2 text-primary-600">✓</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;