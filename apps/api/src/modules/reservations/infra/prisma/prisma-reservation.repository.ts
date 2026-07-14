import type { PrismaClient } from "../../../../../generated/prisma/client";
import type { Reservation } from "../../domain/entity/reservation";
import type { ReservationRepository } from "../../domain/repository/reservation.repository";
import { ReservationMapper } from "../mappers/reservation.mapper";

export class PrismaReservationRepository implements ReservationRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async save(reservation: Reservation): Promise<void> {
        const data = ReservationMapper.toPersistence(reservation);
        await this.prisma.reservation.upsert({
            where: { id: reservation.id },
            create: data,
            update: {
                status: data.status,
                expiresAt: data.expiresAt,
                updatedAt: data.updatedAt,
            },
        });
    }

    async findById(id: string): Promise<Reservation | null> {
        const row = await this.prisma.reservation.findUnique({ where: { id } });
        return row ? ReservationMapper.toDomain(row) : null;
    }

    async findByUserId(userId: string): Promise<Reservation[]> {
        const rows = await this.prisma.reservation.findMany({ where: { userId } });
        return rows.map(ReservationMapper.toDomain);
    }
}
