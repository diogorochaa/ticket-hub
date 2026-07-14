import { Venue } from "../../domain/entity/venue";
import type { VenueRepository } from "../../domain/repository/venue.repository";
import type { CreateVenueInput, VenueOutput } from "../dto/venue.dto";

export class CreateVenueUseCase {
    constructor(private readonly venueRepository: VenueRepository) {}

    async execute(input: CreateVenueInput): Promise<VenueOutput> {
        const venue = Venue.create(input);
        await this.venueRepository.save(venue);
        return {
            id: venue.id,
            name: venue.name,
            address: venue.address,
            createdAt: venue.createdAt,
            updatedAt: venue.updatedAt,
        };
    }
}
