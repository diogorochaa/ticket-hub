import type { SectorRepository } from "../../domain/repository/sector.repository";
import type { SectorOutput } from "../dto/sector.dto";
import { toSectorOutput } from "./create-sector";

export class ListSectorsByEventUseCase {
    constructor(private readonly sectorRepository: SectorRepository) {}

    async execute(eventId: string): Promise<SectorOutput[]> {
        const sectors = await this.sectorRepository.findByEventId(eventId);
        return sectors.map(toSectorOutput);
    }
}
