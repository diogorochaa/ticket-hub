import type { PrismaClient } from "../../../../../generated/prisma/client";
import type { Payment } from "../../domain/entity/payment";
import type { PaymentRepository } from "../../domain/repository/payment.repository";
import { PaymentMapper } from "../mappers/payment.mapper";

export class PrismaPaymentRepository implements PaymentRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async save(payment: Payment): Promise<void> {
        const data = PaymentMapper.toPersistence(payment);
        await this.prisma.payment.upsert({
            where: { id: payment.id },
            create: data,
            update: {
                status: data.status,
                externalId: data.externalId,
                updatedAt: data.updatedAt,
            },
        });
    }

    async findById(id: string): Promise<Payment | null> {
        const row = await this.prisma.payment.findUnique({ where: { id } });
        return row ? PaymentMapper.toDomain(row) : null;
    }

    async findByReservationId(reservationId: string): Promise<Payment | null> {
        const row = await this.prisma.payment.findUnique({ where: { reservationId } });
        return row ? PaymentMapper.toDomain(row) : null;
    }

    async findByExternalId(externalId: string): Promise<Payment | null> {
        const row = await this.prisma.payment.findUnique({ where: { externalId } });
        return row ? PaymentMapper.toDomain(row) : null;
    }
}
