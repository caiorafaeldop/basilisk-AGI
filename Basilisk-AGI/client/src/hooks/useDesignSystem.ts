import { useState, useEffect } from 'react';
import { 
  DesignSystemName, 
  DesignSystem,
  getCurrentDesignSystem,
  getCurrentHelpers,
  setDesignSystem,
  getAvailableDesignSystems,
  initializeDesignSystem
} from '@/styles/designSystem';
import { useSiteConfig } from '@/hooks/useSiteConfig';

/**
 * Hook para gerenciar o sistema de design ativo
 */
export const useDesignSystem = () => {
  const { config } = useSiteConfig();
  const [currentSystem, setCurrentSystem] = useState<DesignSystem>(getCurrentDesignSystem());
  const [currentSystemName, setCurrentSystemName] = useState<DesignSystemName>(() => initializeDesignSystem());

  // Sincronizar com a configuração do backend quando disponível (TEMPORARIAMENTE DESABILITADO)
  // useEffect(() => {
  //   if (config?.designSystem && config.designSystem !== currentSystemName) {
  //     const systemName = config.designSystem as DesignSystemName;
  //     console.log('Backend sync: trying to set system to:', systemName, 'current:', currentSystemName);
  //     if (systemName === 'neobrutalism' || systemName === 'minimalism') {
  //       console.log('Backend sync: setting system to:', systemName);
  //       setDesignSystem(systemName);
  //     }
  //   }
  // }, [config?.designSystem, currentSystemName]);

  useEffect(() => {
    const handleDesignSystemChange = (event: CustomEvent) => {
      setCurrentSystem(event.detail.system);
      setCurrentSystemName(event.detail.systemName);
    };

    window.addEventListener('designSystemChanged', handleDesignSystemChange as EventListener);
    
    return () => {
      window.removeEventListener('designSystemChanged', handleDesignSystemChange as EventListener);
    };
  }, []);

  const changeSystem = (systemName: DesignSystemName) => {
    setDesignSystem(systemName);
  };

  return {
    // Sistema atual
    system: currentSystem,
    systemName: currentSystemName,
    helpers: getCurrentHelpers(),
    
    // Ações
    changeSystem,
    
    // Sistemas disponíveis
    availableSystems: getAvailableDesignSystems(),
    
    // Helpers de conveniência
    isNeobrutalism: currentSystemName === 'neobrutalism',
    isMinimalism: currentSystemName === 'minimalism',
  };
};
