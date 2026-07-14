import type { FastifyReply, FastifyRequest } from "fastify";

import { ReservationNotFoundError } from "@/modules/reservations/domain/errors/reservation-not-found.error";
import type { CreatePaymentUseCase } from "../../application/use-cases/create-payment";
import type { GetPaymentByIdUseCase } from "../../application/use-cases/get-payment-by-id";
import type { HandlePaymentWebhookUseCase } from "../../application/use-cases/handle-payment-webhook";
import { PaymentAlreadyProcessedError } from "../../domain/errors/payment-already-processed.error";
import { PaymentNotFoundError } from "../../domain/errors/payment-not-found.error";
import type {
    CreatePaymentRequest,
    PaymentIdParams,
    PaymentWebhookRequest,
} from "../schemas/payment.schema";

export class PaymentController {
    constructor(
        private readonly createPaymentUseCase: CreatePaymentUseCase,
        private readonly getPaymentByIdUseCase: GetPaymentByIdUseCase,
        private readonly handlePaymentWebhookUseCase: HandlePaymentWebhookUseCase,
    ) {}

    create = async (
        request: FastifyRequest<{ Body: CreatePaymentRequest }>,
        reply: FastifyReply,
    ) => {
        try {
            const result = await this.createPaymentUseCase.execute(request.body);
            return reply.status(201).send(result);
        } catch (error) {
            if (error instanceof ReservationNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            throw error;
        }
    };

    getById = async (
        request: FastifyRequest<{ Params: PaymentIdParams }>,
        reply: FastifyReply,
    ) => {
        try {
            return reply.status(200).send(await this.getPaymentByIdUseCase.execute(request.params.id));
        } catch (error) {
            if (error instanceof PaymentNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            throw error;
        }
    };

    webhook = async (
        request: FastifyRequest<{ Body: PaymentWebhookRequest }>,
        reply: FastifyReply,
    ) => {
        try {
            const result = await this.handlePaymentWebhookUseCase.execute(request.body);
            return reply.status(200).send(result);
        } catch (error) {
            if (error instanceof PaymentNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
            if (error instanceof PaymentAlreadyProcessedError) {
                return reply.status(409).send({ message: error.message });
            }
            throw error;
        }
    };
}
