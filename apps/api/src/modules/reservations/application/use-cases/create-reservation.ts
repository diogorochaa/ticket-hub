import { TicketNotAvailableError } from "@/modules/tickets/domain/errors/ticket-not-available.error";
import { TicketNotFoundError } from "@/modules/tickets/domain/errors/ticket-not-found.error";
import type { TicketRepository } from "@/modules/tickets/domain/repository/ticket.repository";
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
    ) {}

    async execute(input: CreateReservationInput): Promise<ReservationOutput> {
        const ticket = await this.ticketRepository.findById(input.ticketId);
        if (!ticket) throw new TicketNotFoundError();
        if (ticket.status !== "AVAILABLE") throw new TicketNotAvailableError();

        const ttlMinutes = input.ttlMinutes ?? 15;
        const expiresAt = new Date(Date.now() + ttlMinutes * 60_000);

        ticket.changeStatus("RESERVED");
        await this.ticketRepository.save(ticket);

        const reservation = Reservation.create({
            userId: input.userId,
            ticketId: ticket.id,
            expiresAt,
        });
        await this.reservationRepository.save(reservation);

        return toReservationOutput(reservation);
    }
}
