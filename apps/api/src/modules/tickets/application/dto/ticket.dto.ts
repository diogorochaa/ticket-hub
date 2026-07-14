import type { TicketStatus } from "../../domain/entity/ticket";

export type TicketOutput = {
    id: string;
    eventId: string;
    sectorId: string;
    status: TicketStatus;
    createdAt: Date;
    updatedAt: Date;
};

export type GenerateTicketsInput = {
    sectorId: string;
    quantity: number;
};

export type UpdateTicketStatusInput = {
    id: string;
    status: TicketStatus;
};
