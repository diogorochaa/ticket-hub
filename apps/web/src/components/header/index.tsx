import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import { HeaderItem } from "./item";

export function Header() {
  return (
    <header className="bg-black items-center p-6">
      <nav
        aria-label="Principal"
        className="flex justify-between items-center"
      >
        <div className="flex items-center gap-10">

          <Logo />

          <ul className="flex items-center gap-10">
            <HeaderItem to="/">Eventos</HeaderItem>
            <HeaderItem to="/">Meus Ingressos</HeaderItem>
            <HeaderItem to="/">Vantagens</HeaderItem>
          </ul>
        </div>
        <ul className="flex items-center gap-4">
          <HeaderItem to="/" aria-label="Buscar">
            <Search className="w-6 h-6" aria-hidden />
          </HeaderItem>
          <HeaderItem to="/">
            <Button size="lg" variant="ghost" className="cursor-pointer">
              Entrar
            </Button>
          </HeaderItem>
          <HeaderItem to="/">
            <Button
              size="lg"
              className="cursor-pointer bg-purple-700 text-white"
            >
              Cadastrar
            </Button>
          </HeaderItem>
        </ul>
      </nav>
    </header>
  );
}
