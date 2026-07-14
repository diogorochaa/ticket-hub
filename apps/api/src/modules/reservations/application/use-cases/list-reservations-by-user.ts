import type { ReservationRepository } from "../../domain/repository/reservation.repository";
import type { ReservationOutput } from "../dto/reservation.dto";
import { toReservationOutput } from "./create-reservation";

export class ListReservationsByUserUseCase {
    constructor(private readonly reservationRepository: ReservationRepository) {}

    async execute(userId: string): Promise<ReservationOutput[]> {
        const reservations = await this.reservationRepository.findByUserId(userId);
        return reservations.map(toReservationOutput);
    }
}
