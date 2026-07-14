import { randomUUID } from "node:crypto";

export type EventStatus = "DRAFT" | "PUBLISHED" | "CANCELLED";

interface CreateEventProps {
    name: string;
    description: string;
    startsAt: Date;
    venueId: string;
    organizerId: string;
    status?: EventStatus;
}

interface EventProps extends Required<CreateEventProps> {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Event {
    private constructor(private readonly props: EventProps) {}

    static create(props: CreateEventProps): Event {
        return new Event({
            id: randomUUID(),
            status: props.status ?? "DRAFT",
            createdAt: new Date(),
            updatedAt: new Date(),
            name: props.name,
            description: props.description,
            startsAt: props.startsAt,
            venueId: props.venueId,
            organizerId: props.organizerId,
        });
    }

    static restore(props: EventProps): Event {
        return new Event(props);
    }

    get id() { return this.props.id; }
    get name() { return this.props.name; }
    get description() { return this.props.description; }
    get startsAt() { return this.props.startsAt; }
    get venueId() { return this.props.venueId; }
    get organizerId() { return this.props.organizerId; }
    get status() { return this.props.status; }
    get createdAt() { return this.props.createdAt; }
    get updatedAt() { return this.props.updatedAt; }

    update(props: Partial<Pick<CreateEventProps, "name" | "description" | "startsAt" | "venueId" | "status">>) {
        if (props.name !== undefined) this.props.name = props.name;
        if (props.description !== undefined) this.props.description = props.description;
        if (props.startsAt !== undefined) this.props.startsAt = props.startsAt;
        if (props.venueId !== undefined) this.props.venueId = props.venueId;
        if (props.status !== undefined) this.props.status = props.status;
        this.props.updatedAt = new Date();
    }

    cancel() {
        this.props.status = "CANCELLED";
        this.props.updatedAt = new Date();
    }
}
