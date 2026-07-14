import type { FastifyInstance } from "fastify";

import type { AppDeps } from "@/core/app-deps";
import { CancelEventUseCase } from "./application/use-cases/cancel-event";
import { CreateEventUseCase } from "./application/use-cases/create-event";
import { GetEventByIdUseCase } from "./application/use-cases/get-event-by-id";
import { ListEventsUseCase } from "./application/use-cases/list-events";
import { UpdateEventUseCase } from "./application/use-cases/update-event";
import { PrismaEventRepository } from "./infra/prisma/prisma-event.repository";
import { EventController } from "./presentation/controllers/event.controller";
import { eventRoutes } from "./presentation/routes/event.routes";

export async function registerEventsModule(app: FastifyInstance, deps: AppDeps) {
    const repo = new PrismaEventRepository(deps.prisma);
    const controller = new EventController(
        new CreateEventUseCase(repo),
        new ListEventsUseCase(repo),
        new GetEventByIdUseCase(repo),
        new UpdateEventUseCase(repo),
        new CancelEventUseCase(repo),
    );
    await eventRoutes(app, controller);
}
