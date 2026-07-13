# ADR 002 - Utilização do shadcn/ui como base de componentes

## Status

Aceito

---

## Contexto

O TicketHub precisa de uma UI consistente (auth, listagem de eventos, checkout, dashboards de organizador/admin) com boa acessibilidade e customização visual.

O frontend usa **React + Vite + Tailwind CSS**. Era necessário escolher a estratégia de componentes (design system).

---

## Opções avaliadas

### Biblioteca fechada (MUI, Ant Design, Chakra…)

Vantagens

- Pronto para uso
- Muitos componentes

Desvantagens

- Visual “de fábrica” difícil de customizar sem guerra de CSS
- Bundle e opiniões do tema pesados
- Menos alinhado a Tailwind já adotado no projeto

---

### Componentes 100% hand-made

Vantagens

- Controle total

Desvantagens

- Custo alto de a11y (dialog, select, focus trap)
- Tempo demais para um produto com foco em domínio de ingressos

---

### shadcn/ui (+ Radix/Base UI) + Tailwind

Vantagens

- Código **copiado para o repo** (`src/components/ui`) — ownership total
- Acessibilidade resolvida pelos primitives
- Customização via Tailwind e CSS variables do tema
- CLI (`shadcn add`) acelera novos componentes
- Combina com a stack já escolhida no domínio (React, Vite, Tailwind)

Desvantagens

- Não é um pacote versionado único: updates são manuais/CLI
- Exige manter aliases (`@/components`) e `components.json` corretos

---

## Decisão

Adotar **shadcn/ui** como base de componentes em `apps/web`.

- Componentes gerados em **`src/components/ui`**
- Utilitário `cn` em `src/lib/utils.ts`
- Tema/tokens em `src/index.css`
- Config: `apps/web/components.json`

Primitive atual do setup: Base UI (`@base-ui/react`), estilo configurado no `components.json`.

---

## Consequências

### Positivas

- UI acessível sem reinventar primitives
- Visual alinhado ao produto (Tailwind)
- Componentes versionados no git do monorepo

### Negativas

- Precisa de disciplina para não misturar “produto” com “ui” na mesma pasta sem critério
- Revisar diffs quando o CLI regenerar/atualizar um componente

### Uso

```sh
cd apps/web
pnpm dlx shadcn@latest add button
# → src/components/ui/button.tsx
```

Import:

```ts
import { Button } from "@/components/ui/button"
```

---

## Referências

- https://ui.shadcn.com
- [Arquitetura do frontend](../../frontend/01-architecture.md)
- [ADR 001 - TanStack Query](./001-use-tanstack-query.md)
