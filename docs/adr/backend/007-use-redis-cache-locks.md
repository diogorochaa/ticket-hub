# ADR 007 - Redis para cache e locks distribuídos

## Status

Aceito

---

## Contexto

Com dezenas/centenas de milhares de requests concorrentes sobre o mesmo evento, a API precisa:

1. Evitar oversell entre **N réplicas**
2. Reduzir carga de leitura no PostgreSQL (catálogo / disponibilidade)

PostgreSQL sozinho aguenta o estado, mas coordenar “quem pega o ticket” só com row locks sob pico alto fica caro e lento entre processos.

---

## Opções avaliadas

### Só PostgreSQL (`SELECT FOR UPDATE` / serializable)

Vantagens: uma única fonte.  
Desvantagens: contenção extrema em hot tickets; latência sob LB multi-instância.

### Redis só como source of truth do estoque

Vantagens: muito rápido.  
Desvantagens: risco de divergência; recuperação após crash é crítica; pagamentos/auditoria precisam do banco mesmo.

### Redis (cache + lock) + PostgreSQL (verdade)

Vantagens: lock `SET NX` barato entre réplicas; UPDATE condicional no PG como segurança; leituras cacheáveis.  
Desvantagens: mais um serviço operacional.

---

## Decisão

Usar **Redis** para:

- **Distributed lock** por ticket (`lock:ticket:{id}`, TTL curto)
- **Cache de leitura** (disponibilidade por setor, catálogo de evento)

PostgreSQL continua sendo a **única** source of truth para `AVAILABLE | RESERVED | SOLD`.

Ports: `CacheStore`, `DistributedLock` em `shared/ports`; adapters em `infra/redis`.

---

## Consequências

### Positivas

- Coordenação entre APIs atrás do LB
- Cache invalida após reserve/cancel/sold
- Oversell bloqueado mesmo se o lock falhar (UPDATE condicional)

### Negativas

- Redis obrigatório no compose/produção
- Cache pode ficar stale por milissegundos — aceitável se não for fonte de venda

---

## Referências

- [docs/backend/04-scale-100k.md](../../backend/04-scale-100k.md)
- [ADR 004 - PostgreSQL](./004-use-postgresql.md)
- [ADR 009 - Load balancer](./009-load-balancer-stateless-api.md)
