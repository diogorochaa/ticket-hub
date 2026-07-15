import type { SocialNavLink } from "@/components/shared/types/nav-link";
import { Link } from "react-router-dom";

interface FooterSocialProps {
  links: SocialNavLink[];
}

export function FooterSocial({ links }: FooterSocialProps) {
  return (
    <nav aria-label="Redes sociais" className="flex items-center gap-4">
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <Link
            key={link.label}
            to={link.to}
            aria-label={link.label}
            className="bg-gray-700 p-2 rounded-md hover:bg-white/40 transition-colors"
          >
            <Icon className="w-4 h-4" aria-hidden />
          </Link>
        );
      })}
    </nav>
  );
}
