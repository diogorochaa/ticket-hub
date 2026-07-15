import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { helpLinks, institutionalLinks, paymentLinks, socialLinks, ticketLinks } from "@/components/footer/links";
import { FooterNav } from "@/components/footer/footer-nav";
import { FooterNavSocial } from "@/components/footer/footer-nav-social";

export function Footer() {
    return (
        <footer className="bg-black text-white  p-2">
            <div className="flex gap-20 items-center justify-center p-4">
                <div className="flex flex-col gap-2">
                    <Logo />
                    <p className="text-gray-400">
                        <span className="block">A sua plataforma completa</span>
                        <span className="block">para viver experiências</span>
                        <span className="block">inesquecíveis.</span>
                    </p>
                    <FooterNavSocial links={socialLinks} />

                </div>
                <FooterNav title="Institucional" links={institutionalLinks} />
                <FooterNav title="Ajuda" links={helpLinks} />
                <FooterNav title="Ingresso" links={ticketLinks} />
                <Separator orientation="vertical" className=" bg-gray-700" />
                <FooterNav title="Formas de pagamento" links={paymentLinks} />
            </div>

            <div className="flex flex-col items-center justify-center px-4">
                <Separator className="my-3 bg-gray-700" />
                <p>© 2026 TicketHub. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}