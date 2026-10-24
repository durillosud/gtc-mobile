# 📱 Guia de Implantação e Operação: GTC-Mobile (App Móvel de Circulação & Scanner)

Este documento fornece as diretrizes canônicas de implantação, configuração de conectividade, fluxo de autenticação e compilação do aplicativo móvel **`gtc-mobile`**.

---

## 📑 Tabela de Conteúdos

1. [Visão Geral & Arquitetura Móvel](#1-visão-geral--arquitetura-móvel)
2. [Conectividade de Rede & Resolução DNS](#2-conectividade-de-rede--resolução-dns)
   - [A. Emulador Android (Android Studio)](#a-emulador-android-android-studio)
   - [B. Simulador iOS (macOS / Xcode)](#b-simulador-ios-macos--xcode)
   - [C. Dispositivo Físico (Expo Go / Wi-Fi)](#c-dispositivo-físico-expo-go--wi-fi)
3. [Autenticação OIDC com Casdoor IAM & Deep Linking](#3-autenticação-oidc-com-casdoor-iam--deep-linking)
   - [Fluxo de Autorização PKCE](#fluxo-de-autorização-pkce)
   - [Configuração de Deep Link (gtc://)](#configuração-de-deep-link-gtc)
   - [Armazenamento Seguro de Sessão (SecureStore)](#armazenamento-seguro-de-sessão-securestore)
4. [Execução em Modo de Desenvolvimento](#4-execução-em-modo-de-desenvolvimento)
5. [Módulo de Scanner e Balcão Móvel de Circulação](#5-módulo-de-scanner-e-balcão-móvel-de-circulação)
6. [Geração de Builds de Produção (APK / AAB)](#6-geração-de-builds-de-produção-apk--aab)
   - [A. Compilação Local Standalone](#a-compilação-local-standalone)
   - [B. Compilação em Nuvem via EAS Build](#b-compilação-em-nuvem-via-eas-build)
7. [Testes, Linting & Validação de Tipos](#7-testes-linting--validação-de-tipos)

---

## 1. Visão Geral & Arquitetura Móvel

O **`gtc-mobile`** atua como ferramenta de campo e balcão volante de atendimento bibliográfico:
- **Framework**: **React Native** com **Expo SDK 52+**.
- **Roteamento**: **Expo Router** baseado em sistema de arquivos (`app/`).
- **Linguagem**: **TypeScript** em modo estrito.
- **Leitura Óptica**: Leitor nativo de códigos de barra e QR codes via câmera do dispositivo.
- **Design System**: Paridade total de tokens com a versão Web, utilizando os mesmos 3 temas (Dark, Slate, Light) e o catálogo de ícones vetoriais nativos [`GtcIcon`](file:///home/durillosud/PhpStormProjects/gtc-bundle/gtc-mobile/src/components/icons/GtcIcon.tsx).

---

## 2. Conectividade de Rede & Resolução DNS

Por operar em ambientes isolados (emuladores e redes celulares), a configuração da URL da API no arquivo `.env` do `gtc-mobile` deve observar o contexto:

### A. Emulador Android (Android Studio)
O emulador Android roda em uma rede interna própria. O host Docker/k3d é acessível através do IP virtual `10.0.2.2`:
```ini
# .env para Emulador Android
EXPO_PUBLIC_API_URL=http://10.0.2.2:80/api/v1
EXPO_PUBLIC_CASDOOR_URL=http://10.0.2.2:80
EXPO_PUBLIC_CLIENT_ID=gtc-mobile-client-id
```

### B. Simulador iOS (macOS / Xcode)
O simulador iOS compartilha a pilha de rede e o arquivo `/etc/hosts` da máquina host:
```ini
# .env para Simulador iOS
EXPO_PUBLIC_API_URL=http://api.gtc.local/api/v1
EXPO_PUBLIC_CASDOOR_URL=http://auth.gtc.local
EXPO_PUBLIC_CLIENT_ID=gtc-mobile-client-id
```

### C. Dispositivo Físico (Expo Go / Wi-Fi)
O smartphone e o computador de desenvolvimento devem estar conectados na **mesma rede Wi-Fi**:
```ini
# .env para Dispositivo Físico (substitua pelo IP do computador)
EXPO_PUBLIC_API_URL=http://192.168.1.150:80/api/v1
EXPO_PUBLIC_CASDOOR_URL=http://192.168.1.150:80
EXPO_PUBLIC_CLIENT_ID=gtc-mobile-client-id
```

---

## 3. Autenticação OIDC com Casdoor IAM & Deep Linking

### Fluxo de Autorização PKCE
O `gtc-mobile` utiliza o fluxo público **OAuth 2.0 com PKCE (Proof Key for Code Exchange)**, eliminando a necessidade de armazenar `client_secret` no aplicativo móvel:
1. O aplicativo gera um `code_verifier` e um `code_challenge` criptográfico.
2. Abre o navegador do sistema (via `WebBrowser.openAuthSessionAsync`) apontando para o Casdoor com o tema visual customizado do Gnuteca-NG.
3. O usuário realiza o login no formulário padronizado do Casdoor.

### Configuração de Deep Link (`gtc://`)
Após a autenticação, o Casdoor redireciona o usuário para o esquema customizado:
```text
gtc://auth/callback?code=AUTH_CODE&state=STATE
```
O Expo Router captura automaticamente esse deep link através do arquivo `app/auth/callback.tsx` e conclui a troca do código pelo token de sessão.

### Armazenamento Seguro de Sessão (SecureStore)
- O aplicativo móvel nunca armazena credenciais em `AsyncStorage` comum (não criptografado).
- Os tokens de sessão e identificadores são gravados no chaveiro criptografado do sistema operacional (`expo-secure-store` / Android Keystore / iOS Keychain), simulando um *Secure Cookie Jar* nativo.

---

## 4. Execução em Modo de Desenvolvimento

```bash
# Opção 1: Via script de orquestração do bundle
./gtc.sh up gtc-mobile

# Opção 2: Nativamente no diretório do projeto
cd gtc-mobile
npm install
npm run start
```

No terminal do Metro Bundler:
- Pressione **`a`** para abrir no emulador Android conectado.
- Pressione **`i`** para abrir no simulador iOS (macOS).
- Escaneie o **QR Code** no aplicativo **Expo Go** em um celular físico Android ou iOS.

---

## 5. Módulo de Scanner e Balcão Móvel de Circulação

O aplicativo dispõe de câmera nativa de alta precisão configurada para os padrões bibliográficos:
- Suporte a códigos de barras **Code 39**, **Code 128**, **EAN-13** (etiquetas de tombos físicos e carteirinhas de leitores).
- Suporte a **QR Codes** (empréstimo rápido e identificadores digitais).
- Operações de campo suportadas:
  - **Empréstimo Volante**: Escaneia a carteirinha do leitor e o tombo do livro em sequência.
  - **Devolução Expressa**: Leitura consecutiva de tombos para baixa instantânea.
  - **Inventário de Estante**: Varredura rápida de livros na prateleira para detecção de extravios ou erros de ordenação.

---

## 6. Geração de Builds de Produção (APK / AAB)

### A. Compilação Local Standalone
Requer Android Studio e Android SDK (API 34+) instalados:
```bash
cd gtc-mobile

# Pré-compilar diretório nativo /android:
npx expo prebuild

# Gerar arquivo APK de release:
cd android
./gradlew assembleRelease
```
O executável final estará disponível em `android/app/build/outputs/apk/release/app-release.apk`.

### B. Compilação em Nuvem via EAS Build
Caso não possua o ambiente nativo configurado na máquina de desenvolvimento:
```bash
# 1. Instalar CLI do EAS:
npm install -g eas-cli

# 2. Autenticar no Expo:
eas login

# 3. Gerar APK para Android na nuvem:
eas build --platform android --profile preview

# 4. Gerar pacote para Google Play Store (AAB):
eas build --platform android --profile production
```

---

## 7. Testes, Linting & Validação de Tipos

```bash
# Executar suíte de testes unitários com Jest:
npm test

# Validação estrita do compilador TypeScript:
npm run typecheck

# Verificação de formatação e boas práticas:
npm run lint
```
