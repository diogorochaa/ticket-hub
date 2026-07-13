# ADR 005 - Utilização do Docker para infraestrutura local (e base de deploy)

## Status

Aceito

---

## Contexto

O TicketHub depende de serviços de infraestrutura além da aplicação Node.js. Hoje já é necessário o **PostgreSQL**; no futuro entram Redis, RabbitMQ, MinIO, Mailpit e demais componentes descritos na arquitetura alvo.

Era necessário padronizar como o time sobe e compartilha esses serviços no desenvolvimento, sem instalar cada um manualmente na máquina.

---

## Opções avaliadas

### Instalação nativa na máquina

Vantagens

- Sem Docker
- Às vezes menor overhead em máquinas fracas

Desvantagens

- Setup diferente por SO (Windows / WSL / macOS / Linux)
- Versões divergentes entre desenvolvedores (“na minha máquina funciona”)
- Difícil reproduzir o mesmo conjunto de serviços do ambiente futuro

---

### Serviços gerenciados na nuvem (dev remoto)

Vantagens

- Menos processos locais
- Próximo de produção

Desvantagens

- Custo e dependência de rede
- Mais lento para iteração no início do projeto
- Overkill enquanto a stack ainda está sendo modelada

---

### Docker / Docker Compose

Vantagens

- Ambiente reproduzível com um comando
- Versões pinadas das imagens (ex.: `postgres:17-alpine`)
- Mesmo fluxo para o time inteiro
- Escala bem: novos serviços (Redis, RabbitMQ, MinIO, Mailpit) entram no Compose sem mudar o modelo mental
- Base alinhada a deploys containerizados futuros

Desvantagens

- Requer Docker instalado (no WSL/Windows, atenção à integração)
- Consumo de recursos se muitos containers subirem juntos

---

## Decisão

Foi escolhido o **Docker Compose** para a infraestrutura de desenvolvimento do TicketHub.

Motivos principais:

1. **Reprodutibilidade** — todo mundo sobe o mesmo PostgreSQL (e depois os mesmos sidecars).
2. **Simplicidade** — `docker compose up -d` em vez de guias por SO.
3. **Evolução** — o arquivo de Compose cresce junto com a arquitetura futura.
4. **Proximidade com produção** — a app continua “12-factor” (config via env); deps são serviços, não libs embutidas.

Escopo atual: serviços `postgres` e `mailpit` em `docker/docker-compose.yml`.

Escopo previsto: Redis, RabbitMQ, MinIO, e eventualmente a própria API em container.

---

## Consequências

### Positivas

- Onboarding mais rápido
- Menos drift de versão do banco
- Caminho natural para ambientes de staging/produção containerizados

### Negativas

- Docker como pré-requisito do projeto
- É preciso documentar portas e volumes (ex.: `5432`, volume `postgres_data`)

### Uso no projeto

```sh
docker compose -f docker/docker-compose.yml up -d
```

Variável da API:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
```

A aplicação Node **não** precisa rodar dentro do Docker no dia a dia; costuma-se usar Compose só para os serviços de infra e `pnpm --filter api dev` no host (ou WSL).

---

## Referências

- https://docs.docker.com/compose/
- [ADR 004 - PostgreSQL](./004-use-postgresql.md)
- [README do projeto](../../../README.md)
- [Diagrama futuro](../../diagrams/02-architecture-future.excalidraw)
