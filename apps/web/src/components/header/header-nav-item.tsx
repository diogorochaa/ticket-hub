import { Link } from "react-router-dom";

interface HeaderNavItemProps {
    children: React.ReactNode;
    to: string;
}

export function HeaderNavItem({ children, to }: HeaderNavItemProps) {
    return (
        <li className="text-white hover:text-purple-700 transition-colors">
            <Link to={to}>{children}</Link>
        </li>
    )
}