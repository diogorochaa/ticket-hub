import { Reservation, type ReservationStatus } from "../../domain/entity/reservation";

type PrismaReservation = {
    id: string;
    userId: string;
    ticketId: string;
    expiresAt: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
};

export class ReservationMapper {
    static toDomain(raw: PrismaReservation): Reservation {
        return Reservation.restore({
            ...raw,
            status: raw.status as ReservationStatus,
        });
    }

    static toPersistence(reservation: Reservation) {
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
}
