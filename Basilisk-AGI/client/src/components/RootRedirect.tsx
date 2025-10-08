import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSiteConfig } from '@/hooks/useSiteConfig';

/**
 * Componente que gerencia redirecionamento inteligente na raiz
 * - Se não logado e site vazio → /login
 * - Se não logado e site configurado → mostra site público
 * - Se logado → mostra site público com menu admin disponível
 */
export const RootRedirect = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isValidating } = useAuth();
  const { config, isLoading, isFirstSetup } = useSiteConfig();
  const navigate = useNavigate();

  useEffect(() => {
    // Aguardar validação de auth e config
    if (isValidating || isLoading) return;

    // Se está logado, sempre permitir acesso (não redirecionar)
    if (isAuthenticated) return;

    // APENAS redirecionar se NÃO está logado

    // Se é primeira configuração → login
    if (isFirstSetup) {
      navigate('/login', { replace: true });
      return;
    }

    // Se site não tem conteúdo → login
    const hasContent = config && (
      config.siteName !== 'Meu Site' ||
      config.heroTitle ||
      config.logo
    );

    if (!hasContent) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isValidating, isFirstSetup, isLoading, config, navigate]);

  return <>{children}</>;
};
