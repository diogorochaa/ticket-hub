import type { PaymentStatus } from "../../domain/entity/payment";

export type PaymentOutput = {
    id: string;
    reservationId: string;
    amountCents: number;
    status: PaymentStatus;
    externalId: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type CreatePaymentInput = {
    reservationId: string;
    amountCents: number;
    externalId?: string;
};

export type PaymentWebhookInput = {
    paymentId: string;
    status: "APPROVED" | "REFUSED";
};
