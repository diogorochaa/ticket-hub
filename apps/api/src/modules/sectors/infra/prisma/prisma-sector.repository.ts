import type { PrismaClient } from "../../../../../generated/prisma/client";
import type { Sector } from "../../domain/entity/sector";
import type { SectorRepository } from "../../domain/repository/sector.repository";
import { SectorMapper } from "../mappers/sector.mapper";

export class PrismaSectorRepository implements SectorRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async save(sector: Sector): Promise<void> {
        const data = SectorMapper.toPersistence(sector);
        await this.prisma.sector.upsert({
            where: { id: sector.id },
            create: data,
            update: {
                name: data.name,
                capacity: data.capacity,
                priceCents: data.priceCents,
                updatedAt: data.updatedAt,
            },
        });
    }

    async findById(id: string): Promise<Sector | null> {
        const row = await this.prisma.sector.findUnique({ where: { id } });
        return row ? SectorMapper.toDomain(row) : null;
    }

    async findByEventId(eventId: string): Promise<Sector[]> {
        const rows = await this.prisma.sector.findMany({ where: { eventId } });
        return rows.map(SectorMapper.toDomain);
    }

    async delete(sector: Sector): Promise<void> {
        await this.prisma.sector.delete({ where: { id: sector.id } });
    }
}
