import type { TicketRepository } from "../../domain/repository/ticket.repository";
import type { TicketOutput } from "../dto/ticket.dto";
import { toTicketOutput } from "./generate-tickets";

export class ListTicketsByEventUseCase {
    constructor(private readonly ticketRepository: TicketRepository) {}

    async execute(eventId: string): Promise<TicketOutput[]> {
        const tickets = await this.ticketRepository.findByEventId(eventId);
        return tickets.map(toTicketOutput);
    }
}
