import type { Event } from "../entity/event";

export interface EventRepository {
    save(event: Event): Promise<void>;
    findById(id: string): Promise<Event | null>;
    findAll(): Promise<Event[]>;
    delete(event: Event): Promise<void>;
}
