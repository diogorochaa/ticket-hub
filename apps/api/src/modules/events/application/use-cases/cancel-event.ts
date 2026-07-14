import { EventNotFoundError } from "../../domain/errors/event-not-found.error";
import type { EventRepository } from "../../domain/repository/event.repository";
import type { EventOutput } from "../dto/event.dto";
import { toOutput } from "./create-event";

export class CancelEventUseCase {
    constructor(private readonly eventRepository: EventRepository) {}

    async execute(id: string): Promise<EventOutput> {
        const event = await this.eventRepository.findById(id);
        if (!event) throw new EventNotFoundError();
        event.cancel();
        await this.eventRepository.save(event);
        return toOutput(event);
    }
}
