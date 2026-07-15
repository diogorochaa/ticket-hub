import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import { HeaderNavItem } from "./header-nav-item";

export function HeaderNav() {
    return (
        <nav className="flex justify-between items-center">
            <ul className="flex items-center gap-10">
                <li>
                    <Logo />
                </li>
                <HeaderNavItem to="/">Eventos</HeaderNavItem>
                <HeaderNavItem to="/">Meus Ingressos</HeaderNavItem>
                <HeaderNavItem to="/">Vantagens</HeaderNavItem>
            </ul>
            <ul className="flex items-center gap-4">
                <HeaderNavItem to="/">
                    <Search className="w-6 h-6" />
                </HeaderNavItem>
                <HeaderNavItem to="/">
                    <Button size="lg" variant="ghost" className="cursor-pointer">Entrar</Button>
                </HeaderNavItem>
                <HeaderNavItem to="/">
                    <Button size="lg" className="cursor-pointer bg-purple-700 text-white">Cadastrar</Button>
                </HeaderNavItem>
            </ul>
        </nav>
    )
}