# Diretrizes de Desenvolvimento: Gtc Mobile

Este documento fornece as diretrizes fundamentais de arquitetura, execução e governança para agentes e desenvolvedores no projeto **`gtc-mobile`**.

---

## 🧭 Protocolo Obrigatório de Sessão

Ao iniciar qualquer tarefa de implementação, leia `@docs/PLAN.md` para identificar a etapa atual. Ao concluir uma tarefa e validar nos testes, atualize o status em `@docs/PLAN.md` antes de encerrar.

Para aprofundamento técnico, arquitetura de componentes e contratos de API, consulte `@docs/SPEC.md`.

---

## 🗺️ 1. Arquitetura e Stack Tecnológica

O **`gtc-mobile`** é o aplicativo móvel multiplataforma oficial do ecossistema Gnuteca-NG:

- **Framework**: React Native com Expo (SDK 51/52+).
- **Roteamento**: Expo Router baseado no sistema de arquivos (`src/app/`).
- **Linguagem**: TypeScript com modo estrito obrigatório (`strict: true`).
- **Estilização**: React Native `StyleSheet` combinado com tokens de tema customizados.
- **Formulários**: React Hook Form integrado a schemas de validação Zod.
- **Comunicação**: Axios configurado com suporte a cookies nativos (`withCredentials: true`) conectado ao BFF do Gnuteca-NG.
- **Design System**: Ícones vetoriais SVG exclusivos via `GtcIcon` e alternância dinâmica de 3 temas (`GtcTheme`).

---

## ⚡ 2. Comandos Essenciais

Todos os comandos devem ser executados na raiz do projeto `gtc-mobile`:

```bash
# Iniciar o servidor Metro Bundler para desenvolvimento:
npm run start

# Executar emulando Android:
npm run android

# Executar emulando iOS (apenas macOS):
npm run ios

# Executar em modo Web (preview rápido):
npm run web

# Executar checagem estática de tipos TypeScript:
npx tsc --noEmit

# Executar linter ESLint:
npm run lint
```

---

## 🚫 3. Invariantes do Projeto (O que NUNCA Fazer)

1. **PROIBIDO armazenar tokens JWT manualmente no AsyncStorage/SecureStore**: A autenticação é gerenciada estritamente via cookies HttpOnly pelo cookie jar nativo do sistema operacional.
2. **PROIBIDO usar ícones genéricos externos ou emojis**: Todos os ícones da aplicação DEVEM utilizar exclusivamente o componente `GtcIcon`.
3. **PROIBIDO quebrar a responsividade entre temas**: Novos componentes devem obrigatoriamente suportar as 3 paletas (Dark, Slate, Light) via `useTheme()`.
4. **PROIBIDO usar `any` implícito em código TypeScript**: Todas as props de componentes, respostas de API e estados devem ter tipos explicitamente declarados.
5. **PROIBIDO usar navegação imperativa tradicional fora do padrão Expo Router**: Utilize os hooks `useRouter()` e componentes `<Link>` do `expo-router`.

---

## 📦 4. Contexto Específico e Regras Modulares

Diretrizes granulares com triggers automáticos estão sob `.agents/rules/`:
- Telas e Navegação: `.agents/rules/screens-navigation.md`
- Componentes e UI: `.agents/rules/mobile-components.md`
- Serviços e APIs: `.agents/rules/services-api.md`

Habilidades procedurais sob demanda estão catalogadas em `.agents/skills/`.
