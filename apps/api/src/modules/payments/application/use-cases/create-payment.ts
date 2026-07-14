import { ReservationNotFoundError } from "@/modules/reservations/domain/errors/reservation-not-found.error";
import type { ReservationRepository } from "@/modules/reservations/domain/repository/reservation.repository";
import { Payment } from "../../domain/entity/payment";
import type { PaymentRepository } from "../../domain/repository/payment.repository";
import type { CreatePaymentInput, PaymentOutput } from "../dto/payment.dto";

export function toPaymentOutput(payment: Payment): PaymentOutput {
    return {
        id: payment.id,
        reservationId: payment.reservationId,
        amountCents: payment.amountCents,
        status: payment.status,
        externalId: payment.externalId,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
    };
}

export class CreatePaymentUseCase {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly reservationRepository: ReservationRepository,
    ) {}

    async execute(input: CreatePaymentInput): Promise<PaymentOutput> {
        const reservation = await this.reservationRepository.findById(input.reservationId);
        if (!reservation) throw new ReservationNotFoundError();

        const existing = await this.paymentRepository.findByReservationId(input.reservationId);
        if (existing) return toPaymentOutput(existing);

        const payment = Payment.create({
            reservationId: input.reservationId,
            amountCents: input.amountCents,
            externalId: input.externalId,
        });
        await this.paymentRepository.save(payment);
        return toPaymentOutput(payment);
    }
}
