import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email) {
      setError(t('errors.required'));
      return;
    }
    
    if (!password) {
      setError(t('errors.required'));
      return;
    }
    
    try {
      setError('');
      setIsLoading(true);
      
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError(t('errors.invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {t('auth.login.title')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('auth.login.subtitle')}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-error-50 border border-error-500 text-error-900 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('auth.login.email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input mt-1"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('auth.login.password')}
              </label>
              <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-500">
                {t('auth.login.forgotPassword')}
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input mt-1"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full"
            >
              {isLoading ? <LoadingSpinner size="small" /> : t('auth.login.loginButton')}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {t('auth.login.noAccount')}
            {' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium">
              {t('auth.login.register')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;