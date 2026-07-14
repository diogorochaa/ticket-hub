import type { Reservation } from "../entity/reservation";

export interface ReservationRepository {
    save(reservation: Reservation): Promise<void>;
    findById(id: string): Promise<Reservation | null>;
    findByUserId(userId: string): Promise<Reservation[]>;
}
