# ADR 008 - RabbitMQ para eventos assíncronos entre módulos

## Status

Aceito

---

## Contexto

No caminho feliz da venda (reservar → pagar → confirmar → notificar), parte do trabalho **não precisa** responder no mesmo request HTTP:

- expirar reserva após TTL
- e-mail de confirmação
- invalidar/rebuild de cache em workers
- webhooks externos lentos

O `EventBus` in-process serve no processo único (ex.: welcome email). Com N réplicas e workers, eventos precisam ser **duráveis e compartilhados**.

---

## Opções avaliadas

### Só EventBus in-process

Vantagens: simples.  
Desvantagens: não cruza processos; perde evento se o processo morrer no meio.

### Kafka

Vantagens: alto throughput.  
Desvantagens: ops pesada demais para o estágio atual.

### RabbitMQ (topic exchange)

Vantagens: maduro, UI de management, durable messages, routing keys por domínio.  
Desvantagens: mais um serviço; ordering global não é o foco (ok por ticket/reservation id).

---

## Decisão

Adotar **RabbitMQ** com exchange `ticket-hub.events` (topic) e port `MessageBus`.

Routing keys iniciais:

- `ticket.reserved`
- `ticket.released`
- `ticket.sold`
- `reservation.cancelled`

EventBus in-process permanece para handlers locais (ex.: `user.created` → Mailpit). O MessageBus cobre o caminho de escala.

Nesta entrega: **publisher** na API. Consumers/workers virão depois consumindo as mesmas keys.

---

## Consequências

### Positivas

- Request HTTP mais curto
- Desacopla notificações / expiração do ciclo request
- Base para workers horizontais

### Negativas

- Precisa garantir connect no boot (`RABBITMQ_URL`)
- Exactly-once é responsabilidade do consumer (idempotência por id)

---

## Referências

- [docs/backend/04-scale-100k.md](../../backend/04-scale-100k.md)
- [ADR 007 - Redis](./007-use-redis-cache-locks.md)
