import { Link } from "react-router-dom";

export interface FooterNavItemProps {
    children: React.ReactNode;
    to: string;
}

export function FooterNavItem({ children, to }: FooterNavItemProps) {
    return (
        <li className="text-gray-400 hover:text-white transition-colors">
            <Link to={to}>{children}</Link>
        </li>
    )
}