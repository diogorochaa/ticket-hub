import { Sector } from "../../domain/entity/sector";

type PrismaSector = {
    id: string;
    eventId: string;
    name: string;
    capacity: number;
    priceCents: number;
    createdAt: Date;
    updatedAt: Date;
};

export class SectorMapper {
    static toDomain(raw: PrismaSector): Sector {
        return Sector.restore(raw);
    }

    static toPersistence(sector: Sector) {
        return {
            id: sector.id,
            eventId: sector.eventId,
            name: sector.name,
            capacity: sector.capacity,
            priceCents: sector.priceCents,
            createdAt: sector.createdAt,
            updatedAt: sector.updatedAt,
        };
    }
}
