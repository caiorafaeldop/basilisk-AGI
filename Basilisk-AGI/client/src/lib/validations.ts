/**
 * Utilitários de validação para formulários
 */

export const validations = {
  /**
   * Valida se é um email válido
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Valida se é uma URL válida
   */
  isValidUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Valida se é uma cor hex válida
   */
  isValidHexColor: (color: string): boolean => {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(color);
  },

  /**
   * Valida se é um número de telefone brasileiro
   */
  isValidBrazilianPhone: (phone: string): boolean => {
    const phoneRegex = /^\(?[1-9]{2}\)?\s?9?\d{4}-?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  /**
   * Valida se é um número de WhatsApp no formato internacional
   */
  isValidWhatsApp: (whatsapp: string): boolean => {
    const whatsappRegex = /^[0-9]{10,15}$/;
    return whatsappRegex.test(whatsapp);
  },

  /**
   * Valida se é um CEP válido
   */
  isValidCEP: (cep: string): boolean => {
    const cepRegex = /^\d{5}-?\d{3}$/;
    return cepRegex.test(cep);
  },

  /**
   * Valida tamanho mínimo de string
   */
  minLength: (str: string, min: number): boolean => {
    return str.trim().length >= min;
  },

  /**
   * Valida tamanho máximo de string
   */
  maxLength: (str: string, max: number): boolean => {
    return str.trim().length <= max;
  },

  /**
   * Valida se string não está vazia
   */
  required: (str: string): boolean => {
    return str.trim().length > 0;
  },

  /**
   * Remove caracteres especiais de telefone
   */
  cleanPhone: (phone: string): string => {
    return phone.replace(/\D/g, '');
  },

  /**
   * Formata telefone brasileiro
   */
  formatBrazilianPhone: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  },

  /**
   * Formata CEP
   */
  formatCEP: (cep: string): string => {
    const cleaned = cep.replace(/\D/g, '');
    if (cleaned.length === 8) {
      return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    }
    return cep;
  },

  /**
   * Valida e sanitiza URL
   */
  sanitizeUrl: (url: string): string => {
    const trimmed = url.trim();
    if (!trimmed) return '';
    
    // Adiciona https:// se não tiver protocolo
    if (!/^https?:\/\//i.test(trimmed)) {
      return `https://${trimmed}`;
    }
    return trimmed;
  },

  /**
   * Valida nome de arquivo de imagem
   */
  isValidImageUrl: (url: string): boolean => {
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
    return imageExtensions.test(url) || url.includes('cloudinary') || url.includes('imgur');
  },

  /**
   * Trunca texto com ellipsis
   */
  truncate: (str: string, maxLength: number): string => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - 3) + '...';
  },

  /**
   * Valida range numérico
   */
  inRange: (num: number, min: number, max: number): boolean => {
    return num >= min && num <= max;
  },

  /**
   * Valida caracteres permitidos
   */
  onlyAlphanumeric: (str: string): boolean => {
    const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
    return alphanumericRegex.test(str);
  },
};

/**
 * Mensagens de erro padrão
 */
export const errorMessages = {
  required: 'Este campo é obrigatório',
  invalidEmail: 'Email inválido',
  invalidUrl: 'URL inválida',
  invalidHexColor: 'Cor hex inválida (ex: #FF0000)',
  invalidPhone: 'Telefone inválido',
  invalidWhatsApp: 'WhatsApp inválido (ex: 5511999999999)',
  invalidCEP: 'CEP inválido',
  minLength: (min: number) => `Mínimo de ${min} caracteres`,
  maxLength: (max: number) => `Máximo de ${max} caracteres`,
  invalidImage: 'URL de imagem inválida',
  outOfRange: (min: number, max: number) => `Valor deve estar entre ${min} e ${max}`,
};

/**
 * Helper para validar múltiplos campos
 */
export const validateFields = (
  fields: Record<string, any>,
  rules: Record<string, ((value: any) => boolean | string)[]>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((fieldName) => {
    const fieldValue = fields[fieldName];
    const fieldRules = rules[fieldName];

    for (const rule of fieldRules) {
      const result = rule(fieldValue);
      if (typeof result === 'string') {
        errors[fieldName] = result;
        break;
      } else if (result === false) {
        errors[fieldName] = 'Campo inválido';
        break;
      }
    }
  });

  return errors;
};
