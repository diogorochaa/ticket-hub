import type { FastifyInstance } from "fastify";

import type { AppDeps } from "@/core/app-deps";
import { CreateVenueUseCase } from "./application/use-cases/create-venue";
import { DeleteVenueUseCase } from "./application/use-cases/delete-venue";
import { GetVenueByIdUseCase } from "./application/use-cases/get-venue-by-id";
import { ListVenuesUseCase } from "./application/use-cases/list-venues";
import { UpdateVenueUseCase } from "./application/use-cases/update-venue";
import { PrismaVenueRepository } from "./infra/prisma/prisma-venue.repository";
import { VenueController } from "./presentation/controllers/venue.controller";
import { venueRoutes } from "./presentation/routes/venue.routes";

export async function registerVenuesModule(app: FastifyInstance, deps: AppDeps) {
    const repo = new PrismaVenueRepository(deps.prisma);
    const controller = new VenueController(
        new CreateVenueUseCase(repo),
        new ListVenuesUseCase(repo),
        new GetVenueByIdUseCase(repo),
        new UpdateVenueUseCase(repo),
        new DeleteVenueUseCase(repo),
    );
    await venueRoutes(app, controller);
}
