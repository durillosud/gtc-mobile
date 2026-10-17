# Plano de Desenvolvimento & Roadmap Executável: Gtc Mobile

Este documento é a fonte canônica para o estado atual, decisões de projeto e tarefas de desenvolvimento do aplicativo móvel **`gtc-mobile`**.

---

## 📌 Estado Atual & Próximo Passo

### Estado Atual (Onde o desenvolvimento parou)
- **Autenticação & Sessão BFF**:
  - Cliente Axios (`src/services/api.ts`) configurado com `withCredentials: true` e suporte à resolução de IP local/emulador.
  - Contexto de Autenticação (`src/contexts/AuthContext.tsx`) gerenciando estado em memória e validação na inicialização.
  - Tela de Login (`src/app/login.tsx`) implementada com React Hook Form e validações Zod.
  - Redirecionamento condicional no Layout Raiz (`src/app/_layout.tsx`).
- **Design System Móvel**:
  - Componente [`GtcIcon`](file:///home/durillosud/PhpStormProjects/gtc-bundle/gtc-mobile/src/components/icons/GtcIcon.tsx) operando com catálogo vetorial SVG nativo.
  - Suporte a 3 paletas visuais via `ThemeContext` e hook `useTheme()`.

### Próximo Passo Imediato
> **Foco: Épico 2 - Balcão Móvel de Circulação & Leitor de Código de Barras**
> 1. Implementar a tela dedicada de Scanner de Código de Barras (`src/app/scanner.tsx`) utilizando `expo-camera` para captura rápida de códigos de livros (ISBN/exemplar) e carteirinhas de leitor.
> 2. Construir fluxo de Empréstimo Rápido e Devolução integrado aos endpoints de Circulação do Gnuteca-NG.
> 3. Implementar feedback sonoro e tátil (haptic feedback) em leituras bem-sucedidas.

---

## 🏛️ Registro de Decisões Arquiteturais (ADRs Curtos)

* **ADR-001 (Expo Router)**: Utilização do Expo Router baseado em arquivos (`src/app/`) para navegação consistente entre telas, layouts aninhados e deep linking simplificado.
* **ADR-002 (BFF Session Cookie Store Nativo)**: Rejeitado o armazenamento manual de JWT em `AsyncStorage`. A sessão é mantida exclusivamente através de cookies HttpOnly gerenciados pelo networking nativo (`NSURLSession` / `OkHttpClient`).
* **ADR-003 (Design System GtcIcon e GtcTheme)**: Proibição de bibliotecas de ícones externas. Unificação do catálogo visual com o frontend web através de SVGs nativos e tokens compartilhados.

---

## 🗺️ Roadmap Executável

### Épico 1: Autenticação e Sessão BFF
- [x] Configuração do cliente Axios com `withCredentials: true`.
- [x] Criação do `AuthContext` e tipagem do perfil de usuário.
- [x] Tela de Login com formulário Zod e tratamento de erro de credenciais.
- [x] Proteção de rotas no layout raiz com verificação de sessão ativa.
- [ ] Implementação de logout com invalidação de cookies no BFF.

### Épico 2: Balcão Móvel de Circulação & Scanner
- [ ] Integração com `expo-camera` para escaneamento de códigos de barras (Code 128 / EAN-13 / QR Code).
- [ ] Tela de consulta rápida de exemplar por leitor de código de barras.
- [ ] Fluxo de empréstimo móvel: associação Leitor + Exemplar.
- [ ] Fluxo de devolução móvel rápida com baixa instantânea no acervo.
- [ ] Modo offline com fila local para sincronização posterior em áreas de biblioteca sem sinal de rede.

### Épico 3: Consulta ao Acervo e Serviços do Leitor
- [ ] Tela de busca bibliográfica no catálogo do Gnuteca-NG.
- [ ] Visualização detalhada de obras (capa, título, autor, status de disponibilidade por unidade).
- [ ] Tela "Meus Empréstimos" com listagem de prazos e botão de renovação em 1 clique.
- [ ] Notificações locais de alerta para devoluções próximas ao vencimento.

### Épico 4: Experiência do Usuário e Refinamentos
- [x] Implementação de suporte aos 3 temas (Dark, Slate, Light).
- [ ] Configuração de splash screen nativa e ícones adaptativos do aplicativo.
- [ ] Testes de usabilidade e responsividade em diferentes proporções de tela.
