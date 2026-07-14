import type { ReservationRepository } from "@/modules/reservations/domain/repository/reservation.repository";
import type { TicketRepository } from "@/modules/tickets/domain/repository/ticket.repository";
import { CacheKeys, RoutingKeys } from "@/shared/messaging/keys";
import type { CacheStore } from "@/shared/ports/cache-store";
import type { MessageBus } from "@/shared/ports/message-bus";
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
        private readonly cache: CacheStore,
        private readonly messageBus: MessageBus,
    ) {}

    async execute(input: PaymentWebhookInput): Promise<PaymentOutput> {
        const payment = await this.paymentRepository.findById(input.paymentId);
        if (!payment) throw new PaymentNotFoundError();

        if (payment.status !== "PENDING") {
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

        const ticket = await this.ticketRepository.findById(reservation.ticketId);

        if (input.status === "APPROVED") {
            payment.approve();
            reservation.convert();
            await this.reservationRepository.save(reservation);
            await this.ticketRepository.tryMarkSold(reservation.ticketId);

            if (ticket) {
                await this.cache.del(CacheKeys.sectorAvailable(ticket.sectorId));
                await this.messageBus.publish(RoutingKeys.ticketSold, {
                    paymentId: payment.id,
                    reservationId: reservation.id,
                    ticketId: ticket.id,
                    sectorId: ticket.sectorId,
                    eventId: ticket.eventId,
                });
            }
        } else {
            payment.refuse();
            reservation.cancel();
            await this.reservationRepository.save(reservation);
            await this.ticketRepository.tryRelease(reservation.ticketId);

            if (ticket) {
                await this.cache.del(CacheKeys.sectorAvailable(ticket.sectorId));
                await this.messageBus.publish(RoutingKeys.ticketReleased, {
                    reservationId: reservation.id,
                    ticketId: ticket.id,
                    sectorId: ticket.sectorId,
                    reason: "payment_refused",
                });
            }
        }

        await this.paymentRepository.save(payment);
        return toPaymentOutput(payment);
    }
}
