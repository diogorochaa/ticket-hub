# Módulo de usuários

API CRUD de usuários em `apps/api/src/modules/users`.

Base URL: `http://127.0.0.1:3000`

## Endpoints

### Criar usuário

```http
POST /users
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
  "id": "uuid",
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

| Status | Quando |
|--------|--------|
| 400 | Validação Zod ou VO inválido |
| 409 | Email já cadastrado |

---

### Buscar por email

```http
GET /users/email?email=jane@example.com
```

**200** — mesmo shape de resposta do create (sem password).

| Status | Quando |
|--------|--------|
| 400 | Query inválida |
| 404 | Usuário não encontrado |

---

### Buscar por id

```http
GET /users/:id
```

**200** — `{ id, name, email }`

| Status | Quando |
|--------|--------|
| 400 | `id` não é UUID |
| 404 | Usuário não encontrado |

---

### Atualizar usuário

```http
PATCH /users/:id
Content-Type: application/json

{
  "name": "Jane D.",
  "email": "jane.d@example.com",
  "password": "newpassword"
}
```

Campos opcionais; pelo menos um deve ser enviado.

**200** — `{ id, name, email }`

| Status | Quando |
|--------|--------|
| 400 | Body/params inválidos ou VO inválido |
| 404 | Usuário não encontrado |
| 409 | Novo email já usado por outro usuário |

---

### Remover usuário

```http
DELETE /users/:id
```

**204** — sem body

| Status | Quando |
|--------|--------|
| 400 | `id` inválido |
| 404 | Usuário não encontrado |

---

## Camadas

| Camada | Responsabilidade |
|--------|------------------|
| `domain/` | `User`, VOs (`Name`, `Email`, `Password`), erros, `UserRepository` |
| `application/` | Use cases: create, get by email/id, update, delete |
| `infra/` | `PrismaUserRepository`, `UserMapper` |
| `presentation/` | Schemas Zod, controllers, rotas |
| `users.module.ts` | Composition root do módulo |

## Observações

- Senha não é retornada nas respostas
- `passwordHash` no banco ainda reflete o valor persistido pelo mapper atual (hashing pode evoluir depois)
- A rota `/users/email` fica registrada **antes** de `/users/:id` para não conflitar com o param
