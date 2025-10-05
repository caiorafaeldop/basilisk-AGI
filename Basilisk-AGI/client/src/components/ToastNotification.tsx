/**
 * Toast Notification System
 * Sistema de notificações toast customizável
 */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useDesignSystem } from '@/hooks/useDesignSystem';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const { systemName } = useDesignSystem();

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove após duração
    const duration = toast.duration || 5000;
    setTimeout(() => {
      hideToast(id);
    }, duration);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
    }
  };

  const getColors = (type: ToastType) => {
    const colors = {
      success: {
        bg: systemName === 'minimalism' ? '#10b981' : '#10b981',
        border: systemName === 'minimalism' ? '#059669' : '#000000',
        text: '#ffffff',
      },
      error: {
        bg: systemName === 'minimalism' ? '#ef4444' : '#ef4444',
        border: systemName === 'minimalism' ? '#dc2626' : '#000000',
        text: '#ffffff',
      },
      warning: {
        bg: systemName === 'minimalism' ? '#f59e0b' : '#f59e0b',
        border: systemName === 'minimalism' ? '#d97706' : '#000000',
        text: '#ffffff',
      },
      info: {
        bg: systemName === 'minimalism' ? '#3b82f6' : '#3b82f6',
        border: systemName === 'minimalism' ? '#2563eb' : '#000000',
        text: '#ffffff',
      },
    };
    return colors[type];
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {toasts.map((toast) => {
          const colors = getColors(toast.type);
          
          return (
            <div
              key={toast.id}
              className="flex items-start gap-3 p-4 rounded-lg shadow-lg animate-slide-in"
              style={{
                backgroundColor: colors.bg,
                border: systemName === 'minimalism' 
                  ? `1px solid ${colors.border}` 
                  : `3px solid ${colors.border}`,
                borderRadius: systemName === 'minimalism' ? '12px' : '16px',
                boxShadow: systemName === 'minimalism'
                  ? '0 10px 25px rgba(0, 0, 0, 0.15)'
                  : '4px 4px 0px #000000',
              }}
            >
              <div style={{ color: colors.text }}>
                {getIcon(toast.type)}
              </div>
              
              <div className="flex-1">
                <h4 
                  className="font-semibold text-sm mb-1"
                  style={{ color: colors.text }}
                >
                  {toast.title}
                </h4>
                {toast.message && (
                  <p 
                    className="text-xs opacity-90"
                    style={{ color: colors.text }}
                  >
                    {toast.message}
                  </p>
                )}
              </div>

              <button
                onClick={() => hideToast(toast.id)}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
                style={{ color: colors.text }}
                aria-label="Fechar notificação"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </ToastContext.Provider>
  );
};

// Helper hooks para facilitar uso
export const useSuccessToast = () => {
  const { showToast } = useToast();
  return useCallback((title: string, message?: string) => {
    showToast({ type: 'success', title, message });
  }, [showToast]);
};

export const useErrorToast = () => {
  const { showToast } = useToast();
  return useCallback((title: string, message?: string) => {
    showToast({ type: 'error', title, message });
  }, [showToast]);
};

export const useWarningToast = () => {
  const { showToast } = useToast();
  return useCallback((title: string, message?: string) => {
    showToast({ type: 'warning', title, message });
  }, [showToast]);
};

export const useInfoToast = () => {
  const { showToast } = useToast();
  return useCallback((title: string, message?: string) => {
    showToast({ type: 'info', title, message });
  }, [showToast]);
};
