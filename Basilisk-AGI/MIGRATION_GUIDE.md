# 🔄 Guia de Migração - White Label

## ⚠️ IMPORTANTE: Comandos que Precisam Ser Executados

### 1️⃣ Backend - Atualizar Database Schema

```bash
cd server
npx prisma generate
npx prisma db push
```

**O que isso faz:**
- Gera o Prisma Client com o novo model `SiteConfig`
- Atualiza a collection no MongoDB com os novos campos
- Cria índices necessários

### 2️⃣ Verificar Conexão

```bash
cd server
npm run start:dev
```

**Endpoints criados:**
- `GET /api/site-config` (público) - Buscar configurações
- `GET /api/site-config/first-setup` (público) - Verificar primeira configuração
- `PUT /api/site-config` (admin) - Atualizar configurações
- `POST /api/site-config/reset` (admin) - Resetar para padrão

### 3️⃣ Frontend - Instalar Dependências (se necessário)

```bash
cd client
npm install
npm run dev
```

## 📋 Checklist de Verificação

### Backend
- [ ] `SiteConfig` model criado no Prisma
- [ ] Collections criadas no MongoDB
- [ ] Endpoints funcionando em `/api/site-config`
- [ ] Autenticação JWT funcionando para endpoints admin

### Frontend
- [ ] Página `/admin/configuracoes` acessível
- [ ] Hook `useSiteConfig` funcionando
- [ ] Componentes dinâmicos renderizando dados do config
- [ ] Skeletons aparecendo durante loading
- [ ] Upload de imagens funcionando

## 🔍 Testando a Implementação

### 1. Acesso ao Admin

1. Faça login no sistema (ícone 🔑 no header)
2. Vá em "Área Admin" → "Configurações do Site"
3. Você deve ver 9 abas de configuração

### 2. Teste de Configuração Básica

1. Aba **Branding**:
   - Altere o nome do site
   - Adicione uma logo (via URL)

2. Aba **Tema**:
   - Altere as cores
   - Veja o preview ao lado

3. Aba **Hero**:
   - Altere título e subtítulo
   - Adicione highlights
   - Veja mudanças na home

4. Clique em **Salvar Alterações**

5. Vá para a página inicial e veja as mudanças aplicadas

### 3. Teste de Seções

1. Vá em **Seções**
2. Desative "Hero Section"
3. Salve
4. Verifique que o Hero sumiu da home
5. Reative e salve novamente

## 🐛 Problemas Comuns

### "Property 'siteConfig' does not exist on type 'PrismaService'"

**Solução:**
```bash
cd server
npx prisma generate
npm run start:dev
```

Isso regenera o Prisma Client com o novo model.

### Frontend não carrega configurações

**Verifique:**
1. Backend está rodando?
2. Endpoint `/api/site-config` está acessível?
3. Console do navegador tem erros?

**Solução:**
```bash
# Terminal 1 - Backend
cd server
npm run start:dev

# Terminal 2 - Frontend  
cd client
npm run dev
```

### Imagens não aparecem

**Lembre-se:**
- As imagens precisam estar hospedadas online
- Use Cloudinary, ImgBB ou similar
- Cole a URL completa (começando com http/https)

## 📝 Dados Padrão

Ao iniciar pela primeira vez, o sistema cria automaticamente um `SiteConfig` com valores padrão:

```javascript
{
  siteName: "Meu Site",
  primaryColor: "#8B4513",
  secondaryColor: "#D4AF37",
  accentColor: "#4A5568",
  heroTitle: "Bem-vindo",
  heroSubtitle: "Descrição do seu negócio",
  heroCtaText: "Entre em Contato",
  aboutTitle: "Sobre Nós",
  businessHours: "Segunda a Sexta: 9h às 18h",
  footerCopyright: "Todos os direitos reservados.",
  heroEnabled: true,
  aboutEnabled: true,
  teamEnabled: true,
  blogEnabled: true,
  testimonialsEnabled: false,
  faqEnabled: false,
  ctaEnabled: true
}
```

## 🎯 Próximos Passos

Após verificar que tudo está funcionando:

1. **Configure seu site:**
   - Entre no admin
   - Preencha todas as abas
   - Salve

2. **Upload de imagens:**
   - Crie conta no Cloudinary (grátis)
   - Faça upload das imagens
   - Cole as URLs no admin

3. **Teste em produção:**
   - Build do frontend: `npm run build`
   - Deploy do backend
   - Configure variáveis de ambiente

## 🔐 Segurança em Produção

**Lembre-se de:**
- [ ] Configurar `JWT_SECRET` forte
- [ ] Usar HTTPS
- [ ] Configurar CORS adequadamente
- [ ] Validar todas as entradas
- [ ] Limitar tamanho de uploads

## 📞 Suporte

Se encontrar problemas:
1. Verifique este guia
2. Consulte o `WHITE_LABEL_README.md`
3. Cheque os logs do backend
4. Verifique o console do navegador

---

**Boa sorte com sua plataforma white-label! 🚀**
