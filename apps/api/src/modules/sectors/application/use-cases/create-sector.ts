import { Sector } from "../../domain/entity/sector";
import type { SectorRepository } from "../../domain/repository/sector.repository";
import type { CreateSectorInput, SectorOutput } from "../dto/sector.dto";

export function toSectorOutput(sector: Sector): SectorOutput {
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

export class CreateSectorUseCase {
    constructor(private readonly sectorRepository: SectorRepository) {}

    async execute(input: CreateSectorInput): Promise<SectorOutput> {
        const sector = Sector.create(input);
        await this.sectorRepository.save(sector);
        return toSectorOutput(sector);
    }
}
