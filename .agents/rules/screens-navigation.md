---
description: Regras de roteamento e desenvolvimento de telas com Expo Router no gtc-mobile
trigger:
  glob: "src/app/**"
---

# Regras de Telas e Navegação: Expo Router

Estas regras aplicam-se a todas as rotas e layouts sob `src/app/`.

## 1. Convenções de Roteamento
- Rotas são definidas pela hierarquia de arquivos e pastas (`index.tsx`, `login.tsx`, `[id].tsx`).
- Layouts (`_layout.tsx`) são responsáveis por envolver rotas com provedores de contexto, cabeçalhos nativos (`Stack.Screen`) ou abas (`Tabs.Screen`).
- Navegação entre telas deve utilizar `useRouter()` do `expo-router` ou `<Link href="...">`.

## 2. Autenticação e Proteção de Telas
- Telas que requerem autenticação devem validar a sessão ativa via `useAuth()`.
- Se o usuário não estiver autenticado, redirecionar para a rota `/login`.
