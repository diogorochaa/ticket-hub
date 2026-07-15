# ADR 003 - Composition interna para layout de produto

## Status

Aceito (revisado)

---

## Contexto

O TicketHub tem blocos de layout (`Header`, `Footer`) com marca, navegação, ações e links.

Uma versão anterior expunha compound na page (`<Footer.Brand>…</Footer.Brand>`), o que deixava as pages verbosas demais para um layout fixo.

Era necessário manter organização em arquivos, sem empurrar a árvore inteira para cada page.

---

## Opções avaliadas

### Compound na page (`Footer.Brand`, `Header.Actions`, …)

Vantagens

- Slots visíveis e rearranjáveis por página

Desvantagens

- Pages ficam grandes para um shell compartilhado e estável
- Pouco ganho quando o layout não muda entre rotas

---

### Um único arquivo monolítico

Vantagens

- Simples

Desvantagens

- Difícil de navegar quando Header/Footer crescem

---

### Root autocontido + leafs internos

Vantagens

- Page: só `<Header />` / `<Footer />`
- Organização em `brand.tsx`, `nav.tsx`, `links.tsx`, etc.
- Dados tipados nos leafs; composição no `index`

Desvantagens

- Rearranjo por page exige mudar o root (aceitável enquanto o shell for único)

---

## Decisão

**Exports públicos** = componentes prontos (`Header`, `Footer`).

**Composição** = interna ao `index.tsx` da pasta, usando leafs da mesma feature.

Pages não montam `Footer.Nav` / `Header.Item`.

Detalhes: [02-components.md](../../frontend/02-components.md).

---

## Consequências

### Positivas

- Pages enxutas
- Código do layout ainda fatiado em arquivos

### Negativas

- Variantes por rota precisam de props ou roots distintos (ex.: `Header` vs `HeaderCheckout`) quando surgirem

---

## Referências

- [Componentes e composition](../../frontend/02-components.md)
- [Arquitetura do frontend](../../frontend/01-architecture.md)
- [ADR 002 - shadcn/ui](./002-use-shadcn.md)
