import type { Ticket } from "../entity/ticket";

export interface TicketRepository {
    save(ticket: Ticket): Promise<void>;
    saveMany(tickets: Ticket[]): Promise<void>;
    findById(id: string): Promise<Ticket | null>;
    findByEventId(eventId: string): Promise<Ticket[]>;
    findBySectorId(sectorId: string): Promise<Ticket[]>;
}
