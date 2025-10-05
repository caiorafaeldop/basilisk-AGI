# 🎨 Basilisk - Plataforma White-Label

## 📋 Visão Geral

Este projeto foi transformado em uma **plataforma 100% white-label e customizável** através de um painel administrativo completo. Qualquer usuário pode configurar sua própria landing page sem tocar em código.

## ✨ Características Principais

### 🎯 Totalmente Customizável
- **Branding**: Logo, favicon, nome do site
- **Tema**: Cores primárias, secundárias e de acento
- **Conteúdo**: Todos os textos, imagens e descrições
- **Seções**: Ative/desative seções conforme necessário
- **Redes Sociais**: Configure todos os links sociais
- **SEO**: Meta tags totalmente configuráveis

### 🔧 Funcionalidades Implementadas

#### Backend (NestJS + Prisma + MongoDB)
- ✅ Model `SiteConfig` completo no Prisma
- ✅ Controller com endpoints CRUD
- ✅ Service com lógica de negócio
- ✅ DTOs para validação
- ✅ Endpoints públicos e protegidos
- ✅ Sistema de primeira configuração (wizard)

#### Frontend (React + TypeScript + TailwindCSS)
- ✅ Hook `useSiteConfig` para gerenciamento de estado
- ✅ Página `/admin/configuracoes` com 9 abas:
  - Branding (Logo, Favicon)
  - Tema (Cores customizáveis)
  - Hero (Título, subtítulo, imagem, CTA, highlights)
  - Sobre (Título, conteúdo, imagens, qualificações)
  - Contato (Telefone, email, WhatsApp, endereço, horários)
  - Social (LinkedIn, Instagram, TikTok, Facebook, etc)
  - Seções (Toggle para ativar/desativar seções)
  - Footer (Descrição, serviços, links, copyright)
  - SEO (Meta title, description, keywords)
  
- ✅ Componentes dinâmicos:
  - Header (logo, contatos dinâmicos)
  - Hero (conteúdo totalmente customizável)
  - Footer (redes sociais, informações dinâmicas)
  - Index (controle de seções visíveis)

- ✅ Skeletons em todos os loadings:
  - HeroSkeleton
  - AboutSkeleton
  - TeamSkeleton
  - BlogSkeleton
  - AdminSkeleton
  - ArticleSkeleton

### 📱 Upload de Imagens
- Sistema simplificado de upload via URL
- Preview em tempo real
- Suporte a qualquer serviço de hospedagem (Cloudinary, ImgBB, etc)

### 🎨 Sistema de Temas
- Cores dinâmicas aplicadas via config
- Preview em tempo real no admin
- CSS variables preparadas para aplicação

## 🚀 Como Usar

### Para Administradores

1. **Login**
   - Faça login através do ícone 🔑 no header
   - Acesse o menu "Área Admin"

2. **Configurações**
   - Vá em "Configurações do Site"
   - Configure cada aba conforme necessário
   - Clique em "Salvar Alterações"

3. **Upload de Imagens**
   - Use serviços como Cloudinary (https://cloudinary.com)
   - Copie a URL da imagem
   - Cole nos campos de imagem do admin

### Para Desenvolvedores

#### Instalação Backend

```bash
cd server
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

#### Instalação Frontend

```bash
cd client
npm install
npm run dev
```

#### Variáveis de Ambiente

**Backend (.env)**
```env
DATABASE_URL="mongodb://..."
JWT_SECRET="your-secret"
```

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:3001/api
```

## 📊 Estrutura do Banco de Dados

### SiteConfig Model
```prisma
model SiteConfig {
  // Branding
  siteName, logo, favicon
  
  // Theme
  primaryColor, secondaryColor, accentColor
  
  // Hero
  heroTitle, heroSubtitle, heroImage, heroCtaText, heroHighlights
  
  // About
  aboutTitle, aboutContent, aboutImage, qualifications
  
  // Contact
  phone, email, whatsapp, address, businessHours
  
  // Social
  linkedin, instagram, facebook, twitter, tiktok, youtube
  
  // Sections Toggle
  heroEnabled, teamEnabled, blogEnabled, etc
  
  // Footer
  footerDescription, footerServices, footerCopyright
  
  // SEO
  metaTitle, metaDescription, metaKeywords
}
```

## 🎯 Próximos Passos (Não Implementados Ainda)

### FASE 4: Theme System
- [ ] Aplicar cores do banco via CSS variables em tempo real
- [ ] Suporte a tema claro/escuro
- [ ] Preview em tempo real no admin

### FASE 5: Wizard & UX
- [ ] Wizard de onboarding na primeira configuração
- [ ] Mensagem "Configure seu site" se vazio
- [ ] Empty states em todas as seções

### FASE 6: Otimizações
- [ ] Error boundaries
- [ ] Validações de formulário aprimoradas
- [ ] Otimização de performance
- [ ] Testes automatizados

## 📝 Comandos Úteis

```bash
# Backend
npm run db:generate   # Gerar Prisma Client
npm run db:push       # Push schema para DB
npm run db:studio     # Abrir Prisma Studio
npm run start:dev     # Modo desenvolvimento

# Frontend
npm run dev           # Modo desenvolvimento
npm run build         # Build produção
npm run preview       # Preview build
```

## 🔒 Segurança

- Endpoints admin protegidos por autenticação JWT
- API Key guard configurado
- Validação de dados com class-validator
- Sanitização de inputs

## 🎨 Customização Avançada

### Adicionar Novos Campos
1. Adicione no `schema.prisma`
2. Execute `npx prisma db push`
3. Atualize DTOs em `server/src/site-config/dto`
4. Adicione campo no componente tab correspondente
5. Atualize interface em `client/src/modules/site-config/api`

### Adicionar Novas Seções
1. Crie novo toggle no `SiteConfig`
2. Adicione no `SectionsTab.tsx`
3. Crie componente da seção
4. Adicione condição no `Index.tsx`

## 📚 Tecnologias Utilizadas

**Backend**
- NestJS
- Prisma ORM
- MongoDB
- JWT Authentication
- Swagger (documentação API)

**Frontend**
- React 18
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- React Query (TanStack Query)
- React Router
- Lucide Icons

## 🤝 Contribuindo

Este é um projeto white-label. Sinta-se à vontade para:
- Adicionar novos campos configuráveis
- Melhorar o sistema de temas
- Adicionar mais seções
- Otimizar performance

## 📄 Licença

UNLICENSED - Projeto privado

---

**Desenvolvido com ❤️ para ser totalmente customizável**
