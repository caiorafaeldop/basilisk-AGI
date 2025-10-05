# ✅ CHECKLIST DE VALIDAÇÃO - WHITE LABEL

Use este checklist para validar que tudo está funcionando corretamente após executar os comandos.

---

## 📋 PARTE 1: Configuração Inicial

### Backend

- [ ] **Prisma Client Gerado**
  ```bash
  cd server
  npx prisma generate
  ```
  ✅ Deve gerar o client sem erros

- [ ] **Database Atualizada**
  ```bash
  npx prisma db push
  ```
  ✅ Deve criar a collection `site_config` no MongoDB

- [ ] **Backend Rodando**
  ```bash
  npm run start:dev
  ```
  ✅ Deve iniciar em http://localhost:3001
  ✅ Sem erros de compilação

### Frontend

- [ ] **Frontend Rodando**
  ```bash
  cd client
  npm run dev
  ```
  ✅ Deve iniciar em http://localhost:5173
  ✅ Sem erros de compilação

---

## 📋 PARTE 2: Endpoints Backend

Testar no navegador ou Postman:

- [ ] **GET /api/site-config**
  - ✅ Retorna objeto com configurações padrão
  - ✅ Status 200

- [ ] **GET /api/site-config/first-setup**
  - ✅ Retorna `{ "isFirstSetup": true }`
  - ✅ Status 200

- [ ] **Swagger Docs**
  - ✅ Acesse http://localhost:3001/api
  - ✅ Veja documentação dos endpoints

---

## 📋 PARTE 3: Página Admin

### Acesso

- [ ] **Login no Sistema**
  - ✅ Clique no ícone 🔑 no header
  - ✅ Faça login com credenciais admin
  - ✅ Veja menu "Área Admin"

- [ ] **Acessar Configurações**
  - ✅ Clique em "Área Admin" → "Configurações do Site"
  - ✅ URL: http://localhost:5173/admin/configuracoes
  - ✅ Veja 9 abas

### Testar Cada Aba

- [ ] **1. Branding**
  - ✅ Campo "Nome do Site" editável
  - ✅ Upload de logo funciona
  - ✅ Upload de favicon funciona

- [ ] **2. Tema**
  - ✅ Color pickers funcionam
  - ✅ Preview de cores aparece
  - ✅ Input manual de hex funciona

- [ ] **3. Hero**
  - ✅ Título e subtítulo editáveis
  - ✅ Upload de imagem funciona
  - ✅ CTA texto e link editáveis
  - ✅ Adicionar highlight funciona
  - ✅ Remover highlight funciona

- [ ] **4. About**
  - ✅ Toggle ativar/desativar funciona
  - ✅ Título, subtítulo, conteúdo editáveis
  - ✅ Upload de imagens funciona
  - ✅ Adicionar qualificação funciona
  - ✅ Remover qualificação funciona

- [ ] **5. Contact**
  - ✅ Todos os campos de contato editáveis
  - ✅ Endereço completo funciona
  - ✅ URL do mapa aceita texto

- [ ] **6. Social**
  - ✅ Todos os campos de redes sociais editáveis
  - ✅ URLs válidas aceitas

- [ ] **7. Sections**
  - ✅ Toggle de cada seção funciona
  - ✅ Estado salvo corretamente

- [ ] **8. Footer**
  - ✅ Descrição editável
  - ✅ Adicionar serviço funciona
  - ✅ Adicionar link rápido funciona
  - ✅ Copyright editável

- [ ] **9. SEO**
  - ✅ Meta title com contador funciona
  - ✅ Meta description com contador funciona
  - ✅ Keywords editável
  - ✅ Preview do Google aparece

### Funcionalidades Gerais

- [ ] **Salvar Alterações**
  - ✅ Botão "Salvar Alterações" funciona
  - ✅ Toast de sucesso aparece
  - ✅ Mudanças persistem após reload

- [ ] **Indicador de Mudanças**
  - ✅ Aparece "Alterações não salvas" ao editar
  - ✅ Desaparece após salvar

- [ ] **Resetar Configurações**
  - ✅ Botão "Resetar para Padrão" funciona
  - ✅ Modal de confirmação aparece
  - ✅ Reseta para valores padrão

---

## 📋 PARTE 4: Página Inicial (Home)

### Loading States

- [ ] **Skeletons**
  - ✅ Hero skeleton aparece durante carregamento
  - ✅ Outros skeletons aparecem
  - ✅ Transição suave para conteúdo real

### Hero Section

- [ ] **Conteúdo Dinâmico**
  - ✅ Título do config aparece
  - ✅ Subtítulo do config aparece
  - ✅ Imagem do config aparece (se configurada)
  - ✅ Botão CTA com texto do config
  - ✅ Highlights configurados aparecem

- [ ] **Funcionalidade**
  - ✅ Botão CTA abre link correto
  - ✅ Ícones dos highlights renderizam

### Header

- [ ] **Conteúdo Dinâmico**
  - ✅ Logo do config aparece (ou nome em texto)
  - ✅ Telefone do config aparece
  - ✅ Email do config aparece
  - ✅ Botão WhatsApp usa número do config

### About Section

- [ ] **Conteúdo Dinâmico**
  - ✅ Título do config aparece
  - ✅ Subtítulo aparece (se configurado)
  - ✅ Conteúdo aparece (se configurado)
  - ✅ Imagem desktop aparece
  - ✅ Imagem mobile aparece
  - ✅ Qualificações aparecem com ícones

- [ ] **Visibilidade**
  - ✅ Seção some se `aboutEnabled = false`
  - ✅ Seção aparece se `aboutEnabled = true`

### Footer

- [ ] **Conteúdo Dinâmico**
  - ✅ Nome do site do config
  - ✅ Descrição do config (se configurada)
  - ✅ Redes sociais aparecem (se configuradas)
  - ✅ Serviços listados (se configurados)
  - ✅ Links rápidos aparecem
  - ✅ Informações de contato do config
  - ✅ Copyright com ano atual

### CTA/Contact Section

- [ ] **Conteúdo Dinâmico**
  - ✅ Informações de contato do config
  - ✅ Mapa aparece (se URL configurada)
  - ✅ Endereço completo aparece
  - ✅ Link "Abrir Google Maps" funciona

### Controle de Seções

- [ ] **Teste Toggle**
  1. Vá ao admin → Seções
  2. Desative "Hero Section"
  3. Salve
  4. Volte à home
  - ✅ Hero Section não aparece
  5. Reative "Hero Section"
  6. Salve
  7. Volte à home
  - ✅ Hero Section volta a aparecer

---

## 📋 PARTE 5: Sistema de Temas

### Cores Dinâmicas

- [ ] **Teste de Cores**
  1. Vá ao admin → Tema
  2. Mude cor primária para #FF0000 (vermelho)
  3. Salve
  4. Volte à home
  - ✅ Elementos primários ficam vermelhos
  - ✅ Botões, títulos, etc mudam de cor

### Meta Tags

- [ ] **SEO Dinâmico**
  1. Vá ao admin → SEO
  2. Configure meta title
  3. Configure meta description
  4. Salve
  - ✅ Aba do navegador mostra novo title
  - ✅ Inspecione HTML: meta tags atualizadas

### Favicon

- [ ] **Favicon Dinâmico**
  1. Vá ao admin → Branding
  2. Configure favicon (URL de imagem)
  3. Salve
  - ✅ Favicon da aba muda

---

## 📋 PARTE 6: Testes de Integração

### Fluxo Completo

- [ ] **Configuração do Zero**
  1. Reset configurações
  2. Preencha todas as abas
  3. Salve
  4. Veja home atualizada
  - ✅ Tudo funciona end-to-end

### Upload de Imagens

- [ ] **Teste Upload**
  1. Use Cloudinary/ImgBB para hospedar imagem
  2. Copie URL
  3. Cole no campo de imagem
  4. Salve
  - ✅ Imagem aparece na home

### Persistência

- [ ] **Teste Reload**
  1. Configure algo no admin
  2. Salve
  3. Feche navegador
  4. Abra novamente
  - ✅ Configurações persistem

---

## 📋 PARTE 7: Console & Erros

### Sem Erros

- [ ] **Console Limpo**
  - ✅ F12 → Console → Sem erros vermelhos
  - ✅ Warnings mínimos (apenas bibliotecas)

- [ ] **Network**
  - ✅ F12 → Network → Todas requests 200/201
  - ✅ `/api/site-config` retorna dados

### Performance

- [ ] **Loading Rápido**
  - ✅ Página carrega em < 2s
  - ✅ Transições suaves
  - ✅ Sem travamentos

---

## 📋 PARTE 8: Mobile

### Responsividade

- [ ] **Teste Mobile**
  - ✅ F12 → Toggle device toolbar
  - ✅ Testar em iPhone/Android
  - ✅ Tudo responsivo
  - ✅ Imagens adaptam
  - ✅ Menu mobile funciona

---

## 🎯 CHECKLIST FINAL

### Essenciais

- [ ] Backend rodando sem erros
- [ ] Frontend rodando sem erros
- [ ] Admin acessível e funcional
- [ ] Todas as 9 abas funcionando
- [ ] Salvar/carregar funcionando
- [ ] Home mostra dados dinâmicos
- [ ] Sem erros no console

### Avançados

- [ ] Cores dinâmicas aplicadas
- [ ] Meta tags atualizando
- [ ] Favicon mudando
- [ ] Seções aparecem/somem
- [ ] Skeletons funcionando
- [ ] Mobile responsivo

---

## ✅ APROVADO!

Se todos os itens estão ✅, parabéns!

**Seu sistema white-label está 100% funcional! 🎉**

---

## 🐛 Problemas Comuns

### "Property siteConfig does not exist"
```bash
cd server
npx prisma generate
```

### "Cannot connect to database"
- Verifique se MongoDB está rodando
- Confira DATABASE_URL no .env

### "404 Not Found"
- Backend está rodando?
- URL correta: http://localhost:3001/api

### "Changes not saving"
- Abra Network tab
- Veja se PUT /api/site-config retorna 200
- Verifique autenticação (JWT token)

---

**Boa sorte! 🚀**
