import { randomUUID } from "node:crypto";

export type TicketStatus = "AVAILABLE" | "RESERVED" | "SOLD" | "CANCELLED";

interface CreateTicketProps {
    eventId: string;
    sectorId: string;
    status?: TicketStatus;
}

interface TicketProps {
    id: string;
    eventId: string;
    sectorId: string;
    status: TicketStatus;
    createdAt: Date;
    updatedAt: Date;
}

export class Ticket {
    private constructor(private readonly props: TicketProps) {}

    static create(props: CreateTicketProps): Ticket {
        return new Ticket({
            id: randomUUID(),
            eventId: props.eventId,
            sectorId: props.sectorId,
            status: props.status ?? "AVAILABLE",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    static restore(props: TicketProps): Ticket {
        return new Ticket(props);
    }

    get id() { return this.props.id; }
    get eventId() { return this.props.eventId; }
    get sectorId() { return this.props.sectorId; }
    get status() { return this.props.status; }
    get createdAt() { return this.props.createdAt; }
    get updatedAt() { return this.props.updatedAt; }

    changeStatus(status: TicketStatus) {
        this.props.status = status;
        this.props.updatedAt = new Date();
    }
}
