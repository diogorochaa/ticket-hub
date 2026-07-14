import { Ticket, type TicketStatus } from "../../domain/entity/ticket";

type PrismaTicket = {
    id: string;
    eventId: string;
    sectorId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
};

export class TicketMapper {
    static toDomain(raw: PrismaTicket): Ticket {
        return Ticket.restore({
            ...raw,
            status: raw.status as TicketStatus,
        });
    }

    static toPersistence(ticket: Ticket) {
        return {
            id: ticket.id,
            eventId: ticket.eventId,
            sectorId: ticket.sectorId,
            status: ticket.status,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
        };
    }
}
