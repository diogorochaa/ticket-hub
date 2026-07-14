import type { TicketRepository } from "@/modules/tickets/domain/repository/ticket.repository";
import { ReservationNotFoundError } from "../../domain/errors/reservation-not-found.error";
import type { ReservationRepository } from "../../domain/repository/reservation.repository";
import type { ReservationOutput } from "../dto/reservation.dto";
import { toReservationOutput } from "./create-reservation";

export class CancelReservationUseCase {
    constructor(
        private readonly reservationRepository: ReservationRepository,
        private readonly ticketRepository: TicketRepository,
    ) {}

    async execute(id: string): Promise<ReservationOutput> {
        const reservation = await this.reservationRepository.findById(id);
        if (!reservation) throw new ReservationNotFoundError();

        reservation.cancel();
        await this.reservationRepository.save(reservation);

        const ticket = await this.ticketRepository.findById(reservation.ticketId);
        if (ticket && ticket.status === "RESERVED") {
            ticket.changeStatus("AVAILABLE");
            await this.ticketRepository.save(ticket);
        }

        return toReservationOutput(reservation);
    }
}
