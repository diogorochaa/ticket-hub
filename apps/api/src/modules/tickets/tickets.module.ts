import type { FastifyInstance } from "fastify";

import type { AppDeps } from "@/core/app-deps";
import { PrismaSectorRepository } from "@/modules/sectors/infra/prisma/prisma-sector.repository";
import { GenerateTicketsUseCase } from "./application/use-cases/generate-tickets";
import { GetTicketByIdUseCase } from "./application/use-cases/get-ticket-by-id";
import { ListTicketsByEventUseCase } from "./application/use-cases/list-tickets-by-event";
import { UpdateTicketStatusUseCase } from "./application/use-cases/update-ticket-status";
import { PrismaTicketRepository } from "./infra/prisma/prisma-ticket.repository";
import { TicketController } from "./presentation/controllers/ticket.controller";
import { ticketRoutes } from "./presentation/routes/ticket.routes";

export async function registerTicketsModule(app: FastifyInstance, deps: AppDeps) {
    const ticketRepo = new PrismaTicketRepository(deps.prisma);
    const sectorRepo = new PrismaSectorRepository(deps.prisma);
    const controller = new TicketController(
        new GenerateTicketsUseCase(ticketRepo, sectorRepo),
        new ListTicketsByEventUseCase(ticketRepo),
        new GetTicketByIdUseCase(ticketRepo),
        new UpdateTicketStatusUseCase(ticketRepo),
    );
    await ticketRoutes(app, controller);
}
