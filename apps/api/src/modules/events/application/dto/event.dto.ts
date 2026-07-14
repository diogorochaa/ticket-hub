import type { EventStatus } from "../../domain/entity/event";

export type EventOutput = {
    id: string;
    name: string;
    description: string;
    startsAt: Date;
    venueId: string;
    organizerId: string;
    status: EventStatus;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateEventInput = {
    name: string;
    description: string;
    startsAt: string;
    venueId: string;
    organizerId: string;
};

export type UpdateEventInput = {
    id: string;
    name?: string;
    description?: string;
    startsAt?: string;
    venueId?: string;
    status?: EventStatus;
};
