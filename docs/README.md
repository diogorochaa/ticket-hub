# Documentação — TicketHub

Índice da documentação do monorepo.

## Visão geral

| Documento | Conteúdo |
|-----------|----------|
| [01-domain.md](./01-domain.md) | Domínio, atores e regras de negócio |
| [diagrams/](./diagrams/) | Diagramas Excalidraw (atual e futuro) |
| [adr/](./adr/) | Decisões de arquitetura (backend, frontend e compartilhado) |

## Backend (`apps/api`)

| Documento | Conteúdo |
|-----------|----------|
| [backend/01-architecture.md](./backend/01-architecture.md) | Arquitetura hexagonal e composição de módulos |
| [backend/02-users-module.md](./backend/02-users-module.md) | Módulo de usuários (endpoints) |
| [backend/03-auth-module.md](./backend/03-auth-module.md) | Auth (register/login/refresh) + e-mail |
| [backend/04-scale-100k.md](./backend/04-scale-100k.md) | Escala 100k (Redis, Rabbit, LB) |
| [adr/backend/](./adr/backend/) | ADRs do backend |

## Frontend (`apps/web`)

| Documento | Conteúdo |
|-----------|----------|
| [frontend/README.md](./frontend/README.md) | Índice do frontend |
| [frontend/01-architecture.md](./frontend/01-architecture.md) | Stack, pastas, data fetching, UI |
| [frontend/02-components.md](./frontend/02-components.md) | Header/Footer autocontidos |
| [adr/frontend/](./adr/frontend/) | ADRs (Query, shadcn, compounds) |
