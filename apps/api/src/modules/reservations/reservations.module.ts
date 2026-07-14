import type { FastifyInstance } from "fastify";

import type { AppDeps } from "@/core/app-deps";
import { PrismaTicketRepository } from "@/modules/tickets/infra/prisma/prisma-ticket.repository";
import { CancelReservationUseCase } from "./application/use-cases/cancel-reservation";
import { CreateReservationUseCase } from "./application/use-cases/create-reservation";
import { GetReservationByIdUseCase } from "./application/use-cases/get-reservation-by-id";
import { ListReservationsByUserUseCase } from "./application/use-cases/list-reservations-by-user";
import { PrismaReservationRepository } from "./infra/prisma/prisma-reservation.repository";
import { ReservationController } from "./presentation/controllers/reservation.controller";
import { reservationRoutes } from "./presentation/routes/reservation.routes";

export async function registerReservationsModule(app: FastifyInstance, deps: AppDeps) {
    const reservationRepo = new PrismaReservationRepository(deps.prisma);
    const ticketRepo = new PrismaTicketRepository(deps.prisma);
    const controller = new ReservationController(
        new CreateReservationUseCase(
            reservationRepo,
            ticketRepo,
            deps.lock,
            deps.cache,
            deps.messageBus,
        ),
        new GetReservationByIdUseCase(reservationRepo),
        new ListReservationsByUserUseCase(reservationRepo),
        new CancelReservationUseCase(
            reservationRepo,
            ticketRepo,
            deps.cache,
            deps.messageBus,
        ),
    );
    await reservationRoutes(app, controller);
}
