import type { Venue } from "../entity/venue";

export interface VenueRepository {
    save(venue: Venue): Promise<void>;
    findById(id: string): Promise<Venue | null>;
    findAll(): Promise<Venue[]>;
    delete(venue: Venue): Promise<void>;
}
