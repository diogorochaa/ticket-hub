import type { FastifyInstance } from "fastify";

import type { AppDeps } from "@/core/app-deps";
import { CreateSectorUseCase } from "./application/use-cases/create-sector";
import { DeleteSectorUseCase } from "./application/use-cases/delete-sector";
import { GetSectorByIdUseCase } from "./application/use-cases/get-sector-by-id";
import { ListSectorsByEventUseCase } from "./application/use-cases/list-sectors-by-event";
import { UpdateSectorUseCase } from "./application/use-cases/update-sector";
import { PrismaSectorRepository } from "./infra/prisma/prisma-sector.repository";
import { SectorController } from "./presentation/controllers/sector.controller";
import { sectorRoutes } from "./presentation/routes/sector.routes";

export async function registerSectorsModule(app: FastifyInstance, deps: AppDeps) {
    const repo = new PrismaSectorRepository(deps.prisma);
    const controller = new SectorController(
        new CreateSectorUseCase(repo),
        new ListSectorsByEventUseCase(repo),
        new GetSectorByIdUseCase(repo),
        new UpdateSectorUseCase(repo),
        new DeleteSectorUseCase(repo),
    );
    await sectorRoutes(app, controller);
}
