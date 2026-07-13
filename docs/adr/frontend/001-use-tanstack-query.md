# ADR 001 - Utilização do TanStack Query para server state

## Status

Aceito

---

## Contexto

O frontend do TicketHub (`apps/web`) consome a API REST para autenticação, listagem de eventos, reservas e compras.

Esses dados são **server state**: vivem no backend, ficam obsoletos com o tempo e precisam de cache, retry, revalidação e sincronização após mutações.

Era necessário definir como o React lidar com fetching e cache sem reinventar uma camada ad hoc.

---

## Opções avaliadas

### `useEffect` + `useState` / Context

Vantagens

- Sem dependência extra
- Simples em telas únicas

Desvantagens

- Loading/error/cache duplicados em várias telas
- Race conditions e stale data fáceis de aparecer
- Invalidação após login/reserva fica manual e frágil
- Não escala para listagens + detalhes + polling de reserva

---

### Redux / Zustand para tudo (incluindo server state)

Vantagens

- Store global previsível

Desvantagens

- Server state não é o mesmo que client state (UI)
- Boilerplate alto para fetch/cache/retries
- Bibliotecas especializadas (TanStack Query / RTK Query) existem justamente para esse gap

---

### SWR

Vantagens

- Leve, bom DX
- Cache e revalidação

Desvantagens

- Ecossistema de mutations/devtools um pouco menos completo que o TanStack Query no contexto do time
- TanStack Query já é a escolha prevista no domínio do projeto

---

### TanStack Query (React Query)

Vantagens

- Cache, dedupe, retries e stale-while-revalidate de fábrica
- `useMutation` + invalidação de queries após escrita
- Devtools e padrões maduros para SPA
- Encaixa bem com React Router e formulários (RHF)
- Adequado a fluxos futuros: polling de status de pagamento, listagens de eventos, etc.

Desvantagens

- Mais uma lib no bundle (aceitável pelo ganho)
- Exige disciplina de query keys

---

## Decisão

Adotar **TanStack Query (`@tanstack/react-query`)** como padrão de **server state** no `apps/web`.

- Estado de UI (modais, steps do checkout) → estado local / store leve se necessário
- Estado do servidor → Query / Mutation
- HTTP encapsulado em `src/services/`

---

## Consequências

### Positivas

- Menos código repetido de loading/error
- Cache consistente entre páginas
- Mutações (login, reserva) invalidam dados relacionados

### Negativas

- Time precisa padronizar query keys (`['events', id]`, `['me']`, …)
- Configuração do `QueryClientProvider` na raiz da app

---

## Referências

- https://tanstack.com/query/latest
- [Arquitetura do frontend](../../frontend/01-architecture.md)
- [ADR 002 - shadcn/ui](./002-use-shadcn.md)
