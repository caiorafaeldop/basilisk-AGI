# 🚀 Setup do Sistema de Imagens - Hero Section

## ✅ O QUE FOI IMPLEMENTADO:

### 1. **Backend (Servidor)**
- ✅ Tabela `Image` criada no Prisma Schema
- ✅ Campo `heroSlides` atualizado para suportar `imageId`
- ✅ Módulo completo de gerenciamento de imagens (`/server/src/image/`)
- ✅ Endpoints de API:
  - `POST /images/upload` - Upload com crop e metadata
  - `GET /images` - Listar todas as imagens
  - `GET /images/:id` - Buscar imagem por ID
  - `GET /images/folder/:folder` - Listar por pasta
  - `DELETE /images/:id` - Deletar imagem
- ✅ Integração com Cloudinary para armazenamento

### 2. **Frontend (Cliente)**
- ✅ Componente `ImageUploadWithCrop` com modal de crop
- ✅ Integração no `AdminSiteConfig` para cada slide
- ✅ `HeroSection` atualizado para renderizar imagens por slide
- ✅ Suporte a crop 16:9 com zoom e ajustes
- ✅ Preview em tempo real

---

## 📋 PASSOS PARA ATIVAR O SISTEMA:

### **Passo 1: Gerar Prisma Client**
```bash
cd server
npx prisma generate
```

### **Passo 2: Sincronizar com MongoDB**
```bash
npx prisma db push
```

### **Passo 3: Reiniciar o Servidor**
```bash
npm run dev
```

### **Passo 4: Testar o Sistema**
1. Acesse o Admin: `/admin/site-config`
2. Vá para a seção "Hero Section"
3. Clique em "Adicionar Slide"
4. Preencha título e subtítulo
5. Clique em "Escolher Imagem"
6. Selecione uma imagem do seu computador
7. Ajuste o crop no modal (zoom e posição)
8. Clique em "Confirmar e Upload"
9. Salve as configurações
10. Veja o resultado na home page

---

## 🎯 FUNCIONALIDADES IMPLEMENTADAS:

### **Upload Inteligente**
- ✅ Validação de tipo (JPG, PNG, WEBP)
- ✅ Validação de tamanho (máx 5MB)
- ✅ Crop automático para 16:9 (1920x1080)
- ✅ Otimização de imagem
- ✅ Upload para Cloudinary

### **Gerenciamento de Slides**
- ✅ Cada slide tem sua própria imagem
- ✅ Adicionar/remover slides (máx 5)
- ✅ Reordenar slides (mover para cima/baixo)
- ✅ Preview em tempo real
- ✅ Imagens opcionais (fallback para heroImage global)

### **Hero Section**
- ✅ Carrossel de imagens sincronizado com texto
- ✅ Transições suaves entre slides
- ✅ Autoplay a cada 6 segundos
- ✅ Navegação manual (setas e dots)
- ✅ Responsivo (imagens ocultas no mobile)

---

## 📁 ESTRUTURA DE ARQUIVOS CRIADOS/MODIFICADOS:

### **Backend:**
```
server/
├── prisma/
│   └── schema.prisma (✅ Modificado - Tabela Image adicionada)
├── src/
│   ├── app.module.ts (✅ Modificado - ImageModule registrado)
│   ├── image/ (✅ NOVO)
│   │   ├── dto/
│   │   │   ├── create-image.dto.ts
│   │   │   └── index.ts
│   │   ├── image.controller.ts
│   │   ├── image.service.ts
│   │   └── image.module.ts
│   └── prisma/
│       └── prisma.module.ts (✅ NOVO)
```

### **Frontend:**
```
client/
└── src/
    └── modules/
        ├── site-config/
        │   ├── components/
        │   │   └── ImageUploadWithCrop.tsx (✅ NOVO)
        │   └── pages/
        │       └── AdminSiteConfig.tsx (✅ Modificado)
        └── hero/
            └── pages/
                └── index.tsx (✅ Modificado)
```

---

## 🔧 CONFIGURAÇÕES NECESSÁRIAS:

### **Cloudinary (Já configurado)**
O sistema usa o Cloudinary que já está configurado no projeto.
As imagens serão salvas em: `basilisk/hero/slide-{número}`

### **MongoDB**
A tabela `images` será criada automaticamente ao executar `prisma db push`

---

## 🎨 COMO USAR NO ADMIN:

### **1. Adicionar Slide com Imagem**
1. Vá em "Hero Section" → "Slides do Carrossel"
2. Clique em "Adicionar Slide"
3. Preencha:
   - **Título**: Ex: "Resultados Comprovados"
   - **Subtítulo**: Ex: "Mais de 1000 clientes satisfeitos"
   - **Imagem**: Clique em "Escolher Imagem"
4. No modal de crop:
   - Use o slider de zoom para ajustar
   - A área destacada será cortada em 16:9
   - Clique em "Confirmar e Upload"
5. Clique em "Salvar"

### **2. Trocar Imagem de um Slide**
1. Clique em "Trocar Imagem" no card do slide
2. Selecione nova imagem
3. Ajuste o crop
4. Confirme

### **3. Remover Imagem**
1. Clique no "X" ao lado da imagem
2. A imagem será removida (mas o slide permanece)

### **4. Reordenar Slides**
1. Use as setas ↑ ↓ para mover slides
2. O primeiro slide é sempre o "Principal"

---

## 🐛 TROUBLESHOOTING:

### **Erro: "Property 'image' does not exist on type 'PrismaService'"**
**Solução:** Execute `npx prisma generate` para regenerar o Prisma Client

### **Erro: "Imagem não aparece no frontend"**
**Verificar:**
1. A imagem foi salva com sucesso? (verifique no MongoDB)
2. O campo `imageUrl` ou `imageId` está preenchido no slide?
3. O Cloudinary está funcionando?

### **Erro: "Modal de crop não abre"**
**Verificar:**
1. O arquivo selecionado é uma imagem válida?
2. O tamanho é menor que 5MB?
3. Verifique o console do navegador para erros

---

## 📊 ESTRUTURA DO BANCO DE DADOS:

### **Tabela: images**
```typescript
{
  id: string,           // ObjectId do MongoDB
  userId: string?,      // ID do usuário (opcional)
  name: string,         // Nome original do arquivo
  url: string,          // URL da imagem no Cloudinary
  folder: string,       // Pasta de organização
  width: number?,       // Largura (1920)
  height: number?,      // Altura (1080)
  size: number?,        // Tamanho em bytes
  format: string?,      // Formato (jpg, png, webp)
  createdAt: Date,
  updatedAt: Date
}
```

### **Campo: heroSlides (SiteConfig)**
```typescript
[
  {
    title: string,
    subtitle: string,
    cta: string,
    imageId: string,      // ✅ NOVO - ID da imagem
    imageUrl: string      // ✅ NOVO - URL da imagem (cache)
  }
]
```

---

## 🚀 PRÓXIMOS PASSOS (OPCIONAL):

### **Melhorias Futuras:**
1. ✨ Galeria de imagens reutilizáveis
2. ✨ Crop com rotação
3. ✨ Múltiplos formatos de crop (1:1, 4:3, etc)
4. ✨ Filtros e ajustes de imagem
5. ✨ Lazy loading de imagens
6. ✨ WebP automático para performance
7. ✨ CDN para imagens

---

## ✅ CHECKLIST FINAL:

- [ ] Executar `npx prisma generate`
- [ ] Executar `npx prisma db push`
- [ ] Reiniciar servidor backend
- [ ] Testar upload de imagem
- [ ] Testar crop de imagem
- [ ] Testar carrossel no frontend
- [ ] Verificar responsividade
- [ ] Testar em produção

---

## 📞 SUPORTE:

Se encontrar algum problema:
1. Verifique os logs do servidor
2. Verifique o console do navegador
3. Confirme que o Cloudinary está configurado
4. Confirme que o MongoDB está rodando

---

**Sistema implementado com sucesso! 🎉**

Agora você tem um sistema completo de gerenciamento de imagens para os slides do Hero Section, com upload inteligente, crop automático e armazenamento em banco de dados.
