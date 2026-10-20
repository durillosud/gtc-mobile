---
name: professional-readme-generator
description: >-
  Specialized skill for analyzing, generating, and updating production-grade, professional, and visually engaging README.md documentation across all projects in the Gnuteca ecosystem (gnuteca-ng, gtc-web, gtc-mobile, gnuteca, and gtc-bundle).
---

# SKILL: Professional README Generator (Gnuteca Ecosystem)

## Purpose

This skill establishes the definitive engineering guidelines, structure, and quality standards for creating and maintaining comprehensive, professional, and developer-friendly `README.md` documentation across the four core repositories and the umbrella bundle of the Gnuteca ecosystem.

---

## 📐 1. Canonical README Architecture

Every generated `README.md` must strictly follow a consistent, well-structured layout composed of the following sections:

```markdown
# 🏛️ [Project Name] - [Concise Catchy Subtitle]

[Badges row: Tech Stack, Architecture, Status, License, CI/Tests]

> [High-level one-sentence summary of the repository's role in the Gnuteca ecosystem]

---

## 📑 Tabela de Conteúdos (Table of Contents)
- [Visão Geral & Contexto](#-visão-geral--contexto)
- [Arquitetura & Fluxo de Dados](#-arquitetura--fluxo-de-dados)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Stack Tecnológica & Pré-requisitos](#-stack-tecnológica--pré-requisitos)
- [Guia de Início Rápido (Quickstart)](#-guia-de-início-rápido-quickstart)
- [Estrutura de Diretórios](#-estrutura-de-diretórios)
- [Qualidade de Código & Testes](#-qualidade-de-código--testes)
- [Contratos de API & Integração](#-contratos-de-api--integração)
- [Padrões de Commit & Governança](#-padrões-de-commit--governança)
- [Licença](#-licença)

---

## 🌐 Visão Geral & Contexto
- Explanation of what the project does and where it fits in the Gnuteca ecosystem.
- Inter-repo dependencies (how it interacts with gnuteca-ng, gtc-web, gtc-mobile, gnuteca).

---

## 🏛️ Arquitetura & Fluxo de Dados
- Architectural pattern (DDD / Hexagonal, BFF client, React Native Expo, Legacy Miolo).
- Mermaid diagram illustrating layers, component interactions, or request lifecycles.

---

## ✨ Principais Funcionalidades
- Detailed breakdown of implemented modules, domain features, and user-facing capabilities.

---

## 🛠️ Stack Tecnológica & Pré-requisitos
- Exact language, framework, database, and tooling versions.

---

## 🚀 Guia de Início Rápido (Quickstart)
- Step-by-step setup instructions (via gtc.sh orchestration or standalone docker/npm).
- Environment variables and configuration files (.env).

---

## 📁 Estrutura de Diretórios
- Annotated ASCII tree highlighting key packages, layers, components, or screens.

---

## 🧪 Qualidade de Código & Testes
- Exact commands for unit, integration, and architecture tests (PHPUnit, Deptrac, tsc, ESLint).

---

## 🔒 Contratos de API & Integração
- Authentication mechanism (HttpOnly cookies SID_ACC/SID_REF, BFF, zero-token policy).
- OpenAPI/Swagger, RFC 9205 RESTful endpoints, RFC 7807 problem details.

---

## 📜 Padrões de Commit & Governança
- Commit message standards (emojis, imperative mood, Conventional Commits).
- Invariants and non-negotiable rules.

---

## 📄 Licença
- Licensing information and institutional credits.
```

---

## 🎯 2. Specialized Project Profiles

When generating a README for a specific subproject, adhere to its specialized profile:

### Profile A: Backend (`gnuteca-ng`)
- **Key Concepts**: PHP 8.5+, Swoole HTTP Server (asynchronous coroutines, worker connection pools, persistent memory), Slim Framework 4, PHP-DI 7, Doctrine ORM 3.
- **Architectural Tenets**: Domain-Driven Design (DDD), Clean/Hexagonal Architecture (Domain, Application, Infrastructure, Shared Kernel), Deptrac verification.
- **Infrastructure**: PostgreSQL 16+ (Patroni HA + HAProxy + etcd), Redis Sentinel, RabbitMQ with resilient task workers and 10 persistent channels, Meilisearch catalog indexer, Traefik reverse proxy.
- **Security & BFF**: Zero-token client policy, `SID_ACC` and `SID_REF` HttpOnly cookies, ReBAC permissions.

### Profile B: Frontend Web (`gtc-web`)
- **Key Concepts**: Next.js 14+ (App Router), React 19, TypeScript strict mode, Tailwind CSS v4 with CSS variables.
- **Design System**: Strict vector SVG catalog via `GtcIcon`, 3 dynamic themes (`Dark`, `Slate`, `Light`) via `ThemeContext`.
- **Route Segregation**: Route Groups `(opac)` for public catalog discovery and `(admin)` for authenticated library staff (Cataloging, Circulation, Fines, Patrons, Reports).
- **Security**: BFF cookie translation, Next.js middleware session renewal and route guarding.

### Profile C: Frontend Mobile (`gtc-mobile`)
- **Key Concepts**: React Native, Expo (SDK 51+), Expo Router file-based navigation, TypeScript strict mode.
- **Key Features**: Native barcode & QR code camera scanning (`expo-camera`) for ISBN, item tombo, and reader badges; mobile circulation counter; offline queue.
- **Design System Parity**: 100% parity with `gtc-web` via `GtcIcon` and identical 3 visual themes.
- **Security**: Native OS HTTP cookie jar integration with BFF.

### Profile D: Legacy & Migration (`gnuteca`)
- **Key Concepts**: Miolo Framework, PHP 5.6, legacy PostgreSQL database schema.
- **Current Status**: **Feature-frozen (Read-Only)**.
- **Role**: Historical reference, business rule reverse engineering, legacy data homologation, and automated ETL extraction scripts.
- **Invariants**: Strictly no new business logic, no PL/pgSQL triggers, no schema mutations.

### Profile E: Umbrella Bundle (`gtc-bundle`)
- **Key Concepts**: Orchestration script `gtc.sh`, shared Docker bridge network `app_bridge`, Traefik reverse proxy domain mapping (`gtc-web.local`, `gnuteca-ng.local`).
- **Commands**: `./gtc.sh up all`, `./gtc.sh update all`, `./gtc.sh status`, `./gtc.sh logs <service>`.

---

## ✅ 3. Quality & Formatting Checklist

Before finalizing any `README.md`:
1. Use professional GitHub Flavored Markdown (GFM) with alerts (`> [!NOTE]`, `> [!IMPORTANT]`, `> [!TIP]`).
2. Include at least one valid, syntax-checked Mermaid diagram per repository.
3. Ensure all file paths and command snippets are accurate and tested.
4. Guarantee that technical versions match the actual repository configs (`composer.json`, `package.json`, `docker-compose.yml`).
5. Write in clear, idiomatic Brazilian Portuguese (`pt-BR`) as required by project governance.
