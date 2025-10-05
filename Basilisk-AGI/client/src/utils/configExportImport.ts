/**
 * Config Export/Import Utilities
 * Utilitários para exportar e importar configurações
 */

import { SiteConfig } from '@/modules/site-config/api';

/**
 * Exporta configurações como JSON
 */
export const exportConfig = (config: SiteConfig, filename?: string): void => {
  try {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `site-config-${new Date().toISOString().split('T')[0]}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erro ao exportar configurações:', error);
    throw new Error('Falha ao exportar configurações');
  }
};

/**
 * Importa configurações de um arquivo JSON
 */
export const importConfig = (file: File): Promise<Partial<SiteConfig>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const config = JSON.parse(content);
        
        // Validar estrutura básica
        if (!config || typeof config !== 'object') {
          throw new Error('Arquivo de configuração inválido');
        }

        resolve(config);
      } catch (error) {
        console.error('Erro ao importar configurações:', error);
        reject(new Error('Falha ao processar arquivo de configuração'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Falha ao ler arquivo'));
    };

    reader.readAsText(file);
  });
};

/**
 * Valida configurações importadas
 */
export const validateConfig = (config: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validar cores
  const colorFields = ['primaryColor', 'secondaryColor', 'accentColor', 'buttonShadowColor', 'buttonHoverColor', 'imageOverlayColor'];
  colorFields.forEach(field => {
    if (config[field] && !/^#[0-9A-F]{6}$/i.test(config[field])) {
      errors.push(`${field}: cor hexadecimal inválida`);
    }
  });

  // Validar enums
  if (config.buttonHoverEffect && !['lift', 'scale', 'glow', 'pulse', 'none'].includes(config.buttonHoverEffect)) {
    errors.push('buttonHoverEffect: valor inválido');
  }

  if (config.buttonSize && !['sm', 'md', 'lg', 'xl'].includes(config.buttonSize)) {
    errors.push('buttonSize: valor inválido');
  }

  if (config.headerPosition && !['fixed', 'sticky', 'static'].includes(config.headerPosition)) {
    errors.push('headerPosition: valor inválido');
  }

  if (config.headerAnimation && !['fade', 'slide', 'shrink', 'none'].includes(config.headerAnimation)) {
    errors.push('headerAnimation: valor inválido');
  }

  // Validar ranges numéricos
  if (config.headerOpacity !== undefined && (config.headerOpacity < 0 || config.headerOpacity > 1)) {
    errors.push('headerOpacity: deve estar entre 0 e 1');
  }

  if (config.headerBlur !== undefined && (config.headerBlur < 0 || config.headerBlur > 50)) {
    errors.push('headerBlur: deve estar entre 0 e 50');
  }

  if (config.imageBrightness !== undefined && (config.imageBrightness < 0 || config.imageBrightness > 200)) {
    errors.push('imageBrightness: deve estar entre 0 e 200');
  }

  if (config.imageContrast !== undefined && (config.imageContrast < 0 || config.imageContrast > 200)) {
    errors.push('imageContrast: deve estar entre 0 e 200');
  }

  if (config.imageSaturation !== undefined && (config.imageSaturation < 0 || config.imageSaturation > 200)) {
    errors.push('imageSaturation: deve estar entre 0 e 200');
  }

  if (config.imageBlur !== undefined && (config.imageBlur < 0 || config.imageBlur > 20)) {
    errors.push('imageBlur: deve estar entre 0 e 20');
  }

  if (config.imageOverlayOpacity !== undefined && (config.imageOverlayOpacity < 0 || config.imageOverlayOpacity > 100)) {
    errors.push('imageOverlayOpacity: deve estar entre 0 e 100');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Cria backup das configurações atuais
 */
export const createBackup = (config: SiteConfig): void => {
  try {
    const backups = getBackups();
    const newBackup = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      config,
    };

    backups.push(newBackup);

    // Manter apenas os últimos 10 backups
    const recentBackups = backups.slice(-10);
    localStorage.setItem('config-backups', JSON.stringify(recentBackups));
  } catch (error) {
    console.error('Erro ao criar backup:', error);
  }
};

/**
 * Recupera lista de backups
 */
export const getBackups = (): Array<{ id: string; timestamp: string; config: SiteConfig }> => {
  try {
    const backupsStr = localStorage.getItem('config-backups');
    return backupsStr ? JSON.parse(backupsStr) : [];
  } catch (error) {
    console.error('Erro ao recuperar backups:', error);
    return [];
  }
};

/**
 * Restaura backup específico
 */
export const restoreBackup = (backupId: string): SiteConfig | null => {
  try {
    const backups = getBackups();
    const backup = backups.find(b => b.id === backupId);
    return backup ? backup.config : null;
  } catch (error) {
    console.error('Erro ao restaurar backup:', error);
    return null;
  }
};

/**
 * Deleta backup específico
 */
export const deleteBackup = (backupId: string): void => {
  try {
    const backups = getBackups();
    const filtered = backups.filter(b => b.id !== backupId);
    localStorage.setItem('config-backups', JSON.stringify(filtered));
  } catch (error) {
    console.error('Erro ao deletar backup:', error);
  }
};

/**
 * Exporta configurações como template
 */
export const exportAsTemplate = (config: SiteConfig, templateName: string): void => {
  try {
    const template = {
      name: templateName,
      description: `Template criado em ${new Date().toLocaleDateString()}`,
      config,
      version: '1.0.0',
      createdAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(template, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `template-${templateName.toLowerCase().replace(/\s+/g, '-')}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erro ao exportar template:', error);
    throw new Error('Falha ao exportar template');
  }
};

/**
 * Compara duas configurações e retorna diferenças
 */
export const compareConfigs = (config1: SiteConfig, config2: SiteConfig): Record<string, { old: any; new: any }> => {
  const differences: Record<string, { old: any; new: any }> = {};

  const allKeys = new Set([...Object.keys(config1), ...Object.keys(config2)]);

  allKeys.forEach(key => {
    const val1 = (config1 as any)[key];
    const val2 = (config2 as any)[key];

    if (JSON.stringify(val1) !== JSON.stringify(val2)) {
      differences[key] = { old: val1, new: val2 };
    }
  });

  return differences;
};
