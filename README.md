# TicketHub

Plataforma para venda de ingressos de eventos.

Monorepo com pnpm + Turborepo — ver [ADR 001](docs/adr/001-use-monorepo-turborepo.md). A API segue Arquitetura Hexagonal; o web usa React + Vite + TanStack Query + shadcn/ui.

## Estrutura

```
apps/
  api/     API HTTP (Fastify + Prisma + PostgreSQL)
  web/     Frontend (React + Vite + TanStack Query + shadcn)
  docs/    App de documentação (Next.js)
packages/
  ui/                 Componentes compartilhados
  eslint-config/      Configurações ESLint
  typescript-config/  Configurações TypeScript
docker/               Infra local (PostgreSQL, Mailpit)
docs/                 Domínio, backend, frontend e ADRs
```

## Pré-requisitos

- Node.js >= 18
- pnpm 9
- Docker (PostgreSQL + Mailpit)

## Setup

```sh
pnpm install

# sobe o banco (+ Mailpit)
docker compose -f docker/docker-compose.yml up -d

# API: variáveis de ambiente
cp apps/api/.env.example apps/api/.env

# Prisma
cd apps/api
pnpm generate
pnpm migration
```

## Desenvolvimento

```sh
pnpm dev                      # turbo (api + web + …)
pnpm --filter api dev         # só a API → http://127.0.0.1:3000
pnpm --filter web dev         # só o web
```

## Documentação

Comece por [docs/README.md](docs/README.md).

| Área | Caminho |
|------|---------|
| Domínio | [docs/01-domain.md](docs/01-domain.md) |
| Backend | [docs/backend/](docs/backend/) |
| Frontend | [docs/frontend/](docs/frontend/) |
| ADRs | [docs/adr/](docs/adr/) (backend / frontend / monorepo) |
| Diagramas | [docs/diagrams/](docs/diagrams/) |

## Stack principal

- **API:** Node.js, Fastify, Zod, Prisma, PostgreSQL
- **Frontend:** React, Vite, TanStack Query, shadcn/ui, Tailwind
- **Monorepo:** pnpm, Turborepo
- **Infra local:** Docker
