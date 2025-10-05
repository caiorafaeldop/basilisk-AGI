# 🤝 GUIA DE CONTRIBUIÇÃO - BASILISK WHITE-LABEL

> **Como adicionar novas features, campos e funcionalidades**

---

## 🎯 Visão Geral

Este guia mostra **como estender** o sistema white-label com novas funcionalidades de forma organizada e consistente.

---

## 📝 ADICIONANDO UM NOVO CAMPO CONFIGURÁVEL

### Passo a Passo Completo

#### 1️⃣ Backend - Database Schema

**Arquivo:** `server/prisma/schema.prisma`

```prisma
model SiteConfig {
  // ... campos existentes ...
  
  // Adicione seu novo campo
  meuNovoCampo  String?  // ou Boolean, Int, etc
}
```

**Execute:**
```bash
cd server
npx prisma generate
npx prisma db push
```

#### 2️⃣ Backend - DTO

**Arquivo:** `server/src/site-config/dto/create-site-config.dto.ts`

```typescript
export class CreateSiteConfigDto {
  // ... campos existentes ...
  
  @IsOptional()
  @IsString()  // ou @IsBoolean(), @IsNumber(), etc
  meuNovoCampo?: string;
}
```

#### 3️⃣ Frontend - Interface TypeScript

**Arquivo:** `client/src/modules/site-config/api/index.ts`

```typescript
export interface SiteConfig {
  // ... campos existentes ...
  
  meuNovoCampo?: string;
}

export interface UpdateSiteConfigDto {
  // ... campos existentes ...
  
  meuNovoCampo?: string;
}
```

#### 4️⃣ Frontend - Adicionar ao Tab Apropriado

**Exemplo:** Adicionando ao `BrandingTab.tsx`

```tsx
export const BrandingTab = ({ config, onUpdate }: BrandingTabProps) => {
  return (
    <div className="space-y-6">
      {/* Campos existentes */}
      
      {/* Seu novo campo */}
      <div>
        <Label htmlFor="meuNovoCampo">Meu Novo Campo</Label>
        <Input
          id="meuNovoCampo"
          value={config.meuNovoCampo || ''}
          onChange={(e) => onUpdate('meuNovoCampo', e.target.value)}
          placeholder="Digite aqui..."
        />
        <p className="text-sm text-muted-foreground mt-1">
          Descrição do campo
        </p>
      </div>
    </div>
  );
};
```

#### 5️⃣ Frontend - Usar no Componente

**Exemplo:** `Header.tsx`

```tsx
const Header = () => {
  const { config } = useSiteConfig();
  
  return (
    <header>
      {config?.meuNovoCampo && (
        <div>{config.meuNovoCampo}</div>
      )}
    </header>
  );
};
```

#### 6️⃣ (Opcional) Adicionar Constante

**Arquivo:** `client/src/lib/constants.ts`

```typescript
export const PLACEHOLDERS = {
  // ... existentes ...
  meuNovoCampo: 'Valor padrão',
} as const;

export const CHARACTER_LIMITS = {
  // ... existentes ...
  meuNovoCampo: 100,
} as const;
```

#### 7️⃣ (Opcional) Adicionar Validação

**Arquivo:** `client/src/lib/validations.ts`

```typescript
// Se precisar de validação customizada
export const validations = {
  // ... existentes ...
  
  isValidMeuCampo: (value: string): boolean => {
    // Sua lógica de validação
    return value.length > 0 && value.length < 100;
  },
};
```

### ✅ Pronto!

Seu novo campo está:
- ✅ Salvo no banco de dados
- ✅ Editável no admin
- ✅ Disponível em toda a aplicação
- ✅ Validado (se configurou)

---

## 🎨 ADICIONANDO UMA NOVA ABA NO ADMIN

### Estrutura da Nova Aba

**Arquivo:** `client/src/modules/site-config/components/MinhaNovaTab.tsx`

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteConfig } from "../api";

interface MinhaNovaTabProps {
  config: SiteConfig;
  onUpdate: (field: string, value: any) => void;
}

export const MinhaNovaTab = ({ config, onUpdate }: MinhaNovaTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="campo1">Campo 1</Label>
        <Input
          id="campo1"
          value={config.campo1 || ''}
          onChange={(e) => onUpdate('campo1', e.target.value)}
        />
      </div>
      
      {/* Mais campos */}
    </div>
  );
};
```

### Integrar na Página Admin

**Arquivo:** `client/src/modules/site-config/pages/AdminSiteConfig.tsx`

```tsx
import { MinhaNovaTab } from "../components/MinhaNovaTab";

const AdminSiteConfig = () => {
  return (
    <Tabs defaultValue="branding">
      <TabsList>
        {/* Tabs existentes */}
        <TabsTrigger value="minhaaba">Minha Aba</TabsTrigger>
      </TabsList>
      
      {/* Tabs existentes */}
      
      <TabsContent value="minhaaba">
        <Card>
          <CardHeader>
            <CardTitle>Minha Nova Categoria</CardTitle>
            <CardDescription>
              Descrição da categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MinhaNovaTab config={displayConfig} onUpdate={handleUpdate} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
```

---

## 🔄 ADICIONANDO UMA NOVA SEÇÃO NA LANDING PAGE

### 1. Criar Componente da Seção

**Arquivo:** `client/src/modules/minha-secao/pages/index.tsx`

```tsx
import { useSiteConfig } from "@/hooks/useSiteConfig";

const MinhaSecao = () => {
  const { config, isLoading } = useSiteConfig();
  
  if (isLoading || !config) return null;
  if (!config.minhaSecaoEnabled) return null;
  
  return (
    <section id="minha-secao" className="py-20">
      <div className="container mx-auto px-4">
        <h2>{config.minhaSecaoTitle}</h2>
        <p>{config.minhaSecaoContent}</p>
      </div>
    </section>
  );
};

export default MinhaSecao;
```

### 2. Adicionar Toggle no Schema

**Arquivo:** `server/prisma/schema.prisma`

```prisma
model SiteConfig {
  // ... campos existentes ...
  
  minhaSecaoEnabled Boolean @default(true)
  minhaSecaoTitle   String  @default("Minha Seção")
  minhaSecaoContent String?
}
```

### 3. Adicionar no SectionsTab

**Arquivo:** `client/src/modules/site-config/components/SectionsTab.tsx`

```tsx
const sections = [
  // ... existentes ...
  { 
    key: 'minhaSecaoEnabled', 
    label: 'Minha Seção', 
    description: 'Descrição da seção' 
  },
];
```

### 4. Adicionar no Index

**Arquivo:** `client/src/pages/Index.tsx`

```tsx
import MinhaSecao from "@/modules/minha-secao/pages";

const Index = () => {
  return (
    <main>
      {config?.heroEnabled && <HeroSection />}
      {config?.minhaSecaoEnabled && <MinhaSecao />}
      {/* outras seções */}
    </main>
  );
};
```

---

## 🎨 ADICIONANDO SKELETON PARA NOVA SEÇÃO

**Arquivo:** `client/src/components/ui/minha-secao-skeleton.tsx`

```tsx
import { Skeleton } from "./skeleton";
import { Card } from "./card";

export const MinhaSecaoSkeleton = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <Skeleton className="h-12 w-64 mx-auto mb-8" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <Skeleton className="h-48 w-full" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
```

**Usar no componente:**

```tsx
if (isLoading) return <MinhaSecaoSkeleton />;
```

---

## 🔧 ADICIONANDO NOVA VALIDAÇÃO

**Arquivo:** `client/src/lib/validations.ts`

```typescript
export const validations = {
  // ... existentes ...
  
  isValidCPF: (cpf: string): boolean => {
    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/\D/g, '');
    
    // Valida tamanho
    if (cleanCPF.length !== 11) return false;
    
    // Sua lógica de validação
    // ...
    
    return true;
  },
  
  formatCPF: (cpf: string): string => {
    const clean = cpf.replace(/\D/g, '');
    return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },
};

export const errorMessages = {
  // ... existentes ...
  invalidCPF: 'CPF inválido',
};
```

---

## 🛠️ ADICIONANDO NOVO HELPER

**Arquivo:** `client/src/lib/helpers.ts`

```typescript
/**
 * Calcula idade a partir de data de nascimento
 */
export function calculateAge(birthDate: Date | string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}
```

---

## 📦 ADICIONANDO NOVA CONSTANTE

**Arquivo:** `client/src/lib/constants.ts`

```typescript
export const MINHA_CATEGORIA = {
  opcao1: 'Valor 1',
  opcao2: 'Valor 2',
  opcao3: 'Valor 3',
} as const;

// Com type-safety
export type MinhaCategoria = typeof MINHA_CATEGORIA[keyof typeof MINHA_CATEGORIA];
```

---

## 🎯 PADRÕES E BOAS PRÁTICAS

### Nomenclatura

```typescript
// ✅ Bom
siteTitle
heroEnabled
footerCopyright

// ❌ Evite
title
enabled
copyright
```

### Tipos de Campos

```typescript
// String
campo: String?

// Boolean
enabled: Boolean @default(true)

// Number
ordem: Int @default(0)

// Array (JSON)
lista: Json?  // será array no TypeScript
```

### Validações

```typescript
// Sempre use validação para:
- Emails
- URLs
- Telefones
- Datas
- Números com range
- Tamanho de string
```

### Valores Padrão

```typescript
// Sempre forneça defaults sensatos
@default("Valor padrão")
@default(true)
@default(0)
```

---

## 🔍 DEBUGGING

### Backend

```typescript
// Adicione logs no service
console.log('Config being saved:', updateDto);
```

### Frontend

```typescript
// Use React Query DevTools
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// No App.tsx
<ReactQueryDevtools initialIsOpen={false} />
```

### Database

```bash
# Visualize dados
cd server
npx prisma studio
```

---

## 📋 CHECKLIST PARA NOVA FEATURE

- [ ] Schema Prisma atualizado
- [ ] `prisma generate` executado
- [ ] `prisma db push` executado
- [ ] DTO backend atualizado
- [ ] Interface TypeScript atualizada
- [ ] Tab/Componente admin criado
- [ ] Integrado na página admin
- [ ] Componente frontend usando o campo
- [ ] Validação adicionada (se necessário)
- [ ] Constante adicionada (se necessário)
- [ ] Skeleton criado (se seção)
- [ ] Testado no admin
- [ ] Testado no frontend
- [ ] Documentação atualizada

---

## 🎨 EXEMPLOS PRÁTICOS

### Exemplo 1: Adicionar Campo "Tagline"

```typescript
// 1. schema.prisma
tagline String? @default("Seu slogan aqui")

// 2. DTO
@IsOptional()
@IsString()
@MaxLength(100)
tagline?: string;

// 3. Interface
tagline?: string;

// 4. BrandingTab
<Input
  value={config.tagline || ''}
  onChange={(e) => onUpdate('tagline', e.target.value)}
  maxLength={100}
/>

// 5. Header
{config?.tagline && <p>{config.tagline}</p>}
```

### Exemplo 2: Adicionar Seção "Galeria"

```typescript
// 1. schema.prisma
galeriaEnabled Boolean @default(false)
galeriaTitle   String  @default("Galeria")
galeriaImages  Json?   // array de URLs

// 2. Componente
const GaleriaSection = () => {
  const { config } = useSiteConfig();
  
  if (!config?.galeriaEnabled) return null;
  
  const images = config.galeriaImages || [];
  
  return (
    <section>
      <h2>{config.galeriaTitle}</h2>
      <div className="grid grid-cols-3 gap-4">
        {images.map((url, i) => (
          <img key={i} src={url} alt="" />
        ))}
      </div>
    </section>
  );
};

// 3. Tab
<Button onClick={() => {
  const current = config.galeriaImages || [];
  onUpdate('galeriaImages', [...current, urlInput]);
}}>
  Adicionar Imagem
</Button>
```

---

## 🚀 DEPLOY DE MUDANÇAS

### Após Adicionar Features

```bash
# Backend
cd server
npm run build
# Deploy para seu servidor

# Frontend
cd client
npm run build
# Deploy para Vercel/Netlify
```

---

## 📞 PRECISA DE AJUDA?

### Recursos

- **Código de referência**: `lib/constants.ts`, `lib/validations.ts`
- **Exemplos**: Veja tabs existentes como `BrandingTab.tsx`
- **Documentação**: `WHITE_LABEL_README.md`

### Padrão de Commits

```bash
git commit -m "feat: adiciona campo tagline ao SiteConfig"
git commit -m "fix: corrige validação de email"
git commit -m "docs: atualiza guia de contribuição"
```

---

## 🎉 CONTRIBUA!

Toda contribuição é bem-vinda:
- 🐛 Correção de bugs
- ✨ Novas features
- 📝 Melhorias na documentação
- 🎨 Melhorias de UI/UX
- ⚡ Otimizações de performance

---

**Happy coding! 🚀**

*Última atualização: Outubro 2025*
