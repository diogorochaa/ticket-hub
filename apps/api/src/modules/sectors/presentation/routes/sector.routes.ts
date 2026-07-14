import type { FastifyInstance } from "fastify";

import type { SectorController } from "../controllers/sector.controller";
import {
    createSectorSchema,
    eventIdParamsSchema,
    sectorIdParamsSchema,
    updateSectorBodySchema,
} from "../schemas/sector.schema";

export async function sectorRoutes(app: FastifyInstance, controller: SectorController) {
    app.post(
        "/events/:eventId/sectors",
        { schema: { params: eventIdParamsSchema, body: createSectorSchema } },
        controller.create,
    );
    app.get(
        "/events/:eventId/sectors",
        { schema: { params: eventIdParamsSchema } },
        controller.listByEvent,
    );
    app.get("/sectors/:id", { schema: { params: sectorIdParamsSchema } }, controller.getById);
    app.patch(
        "/sectors/:id",
        { schema: { params: sectorIdParamsSchema, body: updateSectorBodySchema } },
        controller.update,
    );
    app.delete("/sectors/:id", { schema: { params: sectorIdParamsSchema } }, controller.delete);
}
