import type { FooterNavItemProps } from "@/components/footer/footer-nav-item";
import { FooterNavItem } from "@/components/footer/footer-nav-item";

interface FooterNavProps {
    title: string;
    links: FooterNavItemProps[];
}

export function FooterNav({ title, links }: FooterNavProps) {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">{title}</h3>
            <ul className="flex flex-col gap-2">
                {links.map((link) => (
                    <FooterNavItem key={link.to} to={link.to}>{link.children}</FooterNavItem>
                ))}
            </ul>
        </div>

    )
}