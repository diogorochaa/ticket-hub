import { Link } from "react-router-dom";

interface HeaderItemProps {
  children: React.ReactNode;
  to: string;
  "aria-label"?: string;
}

export function HeaderItem({
  children,
  to,
  "aria-label": ariaLabel,
}: HeaderItemProps) {
  return (
    <li className="text-white hover:text-purple-700 transition-colors">
      <Link to={to} aria-label={ariaLabel}>
        {children}
      </Link>
    </li>
  );
}
