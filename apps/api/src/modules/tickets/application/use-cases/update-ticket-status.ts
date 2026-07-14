import { TicketNotFoundError } from "../../domain/errors/ticket-not-found.error";
import type { TicketRepository } from "../../domain/repository/ticket.repository";
import type { TicketOutput, UpdateTicketStatusInput } from "../dto/ticket.dto";
import { toTicketOutput } from "./generate-tickets";

export class UpdateTicketStatusUseCase {
    constructor(private readonly ticketRepository: TicketRepository) {}

    async execute(input: UpdateTicketStatusInput): Promise<TicketOutput> {
        const ticket = await this.ticketRepository.findById(input.id);
        if (!ticket) throw new TicketNotFoundError();
        ticket.changeStatus(input.status);
        await this.ticketRepository.save(ticket);
        return toTicketOutput(ticket);
    }
}
