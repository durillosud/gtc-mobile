---
name: gtc-icon-design-system
description: Sistema de design de ícones SVG vetoriais customizados para as aplicações frontend Gnuteca (Web e Mobile).
---

# SKILL: Gnuteca Icon Design System

## 1. Propósito

Este skill define o **sistema de ícones vetoriais** criado especificamente para o ecossistema Gnuteca-NG.
Os ícones são desenhados como SVGs inline, sem dependência de bibliotecas externas de ícones no frontend web,
e utilizam `react-native-svg` no mobile. Ambos compartilham o **mesmo catálogo visual** e **mesma linguagem de design**.

> **Princípio fundamental**: Todos os ícones do Gnuteca devem vir exclusivamente do componente `GtcIcon`.
> Nunca use emojis Unicode, ícones de bibliotecas genéricas ou imagens PNG como ícones de interface.

---

## 2. Especificações Visuais

| Propriedade         | Valor                          |
|---------------------|--------------------------------|
| **ViewBox**         | `0 0 24 24`                    |
| **Stroke Width**    | `1.5`                          |
| **Stroke Linecap**  | `round`                        |
| **Stroke Linejoin** | `round`                        |
| **Fill**            | `none` (stroke-based design)   |
| **Tamanho padrão**  | `20px` (web) / `20` (mobile)   |
| **Cor padrão**      | `currentColor` (web) / `#333` (mobile) |

### Estilo de Design

- **Contorno (outline)**: Todos os ícones são baseados em traço (stroke), sem preenchimento sólido
- **Cantos arredondados**: `strokeLinecap="round"` e `strokeLinejoin="round"` para um visual moderno e amigável
- **Consistência**: Todos os ícones seguem o mesmo peso visual e grid de 24×24 unidades
- **Tema biblioteconômico**: Ícones derivam de metáforas de biblioteca quando possível (livros, estantes, empréstimos)

---

## 3. Catálogo de Ícones

| Nome            | Descrição                                    | Contexto de Uso Principal                         |
|-----------------|----------------------------------------------|---------------------------------------------------|
| `dashboard`     | Grade de 4 quadrados (bento grid)            | Menu lateral — Painel                             |
| `book`          | Livro fechado com linhas de texto             | Menu lateral — Catalogação; Card de estatísticas  |
| `book-open`     | Livro aberto (duas páginas)                  | Ação rápida — Catalogar Obra                      |
| `circulation`   | Duas setas formando ciclo                    | Menu lateral — Circulação; Card de empréstimos    |
| `loan`          | Livro com seta saindo (empréstimo)           | Tab de empréstimo; Ação rápida de empréstimo      |
| `return`        | Seta curvada de retorno                      | Tab de devolução; Ação rápida de devolução        |
| `users`         | Dois perfis de pessoa                        | Menu lateral — Leitores; Card de leitores ativos  |
| `reports`       | Documento com linhas de texto                | Menu lateral — Relatórios                         |
| `receipt`       | Documento tipo recibo com bordas serrilhadas | Comprovante de empréstimo/devolução               |
| `search`        | Lupa                                         | Tab de consulta em Catálogo e Leitores            |
| `plus`          | Sinal de adição                              | Tab de novo cadastro (Catalogação, Leitor)        |
| `logout`        | Seta saindo de porta/caixa                   | Botão de sair na sidebar                          |
| `bell`          | Sino de notificação                          | Botão de notificações no header                   |
| `menu`          | Três linhas horizontais (hamburger)          | Botão de abrir menu mobile                        |
| `close`         | X (fechar)                                   | Botão de fechar menu mobile                       |
| `warning`       | Triângulo com exclamação                     | Card de devoluções pendentes/atrasadas            |
| `download`      | Seta para baixo com bandeja                  | Botão de exportar planilha                        |
| `home`          | Casa                                         | Tab bar do mobile — Home                          |
| `scanner`       | Moldura de visor com linha central           | Tab bar do mobile — Scanner de código de barras   |
| `chevron-right` | Seta chevron para direita                    | Indicador de expansão em collapsibles             |

---

## 4. Localização dos Componentes

### Frontend Web (`gtc-web`)

```
gtc-web/src/components/icons/GtcIcon.tsx
```

- **Framework**: React (Next.js)
- **Renderização**: SVGs inline nativos do browser (`<svg>`)
- **Sem dependências externas** — os ícones são puro JSX
- **Props**: `name`, `size` (default: 20), `color` (default: `'currentColor'`), `className`

**Uso:**
```tsx
import { GtcIcon } from '@/components/icons/GtcIcon';

<GtcIcon name="book" size={18} />
<GtcIcon name="search" size={24} color="#6b7280" />
<GtcIcon name="logout" className="text-red-500" />
```

### Frontend Mobile (`gtc-mobile`)

```
gtc-mobile/src/components/icons/GtcIcon.tsx
```

- **Framework**: React Native (Expo)
- **Renderização**: `react-native-svg` (`<Svg>`, `<Path>`, `<Line>`, etc.)
- **Dependência**: `react-native-svg` (instalada via `npx expo install react-native-svg`)
- **Props**: `name`, `size` (default: 20), `color` (default: `'#333'`)

**Uso:**
```tsx
import { GtcIcon } from '@/components/icons/GtcIcon';

<GtcIcon name="home" size={24} color="#208AEF" />
<GtcIcon name="scanner" size={24} color="#666" />
```

---

## 5. Regras e Convenções

### 5.1 Adição de Novos Ícones

1. **Design**: Crie o novo ícone no grid 24×24, usando apenas strokes com peso 1.5
2. **Nome**: Use kebab-case descritivo em inglês (e.g., `book-return`, `user-add`)
3. **Tipo**: Adicione o nome à union type `GtcIconName` em **ambos** os componentes (web e mobile)
4. **Implementação**:
   - **Web**: Adicione a entrada em `iconPaths` com JSX puro (`<path>`, `<circle>`, etc.)
   - **Mobile**: Adicione o `case` no `switch` de `IconContent` com componentes `react-native-svg`
5. **Documente**: Atualize a tabela "Catálogo de Ícones" neste SKILL.md

### 5.2 Proibições

- ❌ **NÃO use emojis Unicode** como ícones de interface (ex: 📚, 🔍, ✕)
- ❌ **NÃO instale bibliotecas genéricas** de ícones (lucide, heroicons, react-icons, font-awesome)
- ❌ **NÃO use imagens PNG** para ícones de interface (exceto app icon e splash screen)
- ❌ **NÃO crie ícones com preenchimento sólido** (fill) — mantenha o estilo outline/stroke
- ❌ **NÃO altere as propriedades base** (viewBox, strokeWidth, linecap, linejoin) sem atualizar este documento

### 5.3 Tamanhos Recomendados

| Contexto                    | Tamanho |
|-----------------------------|---------|
| Menu lateral (sidebar)      | `18`    |
| Tabs de navegação           | `18`    |
| Cards de estatísticas       | `24`    |
| Ações rápidas               | `24`    |
| Botão de ação (header)      | `20`    |
| Botão hamburger/fechar      | `24`    |
| Indicadores inline          | `16`    |
| Tab bar mobile              | `24`    |

### 5.4 Acessibilidade

- Todos os SVGs incluem `aria-hidden="true"` pois são decorativos (o texto adjacente provê o significado)
- Quando um ícone é usado **sem texto acompanhante** (ex: botão de notificação), o elemento pai
  deve incluir `aria-label` descritivo

---

## 6. Manutenção e Sincronização

Os dois componentes (`gtc-web` e `gtc-mobile`) devem ser mantidos **em sincronia**:

- Mesmo catálogo de nomes (`GtcIconName`)
- Mesmos paths SVG (apenas o wrapper difere: `<svg>` vs `<Svg>`)
- Ao adicionar um ícone em uma plataforma, adicione na outra imediatamente

### Checklist para novos ícones:

- [ ] Ícone adicionado em `gtc-web/src/components/icons/GtcIcon.tsx`
- [ ] Ícone adicionado em `gtc-mobile/src/components/icons/GtcIcon.tsx`
- [ ] Nome adicionado ao tipo `GtcIconName` em ambos
- [ ] Tabela neste SKILL.md atualizada
- [ ] Tamanho recomendado definido para o contexto de uso
- [ ] Testado visualmente em ambas as plataformas
