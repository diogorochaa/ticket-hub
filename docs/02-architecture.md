# TicketHub - Arquitetura da API

## Visão geral

A API em `apps/api` adota **Arquitetura Hexagonal** (ports & adapters).

O Fastify é apenas a porta de entrada HTTP. Regras de negócio ficam no domínio e nos use cases, sem acoplamento ao framework.

```
HTTP (Fastify)
    ↓
Controller
    ↓
Use Case
    ↓
Domain (Entity / VO / Repository port)
    ↓
Infrastructure (Prisma adapter)
```

## Organização por módulos

Cada módulo de negócio vive em `src/modules/<nome>` e concentra suas camadas:

```
modules/users/
  domain/           entidades, VOs, erros, ports
  application/      use cases e DTOs
  infra/            adapters (Prisma, mappers)
  presentation/     controllers, schemas Zod, routes
  users.module.ts   composition root do módulo
```

## Composition root

Não existe um `container.ts` central com todas as instâncias da aplicação.

A montagem de dependências é **explícita e por módulo**:

1. `server.ts` cria a app Fastify e passa deps compartilhadas (`prisma`, etc.).
2. `core/register-modules.ts` registra cada módulo.
3. `users.module.ts` (e futuros `*.module.ts`) instancia repository → use cases → controllers e registra as rotas.

```
server.ts
  → registerModules({ prisma })
      → registerUsersModule(...)
      → registerEventsModule(...)   # futuro
```

Deps compartilhadas ficam tipadas em `core/app-deps.ts`.

### Por que assim

- Escala sem um god-file de DI
- Mantém o grafo de dependências legível (útil em projeto de estudos / hexagonal)
- Evita acoplar a composição ao Fastify (`decorate`) ou a um container opaco
- Facilita testes: basta injetar fakes no `register*Module`

Libs de DI (tsyringe, inversify, Nest) ficam de fora por enquanto; ver [ADR 002](adr/002-composition-root-per-module.md).

## Camada HTTP

- Validação e tipagem com **Zod** via `fastify-type-provider-zod`
- Controllers traduzem erros de domínio em status HTTP
- Rotas não conhecem Prisma nem regras de negócio — só controllers

## Persistência

- **PostgreSQL** como banco principal — ver [ADR 004](./adr/004-use-postgresql.md)
- **Prisma** como ORM/acesso a dados na infra — ver [ADR 003](./adr/003-use-prisma.md)
- Prisma Client gerado em `apps/api/generated/prisma`
- Adapter `pg` (`@prisma/adapter-pg`)
- Repositórios implementam ports definidos no domínio (o domínio não importa Prisma)

Infra local dos serviços (Postgres hoje; Redis/Rabbit/etc. no futuro) sobe com **Docker Compose** — ver [ADR 005](./adr/005-use-docker.md).

## Como adicionar um módulo novo

1. Criar `src/modules/<nome>/` com domain / application / infra / presentation
2. Criar `<nome>.module.ts` com o wiring
3. Registrar em `core/register-modules.ts`
4. Documentar endpoints em `docs/`

## Diagramas

Abrir no [Excalidraw](https://excalidraw.com) (File → Open):

| Arquivo | Conteúdo |
|---------|----------|
| [diagrams/01-architecture-current.excalidraw](./diagrams/01-architecture-current.excalidraw) | Arquitetura atual do monorepo/API |
| [diagrams/02-architecture-future.excalidraw](./diagrams/02-architecture-future.excalidraw) | Alvo: LB, Redis, RabbitMQ, workers, anti-concorrência |
