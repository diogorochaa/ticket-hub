import type { FastifyInstance } from "fastify";

import type { EventController } from "../controllers/event.controller";
import {
    createEventSchema,
    eventIdParamsSchema,
    updateEventBodySchema,
} from "../schemas/event.schema";

export async function eventRoutes(app: FastifyInstance, controller: EventController) {
    app.post("/events", { schema: { body: createEventSchema } }, controller.create);
    app.get("/events", controller.list);
    app.get("/events/:id", { schema: { params: eventIdParamsSchema } }, controller.getById);
    app.patch(
        "/events/:id",
        { schema: { params: eventIdParamsSchema, body: updateEventBodySchema } },
        controller.update,
    );
    app.post("/events/:id/cancel", { schema: { params: eventIdParamsSchema } }, controller.cancel);
}
