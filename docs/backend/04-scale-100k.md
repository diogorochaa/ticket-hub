# Escala: 100k ingressos / evento

Como o TicketHub se prepara para picos de venda em um único evento.

## Objetivo

Um ingresso **nunca** vendido duas vezes, mesmo com:

- N réplicas da API atrás de load balancer
- dezenas de milhares de requests simultâneos
- falhas parciais (timeout, retry, webhook duplicado)

## Decisões (resumo)

| Peça | Papel | ADR |
|------|--------|-----|
| PostgreSQL | Source of truth (Ticket/Reservation/Payment) | [004](../adr/backend/004-use-postgresql.md) |
| Redis | Cache de leitura + lock distribuído | [007](../adr/backend/007-use-redis-cache-locks.md) |
| RabbitMQ | Eventos async (`ticket.reserved`, …) | [008](../adr/backend/008-use-rabbitmq.md) |
| Nginx | LB para APIs stateless (JWT) | [009](../adr/backend/009-load-balancer-stateless-api.md) |

## Topologia

```
Cliente
  → Nginx (:8080)
    → API Fastify × N (:3000)
         → PostgreSQL  (estado)
         → Redis       (cache + locks)
         → RabbitMQ    (eventos)
              → Workers (futuro: expirar reserva, e-mail, rebuild cache)
```

Docker Compose local: `docker/docker-compose.yml` (postgres, redis, rabbitmq, nginx, mailpit).

## O que cachear (e o que não)

**Cachear**

- Contagem / flag de disponibilidade por setor (`sector:{id}:available`)
- Catálogo do evento (nome, setores, preços) com TTL curto ou invalidate on edit

**Não cachear como verdade**

- Status “este ticket está AVAILABLE para vender” **só** no Redis → oversell
- Refresh tokens (permanecem no PG)

Regra: cache é **dica de performance**; venda usa UPDATE condicional no PG.

## Anti-concorrência na reserva

Implementado em `CreateReservationUseCase`:

1. Load ticket (fail if missing / not AVAILABLE)
2. `SET lock:ticket:{id} NX EX 5` (Redis)
3. `UPDATE Ticket SET status=RESERVED WHERE id AND status=AVAILABLE` (`tryReserve`)
4. Insert `Reservation` com `expiresAt`
5. `DEL` cache do setor + publish `ticket.reserved`
6. `DEL` lock

Se o UPDATE afeta 0 rows → **409** (perdiu a corrida).  
Se o lock não for adquirido → **409** (busy).

Cancelamento / pagamento recusado: `tryRelease` (RESERVED → AVAILABLE) + invalidate + `ticket.released`.  
Pagamento aprovado: `tryMarkSold` + `ticket.sold` (idempotente no webhook).

## Por que esse desenho

1. **PG na frente da verdade** — auditoria, constraints, recuperação  
2. **Lock Redis** — barato entre réplicas; reduz stampede no mesmo ticket  
3. **UPDATE condicional** — última linha de defesa contra double-sell  
4. **Rabbit** — não segurar o cliente HTTP esperando e-mail/expiração  
5. **LB + JWT** — escala horizontal sem sticky session  

## Como subir local

```sh
docker compose -f docker/docker-compose.yml up -d
cp apps/api/.env.example apps/api/.env   # REDIS_URL + RABBITMQ_URL
pnpm --filter api dev
# API direta: http://127.0.0.1:3000
# via Nginx:  http://127.0.0.1:8080
# Rabbit UI:  http://127.0.0.1:15673 (ticket/ticket)
```

Ports na API: `CacheStore`, `DistributedLock`, `MessageBus` em `AppDeps`.

## Próximos passos (não nesta entrega)

- Worker consumer para `reservation.expired`
- Rebuild de contadores de disponibilidade a partir do PG
- Rate limiting no Nginx
- Testes de carga (k6) no fluxo reserve
