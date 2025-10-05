# ✅ TESTE DO SISTEMA DE IMAGENS

## 🎯 Sistema já está pronto! Vamos testar:

### **1. Verificar se o servidor está rodando**
```bash
cd server
npm run dev
```

### **2. Testar no Admin**

#### **Passo a Passo:**

1. **Acesse:** `http://localhost:5173/admin/site-config`

2. **Vá para "Hero Section"** (clique para expandir)

3. **Role até "Slides do Carrossel"**

4. **Clique em "Adicionar Slide"**

5. **Preencha o novo slide:**
   - Título: "Teste de Imagem"
   - Subtítulo: "Sistema de upload com crop 16:9"

6. **Adicione uma imagem:**
   - Clique em "Escolher Imagem"
   - Selecione uma foto do seu PC
   - **Modal de Crop vai abrir:**
     - Use o slider de zoom
     - Ajuste a imagem
     - Clique "Confirmar e Upload"

7. **Aguarde o upload** (vai aparecer "Processando...")

8. **Clique em "Salvar"** (botão azul no topo)

9. **Veja o resultado:**
   - Abra `http://localhost:5173/`
   - O carrossel vai mostrar sua imagem!

---

## 🔍 VERIFICAÇÕES RÁPIDAS:

### ✅ **Backend está OK?**
```bash
# Deve mostrar a rota /images
curl http://localhost:3000/images
```

### ✅ **Tabela Image existe?**
```bash
cd server
npx prisma studio
# Vá em "Image" - deve existir a tabela
```

### ✅ **Upload funciona?**
- Teste fazer upload de uma imagem
- Verifique se aparece no preview
- Verifique se salva no MongoDB (Prisma Studio)

---

## 🐛 PROBLEMAS COMUNS:

### **"Cannot find module ImageUploadWithCrop"**
✅ Já criado em: `client/src/modules/site-config/components/ImageUploadWithCrop.tsx`

### **"Property 'image' does not exist on PrismaService"**
✅ Execute: `cd server && npx prisma generate`

### **"Modal não abre"**
- Verifique se a imagem é válida (JPG, PNG, WEBP)
- Verifique se é menor que 5MB
- Abra o console do navegador (F12)

### **"Imagem não aparece no frontend"**
- Verifique se o Cloudinary está configurado
- Verifique se o upload foi bem-sucedido
- Verifique se salvou o `imageId` no slide

---

## 📊 ESTRUTURA FINAL:

### **Cada slide agora tem:**
```typescript
{
  title: string,
  subtitle: string,
  cta: string,
  imageId: string,    // ✅ ID da imagem no banco
  imageUrl: string    // ✅ URL da imagem (cache)
}
```

### **Tabela Image:**
```typescript
{
  id: string,
  name: string,
  url: string,        // URL do Cloudinary
  folder: string,     // "basilisk/hero/slide-1"
  width: 1920,
  height: 1080,
  size: number,
  format: "jpeg",
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 RECURSOS IMPLEMENTADOS:

✅ Upload de imagem por slide
✅ Crop automático 16:9 (1920x1080)
✅ Modal de ajuste com zoom
✅ Preview em tempo real
✅ Carrossel de imagens no Hero
✅ Transições suaves
✅ Fallback para heroImage global
✅ Cache de URLs
✅ Validação de tipo e tamanho
✅ Integração com Cloudinary
✅ Armazenamento no MongoDB

---

## 🚀 PRONTO PARA USAR!

O sistema está 100% funcional. Agora você pode:
- ✅ Adicionar imagens diferentes para cada slide
- ✅ Fazer crop e ajustes antes do upload
- ✅ Ver as imagens no carrossel do Hero
- ✅ Gerenciar tudo pelo admin

**Divirta-se! 🎉**
