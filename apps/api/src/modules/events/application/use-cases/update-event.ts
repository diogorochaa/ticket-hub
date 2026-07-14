import { EventNotFoundError } from "../../domain/errors/event-not-found.error";
import type { EventRepository } from "../../domain/repository/event.repository";
import type { EventOutput, UpdateEventInput } from "../dto/event.dto";
import { toOutput } from "./create-event";

export class UpdateEventUseCase {
    constructor(private readonly eventRepository: EventRepository) {}

    async execute(input: UpdateEventInput): Promise<EventOutput> {
        const event = await this.eventRepository.findById(input.id);
        if (!event) throw new EventNotFoundError();
        event.update({
            name: input.name,
            description: input.description,
            startsAt: input.startsAt ? new Date(input.startsAt) : undefined,
            venueId: input.venueId,
            status: input.status,
        });
        await this.eventRepository.save(event);
        return toOutput(event);
    }
}
