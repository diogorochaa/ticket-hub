import type { FastifyReply, FastifyRequest } from "fastify";

import type { CreateSectorUseCase } from "../../application/use-cases/create-sector";
import type { DeleteSectorUseCase } from "../../application/use-cases/delete-sector";
import type { GetSectorByIdUseCase } from "../../application/use-cases/get-sector-by-id";
import type { ListSectorsByEventUseCase } from "../../application/use-cases/list-sectors-by-event";
import type { UpdateSectorUseCase } from "../../application/use-cases/update-sector";
import { SectorNotFoundError } from "../../domain/errors/sector-not-found.error";
import type {
    CreateSectorRequest,
    EventIdParams,
    SectorIdParams,
    UpdateSectorBody,
} from "../schemas/sector.schema";

export class SectorController {
    constructor(
        private readonly createSectorUseCase: CreateSectorUseCase,
        private readonly listSectorsByEventUseCase: ListSectorsByEventUseCase,
        private readonly getSectorByIdUseCase: GetSectorByIdUseCase,
        private readonly updateSectorUseCase: UpdateSectorUseCase,
        private readonly deleteSectorUseCase: DeleteSectorUseCase,
    ) {}

    create = async (
        request: FastifyRequest<{ Params: EventIdParams; Body: CreateSectorRequest }>,
        reply: FastifyReply,
    ) => {
        const result = await this.createSectorUseCase.execute({
            eventId: request.params.eventId,
            ...request.body,
        });
        return reply.status(201).send(result);
    };

    listByEvent = async (
        request: FastifyRequest<{ Params: EventIdParams }>,
        reply: FastifyReply,
    ) => {
        return reply
            .status(200)
            .send(await this.listSectorsByEventUseCase.execute(request.params.eventId));
    };

    getById = async (request: FastifyRequest<{ Params: SectorIdParams }>, reply: FastifyReply) => {
        try {
            return reply.status(200).send(await this.getSectorByIdUseCase.execute(request.params.id));
        } catch (error) {
            if (error instanceof SectorNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            throw error;
        }
    };

    update = async (
        request: FastifyRequest<{ Params: SectorIdParams; Body: UpdateSectorBody }>,
        reply: FastifyReply,
    ) => {
        try {
            return reply.status(200).send(
                await this.updateSectorUseCase.execute({ id: request.params.id, ...request.body }),
            );
        } catch (error) {
            if (error instanceof SectorNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            throw error;
        }
    };

    delete = async (request: FastifyRequest<{ Params: SectorIdParams }>, reply: FastifyReply) => {
        try {
            await this.deleteSectorUseCase.execute(request.params.id);
            return reply.status(204).send();
        } catch (error) {
            if (error instanceof SectorNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            throw error;
        }
    };
}
