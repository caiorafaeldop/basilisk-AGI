/**
 * Utilitário para geração de slugs para URLs
 */

/**
 * Converte um siteName em slug válido para URL
 * Exemplo: "Connecta CI - UFPB" -> "connecta_CI_-_UFPB"
 */
export const generateSlug = (siteName: string): string => {
  if (!siteName) return '';
  
  return siteName
    .trim()
    .replace(/\s+/g, '_') // Espaços viram underscore
    .replace(/[^\w\-_]/g, '') // Remove caracteres especiais (mantém letras, números, - e _)
    .replace(/_{2,}/g, '_') // Remove underscores duplicados
    .replace(/^_|_$/g, ''); // Remove underscores no início/fim
};

/**
 * Valida se um slug é válido
 */
export const isValidSlug = (slug: string): boolean => {
  if (!slug) return false;
  
  // Slug deve ter entre 3 e 100 caracteres
  if (slug.length < 3 || slug.length > 100) return false;
  
  // Apenas letras, números, hífens e underscores
  return /^[a-zA-Z0-9_-]+$/.test(slug);
};

/**
 * Normaliza slug vindo da URL
 */
export const normalizeSlug = (slug: string): string => {
  return slug.toLowerCase().trim();
};
