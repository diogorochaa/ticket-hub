import type { LucideIcon } from "lucide-react";

export interface NavLink {
  icon?: LucideIcon;
  to: string;
  label: string;
}

export interface SocialNavLink {
  to: string;
  label: string;
  icon: LucideIcon;
}
