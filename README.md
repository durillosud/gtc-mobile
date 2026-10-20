# 📱 Gtc-Mobile - Aplicativo Móvel de Circulação & Scanner

[![Expo](https://img.shields.io/badge/Expo-SDK%2057-000020.svg?style=flat-square&logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.86-61dafb.svg?style=flat-square&logo=react)](https://reactnative.dev/)
[![Expo Router](https://img.shields.io/badge/Navigation-Expo%20Router-black.svg?style=flat-square)](https://docs.expo.dev/router/introduction/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Mode-3178c6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Scanner](https://img.shields.io/badge/Camera-Barcode%20%26%20QR%20Scanner-purple.svg?style=flat-square)](https://docs.expo.dev/versions/latest/sdk/camera/)
[![Auth](https://img.shields.io/badge/Auth-BFF%20Native%20Cookie%20Jar-emerald.svg?style=flat-square)](https://auth0.com/blog/the-backend-for-frontend-pattern-guides-modern-web-development/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square)](LICENSE)

> Aplicativo móvel oficial do ecossistema Gnuteca: transforma smartphones e coletores Android/iOS em balcões de atendimento móvel para circulação rápida, inventário e leitor de código de barras.

---

## 📑 Tabela de Conteúdos
- [🌐 Visão Geral & Contexto](#-visão-geral--contexto)
- [🏛️ Arquitetura Móvel & Comunicação com o BFF](#-arquitetura-móvel--comunicação-com-o-bff)
- [✨ Principais Funcionalidades](#-principais-funcionalidades)
- [🎨 Design System & Paridade com a Web](#-design-system--paridade-com-a-web)
- [🛠️ Stack Tecnológica & Pré-requisitos](#-stack-tecnológica--pré-requisitos)
- [🚀 Guia de Início Rápido (Quickstart)](#-guia-de-início-rápido-quickstart)
- [📁 Estrutura de Diretórios](#-estrutura-de-diretórios)
- [🧪 Qualidade de Código & Tipagem](#-qualidade-de-código--tipagem)
- [📜 Padrões de Governança & Commits](#-padrões-de-governança--commits)
- [📄 Licença](#-licença)

---

## 🌐 Visão Geral & Contexto

O **`gtc-mobile`** foi desenvolvido para libertar bibliotecários e operadores do balcão fixo de atendimento. Com ele, as tarefas de inventário físico nas estantes, empréstimo volante, baixa de devoluções e verificação de tombos ocorrem de forma fluida e móvel:

```mermaid
flowchart TD
    subgraph DispositivoMovel ["gtc-mobile (React Native / Expo SDK 57)"]
        CAMERA["Câmera / Scanner Nativo (expo-camera)"]
        AUTH_CTX["AuthContext (Cookie Jar do SO)"]
        THEME_CTX["ThemeContext (Dark, Slate, Light)"]
        APP_ROUTER["Expo Router (src/app/)"]
        
        CAMERA --> APP_ROUTER
        AUTH_CTX --> APP_ROUTER
        THEME_CTX --> APP_ROUTER
    end

    subgraph RedeLocal ["Rede Wi-Fi / Proxy Traefik"]
        TRF["Traefik Gateway (gtc-web.local / IP da LAN)"]
    end

    subgraph BackendGnuteca ["gnuteca-ng Backend"]
        BFF["BFF Auth & Refresh (/api/v1/bff/*)"]
        CIRC["Módulo de Circulação (Empréstimos / Baixas)"]
        CAT["Módulo de Catálogo & Exemplares"]
    end

    APP_ROUTER -->|Requisições HTTP com Cookies Nativos HttpOnly| TRF
    TRF --> BFF
    TRF --> CIRC
    TRF --> CAT
```

---

## 🏛️ Arquitetura Móvel & Comunicação com o BFF

1. **Expo Router (File-based Navigation)**:
   - Toda a estrutura de rotas e navegação por abas é declarada em arquivos sob `src/app/`.
   - Suporte nativo a telas modais, transições fluídas e cabeçalhos adaptados às áreas seguras (*Safe Area*).
2. **Gerenciamento Seguro de Sessão (Zero-Token)**:
   - O aplicativo **nunca** armazena tokens JWT manualmente em `AsyncStorage` ou `SecureStore`.
   - A autenticação é delegada ao cliente HTTP Axios (`src/services/api.ts`) que utiliza o **Cookie Jar nativo do sistema operacional** (`NSURLSession` no iOS e `OkHttpClient` no Android).
   - O BFF do backend gerencia e renova os cookies HttpOnly (`SID_ACC` e `SID_REF`) com interceptador automático de refresh em caso de status HTTP 401.

---

## ✨ Principais Funcionalidades

* 📷 **Leitor de Código de Barras Integrado (`expo-camera`)**:
  - Escaneamento em tempo real de códigos EAN-13, Code 128, Code 39 e QR Codes.
  - Leitura instantânea de tombos físicos de exemplares e crachás/carteirinhas de leitores.
* 🔄 **Balcão Volante de Circulação**:
  - Empréstimo móvel: vinculação rápida entre Leitor e Exemplar com apenas duas leituras de código de barras.
  - Devolução simplificada: leitura direta do código do livro com baixa imediata no acervo.
* 🔍 **Consulta Rápida de Exemplar**:
  - Exibe situação do livro, localização física na biblioteca (unidade e estante) e histórico imediato de circulação.
* 👤 **Área do Leitor & Carteirinha Digital**:
  - Exibição de dados do leitor, vínculo institucional e código de barras na tela para validação nas catracas.

---

## 🎨 Design System & Paridade com a Web

O `gtc-mobile` mantém paridade estrita de identidade visual com o portal web `gtc-web`:

* **Componente `GtcIcon` Exclusivo**: Utiliza exatamente o mesmo catálogo vetorial SVG inline baseado em `react-native-svg`, eliminando fontes de ícones externas.
* **3 Temas Dinâmicos (`useTheme`)**:
  - 🌙 **Escuro Profundo (`dark`)**: Otimizado para telas OLED e economia de bateria.
  - 🌫️ **Slate Intermediário (`intermediate`)**: Tons suaves de ardósia para iluminação interna de bibliotecas.
  - ☀️ **Claro (`light`)**: Contraste elevado para uso sob iluminação intensa.

---

## 🛠️ Stack Tecnológica & Pré-requisitos

* **Node.js 20+** ou **Node.js 22 LTS**
* **Expo SDK 57+**
* **React Native 0.86+** & **React 19**
* **Expo Router v57** (Navegação baseada em arquivos)
* **expo-camera** (Captura e decodificação de código de barras)
* **react-native-svg** (Renderização vetorial)
* **Axios** com suporte a credenciais e cookies nativos
* **TypeScript 5.x / 6.x** com modo estrito

---

## 🚀 Guia de Início Rápido (Quickstart)

### 1. Inicialização Integrada via Bundle
Na raiz do repositório `gtc-bundle`:

```bash
# Iniciar o container do app mobile:
./gtc.sh up gtc-mobile

# Visualizar logs e QR Code do Metro:
./gtc.sh logs gtc-mobile
```

### 2. Execução Local no Computador
Dentro da pasta `gtc-mobile/`:

```bash
# 1. Instalar dependências:
npm install

# 2. Iniciar o servidor Metro Bundler:
npm run start
```

No terminal, pressione:
* `a` para abrir no emulador Android
* `i` para abrir no simulador iOS (macOS)
* `w` para abrir a pré-visualização web no navegador
* Ou escaneie o **QR Code** no terminal usando o aplicativo **Expo Go** em seu smartphone físico.

---

## 📁 Estrutura de Diretórios

```text
gtc-mobile/
├── assets/                  # Ícones adaptativos, splash screen e imagens
├── docs/                    # Especificações técnicas (SPEC.md) e roadmap (PLAN.md)
├── src/
│   ├── app/                 # Rotas e Telas do Expo Router
│   │   ├── _layout.tsx      # Layout raiz com ThemeProvider e AuthProvider
│   │   ├── (tabs)/          # Navegação por abas inferiores
│   │   │   ├── index.tsx    # Tela inicial / Dashboard
│   │   │   ├── scanner.tsx  # Câmera e Scanner de código de barras
│   │   │   ├── loans.tsx    # Circulação e empréstimos
│   │   │   └── profile.tsx  # Perfil do leitor / operador
│   │   └── login.tsx        # Tela de login com validação Zod
│   ├── components/
│   │   └── icons/           # Catálogo vetorial SVG GtcIcon
│   ├── contexts/            # Contextos React (AuthContext e ThemeContext)
│   ├── services/            # Cliente HTTP Axios configurado para o BFF
│   └── styles/              # Paletas e tokens visuais (Dark, Slate, Light)
├── app.json                 # Manifesto de configuração do Expo
└── tsconfig.json            # Configurações TypeScript estritas
```

---

## 🧪 Qualidade de Código & Tipagem

```bash
# 1. Checagem estática de tipos TypeScript:
npx tsc --noEmit

# 2. Análise de linter ESLint:
npm run lint
```

---

## 📜 Padrões de Governança & Commits

Commits no repositório utilizam a convenção semântica padronizada com emojis:
* `✨ Adiciona`: Novas telas móveis, fluxos de scanner ou componentes
* `🐛 Corrige`: Resolução de bugs no scanner, autenticação ou estilos
* `🔧 Refatora`: Melhorias em hooks, navegação e consumo de API
* `📱 Mobile`: Ajustes específicos para comportamento Android ou iOS

---

## 📄 Licença

Distribuído sob a licença **Apache 2.0**.
