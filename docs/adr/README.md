# ADRs — Architecture Decision Records

Cada pasta renumera a partir de `001`. O número só é único **dentro** da pasta.

## Compartilhado (`adr/`)

| ADR | Decisão | Status |
|-----|---------|--------|
| [001](./001-use-monorepo-turborepo.md) | Monorepo com pnpm + Turborepo | Aceito |

## Backend (`adr/backend/`)

| ADR | Decisão | Status |
|-----|---------|--------|
| [001](./backend/001-use-fastify.md) | Fastify como framework HTTP | Aceito |
| [002](./backend/002-composition-root-per-module.md) | Composition root por módulo | Aceito |
| [003](./backend/003-use-prisma.md) | Prisma como acesso a dados / ORM | Aceito |
| [004](./backend/004-use-postgresql.md) | PostgreSQL como banco de dados | Aceito |
| [005](./backend/005-use-docker.md) | Docker Compose para infra local | Aceito |
| [006](./backend/006-auth-jwt-refresh.md) | Auth JWT + refresh opaco | Aceito |

## Frontend (`adr/frontend/`)

| ADR | Decisão | Status |
|-----|---------|--------|
| [001](./frontend/001-use-tanstack-query.md) | TanStack Query para server state | Aceito |
| [002](./frontend/002-use-shadcn.md) | shadcn/ui como base de componentes | Aceito |
