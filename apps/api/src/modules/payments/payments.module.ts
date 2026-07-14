import type { FastifyInstance } from "fastify";

import type { AppDeps } from "@/core/app-deps";
import { PrismaReservationRepository } from "@/modules/reservations/infra/prisma/prisma-reservation.repository";
import { PrismaTicketRepository } from "@/modules/tickets/infra/prisma/prisma-ticket.repository";
import { CreatePaymentUseCase } from "./application/use-cases/create-payment";
import { GetPaymentByIdUseCase } from "./application/use-cases/get-payment-by-id";
import { HandlePaymentWebhookUseCase } from "./application/use-cases/handle-payment-webhook";
import { PrismaPaymentRepository } from "./infra/prisma/prisma-payment.repository";
import { PaymentController } from "./presentation/controllers/payment.controller";
import { paymentRoutes } from "./presentation/routes/payment.routes";

export async function registerPaymentsModule(app: FastifyInstance, deps: AppDeps) {
    const paymentRepo = new PrismaPaymentRepository(deps.prisma);
    const reservationRepo = new PrismaReservationRepository(deps.prisma);
    const ticketRepo = new PrismaTicketRepository(deps.prisma);

    const controller = new PaymentController(
        new CreatePaymentUseCase(paymentRepo, reservationRepo),
        new GetPaymentByIdUseCase(paymentRepo),
        new HandlePaymentWebhookUseCase(paymentRepo, reservationRepo, ticketRepo),
    );
    await paymentRoutes(app, controller);
}
