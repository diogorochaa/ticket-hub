import type { ReservationRepository } from "@/modules/reservations/domain/repository/reservation.repository";
import type { TicketRepository } from "@/modules/tickets/domain/repository/ticket.repository";
import { PaymentAlreadyProcessedError } from "../../domain/errors/payment-already-processed.error";
import { PaymentNotFoundError } from "../../domain/errors/payment-not-found.error";
import type { PaymentRepository } from "../../domain/repository/payment.repository";
import type { PaymentOutput, PaymentWebhookInput } from "../dto/payment.dto";
import { toPaymentOutput } from "./create-payment";

export class HandlePaymentWebhookUseCase {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly reservationRepository: ReservationRepository,
        private readonly ticketRepository: TicketRepository,
    ) {}

    async execute(input: PaymentWebhookInput): Promise<PaymentOutput> {
        const payment = await this.paymentRepository.findById(input.paymentId);
        if (!payment) throw new PaymentNotFoundError();

        if (payment.status !== "PENDING") {
            // idempotency: already final
            if (
                (input.status === "APPROVED" && payment.status === "APPROVED") ||
                (input.status === "REFUSED" && payment.status === "REFUSED")
            ) {
                return toPaymentOutput(payment);
            }
            throw new PaymentAlreadyProcessedError();
        }

        const reservation = await this.reservationRepository.findById(payment.reservationId);
        if (!reservation) throw new PaymentNotFoundError();

        if (input.status === "APPROVED") {
            payment.approve();
            reservation.convert();
            await this.reservationRepository.save(reservation);

            const ticket = await this.ticketRepository.findById(reservation.ticketId);
            if (ticket) {
                ticket.changeStatus("SOLD");
                await this.ticketRepository.save(ticket);
            }
        } else {
            payment.refuse();
            reservation.cancel();
            await this.reservationRepository.save(reservation);

            const ticket = await this.ticketRepository.findById(reservation.ticketId);
            if (ticket && ticket.status === "RESERVED") {
                ticket.changeStatus("AVAILABLE");
                await this.ticketRepository.save(ticket);
            }
        }

        await this.paymentRepository.save(payment);
        return toPaymentOutput(payment);
    }
}
