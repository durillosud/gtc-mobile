---
description: Regras de componentes de interface e design system para gtc-mobile
trigger:
  glob: "src/components/**"
---

# Regras de Componentes e Interface: React Native

Estas regras aplicam-se a componentes visuais sob `src/components/`.

## 1. Design System e Ícones
- **Uso Obrigatório de GtcIcon**: Utilize unicamente `<GtcIcon name="..." size={...} color={...} />`. É terminantemente proibido importar `@expo/vector-icons` ou usar emojis como ícones de ação.
- **Tokens de Tema**: Utilize o hook `useTheme()` para obter as cores ativas de fundo, texto, bordas e acentos, garantindo suporte aos 3 temas (Dark, Slate, Light).

## 2. Padrões de Código
- Componentes devem ser funcionais e tipados estritamente via TypeScript (`interface ComponentProps { ... }`).
- Estilização isolada via `StyleSheet.create({ ... })`.
- Acessibilidade: Forneça `accessibilityLabel` e `accessibilityRole` em botões e elementos interativos.
