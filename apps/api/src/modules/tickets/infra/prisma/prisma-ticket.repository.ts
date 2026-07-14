import type { PrismaClient } from "../../../../../generated/prisma/client";
import type { Ticket } from "../../domain/entity/ticket";
import type { TicketRepository } from "../../domain/repository/ticket.repository";
import { TicketMapper } from "../mappers/ticket.mapper";

export class PrismaTicketRepository implements TicketRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async save(ticket: Ticket): Promise<void> {
        const data = TicketMapper.toPersistence(ticket);
        await this.prisma.ticket.upsert({
            where: { id: ticket.id },
            create: data,
            update: { status: data.status, updatedAt: data.updatedAt },
        });
    }

    async saveMany(tickets: Ticket[]): Promise<void> {
        if (tickets.length === 0) return;
        await this.prisma.ticket.createMany({
            data: tickets.map(TicketMapper.toPersistence),
        });
    }

    async findById(id: string): Promise<Ticket | null> {
        const row = await this.prisma.ticket.findUnique({ where: { id } });
        return row ? TicketMapper.toDomain(row) : null;
    }

    async findByEventId(eventId: string): Promise<Ticket[]> {
        const rows = await this.prisma.ticket.findMany({ where: { eventId } });
        return rows.map(TicketMapper.toDomain);
    }

    async findBySectorId(sectorId: string): Promise<Ticket[]> {
        const rows = await this.prisma.ticket.findMany({ where: { sectorId } });
        return rows.map(TicketMapper.toDomain);
    }

    async tryReserve(id: string): Promise<boolean> {
        const result = await this.prisma.ticket.updateMany({
            where: { id, status: "AVAILABLE" },
            data: { status: "RESERVED", updatedAt: new Date() },
        });
        return result.count === 1;
    }

    async tryRelease(id: string): Promise<boolean> {
        const result = await this.prisma.ticket.updateMany({
            where: { id, status: "RESERVED" },
            data: { status: "AVAILABLE", updatedAt: new Date() },
        });
        return result.count === 1;
    }

    async tryMarkSold(id: string): Promise<boolean> {
        const result = await this.prisma.ticket.updateMany({
            where: { id, status: "RESERVED" },
            data: { status: "SOLD", updatedAt: new Date() },
        });
        return result.count === 1;
    }
}
