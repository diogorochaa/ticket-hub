import type { Sector } from "../entity/sector";

export interface SectorRepository {
    save(sector: Sector): Promise<void>;
    findById(id: string): Promise<Sector | null>;
    findByEventId(eventId: string): Promise<Sector[]>;
    delete(sector: Sector): Promise<void>;
}
