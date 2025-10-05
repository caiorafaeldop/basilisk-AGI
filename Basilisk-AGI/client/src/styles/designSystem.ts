/**
 * SISTEMA CENTRAL DE DESIGN
 * Gerencia todos os estilos disponíveis no projeto
 */

import { NEOBRUTALISM, nb } from './neobrutalism';
import { MINIMALISM, mn } from './minimalism';

// Tipos para o sistema de design
export type DesignSystemName = 'neobrutalism' | 'minimalism';

export interface DesignSystem {
  name: string;
  description: string;
  border: {
    color: string;
    width: Record<string, string>;
    radius: Record<string, string>;
  };
  shadow: Record<string, string>;
  text: {
    stroke: Record<string, string>;
    shadow: Record<string, string>;
    weight: Record<string, string>;
  };
  animation: {
    duration: Record<string, string>;
    easing: Record<string, string>;
    hover: Record<string, string>;
  };
  spacing: Record<string, string>;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    danger: string;
    white: string;
    black: string;
    lightBg: string;
    darkBg: string;
    gray: Record<string, string>;
  };
  components: {
    button: Record<string, any>;
    card: Record<string, any>;
    input: Record<string, any>;
    sidebar: Record<string, any>;
  };
}

// Registro de todos os sistemas de design
export const DESIGN_SYSTEMS = {
  minimalism: {
    ...MINIMALISM,
    name: 'Minimalism',
    description: 'Elegância premium: espaços generosos, sombras sutis, bordas quase invisíveis'
  },
  neobrutalism: NEOBRUTALISM,
} as const;

// Helpers correspondentes
export const DESIGN_HELPERS = {
  neobrutalism: nb,
  minimalism: mn,
} as const;

// Sistema ativo (padrão)
let currentDesignSystem: DesignSystemName = 'neobrutalism';

/**
 * Obtém o sistema de design ativo
 */
export const getCurrentDesignSystem = (): DesignSystem => {
  return DESIGN_SYSTEMS[currentDesignSystem];
};

/**
 * Obtém os helpers do sistema ativo
 */
export const getCurrentHelpers = () => {
  return DESIGN_HELPERS[currentDesignSystem];
};

/**
 * Define o sistema de design ativo
 */
export const setDesignSystem = (systemName: DesignSystemName) => {
  currentDesignSystem = systemName;
  
  // Salva no localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('designSystem', systemName);
  }
  
  // Dispara evento customizado para componentes reagirem
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('designSystemChanged', { 
      detail: { systemName, system: DESIGN_SYSTEMS[systemName] } 
    }));
  }
};

/**
 * Inicializa o sistema de design do localStorage
 */
export const initializeDesignSystem = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('designSystem') as DesignSystemName;
    if (saved && DESIGN_SYSTEMS[saved]) {
      currentDesignSystem = saved;
    }
  }
  return currentDesignSystem;
};

/**
 * Lista todos os sistemas disponíveis
 */
export const getAvailableDesignSystems = () => {
  return Object.entries(DESIGN_SYSTEMS).map(([key, system]) => ({
    id: key as DesignSystemName,
    name: system.name,
    description: system.description,
  }));
};

/**
 * Hook-like function para obter sistema atual
 */
export const useDesignSystem = () => {
  const system = getCurrentDesignSystem();
  const helpers = getCurrentHelpers();
  
  return {
    system,
    helpers,
    currentSystemName: currentDesignSystem,
    setSystem: setDesignSystem,
    availableSystems: getAvailableDesignSystems(),
  };
};

// Inicializa automaticamente
if (typeof window !== 'undefined') {
  initializeDesignSystem();
}

export default {
  DESIGN_SYSTEMS,
  DESIGN_HELPERS,
  getCurrentDesignSystem,
  getCurrentHelpers,
  setDesignSystem,
  initializeDesignSystem,
  getAvailableDesignSystems,
  useDesignSystem,
};
