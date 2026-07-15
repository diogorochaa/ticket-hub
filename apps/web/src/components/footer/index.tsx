import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";

import { FooterCopyright } from "./copyright";
import {
  helpLinks,
  institutionalLinks,
  paymentLinks,
  socialLinks,
  ticketLinks,
} from "./links";
import { FooterNav } from "./nav";
import { FooterSocial } from "./social";

export function Footer() {
  return (
    <footer className="bg-black text-white p-2">
      <div className="flex gap-20 items-center justify-center p-4">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="text-gray-400">
            <span className="block">A sua plataforma completa</span>
            <span className="block">para viver experiências</span>
            <span className="block">inesquecíveis.</span>
          </p>
          <FooterSocial links={socialLinks} />
        </div>
        <FooterNav title="Institucional" links={institutionalLinks} />
        <FooterNav title="Ajuda" links={helpLinks} />
        <FooterNav title="Ingresso" links={ticketLinks} />
        <Separator orientation="vertical" className="bg-gray-700" />
        <FooterNav title="Formas de pagamento" links={paymentLinks} />
      </div>
      <FooterCopyright />
    </footer>
  );
}
