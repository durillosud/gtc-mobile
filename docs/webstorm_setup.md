# Execução do Ambiente de Desenvolvimento no WebStorm

Este guia detalha como executar o ambiente de desenvolvimento do **`gtc-mobile`** diretamente pela IDE **WebStorm** da JetBrains.

---

## Método 1: Integração com Docker (Recomendado)

Como o projeto já possui uma infraestrutura dockerizada completa integrada com o Traefik, este é o método mais limpo:

1. Abra o WebStorm.
2. No painel de navegação de arquivos, acesse: [gtc-mobile/docker/app/docker-compose.yml](file:///home/durillosud/PhpStormProjects/gtc-bundle/gtc-mobile/docker/app/docker-compose.yml).
3. No lado esquerdo do arquivo (na margem da linha), clique no ícone de **seta dupla verde** (Play) localizado próximo à linha da definição `services:`.
4. Selecione **Run 'gtc-mobile/docker/app...'**.
5. O WebStorm iniciará o contêiner e abrirá a aba **Services** no rodapé, exibindo o log de execução em tempo real e os links do Metro Bundler.

---

## Método 2: Run Configuration do npm (Execução Nativa no Host)

Se você preferir executar o Metro Bundler diretamente na sua máquina local (fora do Docker):

1. No menu superior do WebStorm, clique em **Run** -> **Edit Configurations...**.
2. Clique no ícone de **+** (Add New Configuration) no canto superior esquerdo e selecione **npm**.
3. Configure os seguintes campos:
   * **Name**: `Mobile - Dev Server`
   * **Package.json**: Escolha o arquivo [package.json](file:///home/durillosud/PhpStormProjects/gtc-bundle/gtc-mobile/package.json) do projeto `gtc-mobile`.
   * **Command**: `run`
   * **Scripts**: `start`
4. Clique em **Apply** e depois em **OK**.
5. Agora, basta selecionar a configuração `Mobile - Dev Server` na barra superior direita do WebStorm e clicar no botão **Play** (ou usar o atalho `Shift + F10`).

---

## Método 3: Terminal Embutido

Você também pode utilizar o painel de terminal integrado do próprio WebStorm:

1. Abra o **Terminal** do WebStorm (geralmente localizado no canto inferior esquerdo ou através do atalho `Alt + F12`).
2. Navegue até a pasta do projeto móvel:
   ```bash
   cd gtc-mobile
   ```
3. Execute o comando:
   ```bash
   npm run start
   ```
4. O Metro Bundler iniciará no terminal, exibindo o QR Code para leitura no aplicativo **Expo Go** no celular ou permitindo abrir os emuladores digitando as teclas de atalho correspondentes (`a` para Android, `i` para iOS, `w` para Web).
