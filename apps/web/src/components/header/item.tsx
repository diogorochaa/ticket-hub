import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface HeaderItemProps {
  children: React.ReactNode;
  to: string;
  "aria-label"?: string;
  className?: string;
}

export function HeaderItem({
  children,
  to,
  "aria-label": ariaLabel,
  className,
}: HeaderItemProps) {
  return (
    <li className={cn("text-white hover:text-purple-700 transition-colors", className)}>
      <Link to={to} aria-label={ariaLabel}>
        {children}
      </Link>
    </li>
  );
}
