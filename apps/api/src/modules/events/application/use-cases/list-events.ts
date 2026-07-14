import type { EventRepository } from "../../domain/repository/event.repository";
import type { EventOutput } from "../dto/event.dto";
import { toOutput } from "./create-event";

export class ListEventsUseCase {
    constructor(private readonly eventRepository: EventRepository) {}

    async execute(): Promise<EventOutput[]> {
        const events = await this.eventRepository.findAll();
        return events.map(toOutput);
    }
}
