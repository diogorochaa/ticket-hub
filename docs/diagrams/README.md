# Diagramas de arquitetura

Arquivos Excalidraw do TicketHub. Abra em [excalidraw.com](https://excalidraw.com) via **File → Open**.

| Arquivo | Escopo |
|---------|--------|
| [01-architecture-current.excalidraw](./01-architecture-current.excalidraw) | Como o projeto está hoje: monorepo, API hexagonal, módulo `users`, PostgreSQL |
| [02-architecture-future.excalidraw](./02-architecture-future.excalidraw) | Alvo: load balancer, cluster de APIs, Redis, RabbitMQ, workers, MinIO, fluxo anti-concorrência de vendas, observabilidade |

## Futuro (resumo do diagrama)

- **Edge:** clientes → CDN/WAF → load balancer → N réplicas da API
- **Redis:** cache, locks (`SET NX`), TTL de reserva, rate-limit
- **RabbitMQ:** eventos entre módulos (`TicketReserved`, `PaymentApproved`, `ReservationExpired`)
- **Workers:** expiração de reserva, notificações, webhooks
- **PostgreSQL:** source of truth + constraints
- **Venda:** lock Redis → reserva transacional → evento → pagamento idempotente → `SOLD` / liberação
