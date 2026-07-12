# Guia de Execução e Compilação do App Móvel (gtc-mobile)

Este guia orienta como executar e compilar o aplicativo móvel **`gtc-mobile`** utilizando o ecossistema do **Expo**.

---

## 1. Conectando o App ao Backend (DNS & Rede)

Como o aplicativo precisa se comunicar com o BFF do Swoole (`gnuteca-ng.local`), a configuração da variável de rede no arquivo `.env` do `gtc-mobile` é crucial:

*   **Caso A: Simulador de iOS (macOS)**
    *   O simulador compartilha o DNS da máquina host. Logo, você pode manter `EXPO_PUBLIC_API_URL=http://gnuteca-ng.local/api/v1` no seu `.env`.
*   **Caso B: Emulador de Android (Android Studio)**
    *   O emulador roda em uma rede isolada. Para acessar a máquina host (onde o Traefik e o Swoole estão rodando), use o IP de loopback especial do Android:
        `EXPO_PUBLIC_API_URL=http://10.0.2.2:80/api/v1`
*   **Caso C: Dispositivo Físico (Celular com Expo Go)**
    *   Seu celular e seu computador **devem estar conectados na mesma rede Wi-Fi**.
    *   No arquivo `.env`, altere o endereço para o IP local do seu computador na rede (ex: `192.168.1.X`):
        `EXPO_PUBLIC_API_URL=http://192.168.1.X:80/api/v1`

---

## 2. Executando via Expo Go (Mais Rápido / Sem Setup Nativo)

O **Expo Go** é um aplicativo cliente que carrega o bundle Javascript do seu projeto instantaneamente sem precisar compilar código nativo (Java/Kotlin/Swift) na sua máquina.

1.  Instale o aplicativo **Expo Go** no seu celular físico (disponível na Play Store e App Store).
2.  Inicie o servidor Metro Bundler:
    *   **Pelo Docker (Recomendado)**:
        ```bash
        docker compose -f gtc-mobile/docker/app/docker-compose.yml up -d
        ```
    *   **Nativamente no Host**:
        ```bash
        cd gtc-mobile
        npm run start
        ```
3.  Abra o Metro Bundler:
    *   Se rodou pelo host, um **QR Code** aparecerá no terminal.
    *   Se rodou pelo Docker, você pode visualizar abrindo a interface do Traefik ou acessando o log do contêiner (`docker logs 00-gtc-mobile`).
4.  Escaneie o QR Code:
    *   **No Android**: Abra o app *Expo Go* e toque em "Scan QR Code".
    *   **No iOS**: Abra o aplicativo padrão da *Câmera* do celular e aponte para o QR Code.
5.  O app baixará os arquivos Javascript e executará em tempo real. Qualquer alteração no código será atualizada instantaneamente (Hot Reload)!

---

## 3. Executando em Emuladores Locais

Se você possui o Android Studio ou o Xcode configurados no seu computador, pode rodar o app no computador:

1.  Inicie o emulador (iOS Simulator ou Android AVD) na sua máquina.
2.  No terminal onde o Metro Bundler está rodando, pressione as teclas de atalho:
    *   Pressione **`a`** para abrir o app no emulador do **Android**.
    *   Pressione **`i`** para abrir o app no simulador do **iOS** (disponível apenas em macOS).
3.  O Metro instalará o cliente do Expo no emulador automaticamente e abrirá o projeto.

---

## 4. Gerando Builds de Desenvolvimento (Standalone Nativo)

Se no futuro você precisar adicionar módulos nativos customizados que não estão inclusos por padrão no Expo Go, ou quiser gerar um arquivo `.apk` (Android) ou `.ipa` (iOS) standalone para instalação:

### Opção A: Compilação Local (Requer SDK do Android / Xcode instalados)
Para gerar e rodar a versão nativa compilada localmente na sua máquina:
```bash
cd gtc-mobile
# Para Android
npx expo run:android

# Para iOS (apenas macOS)
npx expo run:ios
```
Estes comandos criam a pasta nativa `/android` ou `/ios` e compilam o aplicativo gerando o executável binário final.

### Opção B: EAS Build (Compilação na Nuvem do Expo)
Se você não tem o Android SDK ou Xcode configurados localmente, pode utilizar o serviço gratuito de nuvem do Expo:
1.  Instale o CLI do EAS globalmente:
    ```bash
    npm install -g eas-cli
    ```
2.  Efetue login na sua conta do Expo:
    ```bash
    eas login
    ```
3.  Configure o projeto para build:
    ```bash
    eas build:configure
    ```
4.  Gere o build na nuvem (exemplo para Android gerando um APK de desenvolvimento):
    ```bash
    eas build --platform android --profile development
    ```
5.  O Expo gerará o arquivo e fornecerá um link de download direto do arquivo APK para você instalar no celular ou emulador.
