import { randomUUID } from "node:crypto";

export type PaymentStatus = "PENDING" | "APPROVED" | "REFUSED" | "CANCELLED";

interface CreatePaymentProps {
    reservationId: string;
    amountCents: number;
    externalId?: string | null;
}

interface PaymentProps {
    id: string;
    reservationId: string;
    amountCents: number;
    status: PaymentStatus;
    externalId: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export class Payment {
    private constructor(private readonly props: PaymentProps) {}

    static create(props: CreatePaymentProps): Payment {
        return new Payment({
            id: randomUUID(),
            reservationId: props.reservationId,
            amountCents: props.amountCents,
            status: "PENDING",
            externalId: props.externalId ?? null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    static restore(props: PaymentProps): Payment {
        return new Payment(props);
    }

    get id() { return this.props.id; }
    get reservationId() { return this.props.reservationId; }
    get amountCents() { return this.props.amountCents; }
    get status() { return this.props.status; }
    get externalId() { return this.props.externalId; }
    get createdAt() { return this.props.createdAt; }
    get updatedAt() { return this.props.updatedAt; }

    approve() {
        this.props.status = "APPROVED";
        this.props.updatedAt = new Date();
    }

    refuse() {
        this.props.status = "REFUSED";
        this.props.updatedAt = new Date();
    }

    cancel() {
        this.props.status = "CANCELLED";
        this.props.updatedAt = new Date();
    }
}
