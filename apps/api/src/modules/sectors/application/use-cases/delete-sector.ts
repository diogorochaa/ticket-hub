import { SectorNotFoundError } from "../../domain/errors/sector-not-found.error";
import type { SectorRepository } from "../../domain/repository/sector.repository";

export class DeleteSectorUseCase {
    constructor(private readonly sectorRepository: SectorRepository) {}

    async execute(id: string): Promise<void> {
        const sector = await this.sectorRepository.findById(id);
        if (!sector) throw new SectorNotFoundError();
        await this.sectorRepository.delete(sector);
    }
}
