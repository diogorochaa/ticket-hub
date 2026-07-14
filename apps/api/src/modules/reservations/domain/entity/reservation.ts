import { randomUUID } from "node:crypto";

export type ReservationStatus = "ACTIVE" | "EXPIRED" | "CANCELLED" | "CONVERTED";

interface CreateReservationProps {
    userId: string;
    ticketId: string;
    expiresAt: Date;
}

interface ReservationProps extends CreateReservationProps {
    id: string;
    status: ReservationStatus;
    createdAt: Date;
    updatedAt: Date;
}

export class Reservation {
    private constructor(private readonly props: ReservationProps) {}

    static create(props: CreateReservationProps): Reservation {
        return new Reservation({
            id: randomUUID(),
            status: "ACTIVE",
            createdAt: new Date(),
            updatedAt: new Date(),
            ...props,
        });
    }

    static restore(props: ReservationProps): Reservation {
        return new Reservation(props);
    }

    get id() { return this.props.id; }
    get userId() { return this.props.userId; }
    get ticketId() { return this.props.ticketId; }
    get expiresAt() { return this.props.expiresAt; }
    get status() { return this.props.status; }
    get createdAt() { return this.props.createdAt; }
    get updatedAt() { return this.props.updatedAt; }

    get isExpired() {
        return this.props.expiresAt.getTime() <= Date.now();
    }

    cancel() {
        this.props.status = "CANCELLED";
        this.props.updatedAt = new Date();
    }

    expire() {
        this.props.status = "EXPIRED";
        this.props.updatedAt = new Date();
    }

    convert() {
        this.props.status = "CONVERTED";
        this.props.updatedAt = new Date();
    }
}
