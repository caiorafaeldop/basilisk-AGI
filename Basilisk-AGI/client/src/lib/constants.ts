/**
 * Constantes globais do projeto
 */

/**
 * Ícones disponíveis para uso em highlights e qualificações
 */
export const AVAILABLE_ICONS = [
  { value: 'Award', label: 'Troféu/Prêmio' },
  { value: 'Shield', label: 'Escudo' },
  { value: 'Heart', label: 'Coração' },
  { value: 'GraduationCap', label: 'Formatura' },
  { value: 'Users', label: 'Usuários' },
  { value: 'Star', label: 'Estrela' },
  { value: 'Briefcase', label: 'Maleta' },
  { value: 'CheckCircle', label: 'Check Circle' },
  { value: 'Zap', label: 'Raio' },
  { value: 'Target', label: 'Alvo' },
  { value: 'Trophy', label: 'Troféu' },
  { value: 'Clock', label: 'Relógio' },
  { value: 'MapPin', label: 'Localização' },
  { value: 'Phone', label: 'Telefone' },
  { value: 'Mail', label: 'Email' },
] as const;

/**
 * Cores pré-definidas para tema
 */
export const THEME_COLORS = {
  professional: {
    primary: '#1E40AF',
    secondary: '#3B82F6',
    accent: '#60A5FA',
  },
  elegant: {
    primary: '#8B4513',
    secondary: '#D4AF37',
    accent: '#4A5568',
  },
  modern: {
    primary: '#10B981',
    secondary: '#34D399',
    accent: '#6EE7B7',
  },
  creative: {
    primary: '#8B5CF6',
    secondary: '#A78BFA',
    accent: '#C4B5FD',
  },
  corporate: {
    primary: '#1F2937',
    secondary: '#374151',
    accent: '#6B7280',
  },
} as const;

/**
 * Limites de caracteres para campos
 */
export const CHARACTER_LIMITS = {
  siteName: 50,
  heroTitle: 100,
  heroSubtitle: 200,
  heroCtaText: 30,
  aboutTitle: 50,
  aboutSubtitle: 100,
  aboutContent: 1000,
  metaTitle: 60,
  metaDescription: 160,
  metaKeywords: 200,
  footerCopyright: 100,
  footerLegalText: 300,
} as const;

/**
 * Placeholders padrão
 */
export const PLACEHOLDERS = {
  siteName: 'Minha Empresa',
  heroTitle: 'Bem-vindo ao nosso site',
  heroSubtitle: 'Oferecemos soluções incríveis para o seu negócio',
  heroCtaText: 'Entre em Contato',
  aboutTitle: 'Sobre Nós',
  aboutSubtitle: 'Quem somos',
  aboutContent: 'Conte a história da sua empresa aqui...',
  email: 'contato@seusite.com',
  phone: '(00) 0000-0000',
  whatsapp: '5500000000000',
  address: 'Rua Exemplo, 123',
  city: 'São Paulo',
  state: 'SP',
  zipCode: '00000-000',
  businessHours: 'Segunda a Sexta: 9h às 18h',
  metaTitle: 'Meu Site - Título para SEO',
  metaDescription: 'Descrição do meu site para aparecer no Google',
  footerCopyright: 'Todos os direitos reservados.',
} as const;

/**
 * Valores padrão para primeira configuração
 */
export const DEFAULT_CONFIG = {
  siteName: 'Meu Site',
  primaryColor: '#8B4513',
  secondaryColor: '#D4AF37',
  accentColor: '#4A5568',
  heroTitle: 'Bem-vindo',
  heroSubtitle: 'Descrição do seu negócio',
  heroCtaText: 'Entre em Contato',
  aboutTitle: 'Sobre Nós',
  businessHours: 'Segunda a Sexta: 9h às 18h',
  footerCopyright: 'Todos os direitos reservados.',
  heroEnabled: true,
  aboutEnabled: true,
  teamEnabled: true,
  blogEnabled: true,
  testimonialsEnabled: false,
  faqEnabled: false,
  ctaEnabled: true,
} as const;

/**
 * Mensagens de sucesso
 */
export const SUCCESS_MESSAGES = {
  configSaved: 'Configurações salvas com sucesso!',
  configReset: 'Configurações resetadas!',
  imageuploaded: 'Imagem adicionada com sucesso!',
  itemAdded: 'Item adicionado!',
  itemRemoved: 'Item removido!',
  dataUpdated: 'Dados atualizados!',
} as const;

/**
 * Mensagens de erro
 */
export const ERROR_MESSAGES = {
  configSaveFailed: 'Erro ao salvar configurações',
  configLoadFailed: 'Erro ao carregar configurações',
  invalidData: 'Dados inválidos',
  networkError: 'Erro de conexão',
  unauthorized: 'Você não tem permissão para isso',
  notFound: 'Recurso não encontrado',
  serverError: 'Erro no servidor',
  unknownError: 'Erro desconhecido',
} as const;

/**
 * Rotas da aplicação
 */
export const ROUTES = {
  home: '/',
  articles: '/artigos',
  article: (id: string) => `/artigo/${id}`,
  admin: {
    articles: '/admin/artigos',
    articleNew: '/admin/artigos/novo',
    articleEdit: (id: string) => `/admin/artigos/editar/${id}`,
    leads: '/admin/leads',
    testimonials: '/admin/depoimentos',
    team: '/admin/equipe',
    config: '/admin/configuracoes',
  },
  demo: {
    testimonials: '/demo/depoimentos',
    team: '/demo/equipe',
  },
} as const;

/**
 * Seções da landing page
 */
export const LANDING_SECTIONS = [
  { id: 'hero', name: 'Hero Section', description: 'Seção principal' },
  { id: 'about', name: 'Sobre', description: 'Sobre a empresa' },
  { id: 'team', name: 'Equipe', description: 'Membros da equipe' },
  { id: 'blog', name: 'Blog/Artigos', description: 'Artigos e conteúdo' },
  { id: 'testimonials', name: 'Depoimentos', description: 'Testemunhos de clientes' },
  { id: 'faq', name: 'FAQ', description: 'Perguntas frequentes' },
  { id: 'cta', name: 'Contato/CTA', description: 'Call-to-action e formulário' },
] as const;

/**
 * Configurações de upload
 */
export const UPLOAD_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  acceptedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  acceptedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
} as const;

/**
 * Breakpoints responsivos (mesmos do Tailwind)
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Duração das animações (em ms)
 */
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

/**
 * Keys do localStorage
 */
export const STORAGE_KEYS = {
  authToken: 'authToken',
  refreshToken: 'refreshToken',
  user: 'user',
  theme: 'theme',
} as const;
