import type { FastifyInstance } from "fastify";

import type { TicketController } from "../controllers/ticket.controller";
import {
    eventIdParamsSchema,
    generateTicketsSchema,
    sectorIdParamsSchema,
    ticketIdParamsSchema,
    updateTicketStatusSchema,
} from "../schemas/ticket.schema";

export async function ticketRoutes(app: FastifyInstance, controller: TicketController) {
    app.post(
        "/sectors/:sectorId/tickets",
        { schema: { params: sectorIdParamsSchema, body: generateTicketsSchema } },
        controller.generate,
    );
    app.get(
        "/events/:eventId/tickets",
        { schema: { params: eventIdParamsSchema } },
        controller.listByEvent,
    );
    app.get("/tickets/:id", { schema: { params: ticketIdParamsSchema } }, controller.getById);
    app.patch(
        "/tickets/:id/status",
        { schema: { params: ticketIdParamsSchema, body: updateTicketStatusSchema } },
        controller.updateStatus,
    );
}
