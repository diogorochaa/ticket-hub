import { Ticket } from "lucide-react";
import { Link } from "react-router-dom";

export function Logo() {
    return (
        <Link to="/" className="flex items-center gap-2">
            <Ticket className="w-8 h-8 rotate-160 text-purple-700" />
            <span className="text-2xl font-bold text-white">TicketHub</span>
        </Link>
    )
}