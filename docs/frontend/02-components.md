# TicketHub — Componentes e composition

## Princípios

1. **`ui/` = shadcn** — primitivos acessíveis, sem regra de produto.
2. **Produto = pastas por feature** — `header/`, `footer/`, `logo/`.
3. **Pages usam o mínimo** — `<Header />` e `<Footer />`; a composição fica dentro do próprio componente.
4. **Internamente** — split em leafs (`brand`, `nav`, `item`, …) compostos no `index.tsx`.
5. **Dados de navegação tipados** — `NavLink` / `SocialNavLink`, sem React nodes nos arrays.
6. **Semântica HTML** — logo fora de listas de links; `nav` com `aria-label`; ícones com label.

## Quando usar cada padrão

| Situação | Preferir |
|----------|----------|
| Header / Footer na page | `<Header />` / `<Footer />` autocontidos |
| Organização interna do layout | Leafs na pasta do feature, compostos no `index` |
| Conteúdo estático repetível (colunas de links) | Dados (`links.tsx`) + leaf (`nav.tsx`) |
| Primitivo a11y / form control | shadcn em `components/ui` |

## Header / Footer

Export público:

```tsx
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

<>
  <Header />
  {/* conteúdo da page */}
  <Footer />
</>
```

A árvore de marca, nav e ações vive em `components/header/index.tsx` e `components/footer/index.tsx`.

## Navegação tipada

Tipos em `src/components/nav-link.ts`:

```ts
NavLink { to, label }
SocialNavLink { to, label, icon: LucideIcon }
```

Dados em `footer/links.tsx` — ícone como ref, não JSX:

```ts
{ icon: MessageCircleCheck, label: "WhatsApp", to: "/" }
```

## shadcn vs produto

```ts
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
```

Não coloque regra de negócio ou dados de domínio em `components/ui`.

## Checklist ao criar um layout de produto

- [ ] Page só importa o root (`Header`, `Footer`)
- [ ] Composição detalhada no `index` da pasta
- [ ] Links tipados com `label`/`to`; keys estáveis
- [ ] Acessibilidade: landmarks, `aria-label` em ícones
- [ ] Estilos via Tailwind; reutilizar `ui/` quando for primitivo

## Referências

- [01 — Arquitetura](./01-architecture.md)
- [ADR 003 — Composition interna](../adr/frontend/003-use-compound-components.md)
- [ADR 002 — shadcn/ui](../adr/frontend/002-use-shadcn.md)
