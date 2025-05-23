import React, { useState, useEffect, createContext, useContext } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

// Toast types
export type ToastType = 'success' | 'error' | 'info';

// Toast interface
interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

// Toast context interface
interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

// Create context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provider component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType, duration = 5000) => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast component
const Toast: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
  const { id, message, type, duration = 5000 } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-error-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-primary-500" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-success-50 border-success-500';
      case 'error':
        return 'bg-error-50 border-error-500';
      case 'info':
        return 'bg-primary-50 border-primary-500';
      default:
        return 'bg-white border-gray-300';
    }
  };

  return (
    <div
      className={`${getBackgroundColor()} border-l-4 p-4 rounded-md shadow-md flex items-start mb-3 animate-fadeIn`}
      role="alert"
    >
      <div className="flex-shrink-0 me-3">{getIcon()}</div>
      <div className="flex-1">{message}</div>
      <button
        onClick={onClose}
        className="flex-shrink-0 ms-3 text-gray-400 hover:text-gray-600 focus:outline-none"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

// Toaster component
export const Toaster: React.FC = () => {
  // Initialize the context in the component itself
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType, duration = 5000) => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // Creating a simpler context value object for demonstration purposes
  const contextValue = { toasts, addToast, removeToast };

  return (
    <ToastContext.Provider value={contextValue}>
      <div className="fixed bottom-0 right-0 p-4 w-full max-w-sm z-50">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default Toaster;