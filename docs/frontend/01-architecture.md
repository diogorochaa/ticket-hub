# TicketHub — Arquitetura do frontend

## Visão geral

O web em `apps/web` é uma SPA com **React 19**, **Vite**, **React Router**, **TanStack Query**, **Tailwind CSS** e **shadcn/ui**.

```
UI (pages / components)
  ↓
TanStack Query (cache / server state)
  ↓
services (fetch HTTP → API Fastify)
  ↓
apps/api
```

## Estrutura

```
apps/web/src/
  app/              provider(s), layout da app
  pages/            rotas / telas
  components/       componentes de produto
    ui/             componentes shadcn
  hooks/            hooks da aplicação
  services/         clients HTTP da API
  shared/           helpers compartilhados
  lib/              utilitários (ex.: cn)
  index.css         Tailwind + tokens shadcn
```

Alias `@/*` → `src/*` (TypeScript + Vite). Componentes shadcn ficam em `src/components/ui`.

## Data fetching — TanStack Query

Estado de servidor (listas de eventos, usuário logado, reservas) fica no **TanStack Query**, não em estado local genérico.

Motivos: ver [ADR 001](../adr/frontend/001-use-tanstack-query.md).

Padrão esperado:

- `services/` encapsula `fetch` / client HTTP
- hooks `useQuery` / `useMutation` por caso de uso da tela
- cache invalidado após mutações (criar usuário, reservar ingresso, etc.)

Formulários usam **React Hook Form** + **Zod** (alinhado à validação da API).

## UI — shadcn/ui

Componentes acessíveis e customizáveis via Tailwind, gerados no próprio repositório (`src/components/ui`).

Motivos: ver [ADR 002](../adr/frontend/002-use-shadcn.md).

```sh
cd apps/web
pnpm dlx shadcn@latest add button
```

## Autenticação (cliente)

- Access token JWT em memória (ou storage curto) + refresh via `POST /auth/refresh`
- Requests autenticados: header `Authorization: Bearer <accessToken>`
- Detalhes do fluxo no backend: [../backend/03-auth-module.md](../backend/03-auth-module.md)

## Relação com o monorepo

- Pacotes compartilhados futuros podem ir em `packages/ui`
- Por enquanto a UI do produto vive em `apps/web`
- Domínio de negócio e regras pesadas permanecem na API

## Referências

- [ADR 001 - TanStack Query](../adr/frontend/001-use-tanstack-query.md)
- [ADR 002 - shadcn/ui](../adr/frontend/002-use-shadcn.md)
- [ADR 001 - Monorepo](../adr/001-use-monorepo-turborepo.md)
- [Arquitetura da API](../backend/01-architecture.md)
