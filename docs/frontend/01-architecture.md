# TicketHub — Arquitetura do frontend

## Visão geral

O web em `apps/web` é uma SPA com:

| Camada | Escolha |
|--------|---------|
| UI | React 19 + Vite 8 |
| Rotas | React Router 7 |
| Server state | TanStack Query |
| Formulários | React Hook Form + Zod |
| Estilo | Tailwind CSS 4 + shadcn/ui (Base UI / `base-nova`) |
| Lint | Oxlint |
| Compilação | React Compiler (Babel via Vite) |
| Fonte | Geist Variable |

```
UI (pages / components)
  ↓
TanStack Query (cache / server state)
  ↓
services (HTTP → API Fastify)
  ↓
apps/api
```

## Estrutura

```
apps/web/src/
  App.tsx                 BrowserRouter + rotas
  main.tsx                entry + StrictMode
  index.css               Tailwind 4 + tokens shadcn
  pages/                  telas (rota → page)
  components/
    ui/                   primitivos shadcn (Button, Separator, …)
    header/               compound Header
    footer/               compound Footer + dados de links
    logo/                 marca
    nav-link.ts           tipos compartilhados de navegação
  hooks/                  hooks da aplicação (a criar conforme uso)
  services/               clients HTTP da API (a criar conforme uso)
  lib/                    utilitários (ex.: cn)
```

Alias `@/*` → `src/*` (TypeScript + Vite).

### Convenções de pasta

| Pasta | Responsabilidade |
|-------|------------------|
| `pages/` | Composição de tela; orquestra compounds e seções |
| `components/<feature>/` | Componentes de produto; compound via `Object.assign` |
| `components/ui/` | Só shadcn — não misturar lógica de produto |
| `services/` | `fetch` / client HTTP; sem JSX |
| `hooks/` | Hooks de caso de uso (Query/Mutation, formulários) |
| `lib/` | Helpers puros (`cn`, formatters) |

## Stack detalhada

### Build e DX

- **Vite** + `@vitejs/plugin-react`
- **React Compiler** habilitado em `vite.config.ts` (`babel-plugin-react-compiler`)
- **Oxlint** em `.oxlintrc.json` (plugins `react`, `typescript`, `oxc`)
- Scripts: `pnpm --filter web dev | build | lint | preview`

### Data fetching — TanStack Query

Estado de servidor (eventos, usuário, reservas) fica no **TanStack Query**, não em estado local genérico.

Motivos: [ADR 001](../adr/frontend/001-use-tanstack-query.md).

Padrão esperado:

- `services/` encapsula HTTP
- `useQuery` / `useMutation` por caso de uso da tela
- invalidação de cache após mutações
- `QueryClientProvider` na raiz da app (quando o primeiro fetch entrar)

Estado de UI (modais, steps de checkout) permanece local ou em store leve.

### Formulários — React Hook Form + Zod

- Validação com **Zod** (alinhada aos schemas da API)
- Integração via `@hookform/resolvers`
- Mensagens de erro na UI; regras de negócio pesadas na API

### UI — shadcn/ui

Componentes acessíveis gerados no repositório (`src/components/ui`).

- Estilo: `base-nova` (Base UI)
- Tokens OKLCH em `src/index.css`
- Utilitário `cn` em `src/lib/utils.ts`
- Config: `apps/web/components.json`

Motivos: [ADR 002](../adr/frontend/002-use-shadcn.md).

```sh
cd apps/web
pnpm dlx shadcn@latest add button
```

### Componentes de produto

`Header` e `Footer` são **autocontidos**: a page só renderiza `<Header />` e `<Footer />`. A composição (marca, nav, links) fica dentro de `components/header` e `components/footer`.

Detalhes: [02-components.md](./02-components.md) · [ADR 003](../adr/frontend/003-use-compound-components.md).

### Navegação tipada

Tipos em `src/components/nav-link.ts`:

```ts
NavLink { to, label }
SocialNavLink { to, label, icon: LucideIcon }
```

Dados de link (textos/rotas) ficam em arquivos de dados (ex.: `footer/links.tsx`), **sem JSX** — ícones como referência de componente, render no leaf.

### Ícones

Lucide (`lucide-react`) para UI de produto. Ícones só-ícone devem ter `aria-label`.

## Autenticação (cliente)

- Access token JWT em memória (ou storage curto) + refresh via `POST /auth/refresh`
- Requests autenticados: `Authorization: Bearer <accessToken>`
- Detalhes: [../backend/03-auth-module.md](../backend/03-auth-module.md)

## Relação com o monorepo

- App: `apps/web` (pnpm workspace + Turborepo)
- UI do produto vive em `apps/web` por enquanto
- Pacotes compartilhados futuros podem ir em `packages/*`
- Regras de negócio pesadas permanecem na API

## Referências

- [02 — Componentes e composition](./02-components.md)
- [ADR 001 — TanStack Query](../adr/frontend/001-use-tanstack-query.md)
- [ADR 002 — shadcn/ui](../adr/frontend/002-use-shadcn.md)
- [ADR 003 — Composition interna](../adr/frontend/003-use-compound-components.md)
- [ADR 001 — Monorepo](../adr/001-use-monorepo-turborepo.md)
- [Arquitetura da API](../backend/01-architecture.md)
