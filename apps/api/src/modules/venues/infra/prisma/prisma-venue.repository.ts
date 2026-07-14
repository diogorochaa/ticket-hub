import type { PrismaClient } from "../../../../../generated/prisma/client";
import type { Venue } from "../../domain/entity/venue";
import type { VenueRepository } from "../../domain/repository/venue.repository";
import { VenueMapper } from "../mappers/venue.mapper";

export class PrismaVenueRepository implements VenueRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async save(venue: Venue): Promise<void> {
        const data = VenueMapper.toPersistence(venue);
        await this.prisma.venue.upsert({
            where: { id: venue.id },
            create: data,
            update: { name: data.name, address: data.address, updatedAt: data.updatedAt },
        });
    }

    async findById(id: string): Promise<Venue | null> {
        const row = await this.prisma.venue.findUnique({ where: { id } });
        return row ? VenueMapper.toDomain(row) : null;
    }

    async findAll(): Promise<Venue[]> {
        const rows = await this.prisma.venue.findMany({ orderBy: { createdAt: "desc" } });
        return rows.map(VenueMapper.toDomain);
    }

    async delete(venue: Venue): Promise<void> {
        await this.prisma.venue.delete({ where: { id: venue.id } });
    }
}
