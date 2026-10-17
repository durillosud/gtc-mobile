---
name: git-commit-message-expert
description: Expert in creating highly informative, structured Git commit messages in Brazilian Portuguese based on staged diff outputs, following the commit-message-prompt guidelines.
---

# SKILL: Git Commit Message Expert

## Purpose

This skill provides a rigorous framework and standard for creating professional, highly informative, and structured Git commit messages in Brazilian Portuguese (pt_BR) based on `prompts/commit_message_prompt.md` and the `commit-message-ai-prompt-tip.sh` script execution. It ensures that every commit carries clear overview information, per-file modifications, considerations, impacts, versioning tips, and discovered issues.

---

## 1. Commit Message Structure

Every commit message generated must strictly follow this structure:

```
[Title in Imperative Mood]

📝 Visão geral
  - Breve descrição das alterações principais (1-2 linhas)

🛠️ Mudanças por arquivo
  - Lista de modificações importantes (agrupadas por tipo/componente)
  - Foco em O QUE mudou, não em como

⚠️ Considerações
  - Quaisquer potenciais impactos, riscos ou melhorias adicionais necessárias
  - Ações de acompanhamento requeridas

🌟 Impacto
  - Benefícios e melhorias resultantes destas mudanças

📎Só uma Pequena Dica
  - Sugestões de refatoração para melhorar desempenho, legibilidade, concisão ou eficiência do código analisado

💩 Problemas Encontrados
  - Se houver problemas identificados no contexto do diff, descreva-os aqui juntamente com as correções
```

---

## 2. Commit Rules

- **Language**: Use Portuguese (pt_BR) for the title, overview, descriptions, and all sections.
- **Tense**: Present tense ("Adiciona funcionalidade" instead of "Adicionado funcionalidade").
- **Line Length**: Limit message titles and bullet points to ≤ 120 characters.
- **Conciseness**: Keep descriptions brief, clear, and context-focused.
- **Task Number**: If possible, retrieve the task/issue number from the branch name and append it to the commit title in parentheses (e.g., `(issue-123)`).

---

## 3. Post-Plan Execution Tip

After planning and making modifications, run `commit-message-ai-prompt-tip.sh` to generate the file `commit-message-tip.txt` which accumulates the diff and current branch info. Use this file's contents to generate the final commit message following this skill.
