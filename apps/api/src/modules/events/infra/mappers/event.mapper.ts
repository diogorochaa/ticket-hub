import { Event, type EventStatus } from "../../domain/entity/event";

type PrismaEvent = {
    id: string;
    name: string;
    description: string;
    startsAt: Date;
    venueId: string;
    organizerId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
};

export class EventMapper {
    static toDomain(raw: PrismaEvent): Event {
        return Event.restore({
            ...raw,
            status: raw.status as EventStatus,
        });
    }

    static toPersistence(event: Event) {
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
}
