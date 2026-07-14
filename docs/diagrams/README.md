# Diagramas de arquitetura

Arquivos Excalidraw do TicketHub. Abra em [excalidraw.com](https://excalidraw.com) via **File → Open**.

| Arquivo | Escopo |
|---------|--------|
| [01-architecture-current.excalidraw](./01-architecture-current.excalidraw) | Visão inicial (monorepo + API hexagonal + Postgres) |
| [02-architecture-future.excalidraw](./02-architecture-future.excalidraw) | Alvo de escala — **agora refletido no Compose** (Nginx, Redis, RabbitMQ) |

Detalhe textual e decisões: [docs/backend/04-scale-100k.md](../backend/04-scale-100k.md).

## Escala (resumo)

- **Edge:** clientes → Nginx LB (`:8080`) → N APIs Fastify
- **Redis:** cache de leitura + locks `SET NX` por ticket
- **RabbitMQ:** `ticket.reserved` / `released` / `sold` (workers depois)
- **PostgreSQL:** source of truth + UPDATE condicional anti-oversell
- **Venda:** lock Redis → `tryReserve` no PG → evento → pagamento idempotente → `SOLD` / liberação
