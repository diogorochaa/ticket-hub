# TicketHub

Plataforma para venda de ingressos de eventos.

Monorepo com pnpm + Turborepo — ver [ADR 006](docs/adr/006-use-monorepo-turborepo.md). A API segue Arquitetura Hexagonal, com Fastify na camada de apresentação.

## Estrutura

```
apps/
  api/     API HTTP (Fastify + Prisma + PostgreSQL)
  web/     Frontend (React + Vite)
  docs/    App de documentação (Next.js)
packages/
  ui/                 Componentes compartilhados
  eslint-config/      Configurações ESLint
  typescript-config/  Configurações TypeScript
docker/               Infra local (PostgreSQL)
docs/                 Domínio, arquitetura e ADRs
```

## Pré-requisitos

- Node.js >= 18
- pnpm 9
- Docker (para o PostgreSQL)

## Setup

```sh
pnpm install

# sobe o banco
docker compose -f docker/docker-compose.yml up -d

# API: variáveis de ambiente
cp apps/api/.env.example apps/api/.env   # se existir; senão crie com DATABASE_URL

# Prisma
cd apps/api
pnpm generate
pnpm migration
```

Exemplo de `apps/api/.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
```

## Desenvolvimento

Na raiz:

```sh
pnpm dev
```

Somente a API:

```sh
pnpm --filter api dev
```

A API sobe em `http://127.0.0.1:3000`.

## Documentação

| Documento | Conteúdo |
|-----------|----------|
| [docs/01-domain.md](docs/01-domain.md) | Domínio, atores e regras de negócio |
| [docs/02-architecture.md](docs/02-architecture.md) | Arquitetura da API e composição de módulos |
| [docs/03-users-module.md](docs/03-users-module.md) | Módulo de usuários (endpoints) |
| [docs/04-auth-module.md](docs/04-auth-module.md) | Auth (register/login/refresh) + e-mail |
| [docs/adr/](docs/adr/) | Decisões de arquitetura (Fastify, DI, Prisma, PostgreSQL, Docker, monorepo, …) |
| [docs/diagrams/](docs/diagrams/) | Diagramas Excalidraw (atual e futuro) |

## Stack principal

- **API:** Node.js, Fastify, Zod, Prisma, PostgreSQL
- **Frontend:** React, Vite
- **Monorepo:** pnpm, Turborepo
- **Infra local:** Docker
