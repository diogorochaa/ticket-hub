import type { FooterNavItemProps } from "@/components/footer/footer-nav-item";
import { Flag, ListChecks, MessageCircleCheck, ThumbsUp } from "lucide-react";

interface LinkProps {
    children: React.ReactNode;
    to: string;
}

export const socialLinks: FooterNavItemProps[] = [
    {
        children: <MessageCircleCheck className="w-4 h-4" />,
        to: "/",
    },
    {
        children: <ThumbsUp className="w-4 h-4" />,
        to: "/",
    },
    {
        children: <Flag className="w-4 h-4" />,
        to: "/",
    },
    {
        children: <ListChecks className="w-4 h-4" />,
        to: "/",
    },
]

export const institutionalLinks: LinkProps[] = [
    {
        children: "Sobre nós",
        to: "/",
    },
    {
        children: "Carreiras",
        to: "/",
    },
    {
        children: "Imprensa",
        to: "/",
    },
    {
        children: "Contato",
        to: "/",
    },
]

export const helpLinks: LinkProps[] = [
    {
        children: "Central de Ajuda",
        to: "/",
    },
    {
        children: "Como comprar",
        to: "/",
    },
    {
        children: "Trocas e devoluções",
        to: "/",
    },
    {
        children: "Política de privacidade",
        to: "/",
    },
]

export const ticketLinks: LinkProps[] = [
    {
        children: "Meus Ingressos",
        to: "/",
    },
    {
        children: "Transferir ingresso",
        to: "/",
    },
    {
        children: "Formas de pagamento",
        to: "/",
    },
    {
        children: "Venda seu evento",
        to: "/",
    },
]

export const paymentLinks: LinkProps[] = [
    {
        children: "Cartão de crédito",
        to: "/",
    },
    {
        children: "Boleto",
        to: "/",
    },
    {
        children: "Pix",
        to: "/",
    },
    {
        children: "Transferência bancária",
        to: "/",
    },
]