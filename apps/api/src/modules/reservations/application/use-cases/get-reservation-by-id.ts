import { ReservationNotFoundError } from "../../domain/errors/reservation-not-found.error";
import type { ReservationRepository } from "../../domain/repository/reservation.repository";
import type { ReservationOutput } from "../dto/reservation.dto";
import { toReservationOutput } from "./create-reservation";

export class GetReservationByIdUseCase {
    constructor(private readonly reservationRepository: ReservationRepository) {}

    async execute(id: string): Promise<ReservationOutput> {
        const reservation = await this.reservationRepository.findById(id);
        if (!reservation) throw new ReservationNotFoundError();
        return toReservationOutput(reservation);
    }
}
