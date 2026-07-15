# Frontend — TicketHub Web

Documentação do app em `apps/web` (React + Vite).

| Documento | Conteúdo |
|-----------|----------|
| [01-architecture.md](./01-architecture.md) | Stack, pastas, data fetching, UI |
| [02-components.md](./02-components.md) | Header/Footer autocontidos, nav tipada |

## ADRs

| ADR | Decisão |
|-----|---------|
| [001 — TanStack Query](../adr/frontend/001-use-tanstack-query.md) | Server state |
| [002 — shadcn/ui](../adr/frontend/002-use-shadcn.md) | Base de componentes |
| [003 — Composition interna](../adr/frontend/003-use-compound-components.md) | Layout fatiado, page enxuta |

## Comandos

```sh
# na raiz do monorepo
pnpm --filter web dev
pnpm --filter web build
pnpm --filter web lint
```
