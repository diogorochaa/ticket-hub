import type { FastifyInstance } from "fastify";

import type { VenueController } from "../controllers/venue.controller";
import {
    createVenueSchema,
    updateVenueBodySchema,
    venueIdParamsSchema,
} from "../schemas/venue.schema";

export async function venueRoutes(app: FastifyInstance, controller: VenueController) {
    app.post("/venues", { schema: { body: createVenueSchema } }, controller.create);
    app.get("/venues", controller.list);
    app.get("/venues/:id", { schema: { params: venueIdParamsSchema } }, controller.getById);
    app.patch(
        "/venues/:id",
        { schema: { params: venueIdParamsSchema, body: updateVenueBodySchema } },
        controller.update,
    );
    app.delete("/venues/:id", { schema: { params: venueIdParamsSchema } }, controller.delete);
}
