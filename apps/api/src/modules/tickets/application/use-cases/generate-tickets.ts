import type { SectorRepository } from "@/modules/sectors/domain/repository/sector.repository";
import { SectorNotFoundError } from "@/modules/sectors/domain/errors/sector-not-found.error";
import { Ticket } from "../../domain/entity/ticket";
import type { TicketRepository } from "../../domain/repository/ticket.repository";
import type { GenerateTicketsInput, TicketOutput } from "../dto/ticket.dto";

export function toTicketOutput(ticket: Ticket): TicketOutput {
    return {
        id: ticket.id,
        eventId: ticket.eventId,
        sectorId: ticket.sectorId,
        status: ticket.status,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
    };
}

export class GenerateTicketsUseCase {
    constructor(
        private readonly ticketRepository: TicketRepository,
        private readonly sectorRepository: SectorRepository,
    ) {}

    async execute(input: GenerateTicketsInput): Promise<TicketOutput[]> {
        const sector = await this.sectorRepository.findById(input.sectorId);
        if (!sector) throw new SectorNotFoundError();

        const tickets = Array.from({ length: input.quantity }, () =>
            Ticket.create({ eventId: sector.eventId, sectorId: sector.id }),
        );
        await this.ticketRepository.saveMany(tickets);
        return tickets.map(toTicketOutput);
    }
}
