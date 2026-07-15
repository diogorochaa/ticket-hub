import { FooterNavItem } from "@/components/footer/nav-item";
import type { NavLink } from "@/components/shared/types/nav-link";



interface FooterNavProps {
  title: string;
  links: NavLink[];
}

export function FooterNav({ title, links }: FooterNavProps) {
  return (
    <nav aria-label={title} className="flex flex-col gap-2">
      <h3 className="text-lg font-bold">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <FooterNavItem key={link.label} to={link.to} >
            {link.icon && <link.icon className="w-5 h-5 inline-block mr-2" />}
            {link.label}
          </FooterNavItem>
        ))}
      </ul>
    </nav>
  );
}
