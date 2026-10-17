# Template de Planejamento e Contexto Persistente para Antigravity (agy)

Este documento contém o prompt padronizado para estruturar e manter o contexto persistente, a arquitetura e o planejamento de projetos no framework Antigravity (`agy`), visando a máxima economia da janela de contexto de tokens e continuidade contínua entre sessões.

---

```markdown
Atue como Arquiteto de Software e configure a estrutura de contexto persistente e planejamento deste projeto para o Antigravity (agy), visando máxima economia de tokens e continuidade entre sessões.

Analise o repositório atual (ou considere as especificações que passarei a seguir) e crie os seguintes arquivos:

1. `AGENTS.md` (na raiz, sem YAML frontmatter, máximo de 150 linhas):
   - Visão geral enxuta da arquitetura, stack tecnológica e padrões de projeto.
   - Comandos exatos de build, lint, testes e execução local.
   - Invariantes do projeto (o que NUNCA fazer).
   - Ponteiros usando a sintaxe `@caminho/do/arquivo` (sem inline `[]` para não inflar o prompt inicial) apontando para `docs/SPEC.md` e `docs/PLAN.md`.
   - Instrução explícita de protocolo: "Ao iniciar qualquer tarefa de implementação, leia `@docs/PLAN.md` para identificar a etapa atual. Ao concluir uma tarefa e validar nos testes, atualize o status em `@docs/PLAN.md` antes de encerrar."

2. `docs/SPEC.md`:
   - Especificação técnica detalhada, modelagem de dados, contratos de API/eventos e decisões arquiteturais.

3. `docs/PLAN.md`:
   - Roadmap executável dividido em Épicos e Tarefas granulares com checkboxes (`- [ ]`).
   - Seção "Estado Atual & Próximo Passo" no topo do arquivo, indicando exatamente onde o desenvolvimento parou e qual o contexto imediato.
   - Seção "Registro de Decisões (ADR curto)" para evitar rediscutir escolhas já tomadas.

4. `.agents/rules/` (Regras modulares com YAML frontmatter):
   - Crie regras específicas por domínio/camada (ex: `backend.md`, `database.md`, `tests.md`) usando o frontmatter `trigger` apropriado (ou escopo por diretório) para que só sejam carregadas quando você editar arquivos daquelas pastas.

Antes de escrever os arquivos, apresente um resumo da estrutura que você identificou e aguarde minha confirmação.
```
