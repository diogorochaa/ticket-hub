import type { PrismaClient } from "../../../../../generated/prisma/client";
import type { Event } from "../../domain/entity/event";
import type { EventRepository } from "../../domain/repository/event.repository";
import { EventMapper } from "../mappers/event.mapper";

export class PrismaEventRepository implements EventRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async save(event: Event): Promise<void> {
        const data = EventMapper.toPersistence(event);
        await this.prisma.event.upsert({
            where: { id: event.id },
            create: data,
            update: {
                name: data.name,
                description: data.description,
                startsAt: data.startsAt,
                venueId: data.venueId,
                status: data.status,
                updatedAt: data.updatedAt,
            },
        });
    }

    async findById(id: string): Promise<Event | null> {
        const row = await this.prisma.event.findUnique({ where: { id } });
        return row ? EventMapper.toDomain(row) : null;
    }

    async findAll(): Promise<Event[]> {
        const rows = await this.prisma.event.findMany({ orderBy: { startsAt: "asc" } });
        return rows.map(EventMapper.toDomain);
    }

    async delete(event: Event): Promise<void> {
        await this.prisma.event.delete({ where: { id: event.id } });
    }
}
