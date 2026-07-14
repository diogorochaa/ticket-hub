import { SectorNotFoundError } from "../../domain/errors/sector-not-found.error";
import type { SectorRepository } from "../../domain/repository/sector.repository";
import type { SectorOutput } from "../dto/sector.dto";
import { toSectorOutput } from "./create-sector";

export class GetSectorByIdUseCase {
    constructor(private readonly sectorRepository: SectorRepository) {}

    async execute(id: string): Promise<SectorOutput> {
        const sector = await this.sectorRepository.findById(id);
        if (!sector) throw new SectorNotFoundError();
        return toSectorOutput(sector);
    }
}
