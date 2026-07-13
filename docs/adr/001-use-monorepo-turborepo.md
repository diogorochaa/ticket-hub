# ADR 001 - Monorepo com pnpm workspaces e Turborepo

## Status

Aceito

---

## Contexto

O TicketHub não é só uma API: envolve **API** (`apps/api`), **frontend** (`apps/web`), app de **docs** (`apps/docs`), pacotes compartilhados (`packages/ui`, configs de ESLint/TypeScript) e documentação de domínio/ADRs.

Era necessário decidir como organizar esses projetos no versionamento e no dia a dia de desenvolvimento: vários repositórios separados ou um monorepo; e, se monorepo, qual ferramenta orquestra build/dev/cache.

---

## Opções avaliadas

### Polyrepo (um repositório por app)

Vantagens

- Fronteiras de deploy/ownership bem separadas
- CI mais isolado por serviço

Desvantagens

- Mudanças cross-cutting (contrato API ↔ web, UI compartilhada) exigem PRs em vários repos
- Versionamento e sync de pacotes internos mais trabalhosos
- Onboarding mais lento (“clone A, B, C…”)
- Divergência fácil de TypeScript/ESLint entre projetos

---

### Monorepo sem orquestrador (só workspaces)

Vantagens

- Código no mesmo lugar
- Pacotes internos sem publicar no npm

Desvantagens

- `build`/`lint`/`dev` manuais ou scripts frágeis na raiz
- Sem cache inteligente de tarefas
- Dificulta escalar pipelines quando o monorepo cresce

---

### Nx

Vantagens

- Muito poderoso (grafo, generators, cache remoto)
- Bom para monorepos grandes

Desvantagens

- Mais opinião e superfície de API do que o projeto precisa agora
- Curva de aprendizado maior para um time pequeno / projeto de estudos

---

### Monorepo com pnpm workspaces + Turborepo

Vantagens

- **pnpm workspaces** — dependências eficientes, pacotes locais (`packages/*`) linkados
- **Turborepo** — pipelines (`build`, `dev`, `lint`) com cache e paralelismo
- Um clone, um `pnpm install`, `pnpm dev` sobe o que importa
- Compartilhar UI e configs (`eslint-config`, `typescript-config`) sem publicar pacotes
- Escala para mais apps/packages sem mudar o modelo
- Integração natural com o ecossistema JS/TS atual do projeto

Desvantagens

- Repositório maior com o tempo
- É preciso disciplina de boundaries (não acoplar `web` direto em internals da `api`)
- Cache/remote cache são opcionais e pedem configuração extra no CI

---

## Decisão

Adotar **monorepo** gerenciado com **pnpm workspaces** e orquestrado por **Turborepo**.

Motivos principais:

1. **Produto multi-app** — API, web e pacotes evoluem juntos.
2. **DX** — um fluxo de instalação e scripts na raiz (`pnpm dev`, `pnpm build`).
3. **Compartilhamento** — UI e configs sem fricção de versionamento externo.
4. **Performance de tarefas** — Turborepo cacheia e paraleliza o que for possível.
5. **Complexidade adequada** — mais leve que Nx para o estágio atual; mais estruturado que “só workspaces”.

Estrutura:

```
apps/        # aplicações (api, web, docs)
packages/    # libs e configs compartilhadas
docker/      # infra local
docs/        # domínio, ADRs, diagramas
```

---

## Consequências

### Positivas

- Mudanças coordenadas API ↔ frontend no mesmo PR
- Tooling consistente entre apps
- Fácil adicionar novos packages/apps no workspace
- Filtros do pnpm/turbo (`pnpm --filter api dev`) para trabalhar em um alvo só

### Negativas

- Boundaries precisam ser explícitas (domínio da API não vaza para o web via imports indevidos)
- CI precisa entender o grafo do monorepo (filters / `turbo`)
- Histórico git e reviews podem ficar maiores

### Uso no projeto

```sh
pnpm install
pnpm dev                          # turbo run dev
pnpm --filter api dev             # só a API
pnpm build                        # turbo run build
```

Configurações: `pnpm-workspace.yaml`, `turbo.json`, `package.json` na raiz.

---

## Referências

- https://turborepo.dev/docs
- https://pnpm.io/workspaces
- [README do projeto](../../README.md)
- [Arquitetura da API](../backend/01-architecture.md)
- [Arquitetura do frontend](../frontend/01-architecture.md)
