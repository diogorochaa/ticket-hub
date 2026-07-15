import type { FooterNavItemProps } from "@/components/footer/footer-nav-item";
import { Link } from "react-router-dom";

interface FooterNavSocialProps {
    links: FooterNavItemProps[];
}

export function FooterNavSocial({ links }: FooterNavSocialProps) {
    return (
        <div className="flex items-center gap-4">
            {links.map((link) => (
                <Link key={link.to} to={link.to} className="bg-gray-700 p-2 rounded-md hover:bg-white/40 transition-colors hover:underline">
                    {link.children}
                </Link>
            ))}
        </div>
    );
}