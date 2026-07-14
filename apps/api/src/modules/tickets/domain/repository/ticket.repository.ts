import type { Ticket } from "../entity/ticket";

export interface TicketRepository {
    save(ticket: Ticket): Promise<void>;
    saveMany(tickets: Ticket[]): Promise<void>;
    findById(id: string): Promise<Ticket | null>;
    findByEventId(eventId: string): Promise<Ticket[]>;
    findBySectorId(sectorId: string): Promise<Ticket[]>;
    /** Atomic AVAILABLE → RESERVED. Returns false if lost the race. */
    tryReserve(id: string): Promise<boolean>;
    /** Atomic RESERVED → AVAILABLE (cancel / refuse payment). */
    tryRelease(id: string): Promise<boolean>;
    /** Atomic RESERVED → SOLD (approved payment). */
    tryMarkSold(id: string): Promise<boolean>;
}
