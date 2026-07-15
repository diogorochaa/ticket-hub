import type { NavLink, SocialNavLink } from "@/components/shared/types/nav-link";
import { Banknote, CreditCard, Flag, ListChecks, MessageCircleCheck, Euro, DollarSign, ThumbsUp } from "lucide-react";

export const socialLinks: SocialNavLink[] = [
  {
    icon: MessageCircleCheck,
    label: "WhatsApp",
    to: "/",
  },
  {
    icon: ThumbsUp,
    label: "Facebook",
    to: "/",
  },
  {
    icon: Flag,
    label: "Twitter",
    to: "/",
  },
  {
    icon: ListChecks,
    label: "Lista de benefícios",
    to: "/",
  },
];

export const institutionalLinks: NavLink[] = [
  { label: "Sobre nós", to: "/" },
  { label: "Carreiras", to: "/" },
  { label: "Imprensa", to: "/" },
  { label: "Contato", to: "/" },
];

export const helpLinks: NavLink[] = [
  { label: "Central de Ajuda", to: "/" },
  { label: "Como comprar", to: "/" },
  { label: "Trocas e devoluções", to: "/" },
  { label: "Política de privacidade", to: "/" },
];

export const ticketLinks: NavLink[] = [
  { label: "Meus Ingressos", to: "/" },
  { label: "Transferir ingresso", to: "/" },
  { label: "Formas de pagamento", to: "/" },
  { label: "Venda seu evento", to: "/" },
];

export const paymentLinks: NavLink[] = [
  { icon: CreditCard, label: "Cartão de crédito", to: "/" },
  { icon: DollarSign, label: "Dinheiro", to: "/" },
  { icon: Euro, label: "Pix", to: "/" },
  { icon: Banknote, label: "Boleto", to: "/" },
];
