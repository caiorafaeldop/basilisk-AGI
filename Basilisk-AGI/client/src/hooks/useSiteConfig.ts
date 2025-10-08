import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { siteConfigApi, SiteConfig, UpdateSiteConfigDto } from '@/modules/site-config/api';
import { useModal } from './useModal';

export const useSiteConfig = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useModal();

  const {
    data: config,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['site-config'],
    queryFn: siteConfigApi.getConfig,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 2,
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateSiteConfigDto) => siteConfigApi.update(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['site-config'], data);
      showSuccess('Configurações atualizadas com sucesso!');
    },
    onError: (error) => {
      if (import.meta.env.DEV) {
        console.error('Erro ao atualizar configurações:', error);
      }
      showError('Erro ao atualizar configurações. Tente novamente.');
    },
  });

  const resetMutation = useMutation({
    mutationFn: siteConfigApi.reset,
    onSuccess: (data) => {
      queryClient.setQueryData(['site-config'], data);
      showSuccess('Configurações resetadas para valores padrão!');
    },
    onError: (error) => {
      if (import.meta.env.DEV) {
        console.error('Erro ao resetar configurações:', error);
      }
      showError('Erro ao resetar configurações. Tente novamente.');
    },
  });

  const { data: isFirstSetup } = useQuery({
    queryKey: ['site-config-first-setup'],
    queryFn: siteConfigApi.isFirstSetup,
    staleTime: 1000 * 30, // 30 segundos (reduzido de 10 minutos)
  });

  return {
    config,
    isLoading,
    error,
    refetch,
    updateConfig: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    resetConfig: resetMutation.mutate,
    isResetting: resetMutation.isPending,
    isFirstSetup: isFirstSetup ?? false,
  };
};
