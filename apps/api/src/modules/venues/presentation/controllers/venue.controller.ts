import type { FastifyReply, FastifyRequest } from "fastify";

import type { CreateVenueUseCase } from "../../application/use-cases/create-venue";
import type { DeleteVenueUseCase } from "../../application/use-cases/delete-venue";
import type { GetVenueByIdUseCase } from "../../application/use-cases/get-venue-by-id";
import type { ListVenuesUseCase } from "../../application/use-cases/list-venues";
import type { UpdateVenueUseCase } from "../../application/use-cases/update-venue";
import { VenueNotFoundError } from "../../domain/errors/venue-not-found.error";
import type {
    CreateVenueRequest,
    UpdateVenueBody,
    VenueIdParams,
} from "../schemas/venue.schema";

export class VenueController {
    constructor(
        private readonly createVenueUseCase: CreateVenueUseCase,
        private readonly listVenuesUseCase: ListVenuesUseCase,
        private readonly getVenueByIdUseCase: GetVenueByIdUseCase,
        private readonly updateVenueUseCase: UpdateVenueUseCase,
        private readonly deleteVenueUseCase: DeleteVenueUseCase,
    ) {}

    create = async (
        request: FastifyRequest<{ Body: CreateVenueRequest }>,
        reply: FastifyReply,
    ) => {
        const result = await this.createVenueUseCase.execute(request.body);
        return reply.status(201).send(result);
    };

    list = async (_request: FastifyRequest, reply: FastifyReply) => {
        const result = await this.listVenuesUseCase.execute();
        return reply.status(200).send(result);
    };

    getById = async (
        request: FastifyRequest<{ Params: VenueIdParams }>,
        reply: FastifyReply,
    ) => {
        try {
            const result = await this.getVenueByIdUseCase.execute(request.params.id);
            return reply.status(200).send(result);
        } catch (error) {
            if (error instanceof VenueNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            throw error;
        }
    };

    update = async (
        request: FastifyRequest<{ Params: VenueIdParams; Body: UpdateVenueBody }>,
        reply: FastifyReply,
    ) => {
        try {
            const result = await this.updateVenueUseCase.execute({
                id: request.params.id,
                ...request.body,
            });
            return reply.status(200).send(result);
        } catch (error) {
            if (error instanceof VenueNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            throw error;
        }
    };

    delete = async (
        request: FastifyRequest<{ Params: VenueIdParams }>,
        reply: FastifyReply,
    ) => {
        try {
            await this.deleteVenueUseCase.execute(request.params.id);
            return reply.status(204).send();
        } catch (error) {
            if (error instanceof VenueNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            throw error;
        }
    };
}
