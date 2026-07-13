# ADR 007 - Autenticação com JWT (access) + refresh opaco

## Status

Aceito

---

## Contexto

O TicketHub precisa de autenticação para Customer, Organizer e Admin (login, sessão e, no futuro, rotas protegidas de compra).

Requisitos:

- Access token curto para APIs
- Possibilidade de logout / revogação
- Funcionar com múltiplas réplicas da API (LB futuro)
- Cadastro público com auto-login
- E-mail de boas-vindas sem acoplar SMTP ao controller HTTP

---

## Opções avaliadas

### Session cookie server-side apenas

Vantagens: revogação simples.  
Desvantagens: sticky sessions ou store compartilhado desde o dia 1; menos ergonômico para mobile/SPA.

### Access + refresh ambos JWT

Vantagens: totalmente stateless.  
Desvantagens: logout/revogação fracos sem denylist.

### Access JWT + refresh opaco no PostgreSQL (escolhido)

Vantagens: access stateless; refresh revogável e rotativo; bom para LB; source of truth no PG.  
Desvantagens: uma tabela a mais; refresh exige hit no banco.

---

## Decisão

- **Access token:** JWT HS256 (~15 min), `sub` = userId
- **Refresh token:** opaco (`randomBytes`), armazenado só o **hash SHA-256** em `RefreshToken`, TTL longo, **rotação** a cada refresh
- **Módulos:** `users` (identidade + hash bcrypt), `auth` (sessão/tokens), `notifications` (e-mail via evento `user.created`)
- **Cadastro público:** `POST /auth/register` → `CreateUserUseCase` + emissão de tokens
- **E-mail:** EventBus in-process → Mailpit (SMTP) em dev; caminho aberto para Rabbit depois

---

## Consequências

### Positivas

- Logout e rotação de refresh reais
- Fronteiras hexagonais claras
- E-mail desacoplado do HTTP

### Negativas

- Precisa cuidar de `JWT_SECRET` e TTL via env
- Se Mailpit estiver fora, o e-mail falha de forma isolada (não quebra o register)

---

## Referências

- [docs/04-auth-module.md](../04-auth-module.md)
- [ADR 002 - Composition root](./002-composition-root-per-module.md)
- [ADR 005 - Docker](./005-use-docker.md)
