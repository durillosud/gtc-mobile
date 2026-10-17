---
name: gtc-theme-system
description: Diretrizes e arquitetura do sistema de temas dinâmicos (Claro, Suave/Intermediário e Escuro) para os frontends Gnuteca (Web e Mobile).
---

# SKILL: Gnuteca Theme System

## 1. Propósito

Este skill define o **sistema de temas e cores dinâmicos** para o ecossistema Gnuteca-NG. O sistema suporta três paletas visuais principais unificadas entre a Web e o Mobile:

1.  **Escuro (Dark/Cyberpunk)**: Paleta profunda com fundo `#020617` (slate-950), ideal para ambientes de baixa luminosidade e consistência histórica da marca Gnuteca-NG.
2.  **Suave (Intermediate/Slate)**: Paleta escura suavizada com fundo `#0f172a` (slate-900) e elementos `#1e293b` (slate-800) para fadiga visual reduzida.
3.  **Claro (Light/Slate)**: Paleta corporativa clássica com fundo `#f8fafc` (slate-50), elementos em branco e acentos indigo, otimizada para legibilidade diurna.

---

## 2. Implementação no Frontend Web (`gtc-web`)

O chaveamento de tema é gerenciado no nível do layout raiz administrativo (`AdminLayout`) e propagado via variáveis de ambiente CSS de acordo com a classe aplicada no contêiner principal.

### 2.1 Variáveis Semânticas (`src/app/globals.css`)

O tema é definido por variáveis CSS semânticas mapeadas no `@theme` inline do Tailwind CSS v4:

```css
:root {
  /* Tema Claro (Light) - Padrão */
  --bg-primary: #f8fafc;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f1f5f9;
  --bg-card: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --border-color: rgba(15, 23, 42, 0.08);
  --accent-color: #6366f1;
  --accent-hover: #4f46e5;
}

.theme-intermediate {
  /* Tema Suave (Intermediate) */
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --bg-card: rgba(30, 41, 59, 0.5);
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --border-color: rgba(255, 255, 255, 0.08);
  --accent-color: #6366f1;
  --accent-hover: #4f46e5;
}

.theme-dark {
  /* Tema Escuro (Dark) */
  --bg-primary: #020617;
  --bg-secondary: #0f172a;
  --bg-tertiary: #1e293b;
  --bg-card: rgba(15, 23, 42, 0.5);
  --text-primary: #ffffff;
  --text-secondary: #94a3b8;
  --border-color: rgba(255, 255, 255, 0.05);
  --accent-color: #8b5cf6;
  --accent-hover: #7c3aed;
}
```

### 2.2 Troca Dinâmica e Persistência (`src/app/(admin)/layout.tsx`)

O estado do tema é gerenciado usando React `useState` e sincronizado com o `localStorage` do navegador para persistência:

```typescript
const [theme, setTheme] = useState<"dark" | "intermediate" | "light">("dark");

useEffect(() => {
  const savedTheme = localStorage.getItem("gtc-theme") as "dark" | "intermediate" | "light";
  if (savedTheme) {
    setTheme(savedTheme);
  }
}, []);

const changeTheme = (newTheme: "dark" | "intermediate" | "light") => {
  setTheme(newTheme);
  localStorage.setItem("gtc-theme", newTheme);
};
```

A classe de tema ativa (`theme-light`, `theme-intermediate`, `theme-dark`) é injetada na div contêiner do layout:

```tsx
<div className={`flex h-screen bg-bg-primary text-text-primary overflow-hidden font-sans theme-${theme}`}>
```

---

## 3. Implementação no Frontend Mobile (`gtc-mobile`)

No React Native/Expo, a troca de temas é orquestrada por um Contexto de React (`ThemeContext`) que substitui a detecção nativa e propaga as alterações para todos os componentes que utilizam o hook customizado `useTheme()`.

### 3.1 Provedor de Tema (`src/contexts/ThemeContext.tsx`)

O context fornece o estado `theme` e a função de mutação `setTheme` para todo a árvore sob o `TabLayout` em `_layout.tsx`:

```tsx
export type ThemeType = 'light' | 'intermediate' | 'dark';

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState<ThemeType>('dark');
  // ...
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };
  // ...
}
```

### 3.2 Hook Customizado (`src/hooks/use-theme.ts`)

Os componentes filhos leem o tema de forma simples e reativa:

```typescript
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/contexts/ThemeContext';

export function useTheme() {
  const { theme } = useAppTheme();
  return Colors[theme];
}
```

### 3.3 Constantes de Cores (`src/constants/theme.ts`)

As paletas de cores estão centralizadas e estendidas:

```typescript
export const Colors = {
  light: {
    text: '#0f172a',
    background: '#f8fafc',
    backgroundElement: '#ffffff',
    backgroundSelected: '#cbd5e1',
    textSecondary: '#475569',
    border: '#e2e8f0',
    accent: '#6366f1',
  },
  intermediate: {
    text: '#f8fafc',
    background: '#0f172a',
    backgroundElement: '#1e293b',
    backgroundSelected: '#334155',
    textSecondary: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.08)',
    accent: '#6366f1',
  },
  dark: {
    text: '#ffffff',
    background: '#020617',
    backgroundElement: 'rgba(15, 23, 42, 0.4)',
    backgroundSelected: '#1e293b',
    textSecondary: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.05)',
    accent: '#7c3aed',
  },
} as const;
```

---

## 4. Diretrizes para Novos Componentes e Estilos

### 4.1 Regras de Ouro

-   ❌ **NUNCA codifique cores físicas** no JSX/Stylesheets (ex: `text-white`, `bg-slate-950`, `color: '#000'`).
-   ✅ **Sempre utilize os tokens semânticos**:
    -   *Fundo principal*: `bg-bg-primary` (Web) / `theme.background` (Mobile).
    -   *Fundo de painéis/containers*: `bg-bg-secondary` ou `bg-bg-card` (Web) / `theme.backgroundElement` (Mobile).
    -   *Texto Principal*: `text-text-primary` (Web) / `theme.text` (Mobile).
    -   *Texto Secundário/Muted*: `text-text-secondary` (Web) / `theme.textSecondary` (Mobile).
    -   *Bordas*: `border-border-main` (Web) / `theme.border` (Mobile).
    -   *Acentuação/Foco*: `bg-accent-main` (Web) / `theme.accent` (Mobile).

### 4.2 Exemplo de Estilização Coerente (Web)

```tsx
<div className="p-6 rounded-2xl border border-border-main bg-bg-secondary/40">
  <h3 className="text-text-primary font-bold">Título da Caixa</h3>
  <p className="text-text-secondary text-sm">Texto explicativo secundário.</p>
</div>
```

### 4.3 Exemplo de Estilização Coerente (Mobile)

```tsx
import { useTheme } from '@/hooks/use-theme';

export function MyCard() {
  const theme = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
      <Text style={{ color: theme.text }}>Título</Text>
    </View>
  );
}
```
