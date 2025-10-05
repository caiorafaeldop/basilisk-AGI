# 🎨 Guia de Estilo Neobrutalism - Sistema Centralizado

## 📍 Localização da Configuração

**Arquivo Principal:** `src/styles/neobrutalism.ts`

Todas as configurações de estilo neobrutalism estão centralizadas neste arquivo. Altere aqui para modificar o estilo em todo o projeto!

## 🔧 Como Usar

### Importar o Helper

```typescript
import { nb, NEOBRUTALISM } from "@/styles/neobrutalism";
```

### Aplicar Estilos

#### 1. Borda + Sombra (Combo Mais Comum)

```typescript
// Uso básico
<div style={nb.box()}>Conteúdo</div>

// Com parâmetros customizados
<div style={nb.box('thick', 'large', 'md')}>Conteúdo</div>

// Parâmetros:
// - borderWidth: 'thin' | 'normal' | 'thick' | 'extraThick'
// - shadowSize: 'small' | 'medium' | 'large' | 'extraLarge' | 'huge' | 'massive'
// - borderRadius: 'none' | 'sm' | 'md' | 'lg'
```

#### 2. Apenas Borda

```typescript
<div style={nb.border('normal', 'sm')}>Conteúdo</div>
```

#### 3. Apenas Sombra

```typescript
<div style={nb.shadow('medium')}>Conteúdo</div>
```

#### 4. Texto com Stroke (Contorno)

```typescript
<h1 style={nb.textStroke('thick', 'large')}>Título</h1>
```

#### 5. Combinando com Outras Propriedades

```typescript
<div style={{
  backgroundColor: '#FFE951',
  color: '#000000',
  ...nb.box('thick', 'large', 'md')
}}>
  Conteúdo
</div>
```

## ⚙️ Configurações Disponíveis

### Bordas

```typescript
NEOBRUTALISM.border.width = {
  thin: '2px',       // Bordas finas
  normal: '3px',     // Bordas normais (PADRÃO)
  thick: '4px',      // Bordas grossas
  extraThick: '6px', // Bordas extra grossas
}

NEOBRUTALISM.border.radius = {
  none: '0px',  // Sem arredondamento
  sm: '4px',    // Pequeno (PADRÃO)
  md: '6px',    // Médio
  lg: '8px',    // Grande
}
```

### Sombras

```typescript
NEOBRUTALISM.shadow = {
  small: '2px 2px 0px #000000',
  medium: '4px 4px 0px #000000',      // PADRÃO
  large: '6px 6px 0px #000000',
  extraLarge: '8px 8px 0px #000000',
  huge: '12px 12px 0px #000000',
  massive: '16px 16px 0px #000000',
}
```

### Texto

```typescript
NEOBRUTALISM.text.stroke = {
  thin: '1px',
  normal: '2px',   // PADRÃO
  thick: '3px',
}

NEOBRUTALISM.text.shadow = {
  small: '2px 2px 0px #000000',
  medium: '3px 3px 0px #000000',  // PADRÃO
  large: '4px 4px 0px #000000',
}
```

## 🎯 Exemplos Práticos

### Botão Neobrutalism

```typescript
<button
  style={{
    backgroundColor: config?.primaryColor || '#FF6B6B',
    color: '#000000',
    ...nb.box('thick', 'large', 'sm')
  }}
  className="px-6 py-3 font-bold hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
>
  Clique Aqui
</button>
```

### Card Neobrutalism

```typescript
<div
  style={{
    backgroundColor: '#FFFFFF',
    ...nb.box('normal', 'medium', 'md')
  }}
  className="p-6"
>
  <h2 className="font-bold mb-4">Título do Card</h2>
  <p>Conteúdo do card...</p>
</div>
```

### Título com Stroke

```typescript
<h1
  style={{
    ...nb.textStroke('thick', 'large')
  }}
  className="text-4xl font-bold"
>
  Título Impactante
</h1>
```

### Input Neobrutalism

```typescript
<input
  type="text"
  style={{
    backgroundColor: '#FFFFFF',
    ...nb.box('normal', 'small', 'sm')
  }}
  className="px-4 py-2 w-full"
/>
```

## 🔄 Mudanças Globais

### Para Mudar Todas as Bordas do Projeto

Edite em `src/styles/neobrutalism.ts`:

```typescript
border: {
  width: {
    thin: '1px',      // Era 2px
    normal: '2px',    // Era 3px
    thick: '3px',     // Era 4px
    extraThick: '5px', // Era 6px
  }
}
```

### Para Mudar Todos os Arredondamentos

```typescript
border: {
  radius: {
    none: '0px',
    sm: '6px',    // Era 4px
    md: '8px',    // Era 6px
    lg: '10px',   // Era 8px
  }
}
```

### Para Mudar Todas as Sombras

```typescript
shadow: {
  small: '1px 1px 0px #000000',    // Era 2px 2px
  medium: '3px 3px 0px #000000',   // Era 4px 4px
  large: '5px 5px 0px #000000',    // Era 6px 6px
  // ...
}
```

## 📦 Componentes Já Refatorados

- ✅ Header
- ✅ AdminSideMenu
- ✅ PageHeader
- ✅ PageShell
- 🔄 HeroSection (em progresso)
- 🔄 TeamSection (em progresso)
- 🔄 AboutSection (em progresso)
- 🔄 TestimonialsSection (em progresso)
- 🔄 FAQSection (em progresso)
- 🔄 CTASection (em progresso)

## 🎨 Cores Fixas vs Customizáveis

### Sempre Fixas (Neobrutalism)
- ✅ Cor das bordas: `#000000` (preto)
- ✅ Cor das sombras: `#000000` (preto)

### Sempre Customizáveis (White Label)
- ✅ Cores de fundo (usar `config.primaryColor`, `config.secondaryColor`)
- ✅ Cores de texto (usar `config.textColor`, etc.)
- ✅ Todas as cores exceto bordas e sombras

## 💡 Dicas

1. **Use sempre o helper `nb`** ao invés de valores hardcoded
2. **Combine com cores do config** para manter o white label
3. **Mantenha bordas e sombras pretas** (fixas do neobrutalism)
4. **Use os tamanhos padrão** quando possível para consistência

## 🚀 Benefícios

- ✅ **Mudanças em um único lugar** afetam todo o projeto
- ✅ **Consistência visual** garantida
- ✅ **Fácil manutenção** e experimentação
- ✅ **Type-safe** com TypeScript
- ✅ **Documentação clara** dos valores disponíveis
