import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Mail, Calendar, Key, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    // Password change fields
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    // Basic validation
    if (!formData.name.trim()) {
      setError(t('errors.required'));
      return;
    }
    
    try {
      setIsSaving(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      setError(t('errors.serverError'));
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    // Basic validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError(t('errors.required'));
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError(t('errors.passwordMatch'));
      return;
    }
    
    if (formData.newPassword.length < 8) {
      setError(t('errors.minLength', { length: 8 }));
      return;
    }
    
    try {
      setIsSaving(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Password changed successfully');
      setIsChangingPassword(false);
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      setError(t('errors.serverError'));
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {t('profile.title')}
      </h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {t('profile.personalInfo')}
          </h2>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="bg-error-50 border border-error-500 text-error-900 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-success-50 border border-success-500 text-success-900 px-4 py-3 rounded-md mb-6">
              {success}
            </div>
          )}
          
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {t('profile.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input mt-1"
                />
              </div>
              
              <div className="flex justify-end space-x-3 [dir=rtl]:space-x-reverse">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-outline"
                  disabled={isSaving}
                >
                  {t('profile.cancelChanges')}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSaving}
                >
                  {isSaving ? <LoadingSpinner size="small" /> : t('profile.saveChanges')}
                </button>
              </div>
            </form>
          ) : isChangingPassword ? (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  {t('profile.currentPassword')}
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="input mt-1"
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  {t('profile.newPassword')}
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="input mt-1"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  {t('profile.confirmPassword')}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="input mt-1"
                />
              </div>
              
              <div className="flex justify-end space-x-3 [dir=rtl]:space-x-reverse">
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  className="btn btn-outline"
                  disabled={isSaving}
                >
                  {t('profile.cancelChanges')}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSaving}
                >
                  {isSaving ? <LoadingSpinner size="small" /> : t('profile.saveChanges')}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex items-center py-2">
                  <div className="w-8 text-gray-500">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{t('profile.name')}</p>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center py-2">
                  <div className="w-8 text-gray-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{t('profile.email')}</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center py-2">
                  <div className="w-8 text-gray-500">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{t('profile.joined')}</p>
                    <p className="font-medium">April 15, 2025</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="btn btn-outline w-full sm:w-auto"
                >
                  {t('profile.updateProfile')}
                </button>
                
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(true)}
                  className="btn btn-outline w-full sm:w-auto"
                >
                  <Key className="h-4 w-4 me-2" />
                  {t('profile.changePassword')}
                </button>
                
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn w-full sm:w-auto bg-error-500 text-white hover:bg-error-600"
                >
                  <LogOut className="h-4 w-4 me-2" />
                  {t('nav.logout')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;