import type { FastifyInstance } from "fastify";

import type { ReservationController } from "../controllers/reservation.controller";
import {
    createReservationSchema,
    reservationIdParamsSchema,
    userIdParamsSchema,
} from "../schemas/reservation.schema";

export async function reservationRoutes(
    app: FastifyInstance,
    controller: ReservationController,
) {
    app.post(
        "/reservations",
        { schema: { body: createReservationSchema } },
        controller.create,
    );
    app.get(
        "/reservations/:id",
        { schema: { params: reservationIdParamsSchema } },
        controller.getById,
    );
    app.get(
        "/users/:userId/reservations",
        { schema: { params: userIdParamsSchema } },
        controller.listByUser,
    );
    app.post(
        "/reservations/:id/cancel",
        { schema: { params: reservationIdParamsSchema } },
        controller.cancel,
    );
}
