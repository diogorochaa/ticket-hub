import type { FastifyReply, FastifyRequest } from "fastify";

import { SectorNotFoundError } from "@/modules/sectors/domain/errors/sector-not-found.error";
import type { GenerateTicketsUseCase } from "../../application/use-cases/generate-tickets";
import type { GetTicketByIdUseCase } from "../../application/use-cases/get-ticket-by-id";
import type { ListTicketsByEventUseCase } from "../../application/use-cases/list-tickets-by-event";
import type { UpdateTicketStatusUseCase } from "../../application/use-cases/update-ticket-status";
import { TicketNotFoundError } from "../../domain/errors/ticket-not-found.error";
import type {
    EventIdParams,
    GenerateTicketsRequest,
    SectorIdParams,
    TicketIdParams,
    UpdateTicketStatusBody,
} from "../schemas/ticket.schema";

export class TicketController {
    constructor(
        private readonly generateTicketsUseCase: GenerateTicketsUseCase,
        private readonly listTicketsByEventUseCase: ListTicketsByEventUseCase,
        private readonly getTicketByIdUseCase: GetTicketByIdUseCase,
        private readonly updateTicketStatusUseCase: UpdateTicketStatusUseCase,
    ) {}

    generate = async (
        request: FastifyRequest<{ Params: SectorIdParams; Body: GenerateTicketsRequest }>,
        reply: FastifyReply,
    ) => {
        try {
            const result = await this.generateTicketsUseCase.execute({
                sectorId: request.params.sectorId,
                quantity: request.body.quantity,
            });
            return reply.status(201).send(result);
        } catch (error) {
            if (error instanceof SectorNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            throw error;
        }
    };

    listByEvent = async (
        request: FastifyRequest<{ Params: EventIdParams }>,
        reply: FastifyReply,
    ) => {
        return reply
            .status(200)
            .send(await this.listTicketsByEventUseCase.execute(request.params.eventId));
    };

    getById = async (request: FastifyRequest<{ Params: TicketIdParams }>, reply: FastifyReply) => {
        try {
            return reply.status(200).send(await this.getTicketByIdUseCase.execute(request.params.id));
        } catch (error) {
            if (error instanceof TicketNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            throw error;
        }
    };

    updateStatus = async (
        request: FastifyRequest<{ Params: TicketIdParams; Body: UpdateTicketStatusBody }>,
        reply: FastifyReply,
    ) => {
        try {
            return reply.status(200).send(
                await this.updateTicketStatusUseCase.execute({
                    id: request.params.id,
                    status: request.body.status,
                }),
            );
        } catch (error) {
            if (error instanceof TicketNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            throw error;
        }
    };
}
