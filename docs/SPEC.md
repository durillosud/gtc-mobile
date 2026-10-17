# Especificação Técnica do Sistema: Gtc Mobile

Este documento define a arquitetura, convenções técnicas, contratos de API e padrões de desenvolvimento do aplicativo móvel **`gtc-mobile`**.

---

## 1. Visão Geral e Arquitetura

O **`gtc-mobile`** é o cliente móvel oficial do ecossistema Gnuteca-NG, desenvolvido com foco em operadores de biblioteca (balcão de circulação, inventário e auditoria de acervo) e usuários leitores (consulta ao catálogo, renovações e reservas).

- **Framework**: React Native com Expo (SDK 51/52+).
- **Roteamento**: Expo Router (baseado no sistema de arquivos sob `src/app/`).
- **Linguagem**: TypeScript com tipagem estrita (`strict: true`).
- **Estilização**: React Native `StyleSheet` combinado com tokens de tema customizados.
- **Formulários**: React Hook Form com schemas e validações estritas via Zod.
- **Rede & HTTP**: Axios configurado com suporte a credenciais (`withCredentials: true`).

---

## 2. Autenticação e Segurança (BFF & Cookie Store Nativo)

### 2.1. Sessão Baseada em Cookies HttpOnly
O aplicativo consome exclusivamente os endpoints do **BFF (Backend For Frontend)** do Gnuteca-NG:
- O login é realizado via `POST /api/v1/auth/login`.
- Os tokens JWT (`SID_ACC` e `SID_REF`) são retornados em cabeçalhos `Set-Cookie` com atributos `HttpOnly`, `SameSite` e `Secure`.
- **PROIBIDO**: Armazenar manualmente tokens de acesso em `AsyncStorage` ou `SecureStore`.
- **Cookie Jar Nativo**: O networking stack do React Native (baseado em `NSURLSession` no iOS e `OkHttpClient` no Android) retém e encaminha automaticamente os cookies de sessão correspondentes ao domínio configurado, persistindo entre chamadas e reinicializações do app.

### 2.2. Resolução de DNS e Ambientes Locais
A URL base do backend é definida via `EXPO_PUBLIC_API_URL` em `src/services/api.ts`:
- **Simulador iOS**: `http://gnuteca-ng.local/api/v1`
- **Emulador Android**: `http://10.0.2.2:80/api/v1`
- **Aparelho Físico (Expo Go)**: `http://<IP_LOCAL_HOST>:80/api/v1`

---

## 3. Identidade Visual e Design System

### 3.1. Sistema de Ícones (`GtcIcon`)
- Todos os ícones do aplicativo utilizam exclusivamente o componente [`GtcIcon`](file:///home/durillosud/PhpStormProjects/gtc-bundle/gtc-mobile/src/components/icons/GtcIcon.tsx), implementado com `react-native-svg`.
- Proibido o uso de pacotes genéricos (`@expo/vector-icons`, Ionicons, FontAwesome) ou imagens bitmap como ícones.

### 3.2. Sistema de Temas (`ThemeContext`)
- Suporte nativo a 3 variantes de cores:
  1. **Dark**: Fundo `#020617` (slate-950) e cartões `#0f172a`.
  2. **Slate / Intermediário**: Fundo `#0f172a` e cartões `#1e293b`.
  3. **Light**: Fundo `#f8fafc` e elementos claros.
- Acesso a estilos reativos através do hook `useTheme()`.

---

## 4. Estrutura de Diretórios (`src/`)

```
src/
├── app/                  # Rotas gerenciadas pelo Expo Router
│   ├── _layout.tsx       # Layout raiz (Theme Provider, Auth Provider, Slot/Stack)
│   ├── index.tsx         # Tela principal/Home
│   ├── login.tsx         # Tela de autenticação com validação Zod
│   └── explore.tsx       # Navegação e busca
├── components/           # Componentes reutilizáveis
│   ├── icons/            # Catálogo vetorial GtcIcon
│   └── ui/               # Componentes de interface base
├── contexts/             # Contextos globais (AuthContext, ThemeContext)
├── hooks/                # Hooks customizados (useTheme, useColorScheme)
├── services/             # Clientes de API (api.ts com Axios)
└── constants/            # Tokens de tema e configurações estáticas
```
