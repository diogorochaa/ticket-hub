import type { TicketRepository } from "@/modules/tickets/domain/repository/ticket.repository";
import { CacheKeys, RoutingKeys } from "@/shared/messaging/keys";
import type { CacheStore } from "@/shared/ports/cache-store";
import type { MessageBus } from "@/shared/ports/message-bus";
import { ReservationNotFoundError } from "../../domain/errors/reservation-not-found.error";
import type { ReservationRepository } from "../../domain/repository/reservation.repository";
import type { ReservationOutput } from "../dto/reservation.dto";
import { toReservationOutput } from "./create-reservation";

export class CancelReservationUseCase {
    constructor(
        private readonly reservationRepository: ReservationRepository,
        private readonly ticketRepository: TicketRepository,
        private readonly cache: CacheStore,
        private readonly messageBus: MessageBus,
    ) {}

    async execute(id: string): Promise<ReservationOutput> {
        const reservation = await this.reservationRepository.findById(id);
        if (!reservation) throw new ReservationNotFoundError();

        reservation.cancel();
        await this.reservationRepository.save(reservation);

        const ticket = await this.ticketRepository.findById(reservation.ticketId);
        if (ticket) {
            await this.ticketRepository.tryRelease(ticket.id);
            await this.cache.del(CacheKeys.sectorAvailable(ticket.sectorId));
            await this.messageBus.publish(RoutingKeys.ticketReleased, {
                reservationId: reservation.id,
                ticketId: ticket.id,
                sectorId: ticket.sectorId,
                reason: "cancelled",
            });
            await this.messageBus.publish(RoutingKeys.reservationCancelled, {
                reservationId: reservation.id,
                userId: reservation.userId,
            });
        }

        return toReservationOutput(reservation);
    }
}
