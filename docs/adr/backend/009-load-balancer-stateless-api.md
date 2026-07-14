# ADR 009 - Load balancer + API stateless para alta concorrência

## Status

Aceito

---

## Contexto

100k ingressos no mesmo evento implica picos de RPS. Um único processo Node torna-se gargalo de CPU/event loop, mesmo com PostgreSQL e Redis saudáveis.

A API já emite **JWT access** (stateless) e refresh no PG — habilitada a horizontal scale.

---

## Opções avaliadas

### Vertical scale (uma máquina maior)

Vantagens: simples.  
Desvantagens: teto rápido; SPOF.

### Sticky sessions + store local

Vantagens: sessões em memória.  
Desvantagens: conflita com JWT já escolhido; pior failover.

### Nginx (ou cloud LB) + N réplicas Fastify

Vantagens: barato, padrão da indústria; combina com Redis/Rabbit compartilhados.  
Desvantagens: precisa health checks e config de upstream.

---

## Decisão

Colocar **Nginx** na frente das APIs (`docker/nginx/nginx.conf`).

- Dev: proxy `host.docker.internal:3000` (API no host via `pnpm --filter api dev`), porta host **8080**
- Prod: `upstream` com várias réplicas `api1:3000`, `api2:3000`, …

Toda estado compartilhado fica fora do processo:

- PG (verdade)
- Redis (cache/locks)
- RabbitMQ (eventos)

---

## Consequências

### Positivas

- Escala horizontal sem sticky session
- Ponto único de TLS/rate-limit no edge (futuro)

### Negativas

- Debug local passa por mais um hop (`:8080`)
- Upstream precisa ser atualizado ao mudar topologia

---

## Referências

- [docs/backend/04-scale-100k.md](../../backend/04-scale-100k.md)
- [ADR 006 - Auth JWT](./006-auth-jwt-refresh.md)
- [ADR 007 - Redis](./007-use-redis-cache-locks.md)
