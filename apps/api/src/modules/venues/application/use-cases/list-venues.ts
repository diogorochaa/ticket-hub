import type { VenueRepository } from "../../domain/repository/venue.repository";
import type { VenueOutput } from "../dto/venue.dto";

export class ListVenuesUseCase {
    constructor(private readonly venueRepository: VenueRepository) {}

    async execute(): Promise<VenueOutput[]> {
        const venues = await this.venueRepository.findAll();
        return venues.map((venue) => ({
            id: venue.id,
            name: venue.name,
            address: venue.address,
            createdAt: venue.createdAt,
            updatedAt: venue.updatedAt,
        }));
    }
}
