---
description: Regras de integração HTTP e consumo do BFF para gtc-mobile
trigger:
  glob: "src/services/**"
---

# Regras de Serviços e APIs: Axios & BFF

Estas regras aplicam-se a serviços e clientes de rede sob `src/services/`.

## 1. Conexão e Credenciais
- O cliente Axios deve manter `withCredentials: true` para garantir que o cookie jar nativo do iOS/Android envie os cookies de sessão (`SID_ACC`, `SID_REF`) automaticamente.
- Respeitar a configuração de `EXPO_PUBLIC_API_URL` para suporte a simuladores, emuladores (`10.0.2.2`) e dispositivos físicos.

## 2. Tipagem de Resposta
- Todas as chamadas de API devem possuir DTOs e interfaces TypeScript tipando estritamente os payloads de envio e retorno.
- Tratar erros HTTP conforme o padrão Problem Details (RFC 7807) retornado pelo backend.
