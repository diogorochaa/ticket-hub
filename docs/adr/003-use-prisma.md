# ADR 003 - Utilização do Prisma como ORM / acesso a dados

## Status

Aceito

---

## Contexto

O TicketHub persiste dados em **PostgreSQL** (usuários, eventos, ingressos, reservas, pagamentos).

A API segue Arquitetura Hexagonal: o domínio define ports (`UserRepository`, etc.) e a infraestrutura implementa adapters. Era necessário escolher a ferramenta de acesso a dados na camada de infra, sem vazar detalhes de SQL/ORM para o domínio.

Requisitos relevantes:

- Tipagem forte em TypeScript
- Migrations versionadas
- Produtividade no CRUD e nas relações do modelo
- Suporte a PostgreSQL
- Compatibilidade com transações (reservas/pagamentos)
- Facilidade de evolução do schema ao longo dos módulos

---

## Opções avaliadas

### SQL cru (`pg` / `postgres.js`)

Vantagens

- Controle total das queries
- Sem abstração intermediária
- Bom para SQL complexo e tuning fino

Desvantagens

- Mais boilerplate (mappers manuais, tipagem à mão)
- Migrations precisam de ferramenta à parte
- Maior risco de inconsistência entre schema e código
- Produtividade menor no início do projeto

---

### TypeORM / Sequelize

Vantagens

- Ecossistema conhecido
- Active Record / Data Mapper disponíveis (TypeORM)

Desvantagens

- Tipagem menos previsível em alguns fluxos
- Decorators e magia de runtime aumentam acoplamento
- Histórico de issues com migrations e edge cases
- Menos alinhado à preferência por schema declarativo + client tipado

---

### Drizzle ORM

Vantagens

- Leve, SQL-like e bem tipado
- Bom controle das queries
- Migrations sólidas

Desvantagens

- Ecossistema e exemplos um pouco menores que Prisma no contexto do time
- Curva um pouco maior para quem prioriza DX de schema único + client gerado
- Para o momento do projeto, o ganho de “SQL explícito” não era o foco principal

---

### Prisma

Vantagens

- Schema declarativo (`schema.prisma`) como fonte da verdade da persistência
- Client TypeScript gerado a partir do schema
- Migrations first-class (`prisma migrate`)
- Boa DX para relações, constraints (`@unique`) e evolução do modelo
- Encaixa bem como **adapter de infra**: repositories usam Prisma; domínio não conhece Prisma
- Integração atual com driver `pg` via `@prisma/adapter-pg` (Prisma 7)

Desvantagens

- Queries muito específicas / analíticas podem ser menos ergonômicas que SQL cru
- Abstração pode esconder custo de algumas queries (N+1, etc.) — exige disciplina
- Client gerado adiciona artefato de build (`prisma generate`)

---

## Decisão

Foi escolhido o **Prisma** como ferramenta de acesso a dados na infraestrutura da API.

Motivos principais:

1. **DX e tipagem** — schema + client gerado reduzem erros e aceleram módulos novos.
2. **Migrations** — histórico versionado do banco junto do código.
3. **Hexagonal** — Prisma fica isolado em `infra/` (ex.: `PrismaUserRepository`); ports do domínio continuam puros.
4. **PostgreSQL** — suporte maduro ao banco já definido na stack.
5. **Evolução** — encaixa no crescimento previsto (events, tickets, reservations, payments) sem trocar a estratégia de persistência no curto prazo.

---

## Consequências

### Positivas

- Repositories tipados e previsíveis
- Schema e migrations centralizados em `apps/api/prisma`
- Onboarding mais simples (`generate` + `migrate`)
- Domínio permanece independente do ORM

### Negativas

- Dependência do fluxo `prisma generate` no setup/CI
- Necessidade de atenção a performance (selects, includes, transações)
- Para locks/concurrência avançada na venda de ingressos, combinar Prisma/PG com Redis (ver arquitetura futura) — Prisma sozinho não resolve coordenação distribuída

### Impacto na arquitetura

```
Use Case
  → UserRepository (port / domain)
    → PrismaUserRepository (adapter / infra)
      → PrismaClient + PostgreSQL
```

O domínio **não** importa `@prisma/client`. Mappers (`UserMapper`) traduzem entre modelo de persistência e entidades de domínio.

Configuração relevante no projeto:

- Schema: `apps/api/prisma/schema.prisma`
- Config: `apps/api/prisma.config.ts`
- Client gerado: `apps/api/generated/prisma`
- Instância: `apps/api/src/infra/db/prisma/prisma.ts`

---

## Referências

- https://www.prisma.io/docs
- [ADR 004 - PostgreSQL](./004-use-postgresql.md)
- [Arquitetura da API](../02-architecture.md)
- [ADR 001 - Fastify](./001-use-fastify.md)
- [ADR 002 - Composition root](./002-composition-root-per-module.md)
