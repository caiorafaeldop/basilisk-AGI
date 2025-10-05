/**
 * Sanitização de HTML para prevenir XSS
 * Implementação simples para produção
 */

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre',
  'table', 'thead', 'tbody', 'tr', 'th', 'td'
];

const ALLOWED_ATTRS: Record<string, string[]> = {
  'a': ['href', 'title', 'target', 'rel'],
  'img': ['src', 'alt', 'title', 'width', 'height'],
  'code': ['class'],
  'pre': ['class']
};

/**
 * Sanitiza HTML removendo tags e atributos perigosos
 */
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';

  // Remove scripts e eventos inline
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '')
    .replace(/javascript:/gi, '');

  // Remove tags não permitidas
  const div = document.createElement('div');
  div.innerHTML = sanitized;

  const cleanNode = (node: Element): Element | null => {
    const tagName = node.tagName.toLowerCase();

    // Remove se não for tag permitida
    if (!ALLOWED_TAGS.includes(tagName)) {
      return null;
    }

    // Limpa atributos
    const allowedAttrs = ALLOWED_ATTRS[tagName] || [];
    Array.from(node.attributes).forEach(attr => {
      if (!allowedAttrs.includes(attr.name)) {
        node.removeAttribute(attr.name);
      }
    });

    // Sanitiza links para abrir em nova aba com segurança
    if (tagName === 'a') {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener noreferrer');
    }

    // Limpa filhos recursivamente
    Array.from(node.children).forEach(child => {
      const cleaned = cleanNode(child as Element);
      if (!cleaned && child.parentNode) {
        child.parentNode.removeChild(child);
      }
    });

    return node;
  };

  Array.from(div.children).forEach(child => {
    cleanNode(child as Element);
  });

  return div.innerHTML;
};

/**
 * Sanitiza texto simples (sem HTML)
 */
export const sanitizeText = (text: string): string => {
  if (!text) return '';
  
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Sanitiza URL para href
 */
export const sanitizeUrl = (url: string): string => {
  if (!url) return '';
  
  // Remove javascript: e data: protocols
  if (/^(javascript|data|vbscript):/i.test(url)) {
    return '';
  }
  
  return url;
};
