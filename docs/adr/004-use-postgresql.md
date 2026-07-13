# ADR 004 - Utilização do PostgreSQL como banco de dados

## Status

Aceito

---

## Contexto

O TicketHub precisa persistir dados relacionais com forte consistência: usuários, eventos, setores, ingressos, reservas e pagamentos.

Regras críticas do domínio (ex.: um ingresso não pode ser vendido duas vezes) dependem de **integridade referencial**, **constraints** e **transações ACID**.

Era necessário escolher o SGBD principal da plataforma.

---

## Opções avaliadas

### MongoDB / document store

Vantagens

- Flexibilidade de schema
- Bom para dados pouco relacionais

Desvantagens

- Modelo do TicketHub é naturalmente relacional (Event → Sector → Ticket → Reservation → Payment)
- Garantias transacionais e constraints são menos naturais para o núcleo do domínio
- Maior risco de inconsistência em fluxos de venda concorrente

---

### MySQL / MariaDB

Vantagens

- Maduro e amplamente usado
- Suporte a SQL e transações

Desvantagens

- Ecossistema e features avançadas (JSON, locks, extensões) menos alinhadas à preferência do time
- PostgreSQL oferece melhor suporte a tipos/constraints úteis no longo prazo

---

### SQLite

Vantagens

- Setup local simples
- Zero infraestrutura no início

Desvantagens

- Não adequado para multi-instância / load balancer
- Limitações de concorrência de escrita
- Não representa o ambiente de produção alvo

---

### PostgreSQL

Vantagens

- ACID e transações confiáveis
- Constraints (`UNIQUE`, FK) alinhadas às regras de negócio
- Excelente suporte a concorrência e locking (base para reservas)
- Ecossistema maduro com Prisma, Docker e ferramentas de ops
- Extensível (JSON, índices, etc.) sem abandonar o modelo relacional
- Adequado ao cenário futuro com várias réplicas da API apontando para a mesma source of truth

Desvantagens

- Exige processo/serviço rodando (localmente via Docker)
- Ops um pouco mais complexa que SQLite no dia 1

---

## Decisão

Foi escolhido o **PostgreSQL** como banco de dados principal do TicketHub.

Motivos principais:

1. **Consistência** — essencial para estoque de ingressos, reservas e pagamentos.
2. **Modelo relacional** — casa com as entidades e relacionamentos do domínio.
3. **Concorrência** — base sólida para transações; complementar com Redis no futuro para locks distribuídos.
4. **Stack** — integração natural com Prisma e com a infra Docker já prevista.

---

## Consequências

### Positivas

- Source of truth única e confiável
- Constraints no banco reforçam regras (ex.: email único)
- Caminho claro para produção e para o desenho futuro (LB + N APIs)

### Negativas

- Dependência de um serviço externo no desenvolvimento
- Necessidade de migrations e backup/ops à medida que o sistema cresce

### Impacto

- Connection string via `DATABASE_URL`
- Schema e migrations gerenciados pelo Prisma
- Em desenvolvimento local, PostgreSQL sobe via Docker Compose — ver [ADR 005](./005-use-docker.md)

---

## Referências

- https://www.postgresql.org/docs/
- [ADR 003 - Prisma](./003-use-prisma.md)
- [ADR 005 - Docker](./005-use-docker.md)
- [Arquitetura da API](../02-architecture.md)
- [Diagrama futuro](../diagrams/02-architecture-future.excalidraw)
