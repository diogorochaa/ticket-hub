# Backend — TicketHub API

Documentação da API em `apps/api`.

| Documento | Conteúdo |
|-----------|----------|
| [01-architecture.md](./01-architecture.md) | Hexagonal, módulos, composition root |
| [02-users-module.md](./02-users-module.md) | CRUD de usuários |
| [03-auth-module.md](./03-auth-module.md) | Auth JWT + refresh + e-mail |
| [04-scale-100k.md](./04-scale-100k.md) | Escala 100k ingressos (Redis, Rabbit, LB) |

## Módulos HTTP (API)

| Módulo | Rotas principais |
|--------|------------------|
| `users` | `POST/GET/PATCH/DELETE /users…` |
| `auth` | `POST /auth/register\|login\|refresh\|logout` |
| `venues` | `POST/GET/PATCH/DELETE /venues` |
| `events` | `POST/GET/PATCH /events`, `POST /events/:id/cancel` |
| `sectors` | `POST/GET /events/:eventId/sectors`, `GET/PATCH/DELETE /sectors/:id` |
| `tickets` | `POST /sectors/:sectorId/tickets`, `GET /events/:eventId/tickets`, `GET/PATCH /tickets/:id…` |
| `reservations` | `POST /reservations`, `GET /reservations/:id`, `GET /users/:userId/reservations`, `POST …/cancel` |
| `payments` | `POST /payments`, `GET /payments/:id`, `POST /payments/webhook` |

ADRs: [../adr/backend/](../adr/backend/)
