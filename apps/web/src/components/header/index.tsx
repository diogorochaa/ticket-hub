import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Search, Ticket } from "lucide-react";

export function Header() {
    return (
        <header className="bg-black text-white items-center p-6">
            <nav className="flex justify-between items-center">
                <ul className="flex items-center gap-10">
                    <li>
                        <Link to="/" className="flex items-center gap-2">
                            <Ticket className="w-8 h-8 rotate-160 text-purple-700" />
                            <span className="text-2xl font-bold">TicketHub</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">Eventos</Link>
                    </li>
                    <li>
                        <Link to="/">Meus Ingressos</Link>
                    </li>
                    <li>
                        <Link to="/">Vantagens</Link>
                    </li>
                </ul>
                <ul className="flex items-center gap-4">
                    <li>
                        <Search className="w-6 h-6" />
                    </li>
                    <li>
                        <Button size="lg" variant="ghost" className="cursor-pointer">Entrar</Button>
                    </li>
                    <li>
                        <Button size="lg" className="cursor-pointer bg-purple-700 text-white">Cadastrar</Button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}