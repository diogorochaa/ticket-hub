import { Event } from "../../domain/entity/event";
import type { EventRepository } from "../../domain/repository/event.repository";
import type { CreateEventInput, EventOutput } from "../dto/event.dto";

export class CreateEventUseCase {
    constructor(private readonly eventRepository: EventRepository) {}

    async execute(input: CreateEventInput): Promise<EventOutput> {
        const event = Event.create({
            name: input.name,
            description: input.description,
            startsAt: new Date(input.startsAt),
            venueId: input.venueId,
            organizerId: input.organizerId,
        });
        await this.eventRepository.save(event);
        return toOutput(event);
    }
}

export function toOutput(event: Event): EventOutput {
    return {
        id: event.id,
        name: event.name,
        description: event.description,
        startsAt: event.startsAt,
        venueId: event.venueId,
        organizerId: event.organizerId,
        status: event.status,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
    };
}
