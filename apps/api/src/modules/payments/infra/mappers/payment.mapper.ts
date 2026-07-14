import { Payment, type PaymentStatus } from "../../domain/entity/payment";

type PrismaPayment = {
    id: string;
    reservationId: string;
    amountCents: number;
    status: string;
    externalId: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export class PaymentMapper {
    static toDomain(raw: PrismaPayment): Payment {
        return Payment.restore({
            ...raw,
            status: raw.status as PaymentStatus,
        });
    }

    static toPersistence(payment: Payment) {
        return {
            id: payment.id,
            reservationId: payment.reservationId,
            amountCents: payment.amountCents,
            status: payment.status,
            externalId: payment.externalId,
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt,
        };
    }
}
