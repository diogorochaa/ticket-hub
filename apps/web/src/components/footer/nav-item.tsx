import { Link } from "react-router-dom";

interface FooterNavItemProps {
  children: React.ReactNode;
  to: string;
}

export function FooterNavItem({ children, to }: FooterNavItemProps) {
  return (
    <li className="text-gray-400 hover:text-white hover:underline transition-colors">
      <Link to={to}>{children}</Link>
    </li>
  );
}
