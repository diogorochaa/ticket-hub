import type { ReservationStatus } from "../../domain/entity/reservation";

export type ReservationOutput = {
    id: string;
    userId: string;
    ticketId: string;
    expiresAt: Date;
    status: ReservationStatus;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateReservationInput = {
    userId: string;
    ticketId: string;
    ttlMinutes?: number;
};
