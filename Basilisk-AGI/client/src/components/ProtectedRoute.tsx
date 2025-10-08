import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isValidating } = useAuth();

  // Enquanto valida, não redireciona (evita flicker)
  if (isValidating) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Verificação dupla: useAuth + localStorage direto (fallback para race conditions)
  const hasToken = localStorage.getItem('token');
  const hasUser = localStorage.getItem('user');
  const isActuallyAuthenticated = isAuthenticated || (hasToken && hasUser);

  // Se não estiver autenticado, redirecionar para login
  if (!isActuallyAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderizar o componente filho
  return <>{children}</>;
};

export default ProtectedRoute;
