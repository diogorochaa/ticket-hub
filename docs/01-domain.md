# TicketHub - Documento de Domínio

## Objetivo

O TicketHub é uma plataforma para venda de ingressos de eventos.

O sistema deve permitir que organizadores publiquem eventos e disponibilizem ingressos para venda, enquanto compradores podem reservar e adquirir esses ingressos de forma segura, garantindo que um mesmo ingresso nunca seja vendido para mais de uma pessoa.

Além da venda, o sistema deve lidar com concorrência, reservas temporárias, pagamentos, integrações externas e notificações.

---

# Atores

## Customer (Comprador)

Responsável por adquirir ingressos.

Permissões:

- Criar conta
- Fazer login
- Visualizar eventos
- Reservar ingressos
- Comprar ingressos
- Cancelar uma compra (quando permitido)
- Visualizar histórico de compras

---

## Organizer (Organizador)

Responsável pelos eventos.

Permissões:

- Criar eventos
- Editar eventos
- Criar setores
- Definir preços
- Acompanhar vendas
- Cancelar eventos

---

## Admin

Responsável pela administração da plataforma.

Permissões:

- Gerenciar usuários
- Gerenciar eventos
- Visualizar métricas
- Resolver problemas operacionais

---

# Entidades

## User

Representa qualquer usuário do sistema.

Tipos:

- CUSTOMER
- ORGANIZER
- ADMIN

---

## Event

Representa um evento disponível para venda.

Exemplos:

- Show
- Festival
- Teatro
- Campeonato
- Congresso

Um evento possui:

- Nome
- Descrição
- Data
- Local
- Organizador
- Setores

---

## Venue

Representa o local onde o evento acontecerá.

Exemplos:

- Arena
- Teatro
- Ginásio
- Estádio

Um local pode receber diversos eventos.

---

## Sector

Representa uma área do evento.

Exemplos:

- Pista
- Camarote
- VIP
- Arquibancada

Cada setor possui:

- Nome
- Quantidade de ingressos
- Preço

---

## Ticket

Representa um ingresso individual.

Cada Ticket pertence a:

- Um Evento
- Um Setor

Status possíveis:

- AVAILABLE
- RESERVED
- SOLD
- CANCELLED

---

## Reservation

Representa uma reserva temporária de um ingresso.

A reserva existe para impedir que outro usuário compre o mesmo ingresso durante o processo de pagamento.

Cada reserva possui:

- Usuário
- Ingresso
- Data de expiração

---

## Payment

Representa um pagamento.

Status possíveis:

- PENDING
- APPROVED
- REFUSED
- CANCELLED

Um pagamento está sempre associado a uma reserva.

---

# Fluxo principal

Cliente acessa o evento

↓

Seleciona um ingresso

↓

Sistema cria uma reserva

↓

Reserva possui tempo limite

↓

Pagamento iniciado

↓

Gateway processa o pagamento

↓

Webhook confirma o pagamento

↓

Sistema marca o Ticket como SOLD

↓

Sistema envia confirmação ao cliente

---

# Regras de Negócio

## RN001

Um Ticket pertence a apenas um Evento.

---

## RN002

Um Ticket pertence a apenas um Setor.

---

## RN003

Um Ticket só pode possuir um dos seguintes estados:

- AVAILABLE
- RESERVED
- SOLD
- CANCELLED

---

## RN004

Um Ticket em estado SOLD não pode ser reservado novamente.

---

## RN005

Um Ticket RESERVED não pode ser reservado por outro usuário.

---

## RN006

Toda reserva possui uma data de expiração.

---

## RN007

Quando uma reserva expira, o Ticket volta automaticamente para AVAILABLE.

---

## RN008

Um pagamento aprovado transforma o Ticket em SOLD.

---

## RN009

Um pagamento recusado libera novamente o Ticket.

---

## RN010

Todo pagamento deve possuir um identificador único para garantir idempotência.

---

## RN011

Um webhook recebido mais de uma vez não pode alterar o estado do sistema mais de uma vez.

---

## RN012

Todas as datas devem ser armazenadas em UTC.

---

# Requisitos Não Funcionais

O sistema deverá:

- Suportar milhares de acessos simultâneos.
- Garantir consistência durante compras concorrentes.
- Evitar pagamentos duplicados.
- Possibilitar escalabilidade horizontal.
- Possuir logs estruturados.
- Possuir monitoramento.
- Possuir rastreabilidade das operações.

---

# Tecnologias previstas

Backend

- Node.js
- Fastify
- Prisma
- PostgreSQL

Frontend

- React
- Vite
- TanStack Query
- Tailwind CSS
- shadcn/ui

Infraestrutura

- Docker
- Redis
- RabbitMQ
- MinIO
- Mailpit

Observabilidade

- Pino
- Prometheus
- Grafana

---

# Funcionalidades futuras

- QR Code do ingresso
- Check-in por QR Code
- Lista de espera
- Cupom de desconto
- Assentos numerados
- Transferência de ingresso
- Reembolso
- Dashboard do organizador
- Dashboard administrativo

---

# Documentação relacionada

- [Arquitetura da API](./02-architecture.md)
- [Módulo de usuários](./03-users-module.md)
- [ADRs](./adr/)
  - [001 — Fastify](./adr/001-use-fastify.md)
  - [002 — Composition root](./adr/002-composition-root-per-module.md)
  - [003 — Prisma](./adr/003-use-prisma.md)
  - [004 — PostgreSQL](./adr/004-use-postgresql.md)
  - [005 — Docker](./adr/005-use-docker.md)
  - [006 — Monorepo + Turborepo](./adr/006-use-monorepo-turborepo.md)
  - [007 — Auth JWT + refresh](./adr/007-auth-jwt-refresh.md)
- [Módulo de autenticação](./04-auth-module.md)