import type { FastifyReply, FastifyRequest } from "fastify";

import type { CancelEventUseCase } from "../../application/use-cases/cancel-event";
import type { CreateEventUseCase } from "../../application/use-cases/create-event";
import type { GetEventByIdUseCase } from "../../application/use-cases/get-event-by-id";
import type { ListEventsUseCase } from "../../application/use-cases/list-events";
import type { UpdateEventUseCase } from "../../application/use-cases/update-event";
import { EventNotFoundError } from "../../domain/errors/event-not-found.error";
import type {
    CreateEventRequest,
    EventIdParams,
    UpdateEventBody,
} from "../schemas/event.schema";

export class EventController {
    constructor(
        private readonly createEventUseCase: CreateEventUseCase,
        private readonly listEventsUseCase: ListEventsUseCase,
        private readonly getEventByIdUseCase: GetEventByIdUseCase,
        private readonly updateEventUseCase: UpdateEventUseCase,
        private readonly cancelEventUseCase: CancelEventUseCase,
    ) {}

    create = async (request: FastifyRequest<{ Body: CreateEventRequest }>, reply: FastifyReply) => {
        const result = await this.createEventUseCase.execute(request.body);
        return reply.status(201).send(result);
    };

    list = async (_request: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send(await this.listEventsUseCase.execute());
    };

    getById = async (request: FastifyRequest<{ Params: EventIdParams }>, reply: FastifyReply) => {
        try {
            return reply.status(200).send(await this.getEventByIdUseCase.execute(request.params.id));
        } catch (error) {
            if (error instanceof EventNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            throw error;
        }
    };

    update = async (
        request: FastifyRequest<{ Params: EventIdParams; Body: UpdateEventBody }>,
        reply: FastifyReply,
    ) => {
        try {
            return reply.status(200).send(
                await this.updateEventUseCase.execute({ id: request.params.id, ...request.body }),
            );
        } catch (error) {
            if (error instanceof EventNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            throw error;
        }
    };

    cancel = async (request: FastifyRequest<{ Params: EventIdParams }>, reply: FastifyReply) => {
        try {
            return reply.status(200).send(await this.cancelEventUseCase.execute(request.params.id));
        } catch (error) {
            if (error instanceof EventNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            throw error;
        }
    };
}
