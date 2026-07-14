import { TicketLockBusyError } from "@/modules/tickets/domain/errors/ticket-lock-busy.error";
import { TicketNotAvailableError } from "@/modules/tickets/domain/errors/ticket-not-available.error";
import { TicketNotFoundError } from "@/modules/tickets/domain/errors/ticket-not-found.error";
import type { TicketRepository } from "@/modules/tickets/domain/repository/ticket.repository";
import { CacheKeys, LockKeys, RoutingKeys } from "@/shared/messaging/keys";
import type { CacheStore } from "@/shared/ports/cache-store";
import type { DistributedLock } from "@/shared/ports/distributed-lock";
import type { MessageBus } from "@/shared/ports/message-bus";
import { Reservation } from "../../domain/entity/reservation";
import type { ReservationRepository } from "../../domain/repository/reservation.repository";
import type { CreateReservationInput, ReservationOutput } from "../dto/reservation.dto";

export function toReservationOutput(reservation: Reservation): ReservationOutput {
    return {
        id: reservation.id,
        userId: reservation.userId,
        ticketId: reservation.ticketId,
        expiresAt: reservation.expiresAt,
        status: reservation.status,
        createdAt: reservation.createdAt,
        updatedAt: reservation.updatedAt,
    };
}

export class CreateReservationUseCase {
    constructor(
        private readonly reservationRepository: ReservationRepository,
        private readonly ticketRepository: TicketRepository,
        private readonly lock: DistributedLock,
        private readonly cache: CacheStore,
        private readonly messageBus: MessageBus,
    ) {}

    async execute(input: CreateReservationInput): Promise<ReservationOutput> {
        const ticket = await this.ticketRepository.findById(input.ticketId);
        if (!ticket) throw new TicketNotFoundError();
        if (ticket.status !== "AVAILABLE") throw new TicketNotAvailableError();

        const lockKey = LockKeys.ticket(ticket.id);
        const acquired = await this.lock.acquire(lockKey, 5);
        if (!acquired) throw new TicketLockBusyError();

        try {
            const reserved = await this.ticketRepository.tryReserve(ticket.id);
            if (!reserved) throw new TicketNotAvailableError();

            const ttlMinutes = input.ttlMinutes ?? 15;
            const expiresAt = new Date(Date.now() + ttlMinutes * 60_000);

            const reservation = Reservation.create({
                userId: input.userId,
                ticketId: ticket.id,
                expiresAt,
            });
            await this.reservationRepository.save(reservation);

            await this.cache.del(CacheKeys.sectorAvailable(ticket.sectorId));

            await this.messageBus.publish(RoutingKeys.ticketReserved, {
                reservationId: reservation.id,
                ticketId: ticket.id,
                sectorId: ticket.sectorId,
                eventId: ticket.eventId,
                userId: input.userId,
                expiresAt: expiresAt.toISOString(),
            });

            return toReservationOutput(reservation);
        } finally {
            await this.lock.release(lockKey);
        }
    }
}
