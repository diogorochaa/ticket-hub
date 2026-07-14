import { SectorNotFoundError } from "../../domain/errors/sector-not-found.error";
import type { SectorRepository } from "../../domain/repository/sector.repository";
import type { SectorOutput, UpdateSectorInput } from "../dto/sector.dto";
import { toSectorOutput } from "./create-sector";

export class UpdateSectorUseCase {
    constructor(private readonly sectorRepository: SectorRepository) {}

    async execute(input: UpdateSectorInput): Promise<SectorOutput> {
        const sector = await this.sectorRepository.findById(input.id);
        if (!sector) throw new SectorNotFoundError();
        sector.update({
            name: input.name,
            capacity: input.capacity,
            priceCents: input.priceCents,
        });
        await this.sectorRepository.save(sector);
        return toSectorOutput(sector);
    }
}
