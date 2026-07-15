# TicketHub Web (`apps/web`)

SPA do TicketHub: React 19 + Vite 8 + React Router 7 + Tailwind 4 + shadcn/ui.

Documentação canônica: **[docs/frontend/](../../docs/frontend/)**.

| Doc | Conteúdo |
|-----|----------|
| [Arquitetura](../../docs/frontend/01-architecture.md) | Stack e pastas |
| [Componentes](../../docs/frontend/02-components.md) | Header/Footer autocontidos |
| [ADRs](../../docs/adr/frontend/) | Decisões (Query, shadcn, compounds) |

## Scripts

```sh
pnpm --filter web dev      # Vite HMR
pnpm --filter web build    # tsc -b + vite build
pnpm --filter web lint     # oxlint
pnpm --filter web preview  # build preview
```

## Alias

`@/*` → `src/*` (Vite + TypeScript).
