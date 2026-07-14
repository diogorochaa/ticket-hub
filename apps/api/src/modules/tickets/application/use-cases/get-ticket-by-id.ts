import { TicketNotFoundError } from "../../domain/errors/ticket-not-found.error";
import type { TicketRepository } from "../../domain/repository/ticket.repository";
import type { TicketOutput } from "../dto/ticket.dto";
import { toTicketOutput } from "./generate-tickets";

export class GetTicketByIdUseCase {
    constructor(private readonly ticketRepository: TicketRepository) {}

    async execute(id: string): Promise<TicketOutput> {
        const ticket = await this.ticketRepository.findById(id);
        if (!ticket) throw new TicketNotFoundError();
        return toTicketOutput(ticket);
    }
}
