# ADR 002 - Composition root por módulo (sem container central de DI)

## Status

Aceito

---

## Contexto

Com o crescimento do módulo de usuários, o arquivo `core/container.ts` passou a concentrar a criação manual de repositories, use cases e controllers.

Esse padrão não escala bem: cada novo caso de uso aumenta um único ponto de composição, dificulta a leitura do grafo e mistura wiring de módulos diferentes.

Era necessário definir como a aplicação faria injeção de dependências sem abandonar a Arquitetura Hexagonal nem acoplar a composição ao Fastify.

---

## Opções avaliadas

### Container central (`container.ts`)

Vantagens

- Simples no início
- Explícito

Desvantagens

- Vira god-file rapidamente
- Mistura módulos no mesmo lugar
- Difícil de navegar em apps maiores

---

### Lib de DI (tsyringe, inversify, awilix)

Vantagens

- Menos boilerplate de `new`
- Escopos e bindings avançados

Desvantagens

- Esconde o grafo de dependências
- Curva e magia extras para um projeto de estudos
- Menos alinhado ao objetivo de demonstrar composição hexagonal explícita

---

### Decorators / DI do Fastify

Vantagens

- Integração nativa com o ciclo de vida do plugin

Desvantagens

- Acopla a composição ao framework HTTP
- Contraria a decisão do ADR 001 de isolar o Fastify na borda

---

### Composition root por módulo

Vantagens

- Cada módulo possui o próprio wiring (`users.module.ts`)
- `register-modules.ts` só orquestra
- Deps compartilhadas tipadas (`AppDeps`)
- Explícito, testável e alinhado à hexagonal

Desvantagens

- Ainda há `new` manual (aceitável no tamanho atual)
- Exige disciplina para não vazar wiring entre módulos

---

## Decisão

Adotar **composition root por módulo**, sem lib de DI e sem container central.

- `server.ts` → deps compartilhadas
- `core/register-modules.ts` → registro dos módulos
- `modules/<nome>/<nome>.module.ts` → wiring interno do módulo

---

## Consequências

### Positivas

- Novos módulos não incham um arquivo global
- Fronteiras de módulo ficam claras
- Fácil substituir adapters nos testes
- Mantém Fastify desacoplado da composição

### Negativas

- Wiring manual continua existindo (localizado por módulo)
- Se o grafo ficar muito complexo no futuro, pode valer reavaliar uma lib de DI

---

## Referências

- [docs/backend/01-architecture.md](../../backend/01-architecture.md)
- [ADR 001 - Fastify](./001-use-fastify.md)
