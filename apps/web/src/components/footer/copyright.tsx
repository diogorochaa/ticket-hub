import type { PropsWithChildren } from "react";

import { Separator } from "@/components/ui/separator";

interface FooterCopyrightProps extends PropsWithChildren {
  year?: number;
}

export function FooterCopyright({
  children,
  year = new Date().getFullYear(),
}: FooterCopyrightProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <Separator className="my-3 bg-gray-700" />
      <p>{children ?? `© ${year} TicketHub. Todos os direitos reservados.`}</p>
    </div>
  );
}
