# Módulo de autenticação

Auth em `apps/api/src/modules/auth`, com e-mail de boas-vindas em `modules/notifications`.

Base URL: `http://127.0.0.1:3000`

## Responsabilidades

| Módulo | Papel |
|--------|--------|
| `users` | Identidade, senha (bcrypt), CRUD |
| `auth` | Register, login, refresh, logout, plugin `authenticate` |
| `notifications` | Escuta `user.created` e envia e-mail (Mailpit) |

## Endpoints

### Registrar (cria conta + tokens + e-mail)

```http
POST /auth/register
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}
```

**201**

```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "accessTokenExpiresIn": 900,
  "user": { "id": "uuid", "name": "Jane Doe", "email": "jane@example.com" }
}
```

| Status | Quando |
|--------|--------|
| 400 | Validação / VO inválido |
| 409 | Email já cadastrado |

---

### Login

```http
POST /auth/login
Content-Type: application/json

{ "email": "jane@example.com", "password": "password123" }
```

**200** — mesmo shape de tokens do register.

| Status | Quando |
|--------|--------|
| 401 | Credenciais inválidas |

---

### Refresh (rotação)

```http
POST /auth/refresh
Content-Type: application/json

{ "refreshToken": "..." }
```

**200** — novo par access + refresh; o refresh anterior é revogado.

| Status | Quando |
|--------|--------|
| 401 | Refresh inválido, expirado ou já revogado |

---

### Logout

```http
POST /auth/logout
Content-Type: application/json

{ "refreshToken": "..." }
```

**204**

---

## Usando o access token

```http
Authorization: Bearer <accessToken>
```

O plugin `app.authenticate` valida o JWT e preenche `request.user = { id }`.

Exemplo em rota futura:

```ts
app.get("/me", { preHandler: [app.authenticate] }, async (request) => {
  return { userId: request.user!.id };
});
```

## E-mail de boas-vindas

1. `CreateUserUseCase` publica `user.created`
2. `OnUserCreatedHandler` chama `Mailer.sendWelcome`
3. Em dev: SMTP → Mailpit (`localhost:1025`), UI em `http://localhost:8025`

Falha de e-mail é logada e **não** derruba o cadastro.

## Variáveis de ambiente

Ver `apps/api/.env.example`:

- `JWT_SECRET`
- `ACCESS_TOKEN_TTL_SECONDS` (default 900)
- `REFRESH_TOKEN_TTL_DAYS` (default 7)
- `SMTP_HOST` / `SMTP_PORT` / `MAIL_FROM`

## Segurança

- Senha: bcrypt (salt rounds 10); VO `Password.restore` para hash persistido
- Refresh: apenas hash SHA-256 no PostgreSQL (`RefreshToken`)
- Access: JWT curto, HS256
