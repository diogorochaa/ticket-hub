import { VenueNotFoundError } from "../../domain/errors/venue-not-found.error";
import type { VenueRepository } from "../../domain/repository/venue.repository";
import type { VenueOutput } from "../dto/venue.dto";

export class GetVenueByIdUseCase {
    constructor(private readonly venueRepository: VenueRepository) {}

    async execute(id: string): Promise<VenueOutput> {
        const venue = await this.venueRepository.findById(id);
        if (!venue) throw new VenueNotFoundError();
        return {
            id: venue.id,
            name: venue.name,
            address: venue.address,
            createdAt: venue.createdAt,
            updatedAt: venue.updatedAt,
        };
    }
}
