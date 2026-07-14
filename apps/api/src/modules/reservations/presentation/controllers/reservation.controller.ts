import type { FastifyReply, FastifyRequest } from "fastify";

import { TicketNotAvailableError } from "@/modules/tickets/domain/errors/ticket-not-available.error";
import { TicketNotFoundError } from "@/modules/tickets/domain/errors/ticket-not-found.error";
import type { CancelReservationUseCase } from "../../application/use-cases/cancel-reservation";
import type { CreateReservationUseCase } from "../../application/use-cases/create-reservation";
import type { GetReservationByIdUseCase } from "../../application/use-cases/get-reservation-by-id";
import type { ListReservationsByUserUseCase } from "../../application/use-cases/list-reservations-by-user";
import { ReservationNotFoundError } from "../../domain/errors/reservation-not-found.error";
import type {
    CreateReservationRequest,
    ReservationIdParams,
    UserIdParams,
} from "../schemas/reservation.schema";

export class ReservationController {
    constructor(
        private readonly createReservationUseCase: CreateReservationUseCase,
        private readonly getReservationByIdUseCase: GetReservationByIdUseCase,
        private readonly listReservationsByUserUseCase: ListReservationsByUserUseCase,
        private readonly cancelReservationUseCase: CancelReservationUseCase,
    ) {}

    create = async (
        request: FastifyRequest<{ Body: CreateReservationRequest }>,
        reply: FastifyReply,
    ) => {
        try {
            const result = await this.createReservationUseCase.execute(request.body);
            return reply.status(201).send(result);
        } catch (error) {
            if (error instanceof TicketNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            if (error instanceof TicketNotAvailableError) {
                return reply.status(409).send({ message: error.message });
            }
            throw error;
        }
    };

    getById = async (
        request: FastifyRequest<{ Params: ReservationIdParams }>,
        reply: FastifyReply,
    ) => {
        try {
            return reply
                .status(200)
                .send(await this.getReservationByIdUseCase.execute(request.params.id));
        } catch (error) {
            if (error instanceof ReservationNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            throw error;
        }
    };

    listByUser = async (
        request: FastifyRequest<{ Params: UserIdParams }>,
        reply: FastifyReply,
    ) => {
        return reply
            .status(200)
            .send(await this.listReservationsByUserUseCase.execute(request.params.userId));
    };

    cancel = async (
        request: FastifyRequest<{ Params: ReservationIdParams }>,
        reply: FastifyReply,
    ) => {
        try {
            return reply
                .status(200)
                .send(await this.cancelReservationUseCase.execute(request.params.id));
        } catch (error) {
            if (error instanceof ReservationNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            throw error;
        }
    };
}
