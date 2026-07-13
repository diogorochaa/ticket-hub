# ADR 001 - Utilização do Fastify como framework HTTP

## Status

Aceito

---

## Contexto

O TicketHub necessita de uma API HTTP responsável por gerenciar usuários, eventos, reservas, pagamentos e integrações externas.

A aplicação deverá ser escalável, possuir boa performance e permitir a adição de novos módulos sem aumentar excessivamente o acoplamento.

Durante o desenvolvimento também serão utilizados recursos como:

- Autenticação JWT
- Validação de dados
- Plugins
- Webhooks
- Logs estruturados
- Testes automatizados

Era necessário definir qual framework HTTP seria utilizado como base da aplicação.

---

## Opções avaliadas

### Express

Vantagens

- Grande comunidade
- Ecossistema maduro
- Ampla quantidade de exemplos

Desvantagens

- Menor performance quando comparado ao Fastify
- Menor foco em tipagem
- Estrutura baseada em middleware que pode dificultar a organização em projetos maiores

---

### NestJS

Vantagens

- Estrutura opinativa
- Injeção de dependência nativa
- Organização por módulos

Desvantagens

- Curva de aprendizado maior
- Abstração elevada para um projeto de estudos
- Parte da arquitetura já é imposta pelo framework
- Menor flexibilidade para demonstrar uma implementação própria da Arquitetura Hexagonal

---

### Fastify

Vantagens

- Alto desempenho
- Excelente suporte ao TypeScript
- Arquitetura baseada em plugins
- Baixo overhead
- Boa integração com validação de schemas
- Fácil integração com observabilidade
- Flexível para implementação da Arquitetura Hexagonal

Desvantagens

- Comunidade menor que Express
- Menor quantidade de exemplos disponíveis

---

## Decisão

Foi escolhido o **Fastify** como framework HTTP da API.

A escolha foi motivada principalmente por:

- Excelente desempenho.
- Arquitetura simples e desacoplada.
- Facilidade para organização em módulos.
- Boa integração com TypeScript.
- Compatibilidade com a Arquitetura Hexagonal adotada neste projeto.

Além disso, o Fastify permite adicionar funcionalidades através de plugins, mantendo a aplicação organizada e de fácil manutenção.

---

## Consequências

### Positivas

- API com alta performance.
- Baixo consumo de recursos.
- Código fortemente tipado.
- Facilidade para evolução da arquitetura.
- Boa experiência de desenvolvimento.

### Negativas

- Alguns exemplos da comunidade são encontrados apenas para Express.
- Algumas bibliotecas possuem integração nativa apenas com Express, exigindo adaptações.

---

## Impacto na arquitetura

O Fastify será utilizado apenas como camada de entrada da aplicação.

Toda regra de negócio permanecerá desacoplada do framework.

A estrutura será semelhante a:

Controller
↓

Use Case
↓

Domain
↓

Repository

Caso seja necessário substituir o Fastify por outro framework no futuro, a alteração deverá ocorrer apenas na camada de apresentação, sem impactar as regras de negócio.

---

## Referências

- https://fastify.dev
- https://fastify.dev/docs/latest/Reference/
- [ADR 002 - Composition root por módulo](./002-composition-root-per-module.md)
- [Arquitetura da API](../02-architecture.md)